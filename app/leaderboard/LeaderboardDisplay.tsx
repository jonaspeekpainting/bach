"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Stack,
  Paper,
  Table,
  Text,
  Badge,
  Loader,
  Alert,
  Group,
  Box,
  Card,
  Grid,
  Progress,
} from "@mantine/core";
import type { LeaderboardData, TeamPoints } from "@/app/api/leaderboard/route";
import type { Team } from "@/app/api/teams/route";
import { TEAMS as DEFAULT_TEAMS, TEAM_HEX } from "@/lib/constants";

interface TeamTotal {
  teamId: string;
  teamName: string;
  color: string;
  totalPoints: number;
  gamePoints: Record<string, number>;
}

export function LeaderboardDisplay() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [teams, setTeams] = useState<Team[]>([...DEFAULT_TEAMS]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
    fetchTeams();
    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchLeaderboard();
      fetchTeams();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const result = await response.json();
        setTeams(result.teams || DEFAULT_TEAMS);
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container py="xl">
        <Group justify="center">
          <Loader size="lg" />
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container py="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return null;
  }

  // Calculate totals for each team
  const teamTotals: TeamTotal[] = teams.map((team) => {
    let totalPoints = 0;
    const gamePoints: Record<string, number> = {};

    Object.entries(data.gamePoints || {}).forEach(([gameName, points]) => {
      const teamPoints = points[team.id as keyof TeamPoints] || 0;
      gamePoints[gameName] = teamPoints;
      totalPoints += teamPoints;
    });

    const defaults = DEFAULT_TEAMS.find((t) => t.id === team.id);
    return {
      teamId: team.id,
      teamName: team.name,
      color: defaults?.color ?? team.color,
      totalPoints,
      gamePoints,
    };
  });

  // Sort by total points (descending)
  teamTotals.sort((a, b) => b.totalPoints - a.totalPoints);

  const maxPoints = Math.max(...teamTotals.map((t) => t.totalPoints), 1);

  const games = Object.keys(data.gamePoints || {});

  return (
    <Container size="lg" p={0}>
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1} c="#2c1810">Team Leaderboard</Title>
          {data.lastUpdated && (
            <Text size="sm" c="#6b4423">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </Text>
          )}
        </Group>

        {/* Leaderboard Cards */}
        <Grid>
          {teamTotals.map((team, index) => {
            const rank = index + 1;
            const percentage = (team.totalPoints / maxPoints) * 100;

            return (
              <Grid.Col key={team.teamId} span={{ base: 12, sm: 6, md: 3 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    borderLeft: `4px solid ${TEAM_HEX[team.teamId as keyof typeof TEAM_HEX]}`,
                  }}
                >
                  <Stack gap="sm">
                    <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                      <Text
                        fw={700}
                        size="lg"
                        c="dark.9"
                        style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }}
                      >
                        {team.teamName}
                      </Text>
                    </Group>

                    <Box>
                      <Group justify="space-between" mb="xs">
                        <Text fw={600} size="lg" c="dark.9">
                          {team.totalPoints} pts
                        </Text>
                      </Group>
                      <Progress
                        value={percentage}
                        color={team.color}
                        size="lg"
                        radius="xl"
                        animated
                      />
                    </Box>
                  </Stack>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>

        {/* Detailed Table */}
        {games.length > 0 && (
          <Paper p="md" withBorder mb="md" >
            <Title order={3} mb="md" c="dark.9">
              Points by Game
            </Title>
            
            {/* Mobile Card View */}
            <Box hiddenFrom="sm">
              <Stack gap="md">
                {games.map((gameName) => (
                  <Paper key={gameName} p="sm" withBorder>
                    <Text fw={600} size="sm" mb="sm" c="dark.9">
                      {gameName}
                    </Text>
                    <Grid>
                      {teams.map((team) => {
                        const points =
                          data.gamePoints[gameName]?.[
                            team.id as keyof TeamPoints
                          ] || 0;
                        return (
                          <Grid.Col key={team.id} span={6}>
                            <Group gap="xs" wrap="nowrap">
                              <Badge
                                color={team.color}
                                variant={points > 0 ? "light" : "outline"}
                                size="sm"
                              >
                                {points}
                              </Badge>
                              <Text size="xs" c="#6b4423">
                                {team.name}
                              </Text>
                            </Group>
                          </Grid.Col>
                        );
                      })}
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Box>

            {/* Desktop Table View */}
            <Table.ScrollContainer minWidth={600} visibleFrom="sm">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th c="dark.9">Game</Table.Th>
                    {teams.map((team) => (
                      <Table.Th key={team.id} c="dark.9">
                        {team.name}
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {games.map((gameName) => (
                    <Table.Tr key={gameName}>
                      <Table.Td>
                        <Text fw={500} c="dark.9">
                          {gameName}
                        </Text>
                      </Table.Td>
                      {teams.map((team) => {
                        const points =
                          data.gamePoints[gameName]?.[
                            team.id as keyof TeamPoints
                          ] || 0;
                        return (
                          <Table.Td key={team.id}>
                            <Badge
                              color={team.color}
                              variant={points > 0 ? "light" : "outline"}
                            >
                              {points}
                            </Badge>
                          </Table.Td>
                        );
                      })}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        )}

        {games.length === 0 && (
          <Paper p="md" withBorder>
            <Text c="#6b4423" ta="center">
              No game points entered yet. Points will appear here once games are completed.
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
