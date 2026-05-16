"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Stack,
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Alert,
  Grid,
  Badge,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import type { Team } from "@/app/api/teams/route";
import { TEAMS as DEFAULT_TEAMS } from "@/lib/constants";

export function TeamNamesForm() {
  const [isAdmin] = useLocalStorage<boolean>({
    key: "admin",
    defaultValue: false,
  });
  const [teams, setTeams] = useState<Team[]>([...DEFAULT_TEAMS]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTeams();
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

  const handleTeamNameChange = (teamId: string, newName: string) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, name: newName } : team))
    );
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teams }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save team names");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save team names");
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
        <Title order={2} c="#2c1810">Set Team Names</Title>
        <Text size="sm" c="#3d1f0f">
          Enter custom names for each team after the draft is complete.
        </Text>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" title="Success">
            Team names saved successfully!
          </Alert>
        )}

        <Paper p="md" withBorder>
          <Grid>
            {teams.map((team) => (
              <Grid.Col key={team.id} span={{ base: 12, sm: 6 }}>
                <TextInput
                  label={
                    <Group gap="xs">
                      <Badge color={team.color} variant="light">
                        {team.id}
                      </Badge>
                    </Group>
                  }
                  value={team.name}
                  onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                  placeholder={`Enter name for ${team.id}`}
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
          Save Team Names
        </Button>
      </Stack>
    </Container>
  );
}
