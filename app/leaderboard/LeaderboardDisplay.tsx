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
  miscPoints: Record<string, number>;
  miscTotal: number;
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

  const sumBucket = (
    bucket: Record<string, TeamPoints> | undefined,
    teamId: string,
    into: Record<string, number>
  ) => {
    let subtotal = 0;
    Object.entries(bucket || {}).forEach(([label, points]) => {
      const pts = points[teamId as keyof TeamPoints] || 0;
      into[label] = pts;
      subtotal += pts;
    });
    return subtotal;
  };

  // Calculate totals for each team
  const teamTotals: TeamTotal[] = teams.map((team) => {
    const gamePoints: Record<string, number> = {};
    const miscPoints: Record<string, number> = {};
    const gameTotal = sumBucket(data.gamePoints, team.id, gamePoints);
    const miscTotal = sumBucket(data.miscPoints, team.id, miscPoints);

    const defaults = DEFAULT_TEAMS.find((t) => t.id === team.id);
    return {
      teamId: team.id,
      teamName: team.name,
      color: defaults?.color ?? team.color,
      totalPoints: gameTotal + miscTotal,
      gamePoints,
      miscPoints,
      miscTotal,
    };
  });

  // Sort by total points (descending)
  teamTotals.sort((a, b) => b.totalPoints - a.totalPoints);

  const maxPoints = Math.max(...teamTotals.map((t) => t.totalPoints), 1);

  const games = Object.keys(data.gamePoints || {});
  const miscEntries = Object.keys(data.miscPoints || {});

  const renderPointsTable = (
    title: string,
    labels: string[],
    bucket: Record<string, TeamPoints> | undefined
  ) => {
    if (labels.length === 0) return null;

    return (
      <Paper p="md" withBorder mb="md">
        <Title order={3} mb="md" c="dark.9">
          {title}
        </Title>

        <Box hiddenFrom="sm">
          <Stack gap="md">
            {labels.map((label) => (
              <Paper key={label} p="sm" withBorder>
                <Text fw={600} size="sm" mb="sm" c="dark.9">
                  {label}
                </Text>
                <Grid>
                  {teams.map((team) => {
                    const points =
                      bucket?.[label]?.[team.id as keyof TeamPoints] || 0;
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

        <Table.ScrollContainer minWidth={600} visibleFrom="sm">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th c="dark.9">{title === "Misc Points" ? "Entry" : "Game"}</Table.Th>
                {teams.map((team) => (
                  <Table.Th key={team.id} c="dark.9">
                    {team.name}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {labels.map((label) => (
                <Table.Tr key={label}>
                  <Table.Td>
                    <Text fw={500} c="dark.9">
                      {label}
                    </Text>
                  </Table.Td>
                  {teams.map((team) => {
                    const points =
                      bucket?.[label]?.[team.id as keyof TeamPoints] || 0;
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
    );
  };

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
                      {team.miscTotal > 0 && (
                        <Text size="xs" c="#6b4423" mb="xs">
                          incl. {team.miscTotal} misc
                        </Text>
                      )}
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

        {renderPointsTable("Points by Game", games, data.gamePoints)}
        {renderPointsTable("Misc Points", miscEntries, data.miscPoints)}

        {games.length === 0 && miscEntries.length === 0 && (
          <Paper p="md" withBorder>
            <Text c="#6b4423" ta="center">
              No points entered yet. Game and misc points will appear here once recorded.
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
