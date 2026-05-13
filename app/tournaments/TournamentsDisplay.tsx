"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Badge,
  Box,
  Loader,
  Alert,
} from "@mantine/core";
import type { Tournament, Match } from "@/lib/bracket-types";
import { TEAMS } from "@/lib/constants";
import { BracketView } from "./BracketView";

export function TournamentsDisplay() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tournaments");
      if (!response.ok) {
        throw new Error("Failed to fetch tournaments");
      }
      const data = await response.json();
      setTournaments(data.tournaments || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      setError(err instanceof Error ? err.message : "Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Container size="lg" pt="xl" pb={0}>
        <Group justify="center" py="xl">
          <Loader size="lg" />
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" pt="xl" pb={0}>
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  if (tournaments.length === 0) {
    return (
      <Container size="lg" pt="xl" pb={0}>
        <Text c="dark.9" ta="center" py="xl">
          No tournaments created yet. Use the Admin tab to create brackets.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="lg" pt="xl" pb={0}>
      <Stack gap="lg">
        {tournaments.map((tournament) => (
          <Paper key={tournament.id} p="md" withBorder>
            <Group justify="space-between" mb="md" wrap="wrap">
              <Title order={3} c="dark.9">
                {tournament.name}
              </Title>
              <Badge color={tournament.status === "completed" ? "green" : tournament.status === "in-progress" ? "blue" : "gray"}>
                {tournament.status.replace("-", " ")}
              </Badge>
            </Group>

            <Text size="sm" c="dark.9" mb="md">
              {tournament.bracket.type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Text>

            {tournament.bracket.type === "double-elimination" ? (
              <BracketView tournament={tournament} />
            ) : (
              <Stack gap="sm">
                {tournament.bracket.matches.map((match) => (
                <Box
                  key={match.id}
                  p="sm"
                  style={{
                    border: "1px solid var(--mantine-color-gray-3)",
                    borderRadius: "var(--mantine-radius-sm)",
                    backgroundColor: match.completed
                      ? "var(--mantine-color-gray-0)"
                      : "transparent",
                  }}
                >
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
                  {match.round > 1 && (
                    <Text size="xs" c="dark.8" mt="xs">
                      Round {match.round}
                    </Text>
                  )}
                </Box>
                ))}
              </Stack>
            )}
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
