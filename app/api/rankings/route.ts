import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import type { RankingSubmission } from "@/lib/edge-config";
import { calculateCategoryRankings, calculateOverallRankings } from "@/lib/ranking-calculator";

export async function GET() {
  try {
    console.log("GET /api/rankings - Fetching from Edge Config...");
    const rankings = await get<RankingSubmission[]>("rankings");
    const submissions = rankings || [];
    
    console.log("Fetched rankings from Edge Config:", submissions.length, "submissions");
    if (submissions.length > 0) {
      console.log("First submission:", submissions[0].submittedBy, submissions[0].timestamp);
    } else {
      console.log("No submissions found in Edge Config");
    }

    // Calculate category and overall rankings
    const categoryRankings = {
      golf: calculateCategoryRankings(submissions, "golf"),
      americanChallenge: calculateCategoryRankings(submissions, "americanChallenge"),
      athleticism: calculateCategoryRankings(submissions, "athleticism"),
      drinkingGame: calculateCategoryRankings(submissions, "drinkingGame"),
      drugHandling: calculateCategoryRankings(submissions, "drugHandling"),
    };

    const overallRankings = calculateOverallRankings(submissions);

    return NextResponse.json({
      submissions,
      submissionCount: submissions.length,
      categoryRankings,
      overallRankings,
    });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return NextResponse.json(
      { error: "Failed to fetch rankings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const submission: RankingSubmission = await request.json();

    // Validate submission
    if (!submission.submittedBy || !submission.rankings) {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 400 }
      );
    }

    // Get existing rankings
    const existing = (await get<RankingSubmission[]>("rankings")) || [];

    // Add timestamp if not provided
    if (!submission.timestamp) {
      submission.timestamp = new Date().toISOString();
    }

    // Add new submission
    const updated = [...existing, submission];
    
    console.log("Adding new submission. Total submissions will be:", updated.length);
    console.log("Submission from:", submission.submittedBy);

    // Save to Edge Config using Vercel API
    // Edge Config doesn't support direct writes from serverless functions
    // We need to use the Vercel REST API
    // EDGE_CONFIG connection string format: https://edge-config.vercel.com/{id}?token={token}
    // The token in EDGE_CONFIG is read-only, so we need VERCEL_API_TOKEN for writes
    // Note: VERCEL_OIDC_TOKEN cannot be used for Edge Config writes - it's for OIDC authentication only
    const edgeConfig = process.env.EDGE_CONFIG;
    const vercelToken = process.env.VERCEL_API_TOKEN;
    
    console.log("EDGE_CONFIG present:", !!edgeConfig);
    console.log("VERCEL_API_TOKEN present:", !!vercelToken);
    console.log("Number of submissions to save:", updated.length);
    
    let writeSuccess = false;
    if (!edgeConfig) {
      console.error("EDGE_CONFIG environment variable not set");
    } else if (!vercelToken) {
      console.error("VERCEL_API_TOKEN not set - cannot write to Edge Config");
      console.error("Please create a Vercel API token at https://vercel.com/account/tokens");
      console.error("Then add it as VERCEL_API_TOKEN in your Vercel project environment variables");
    } else {
      try {
        // Parse the connection string to extract ID
        // Format: https://edge-config.vercel.com/{id}?token={token}
        const url = new URL(edgeConfig);
        const pathParts = url.pathname.split('/').filter(Boolean);
        const edgeConfigId = pathParts[pathParts.length - 1];
        
        console.log("Parsed Edge Config ID:", edgeConfigId ? edgeConfigId.substring(0, 20) + "..." : "missing");
        
        if (!edgeConfigId) {
          console.error("Failed to parse EDGE_CONFIG connection string");
          console.error("EDGE_CONFIG format:", edgeConfig.substring(0, 50) + "...");
          console.error("URL pathname:", url.pathname);
        } else {
          console.log("Attempting to write to Edge Config...");
          const apiUrl = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`;
          console.log("API URL:", apiUrl);
          
          const requestBodySize = JSON.stringify(updated).length;
          console.log("Request body size:", requestBodySize, "bytes");
          console.log("Number of items to save:", updated.length);
          
          // Check size limit (Edge Config has a 256KB limit per item)
          if (requestBodySize > 250 * 1024) {
            console.warn("Request body is large:", requestBodySize, "bytes (limit: 256KB)");
          }
          
          // Try update first, then create if item doesn't exist
          let operation = "update";
          let response: Response;
          let attempt = 0;
          const maxAttempts = 2;
          
          while (attempt < maxAttempts) {
            attempt++;
            console.log(`Attempt ${attempt}: Using operation "${operation}"`);
            
            const requestBody = {
              items: [
                {
                  operation: operation,
                  key: "rankings",
                  value: updated,
                },
              ],
            };
            
            response = await fetch(apiUrl, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${vercelToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            });

            console.log("Edge Config API response status:", response.status);
            
            if (response.ok) {
              writeSuccess = true;
              console.log(`Successfully wrote to Edge Config using "${operation}" operation!`);
              try {
                const responseData = await response.json();
                console.log("Edge Config API response:", JSON.stringify(responseData, null, 2));
              } catch {
                console.log("Edge Config API response: (no JSON body)");
              }
              break;
            } else {
              const errorText = await response.text();
              let errorJson: any = null;
              
              try {
                errorJson = JSON.parse(errorText);
              } catch {
                // Not JSON
              }
              
              // If update failed because item doesn't exist, try create
              if (
                response.status === 400 &&
                errorJson?.error?.message?.includes("non-existing") &&
                operation === "update"
              ) {
                console.log("Item doesn't exist yet, will try 'create' operation");
                operation = "create";
                continue; // Retry with create
              }
              
              // Otherwise, log the error and stop
              console.error("Error writing to Edge Config:");
              console.error("  Status:", response.status);
              console.error("  Status Text:", response.statusText);
              console.error("  Error Body:", errorText);
              if (errorJson) {
                console.error("  Error JSON:", JSON.stringify(errorJson, null, 2));
              }
              break;
            }
          }
        }
      } catch (apiError) {
        console.error("Error calling Vercel API:", apiError);
        if (apiError instanceof Error) {
          console.error("Error message:", apiError.message);
          console.error("Error stack:", apiError.stack);
        }
      }
    }

    // Calculate and return updated rankings
    const categoryRankings = {
      golf: calculateCategoryRankings(updated, "golf"),
      americanChallenge: calculateCategoryRankings(updated, "americanChallenge"),
      athleticism: calculateCategoryRankings(updated, "athleticism"),
      drinkingGame: calculateCategoryRankings(updated, "drinkingGame"),
      drugHandling: calculateCategoryRankings(updated, "drugHandling"),
    };

    const overallRankings = calculateOverallRankings(updated);

    return NextResponse.json({
      success: true,
      writeSuccess,
      submissions: updated,
      submissionCount: updated.length,
      categoryRankings,
      overallRankings,
    });
  } catch (error) {
    console.error("Error saving ranking:", error);
    return NextResponse.json(
      { error: "Failed to save ranking" },
      { status: 500 }
    );
  }
}
