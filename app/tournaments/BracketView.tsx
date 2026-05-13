"use client";

import { Box, Paper, Text, Group, Badge, Stack } from "@mantine/core";
import type { Tournament, Match } from "@/lib/bracket-types";
import { getLoser } from "@/lib/bracket-types";
import { TEAMS } from "@/lib/constants";

interface BracketViewProps {
  tournament: Tournament;
  onMatchClick?: (match: Match) => void;
}

export function BracketView({ tournament, onMatchClick }: BracketViewProps) {
  const getTeamName = (teamId: string | null) => {
    if (!teamId) return "TBD";
    // Handle A/B team splits (e.g., "team1A" -> "Team 1A")
    if (teamId.endsWith("A") || teamId.endsWith("B")) {
      const baseId = teamId.slice(0, -1);
      const suffix = teamId.slice(-1);
      const team = TEAMS.find((t) => t.id === baseId);
      if (team) {
        return `${team.name}${suffix}`;
      }
    }
    return TEAMS.find((t) => t.id === teamId)?.name || teamId;
  };

  const getTeamColor = (teamId: string | null) => {
    if (!teamId) return "gray";
    // Handle A/B team splits (e.g., "team1A" -> use team1's color)
    if (teamId.endsWith("A") || teamId.endsWith("B")) {
      const baseId = teamId.slice(0, -1);
      const team = TEAMS.find((t) => t.id === baseId);
      if (team) {
        return team.color;
      }
    }
    return TEAMS.find((t) => t.id === teamId)?.color || "gray";
  };

  const getNextMatches = (match: Match): Match[] => {
    if (!match.nextMatchId) return [];
    const nextMatch = tournament.bracket.matches.find((m) => m.id === match.nextMatchId);
    return nextMatch ? [nextMatch] : [];
  };

  const getLoserNextMatch = (match: Match): Match | null => {
    if (!match.loserNextMatchId) return null;
    const nextMatch = tournament.bracket.matches.find((m) => m.id === match.loserNextMatchId);
    return nextMatch || null;
  };

  const getMatchDisplayNumber = (match: Match): string => {
    return match.displayNumber || `Match ${match.matchNumber}`;
  };

  const getDependentMatches = (match: Match): Match[] => {
    const deps: Match[] = [];
    if (match.dependsOnMatch1Id) {
      const dep1 = tournament.bracket.matches.find((m) => m.id === match.dependsOnMatch1Id);
      if (dep1) deps.push(dep1);
    }
    if (match.dependsOnMatch2Id) {
      const dep2 = tournament.bracket.matches.find((m) => m.id === match.dependsOnMatch2Id);
      if (dep2) deps.push(dep2);
    }
    return deps;
  };

  const isMatchReady = (match: Match): boolean => {
    // If both teams are already set, match is ready
    if (match.team1Id && match.team2Id) return true;
    
    // If no dependencies, match is only ready if both teams are set
    if (!match.dependsOnMatch1Id && !match.dependsOnMatch2Id) {
      return !!(match.team1Id && match.team2Id);
    }
    
    // Check dependencies
    const deps = getDependentMatches(match);
    if (deps.length === 0) return false;
    
    // All dependencies must be completed
    if (!deps.every((d) => d.completed)) return false;
    
    // After dependencies are complete, teams should have been populated by advancement logic
    // But if they haven't been populated yet, we should still show the match as ready
    // if we can determine what the teams should be
    
    if (match.bracketType === "losers") {
      // For losers bracket matches:
      // - dependsOnMatch1Id typically provides the loser (team1)
      // - dependsOnMatch2Id typically provides the winner from previous losers match (team2)
      
      // Check if we can determine teams from completed dependencies
      let canDetermineTeam1 = false;
      let canDetermineTeam2 = false;
      
      for (const dep of deps) {
        if (dep.completed) {
          if (match.dependsOnMatch1Id === dep.id) {
            // This should provide team1
            if (dep.bracketType === "winners") {
              // Loser from winners bracket
              canDetermineTeam1 = !!getLoser(dep);
            } else if (dep.bracketType === "losers") {
              // Could be loser or winner depending on bracket structure
              canDetermineTeam1 = true; // We can determine it from the match
            }
          }
          if (match.dependsOnMatch2Id === dep.id) {
            // This should provide team2 (winner from previous losers match)
            if (dep.bracketType === "losers" && dep.winnerId) {
              canDetermineTeam2 = true;
            } else if (dep.bracketType === "winners") {
              // Could be loser from winners bracket
              canDetermineTeam2 = !!getLoser(dep);
            }
          }
        }
      }
      
      // Match is ready if both teams are set OR if we can determine both from dependencies
      // But also check if teams are actually populated (advancement might have happened)
      return (!!match.team1Id && !!match.team2Id) || (canDetermineTeam1 && canDetermineTeam2);
    }
    
    // For winners bracket, if dependencies are complete, teams should be auto-advanced
    // If they're not set, there might be an advancement issue
    // But mark as ready if teams exist (they should have been advanced)
    return !!match.team1Id && !!match.team2Id;
  };

  const canPlayNext = (match: Match): boolean => {
    return isMatchReady(match) && !match.completed && !!match.team1Id && !!match.team2Id;
  };

  // Group matches by bracket type and round
  const winnersMatches = tournament.bracket.matches
    .filter((m) => m.bracketType === "winners")
    .sort((a, b) => a.round - b.round || a.matchNumber - b.matchNumber);

  const losersMatches = tournament.bracket.matches
    .filter((m) => m.bracketType === "losers")
    .sort((a, b) => a.round - b.round || a.matchNumber - b.matchNumber);

  const grandFinal = tournament.bracket.matches.find((m) => m.bracketType === "grand-final");

  const renderMatch = (match: Match, showNext = false) => {
    const nextMatches = getNextMatches(match);
    const isReady = isMatchReady(match);
    const canPlay = canPlayNext(match);

    return (
      <Box key={match.id} mb="md">
        <Paper
          p="sm"
          withBorder
          onClick={() => onMatchClick?.(match)}
          style={{
            border: canPlay
              ? "2px solid var(--mantine-color-blue-6)"
              : match.completed
              ? "1px solid var(--mantine-color-gray-3)"
              : "1px solid var(--mantine-color-gray-3)",
            backgroundColor: match.completed
              ? "var(--mantine-color-gray-0)"
              : canPlay
              ? "var(--mantine-color-blue-0)"
              : "transparent",
            cursor: onMatchClick ? "pointer" : "default",
            minHeight: onMatchClick ? "48px" : "auto",
          }}
        >
          <Group gap="xs" mb="xs" wrap="nowrap" justify="space-between">
            <Group gap="xs" wrap="nowrap">
              {match.displayNumber && (
                <Badge size="lg" variant="filled" color="blue" style={{ minWidth: "50px", textAlign: "center", fontSize: "14px", fontWeight: 600 }}>
                  Match {match.displayNumber}
                </Badge>
              )}
              {match.bracketType && (
                <Badge
                  size="xs"
                  color={
                    match.bracketType === "winners"
                      ? "green"
                      : match.bracketType === "losers"
                      ? "orange"
                      : "purple"
                  }
                >
                  {match.bracketType === "winners"
                    ? "Winners"
                    : match.bracketType === "losers"
                    ? "Losers"
                    : "Grand Final"}
                </Badge>
              )}
            </Group>
            {canPlay && (
              <Badge size="xs" color="blue" variant="light">
                Ready to play
              </Badge>
            )}
          </Group>
          {!isReady && !match.completed && (() => {
            const blockingMatches: Match[] = [];
            if (match.dependsOnMatch1Id) {
              const dep1 = tournament.bracket.matches.find((m) => m.id === match.dependsOnMatch1Id);
              if (dep1 && !dep1.completed) {
                blockingMatches.push(dep1);
              }
            }
            if (match.dependsOnMatch2Id) {
              const dep2 = tournament.bracket.matches.find((m) => m.id === match.dependsOnMatch2Id);
              if (dep2 && !dep2.completed) {
                blockingMatches.push(dep2);
              }
            }
            
            if (blockingMatches.length > 0) {
              return (
                <Text size="xs" c="dark.7" mb="xs" style={{ fontStyle: "italic" }}>
                  Waiting on: {blockingMatches.map((m) => getMatchDisplayNumber(m)).join(", ")}
                </Text>
              );
            }
            return (
              <Text size="xs" c="dark.7" mb="xs" style={{ fontStyle: "italic" }}>
                Waiting on previous matches...
              </Text>
            );
          })()}

          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs" style={{ flex: 1 }} wrap="nowrap">
              <Badge
                color={getTeamColor(match.team1Id)}
                variant={match.winnerId === match.team1Id ? "filled" : "light"}
                size="sm"
              >
                {getTeamName(match.team1Id)}
              </Badge>
              {match.team1Score !== undefined && (
                <Text size="sm" fw={600} c="dark.9">
                  {match.team1Score}
                </Text>
              )}
            </Group>
            <Text size="xs" c="dark.8" px="xs">
              vs
            </Text>
            <Group gap="xs" style={{ flex: 1 }} justify="flex-end" wrap="nowrap">
              {match.team2Score !== undefined && (
                <Text size="sm" fw={600} c="dark.9">
                  {match.team2Score}
                </Text>
              )}
              <Badge
                color={getTeamColor(match.team2Id)}
                variant={match.winnerId === match.team2Id ? "filled" : "light"}
                size="sm"
              >
                {getTeamName(match.team2Id)}
              </Badge>
            </Group>
          </Group>

          {showNext && (
            <Box mt="sm" pl="md" style={{ borderLeft: "2px solid var(--mantine-color-gray-4)" }}>
              {nextMatches.length > 0 && (
                <>
                  <Text size="xs" c="dark.9" mb="xs" fw={600}>
                    Winner advances to:
                  </Text>
                  {nextMatches.map((next) => (
                    <Text key={next.id} size="xs" c="dark.8" mb="xs">
                      Match {getMatchDisplayNumber(next)} - {getTeamName(next.team1Id)} vs {getTeamName(next.team2Id)}
                    </Text>
                  ))}
                </>
              )}
              {match.loserNextMatchId && match.bracketType === "winners" && (
                <>
                  <Text size="xs" c="dark.9" mb="xs" fw={600} mt="xs">
                    Loser advances to:
                  </Text>
                  {(() => {
                    const loserNext = getLoserNextMatch(match);
                    if (loserNext) {
                      return (
                        <Text size="xs" c="dark.8">
                          Match {getMatchDisplayNumber(loserNext)} - {getTeamName(loserNext.team1Id)} vs {getTeamName(loserNext.team2Id)}
                        </Text>
                      );
                    }
                    return null;
                  })()}
                </>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <Stack gap="lg">
      {/* Winners Bracket */}
      {winnersMatches.length > 0 && (
        <Box>
          <Text fw={600} size="lg" c="dark.9" mb="md">
          Winners Bracket
          </Text>
          <Stack gap="sm">
            {winnersMatches.map((match) => renderMatch(match, true))}
          </Stack>
        </Box>
      )}

      {/* Losers Bracket */}
      {losersMatches.length > 0 && (
        <Box>
          <Text fw={600} size="lg" c="dark.9" mb="md">
            Losers Bracket
          </Text>
          <Stack gap="sm">
            {losersMatches.map((match) => renderMatch(match, true))}
          </Stack>
        </Box>
      )}

      {/* Grand Final */}
      {grandFinal && (
        <Box>
          <Text fw={600} size="lg" c="dark.9" mb="md">
            Grand Final
          </Text>
          {renderMatch(grandFinal, false)}
        </Box>
      )}
    </Stack>
  );
}
