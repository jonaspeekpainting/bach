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
} from "@mantine/core";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryRanking, OverallRanking } from "@/lib/ranking-calculator";
import type { RankingSubmission } from "@/lib/edge-config";

interface RankingsData {
  submissions: RankingSubmission[];
  categoryRankings: {
    golf: CategoryRanking[];
    americanChallenge: CategoryRanking[];
    athleticism: CategoryRanking[];
    drinkingGame: CategoryRanking[];
    drugHandling: CategoryRanking[];
  };
  overallRankings: OverallRanking[];
}

export function RankingsDisplay() {
  const [data, setData] = useState<RankingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const response = await fetch("/api/rankings");
      if (!response.ok) {
        throw new Error("Failed to fetch rankings");
      }
      const result = await response.json();
      setData({
        submissions: result.submissions || [],
        categoryRankings: result.categoryRankings,
        overallRankings: result.overallRankings,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rankings");
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

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "gold";
    if (rank <= 3) return "blue";
    if (rank <= 7) return "gray";
    return "dark";
  };

  return (
    <Container size="lg" pt="xl" pb={0}>
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1} c="dimmed">Overall Rankings</Title>
          <Badge size="lg" variant="light">
            {data.submissions.length} {data.submissions.length === 1 ? "submission" : "submissions"}
          </Badge>
        </Group>
        <Paper p="md" withBorder>
          <div style={{ overflowX: "auto" }}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th c="dark.9">Rank</Table.Th>
                  <Table.Th c="dark.9">Attendee</Table.Th>
                  <Table.Th c="dark.9">Score</Table.Th>
                  <Table.Th visibleFrom="sm" c="dark.9">Category Breakdown</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.overallRankings.map((ranking) => (
                  <Table.Tr key={ranking.attendee}>
                    <Table.Td>
                      <Badge color={getRankBadgeColor(ranking.rank)} size="lg">
                        {ranking.rank}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={ranking.rank === 1 ? 700 : 500} c="dark.9">
                        {ranking.attendee}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text c="dark.9">{ranking.averageScore.toFixed(2)}</Text>
                    </Table.Td>
                    <Table.Td visibleFrom="sm">
                      <Group gap="xs">
                        {CATEGORIES.map((category) => (
                          <Badge
                            key={category.key}
                            variant="light"
                            size="sm"
                          >
                            {category.label.substring(0, 3)}: {ranking.categoryScores[category.key]}
                          </Badge>
                        ))}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Paper>

        <Title order={2} c="dimmed">Category Rankings</Title>
        {CATEGORIES.map((category) => {
          const categoryRankings =
            data.categoryRankings[
              category.key as keyof typeof data.categoryRankings
            ];
          return (
            <Paper key={category.key} p="md" withBorder>
              <Title order={3} mb="md" c="dark.9">
                {category.label}
              </Title>
              <div style={{ overflowX: "auto" }}>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="dark.9">Rank</Table.Th>
                      <Table.Th c="dark.9">Attendee</Table.Th>
                      <Table.Th c="dark.9">Avg Rank</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {categoryRankings.map((ranking) => (
                      <Table.Tr key={ranking.attendee}>
                        <Table.Td>
                          <Badge
                            color={getRankBadgeColor(ranking.rank)}
                            size="lg"
                          >
                            {ranking.rank}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text fw={ranking.rank === 1 ? 700 : 500} c="dark.9">
                            {ranking.attendee}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text c="dark.9">{ranking.averageRank.toFixed(2)}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Paper>
          );
        })}
      </Stack>
    </Container>
  );
}
