import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export interface TeamPoints {
  team1: number;
  team2: number;
  team3: number;
  team4: number;
}

export interface GamePoints {
  [gameName: string]: TeamPoints;
}

export interface LeaderboardData {
  gamePoints: GamePoints;
  miscPoints?: GamePoints;
  lastUpdated?: string;
}

async function writeToEdgeConfig(data: LeaderboardData): Promise<boolean> {
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
          key: "leaderboard",
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
    const leaderboard = await get<LeaderboardData>("leaderboard");
    const data: LeaderboardData = leaderboard || { gamePoints: {}, miscPoints: {} };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

function isValidTeamPoints(teamPoints: unknown): teamPoints is TeamPoints {
  if (!teamPoints || typeof teamPoints !== "object") return false;
  const tp = teamPoints as TeamPoints;
  return (
    typeof tp.team1 === "number" &&
    typeof tp.team2 === "number" &&
    typeof tp.team3 === "number" &&
    typeof tp.team4 === "number"
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameName, miscLabel, teamPoints } = body;

    const isGame = Boolean(gameName);
    const isMisc = Boolean(miscLabel);

    if ((!isGame && !isMisc) || (isGame && isMisc) || !teamPoints) {
      return NextResponse.json(
        { error: "Provide either gameName or miscLabel (not both), plus teamPoints" },
        { status: 400 }
      );
    }

    if (!isValidTeamPoints(teamPoints)) {
      return NextResponse.json(
        { error: "Invalid teamPoints structure" },
        { status: 400 }
      );
    }

    const label = (isGame ? gameName : miscLabel) as string;

    // Get existing leaderboard data
    const existing = (await get<LeaderboardData>("leaderboard")) || {
      gamePoints: {},
      miscPoints: {},
    };

    const updated: LeaderboardData = {
      gamePoints: existing.gamePoints || {},
      miscPoints: existing.miscPoints || {},
      lastUpdated: new Date().toISOString(),
    };

    if (isGame) {
      updated.gamePoints = {
        ...updated.gamePoints,
        [label]: teamPoints,
      };
    } else {
      updated.miscPoints = {
        ...updated.miscPoints,
        [label]: teamPoints,
      };
    }

    // Write to Edge Config
    const writeSuccess = await writeToEdgeConfig(updated);

    return NextResponse.json({
      success: true,
      writeSuccess,
      leaderboard: updated,
    });
  } catch (error) {
    console.error("Error saving leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to save leaderboard" },
      { status: 500 }
    );
  }
}
