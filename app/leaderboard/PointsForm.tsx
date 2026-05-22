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
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import type { TeamPoints } from "@/app/api/leaderboard/route";
import type { Team } from "@/app/api/teams/route";
import { GAMES, TEAMS as DEFAULT_TEAMS } from "@/lib/constants";

const EMPTY_POINTS: TeamPoints = { team1: 0, team2: 0, team3: 0, team4: 0 };

type PointsMode = "game" | "misc";

export function PointsForm() {
  const [isAdmin] = useLocalStorage<boolean>({
    key: "admin",
    defaultValue: false,
  });
  const [mode, setMode] = useState<PointsMode>("game");
  const [teams, setTeams] = useState<Team[]>([...DEFAULT_TEAMS]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [miscLabel, setMiscLabel] = useState("");
  const [existingMiscLabels, setExistingMiscLabels] = useState<string[]>([]);
  const [teamPoints, setTeamPoints] = useState<TeamPoints>({ ...EMPTY_POINTS });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTeams();
    fetchMiscLabels();
  }, []);

  useEffect(() => {
    if (mode === "game" && selectedGame) {
      fetchPoints("game", selectedGame);
    }
  }, [mode, selectedGame]);

  useEffect(() => {
    if (mode !== "misc") return;
    const trimmed = miscLabel.trim();
    if (!trimmed) {
      setTeamPoints({ ...EMPTY_POINTS });
      return;
    }
    if (existingMiscLabels.includes(trimmed)) {
      fetchPoints("misc", trimmed);
    } else {
      setTeamPoints({ ...EMPTY_POINTS });
    }
  }, [mode, miscLabel, existingMiscLabels]);

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

  const fetchMiscLabels = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (response.ok) {
        const data = await response.json();
        setExistingMiscLabels(Object.keys(data.miscPoints || {}));
      }
    } catch (err) {
      console.error("Error fetching misc labels:", err);
    }
  };

  const fetchPoints = async (pointsMode: PointsMode, label: string) => {
    try {
      const response = await fetch("/api/leaderboard");
      if (response.ok) {
        const data = await response.json();
        const bucket =
          pointsMode === "game" ? data.gamePoints : data.miscPoints;
        const existingPoints = bucket?.[label];
        setTeamPoints(existingPoints ? { ...existingPoints } : { ...EMPTY_POINTS });
      }
    } catch (err) {
      console.error("Error fetching points:", err);
    }
  };

  const resetForm = () => {
    setTeamPoints({ ...EMPTY_POINTS });
    setError(null);
    setSuccess(false);
  };

  const handleModeChange = (value: string) => {
    setMode(value as PointsMode);
    resetForm();
    setSelectedGame(null);
    setMiscLabel("");
  };

  const handleSubmit = async () => {
    const label =
      mode === "game" ? selectedGame : miscLabel.trim();

    if (!label) {
      setError(
        mode === "game" ? "Please select a game" : "Please enter a description"
      );
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const body =
        mode === "game"
          ? { gameName: label, teamPoints }
          : { miscLabel: label, teamPoints };

      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save points");
      }

      setSuccess(true);
      if (mode === "misc") {
        await fetchMiscLabels();
      }
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save points");
    } finally {
      setLoading(false);
    }
  };

  const activeLabel = mode === "game" ? selectedGame : miscLabel.trim();
  const showPointsEntry = mode === "game" ? Boolean(selectedGame) : Boolean(miscLabel.trim());

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
        <Title order={2} c="#2c1810">
          Enter Points
        </Title>
        <Text size="sm" c="#3d1f0f">
          Record game results or one-off misc points (bonuses, penalties, side bets, etc.).
        </Text>

        <SegmentedControl
          value={mode}
          onChange={handleModeChange}
          data={[
            { label: "Game points", value: "game" },
            { label: "Misc points", value: "misc" },
          ]}
          fullWidth
        />

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

        {mode === "game" ? (
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
        ) : (
          <Stack gap="sm">
            {existingMiscLabels.length > 0 && (
              <Select
                label="Edit existing misc entry"
                placeholder="Pick to edit, or type a new one below"
                data={existingMiscLabels}
                value={existingMiscLabels.includes(miscLabel) ? miscLabel : null}
                onChange={(value) => {
                  if (value) setMiscLabel(value);
                }}
                clearable
                searchable
                styles={{
                  option: { color: "#2c1810" },
                  dropdown: { color: "#2c1810" },
                }}
              />
            )}
            <TextInput
              label="Description"
              placeholder="e.g. Breakfast bonus, Late penalty, Side bet"
              value={miscLabel}
              onChange={(e) => setMiscLabel(e.currentTarget.value)}
              required
              styles={{
                input: { color: "#2c1810" },
              }}
            />
          </Stack>
        )}

        {showPointsEntry && (
          <>
            <Divider />
            <Paper p="md" withBorder>
              <Title order={4} mb="md" c="dark.9">
                Points for {activeLabel}
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
                      min={mode === "misc" ? undefined : 0}
                      step={1}
                      allowDecimal={false}
                      allowNegative={mode === "misc"}
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
              Save {mode === "game" ? "Game" : "Misc"} Points
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
}
