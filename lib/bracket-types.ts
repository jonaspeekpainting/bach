import { TEAMS } from "./constants";

export type BracketType = "single-elimination" | "double-elimination" | "round-robin" | "round-robin-championship";

export interface Match {
  id: string;
  team1Id: string | null;
  team2Id: string | null;
  team1Score?: number;
  team2Score?: number;
  winnerId?: string | null;
  round: number;
  matchNumber: number;
  completed: boolean;
  // For bracket visualization and auto-advancement
  nextMatchId?: string | null; // Which match this winner advances to
  nextMatchSlot?: "team1" | "team2" | null; // Which slot in the next match
  dependsOnMatch1Id?: string | null; // First match that feeds into this one
  dependsOnMatch2Id?: string | null; // Second match that feeds into this one
  bracketType?: "winners" | "losers" | "grand-final"; // Which bracket this match is in
  displayNumber?: string; // Human-readable match number (e.g., "W1", "L3", "GF")
  loserNextMatchId?: string | null; // Which match the loser advances to (for double elimination)
}

export interface Bracket {
  id: string;
  gameName: string;
  type: BracketType;
  matches: Match[];
  roundRobinResults?: Record<string, { wins: number; losses: number; pointsFor: number; pointsAgainst: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  bracket: Bracket;
  status: "not-started" | "in-progress" | "completed";
}

export interface TournamentsData {
  tournaments: Tournament[];
  lastUpdated: string | null;
}

// Helper to create initial bracket structure
export function createBracket(
  gameName: string,
  type: BracketType,
  teamIds: string[] = TEAMS.map(t => t.id)
): Bracket {
  const matches: Match[] = [];
  let matchId = 1;

  if (type === "single-elimination") {
    // Create single elimination bracket (4 teams: 2 semis, 1 final)
    // Semifinals
    matches.push({
      id: `match-${matchId++}`,
      team1Id: teamIds[0],
      team2Id: teamIds[3],
      round: 1,
      matchNumber: 1,
      completed: false,
    });
    matches.push({
      id: `match-${matchId++}`,
      team1Id: teamIds[1],
      team2Id: teamIds[2],
      round: 1,
      matchNumber: 2,
      completed: false,
    });
    // Final
    matches.push({
      id: `match-${matchId++}`,
      team1Id: null,
      team2Id: null,
      round: 2,
      matchNumber: 1,
      completed: false,
    });
  } else if (type === "double-elimination") {
    // Create 8 team double elimination bracket
    // Each of the 4 teams splits into A and B (e.g., Team 1A, Team 1B)
    const allTeamIds: string[] = [];
    teamIds.forEach((teamId) => {
      allTeamIds.push(`${teamId}A`);
      allTeamIds.push(`${teamId}B`);
    });
    
    // Arrange teams so A and B teams from the same base team don't play each other
    // Strategy: Pair each A team with a B team from a different base team
    // team1A, team2A, team3A, team4A, team1B, team2B, team3B, team4B
    // Pair: 1A vs 2B, 3A vs 4B, 2A vs 3B, 4A vs 1B
    const arrangedTeams = [
      allTeamIds[0], // team1A
      allTeamIds[5], // team2B
      allTeamIds[2], // team3A
      allTeamIds[7], // team4B
      allTeamIds[3], // team2A
      allTeamIds[6], // team3B
      allTeamIds[4], // team4A
      allTeamIds[1], // team1B
    ];
    
    // Winners Bracket
    // Round 1 (4 matches)
    const w1m1 = `match-${matchId++}`;
    const w1m2 = `match-${matchId++}`;
    const w1m3 = `match-${matchId++}`;
    const w1m4 = `match-${matchId++}`;
    
    // Losers bracket match IDs (defined early for reference)
    // After w1m1-w1m4 (4 matches), we'll have w2m1-w2m2 (2 matches) and wFinal (1 match) = 7 total
    // So l1m1 starts at matchId + 3 (after w2m1, w2m2, wFinal)
    const l1m1 = `match-${matchId + 3}`; // Will be created after winners final
    const l1m2 = `match-${matchId + 4}`;
    
    matches.push({
      id: w1m1,
      team1Id: arrangedTeams[0], // team1A
      team2Id: arrangedTeams[1], // team2B
      round: 1,
      matchNumber: 1,
      completed: false,
      bracketType: "winners",
      displayNumber: "W1",
      nextMatchId: `match-${matchId + 1}`,
      nextMatchSlot: "team1",
      loserNextMatchId: l1m1, // Loser goes to losers bracket match 1
    });
    matches.push({
      id: w1m2,
      team1Id: arrangedTeams[2], // team3A
      team2Id: arrangedTeams[3], // team4B
      round: 1,
      matchNumber: 2,
      completed: false,
      bracketType: "winners",
      displayNumber: "W2",
      nextMatchId: `match-${matchId + 1}`,
      nextMatchSlot: "team2",
      loserNextMatchId: l1m1, // Loser goes to losers bracket match 1
    });
    matches.push({
      id: w1m3,
      team1Id: arrangedTeams[4], // team2A
      team2Id: arrangedTeams[5], // team3B
      round: 1,
      matchNumber: 3,
      completed: false,
      bracketType: "winners",
      displayNumber: "W3",
      nextMatchId: `match-${matchId + 2}`,
      nextMatchSlot: "team1",
      loserNextMatchId: l1m2, // Loser goes to losers bracket match 2
    });
    matches.push({
      id: w1m4,
      team1Id: arrangedTeams[6], // team4A
      team2Id: arrangedTeams[7], // team1B
      round: 1,
      matchNumber: 4,
      completed: false,
      bracketType: "winners",
      displayNumber: "W4",
      nextMatchId: `match-${matchId + 2}`,
      nextMatchSlot: "team2",
      loserNextMatchId: l1m2, // Loser goes to losers bracket match 2
    });
    
    // Winners Round 2 (2 matches)
    const w2m1 = `match-${matchId++}`;
    const w2m2 = `match-${matchId++}`;
    
    // After l1m1, l1m2 (2 matches), l1m3 and l1m4 come next
    const l1m3 = `match-${matchId + 5}`; // Will be created after l1m1, l1m2
    const l1m4 = `match-${matchId + 6}`;
    
    matches.push({
      id: w2m1,
      team1Id: null,
      team2Id: null,
      round: 2,
      matchNumber: 1,
      completed: false,
      bracketType: "winners",
      displayNumber: "W5",
      dependsOnMatch1Id: w1m1,
      dependsOnMatch2Id: w1m2,
      nextMatchId: `match-${matchId + 1}`,
      nextMatchSlot: "team1",
      loserNextMatchId: l1m3, // Loser goes to losers bracket match 3
    });
    matches.push({
      id: w2m2,
      team1Id: null,
      team2Id: null,
      round: 2,
      matchNumber: 2,
      completed: false,
      bracketType: "winners",
      displayNumber: "W6",
      dependsOnMatch1Id: w1m3,
      dependsOnMatch2Id: w1m4,
      nextMatchId: `match-${matchId + 1}`,
      nextMatchSlot: "team2",
      loserNextMatchId: l1m4, // Loser goes to losers bracket match 4
    });
    
    // Winners Final
    const wFinal = `match-${matchId++}`;
    // After l1m1-l1m4 (4 matches), l2m1 (1 match), then lFinal
    const lFinal = `match-${matchId + 5}`; // Will be created later
    matches.push({
      id: wFinal,
      team1Id: null,
      team2Id: null,
      round: 3,
      matchNumber: 1,
      completed: false,
      bracketType: "winners",
      displayNumber: "W7",
      dependsOnMatch1Id: w2m1,
      dependsOnMatch2Id: w2m2,
      nextMatchId: `match-${matchId + 4}`, // Advances to grand final
      nextMatchSlot: "team1",
      loserNextMatchId: lFinal, // Loser goes to losers final
    });
    
    // Losers Bracket
    // Losers Round 1 (losers from winners round 1)
    matches.push({
      id: l1m1,
      team1Id: null, // Loser of w1m1
      team2Id: null, // Loser of w1m2
      round: 4,
      matchNumber: 1,
      completed: false,
      bracketType: "losers",
      displayNumber: "L1",
      dependsOnMatch1Id: w1m1,
      dependsOnMatch2Id: w1m2,
      nextMatchId: l1m3,
      nextMatchSlot: "team2",
    });
    matches.push({
      id: l1m2,
      team1Id: null, // Loser of w1m3
      team2Id: null, // Loser of w1m4
      round: 4,
      matchNumber: 2,
      completed: false,
      bracketType: "losers",
      displayNumber: "L2",
      dependsOnMatch1Id: w1m3,
      dependsOnMatch2Id: w1m4,
      nextMatchId: l1m4,
      nextMatchSlot: "team2",
    });
    
    const l2m1 = `match-${matchId + 2}`; // Will be created later
    
    matches.push({
      id: l1m3,
      team1Id: null, // Loser of w2m1
      team2Id: null, // Winner of l1m1
      round: 5,
      matchNumber: 1,
      completed: false,
      bracketType: "losers",
      displayNumber: "L3",
      dependsOnMatch1Id: w2m1,
      dependsOnMatch2Id: l1m1,
      nextMatchId: l2m1,
      nextMatchSlot: "team1",
    });
    matches.push({
      id: l1m4,
      team1Id: null, // Loser of w2m2
      team2Id: null, // Winner of l1m2
      round: 5,
      matchNumber: 2,
      completed: false,
      bracketType: "losers",
      displayNumber: "L4",
      dependsOnMatch1Id: w2m2,
      dependsOnMatch2Id: l1m2,
      nextMatchId: l2m1,
      nextMatchSlot: "team2",
    });
    
    // Losers Round 2
    matches.push({
      id: l2m1,
      team1Id: null,
      team2Id: null,
      round: 6,
      matchNumber: 1,
      completed: false,
      bracketType: "losers",
      displayNumber: "L5",
      dependsOnMatch1Id: l1m3,
      dependsOnMatch2Id: l1m4,
      nextMatchId: lFinal,
      nextMatchSlot: "team2",
    });
    
    // Losers Final (loser of winners final vs winner of losers round 2)
    matches.push({
      id: lFinal,
      team1Id: null,
      team2Id: null,
      round: 7,
      matchNumber: 1,
      completed: false,
      bracketType: "losers",
      displayNumber: "L6",
      dependsOnMatch1Id: wFinal,
      dependsOnMatch2Id: l2m1,
      nextMatchId: `match-${matchId}`,
      nextMatchSlot: "team2",
    });
    
    // Grand Final
    matches.push({
      id: `match-${matchId++}`,
      team1Id: null,
      team2Id: null,
      round: 8,
      matchNumber: 1,
      completed: false,
      bracketType: "grand-final",
      displayNumber: "GF",
      dependsOnMatch1Id: wFinal,
      dependsOnMatch2Id: lFinal,
    });
  } else if (type === "round-robin") {
    // Create round robin matches (each team plays every other team)
    let matchNum = 1;
    for (let i = 0; i < teamIds.length; i++) {
      for (let j = i + 1; j < teamIds.length; j++) {
        matches.push({
          id: `match-${matchId++}`,
          team1Id: teamIds[i],
          team2Id: teamIds[j],
          round: 1,
          matchNumber: matchNum++,
          completed: false,
        });
      }
    }
  } else if (type === "round-robin-championship") {
    // Round robin + championship game
    let matchNum = 1;
    for (let i = 0; i < teamIds.length; i++) {
      for (let j = i + 1; j < teamIds.length; j++) {
        matches.push({
          id: `match-${matchId++}`,
          team1Id: teamIds[i],
          team2Id: teamIds[j],
          round: 1,
          matchNumber: matchNum++,
          completed: false,
        });
      }
    }
    // Championship game
    matches.push({
      id: `match-${matchId++}`,
      team1Id: null,
      team2Id: null,
      round: 2,
      matchNumber: 1,
      completed: false,
    });
  }

  return {
    id: `${gameName.toLowerCase().replace(/\s+/g, "-")}-bracket`,
    gameName,
    type,
    matches,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Helper to get loser from a match
export function getLoser(match: Match): string | null {
  if (!match.completed || !match.winnerId) return null;
  if (match.team1Id === match.winnerId) return match.team2Id;
  if (match.team2Id === match.winnerId) return match.team1Id;
  return null;
}

// Helper to advance winner to next match
export function advanceWinner(bracket: Bracket, matchId: string, winnerId: string | null): Bracket {
  const match = bracket.matches.find((m) => m.id === matchId);
  if (!match || !match.nextMatchId || !match.nextMatchSlot || !winnerId) {
    return bracket;
  }

  const updatedMatches = bracket.matches.map((m) => {
    if (m.id === match.nextMatchId) {
      return {
        ...m,
        [match.nextMatchSlot === "team1" ? "team1Id" : "team2Id"]: winnerId,
      };
    }
    return m;
  });

  return {
    ...bracket,
    matches: updatedMatches,
    updatedAt: new Date().toISOString(),
  };
}

// Helper to advance winner from losers bracket match to next losers bracket match
export function advanceLosersWinner(bracket: Bracket, matchId: string, winnerId: string | null): Bracket {
  if (!winnerId) return bracket;
  
  const match = bracket.matches.find((m) => m.id === matchId);
  if (!match || match.bracketType !== "losers") {
    return bracket;
  }

  // Find the next match that depends on this match for team2 (winner advances)
  // In losers bracket, winners from earlier rounds advance to team2 slot of next round
  const nextMatch = bracket.matches.find(
    (m) => m.bracketType === "losers" && 
           m.dependsOnMatch2Id === matchId && // Winner goes to team2 slot
           !m.completed &&
           m.round > match.round
  );

  if (!nextMatch) {
    return bracket;
  }

  const updatedMatches = bracket.matches.map((m) => {
    if (m.id === nextMatch.id && !m.team2Id) {
      return {
        ...m,
        team2Id: winnerId,
      };
    }
    return m;
  });

  return {
    ...bracket,
    matches: updatedMatches,
    updatedAt: new Date().toISOString(),
  };
}

// Helper to advance loser to losers bracket (for double elimination)
export function advanceLoser(bracket: Bracket, matchId: string, loserId: string | null): Bracket {
  if (!loserId) return bracket;
  
  const match = bracket.matches.find((m) => m.id === matchId);
  if (!match || match.bracketType !== "winners") {
    return bracket;
  }

  // Find ALL losers bracket matches that depend on this match (there might be multiple)
  const nextLosersMatches = bracket.matches.filter(
    (m) => m.bracketType === "losers" && 
           (m.dependsOnMatch1Id === matchId || m.dependsOnMatch2Id === matchId) &&
           !m.completed
  );

  if (nextLosersMatches.length === 0) {
    return bracket;
  }

  let updatedBracket = bracket;
  
  // Advance loser to each dependent match
  for (const nextLosersMatch of nextLosersMatches) {
    updatedBracket = {
      ...updatedBracket,
      matches: updatedBracket.matches.map((m) => {
        if (m.id === nextLosersMatch.id) {
          // Determine which slot to fill based on dependencies
          if (m.dependsOnMatch1Id === matchId && !m.team1Id) {
            return { ...m, team1Id: loserId };
          }
          if (m.dependsOnMatch2Id === matchId && !m.team2Id) {
            return { ...m, team2Id: loserId };
          }
          // If both slots depend on this match, fill the first empty one
          if (m.dependsOnMatch1Id === matchId && m.dependsOnMatch2Id === matchId) {
            if (!m.team1Id) return { ...m, team1Id: loserId };
            if (!m.team2Id) return { ...m, team2Id: loserId };
          }
        }
        return m;
      }),
      updatedAt: new Date().toISOString(),
    };
  }

  return updatedBracket;
}

// Helper to repair bracket by populating teams from completed dependencies
export function repairBracket(bracket: Bracket): Bracket {
  let updated = { ...bracket };
  let changed = true;
  
  // Keep iterating until no more changes (handles cascading dependencies)
  while (changed) {
    changed = false;
    updated = {
      ...updated,
      matches: updated.matches.map((m) => {
        // Skip if match is completed or already has both teams
        if (m.completed || (m.team1Id && m.team2Id)) return m;
        
        // Only proceed if this match has dependencies
        if (!m.dependsOnMatch1Id && !m.dependsOnMatch2Id) return m;
        
        // Check dependencies - must match exactly
        const dep1 = m.dependsOnMatch1Id
          ? updated.matches.find((d) => d.id === m.dependsOnMatch1Id)
          : null;
        const dep2 = m.dependsOnMatch2Id
          ? updated.matches.find((d) => d.id === m.dependsOnMatch2Id)
          : null;
        
        // Verify dependencies are correct
        if (dep1 && dep1.id !== m.dependsOnMatch1Id) return m;
        if (dep2 && dep2.id !== m.dependsOnMatch2Id) return m;
        
        let newTeam1Id = m.team1Id;
        let newTeam2Id = m.team2Id;
        
        // Populate teams based on which dependency provides which slot
        // Team1 comes ONLY from dependsOnMatch1Id
        if (dep1?.completed && m.dependsOnMatch1Id === dep1.id && !newTeam1Id) {
          if (m.bracketType === "losers" && dep1.bracketType === "winners") {
            // Loser from winners bracket goes to losers bracket
            newTeam1Id = getLoser(dep1);
          } else if (dep1.bracketType === "winners" && m.bracketType === "winners") {
            // Winner advances in winners bracket
            newTeam1Id = dep1.winnerId || null;
          } else if (dep1.bracketType === "losers" && m.bracketType === "losers") {
            // Winner from previous losers match
            newTeam1Id = dep1.winnerId || null;
          }
        }
        
        // Team2 comes ONLY from dependsOnMatch2Id
        if (dep2?.completed && m.dependsOnMatch2Id === dep2.id && !newTeam2Id) {
          if (m.bracketType === "losers" && dep2.bracketType === "winners") {
            // Loser from winners bracket goes to losers bracket
            newTeam2Id = getLoser(dep2);
          } else if (dep2.bracketType === "winners" && m.bracketType === "winners") {
            // Winner advances in winners bracket
            newTeam2Id = dep2.winnerId || null;
          } else if (dep2.bracketType === "losers" && m.bracketType === "losers") {
            // Winner from previous losers match typically goes to team2
            newTeam2Id = dep2.winnerId || null;
          }
        }
        
        // Only update if something changed
        if (newTeam1Id !== m.team1Id || newTeam2Id !== m.team2Id) {
          changed = true;
          return { ...m, team1Id: newTeam1Id, team2Id: newTeam2Id };
        }
        
        return m;
      }),
    };
  }
  
  return updated;
}
