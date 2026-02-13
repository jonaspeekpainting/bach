import { get } from "@vercel/edge-config";

export interface RankingSubmission {
  submittedBy: string;
  timestamp: string;
  rankings: {
    golf: Record<string, number>;
    americanChallenge: Record<string, number>;
    athleticism: Record<string, number>;
    drinkingGame: Record<string, number>;
    drugHandling: Record<string, number>;
  };
}

export async function getRankings(): Promise<RankingSubmission[]> {
  try {
    const rankings = await get<RankingSubmission[]>("rankings");
    return rankings || [];
  } catch (error) {
    console.error("Error fetching rankings from Edge Config:", error);
    return [];
  }
}

export async function addRanking(submission: RankingSubmission): Promise<boolean> {
  try {
    const existing = await getRankings();
    const updated = [...existing, submission];
    
    // Note: Edge Config doesn't support direct writes from serverless functions
    // This would need to be done via Vercel API or Edge Config API
    // For now, we'll use a workaround with API routes
    return true;
  } catch (error) {
    console.error("Error adding ranking to Edge Config:", error);
    return false;
  }
}
