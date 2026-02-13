import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { TEAMS } from "@/lib/constants";

export interface Team {
  id: string;
  name: string;
  color: string;
}

export interface TeamsData {
  teams: Team[];
  lastUpdated?: string;
}

async function writeToEdgeConfig(data: TeamsData): Promise<boolean> {
  const edgeConfig = process.env.EDGE_CONFIG;
  const vercelToken = process.env.VERCEL_API_TOKEN;

  if (!edgeConfig || !vercelToken) {
    console.error("EDGE_CONFIG or VERCEL_API_TOKEN not set");
    return false;
  }

  try {
    const url = new URL(edgeConfig);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const edgeConfigId = pathParts[pathParts.length - 1];

    if (!edgeConfigId) {
      console.error("Failed to parse EDGE_CONFIG connection string");
      return false;
    }

    const apiUrl = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`;
    const requestBody = {
      items: [
        {
          operation: "update",
          key: "teams",
          value: data,
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Try create if update fails
      if (response.status === 400) {
        requestBody.items[0].operation = "create";
        const createResponse = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        return createResponse.ok;
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error writing to Edge Config:", error);
    return false;
  }
}

export async function GET() {
  try {
    const teamsData = await get<TeamsData>("teams");
    
    // If no teams data exists, return default teams
    if (!teamsData || !teamsData.teams) {
      return NextResponse.json({
        teams: TEAMS,
        lastUpdated: null,
      });
    }

    return NextResponse.json(teamsData);
  } catch (error) {
    console.error("Error fetching teams:", error);
    // Return default teams on error
    return NextResponse.json({
      teams: TEAMS,
      lastUpdated: null,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teams } = body;

    if (!teams || !Array.isArray(teams)) {
      return NextResponse.json(
        { error: "Missing or invalid teams array" },
        { status: 400 }
      );
    }

    // Validate teams structure
    for (const team of teams) {
      if (!team.id || !team.name || !team.color) {
        return NextResponse.json(
          { error: "Invalid team structure. Each team must have id, name, and color" },
          { status: 400 }
        );
      }
    }

    // Ensure we have exactly 4 teams with correct IDs
    const requiredIds = ["team1", "team2", "team3", "team4"];
    const teamIds = teams.map((t) => t.id);
    if (teamIds.length !== 4 || !requiredIds.every((id) => teamIds.includes(id))) {
      return NextResponse.json(
        { error: "Must have exactly 4 teams with ids: team1, team2, team3, team4" },
        { status: 400 }
      );
    }

    const updated: TeamsData = {
      teams,
      lastUpdated: new Date().toISOString(),
    };

    // Write to Edge Config
    const writeSuccess = await writeToEdgeConfig(updated);

    return NextResponse.json({
      success: true,
      writeSuccess,
      teams: updated,
    });
  } catch (error) {
    console.error("Error saving teams:", error);
    return NextResponse.json(
      { error: "Failed to save teams" },
      { status: 500 }
    );
  }
}
