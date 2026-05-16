"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Stack,
  Paper,
  Text,
  NumberInput,
  Button,
  Group,
  Alert,
  Select,
  Divider,
  Badge,
  Grid,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import type { TeamPoints } from "@/app/api/leaderboard/route";
import type { Team } from "@/app/api/teams/route";
import { GAMES, TEAMS as DEFAULT_TEAMS } from "@/lib/constants";

export function PointsForm() {
  const [isAdmin] = useLocalStorage<boolean>({
    key: "admin",
    defaultValue: false,
  });
  const [teams, setTeams] = useState<Team[]>([...DEFAULT_TEAMS]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [teamPoints, setTeamPoints] = useState<TeamPoints>({
    team1: 0,
    team2: 0,
    team3: 0,
    team4: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTeams();
    // Load existing points for selected game
    if (selectedGame) {
      fetchGamePoints(selectedGame);
    }
  }, [selectedGame]);

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

  const fetchGamePoints = async (gameName: string) => {
    try {
      const response = await fetch("/api/leaderboard");
      if (response.ok) {
        const data = await response.json();
        const existingPoints = data.gamePoints?.[gameName];
        if (existingPoints) {
          setTeamPoints(existingPoints);
        } else {
          setTeamPoints({ team1: 0, team2: 0, team3: 0, team4: 0 });
        }
      }
    } catch (err) {
      console.error("Error fetching game points:", err);
    }
  };

  const handleSubmit = async () => {
    if (!selectedGame) {
      setError("Please select a game");
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameName: selectedGame,
          teamPoints,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save points");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Optionally reload the page to show updated leaderboard
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save points");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <Container size="sm" p={0}>
        <Alert color="orange" title="Admin Access Required">
          <Text size="sm" c="#6b4423">
            Fuck off.
          </Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" p={0}>
      <Stack gap="lg">
        <Title order={2} c="#2c1810">Enter Game Points</Title>
        <Text size="sm" c="#3d1f0f">
          Select a game and enter the points earned by each team.
        </Text>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" title="Success">
            Points saved successfully!
          </Alert>
        )}

        <Select
          label="Game"
          placeholder="Select a game"
          data={GAMES}
          value={selectedGame}
          onChange={setSelectedGame}
          required
          searchable
          styles={{
            option: { color: "#2c1810" },
            dropdown: { color: "#2c1810" },
          }}
        />

        {selectedGame && (
          <>
            <Divider />
            <Paper p="md" withBorder>
              <Title order={4} mb="md" c="dark.9">
                Points for {selectedGame}
              </Title>
              <Grid>
                {teams.map((team) => (
                  <Grid.Col key={team.id} span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label={
                        <Group gap="xs">
                          <Badge color={team.color} variant="light">
                            {team.name}
                          </Badge>
                        </Group>
                      }
                      value={teamPoints[team.id as keyof TeamPoints]}
                      onChange={(value) =>
                        setTeamPoints({
                          ...teamPoints,
                          [team.id]: typeof value === "number" ? value : 0,
                        })
                      }
                      min={0}
                      step={1}
                      allowDecimal={false}
                      placeholder="0"
                      styles={{
                        input: {
                          color: "#2c1810",
                        },
                      }}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Paper>

            <Button
              size="lg"
              onClick={handleSubmit}
              loading={loading}
              fullWidth
            >
              Save Points
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
}
