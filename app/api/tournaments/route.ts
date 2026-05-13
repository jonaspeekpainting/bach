import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import type { TournamentsData, Tournament, Bracket } from "@/lib/bracket-types";

async function writeToEdgeConfig(data: TournamentsData): Promise<boolean> {
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
          key: "tournaments",
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
      const errorText = await response.text();
      console.error("Failed to write to Edge Config:", response.status, errorText);
      return false;
    }

    console.log("Successfully wrote tournaments to Edge Config");
    return true;
  } catch (error) {
    console.error("Error writing to Edge Config:", error);
    return false;
  }
}

export async function GET() {
  try {
    const tournaments = await get<TournamentsData>("tournaments");
    const data = tournaments || { tournaments: [], lastUpdated: null };
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tournament } = body;

    if (!tournament) {
      return NextResponse.json(
        { error: "Missing tournament data" },
        { status: 400 }
      );
    }

    // Validate tournament structure
    if (!tournament.id || !tournament.name || !tournament.bracket) {
      return NextResponse.json(
        { error: "Invalid tournament structure. Must have id, name, and bracket" },
        { status: 400 }
      );
    }

    // Get existing tournaments
    const existing = (await get<TournamentsData>("tournaments")) || {
      tournaments: [],
      lastUpdated: null,
    };

    // Update or add tournament
    const tournamentIndex = existing.tournaments.findIndex(
      (t) => t.id === tournament.id
    );

    const updated: TournamentsData = {
      tournaments:
        tournamentIndex >= 0
          ? existing.tournaments.map((t, i) =>
              i === tournamentIndex ? tournament : t
            )
          : [...existing.tournaments, tournament],
      lastUpdated: new Date().toISOString(),
    };

    // Write to Edge Config
    const writeSuccess = await writeToEdgeConfig(updated);

    return NextResponse.json({
      success: true,
      writeSuccess,
      tournaments: updated,
    });
  } catch (error) {
    console.error("Error saving tournament:", error);
    return NextResponse.json(
      { error: "Failed to save tournament" },
      { status: 500 }
    );
  }
}
