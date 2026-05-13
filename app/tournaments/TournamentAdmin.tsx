"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Group,
  Button,
  Select,
  NumberInput,
  Badge,
  Box,
  Loader,
  Alert,
  Divider,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Tournament, Match, Bracket } from "@/lib/bracket-types";
import { createBracket, advanceWinner, advanceLoser, advanceLosersWinner, getLoser, repairBracket } from "@/lib/bracket-types";
import { TEAMS, GAMES } from "@/lib/constants";
import { BracketView } from "./BracketView";

export function TournamentAdmin() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [newGameName, setNewGameName] = useState<string | null>(null);
  const [newBracketType, setNewBracketType] = useState<string | null>(null);

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

  const handleCreateTournament = async () => {
    if (!newGameName || !newBracketType) {
      setError("Please select a game and bracket type");
      return;
    }

    setSaving(true);
    try {
      const bracket = createBracket(
        newGameName,
        newBracketType as Bracket["type"]
      );

      const tournament: Tournament = {
        id: `${newGameName.toLowerCase().replace(/\s+/g, "-")}-tournament`,
        name: newGameName,
        bracket,
        status: "not-started",
      };

      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournament }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tournament");
      }

      await fetchTournaments();
      setNewGameName(null);
      setNewBracketType(null);
      setError(null);
    } catch (err) {
      console.error("Error creating tournament:", err);
      setError(err instanceof Error ? err.message : "Failed to create tournament");
    } finally {
      setSaving(false);
    }
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch({ ...match });
    openEditModal();
  };

  const handleSaveMatch = async () => {
    if (!editingMatch || !selectedTournament) return;

    setSaving(true);
    try {
      let updatedBracket: Bracket = {
        ...selectedTournament.bracket,
        matches: selectedTournament.bracket.matches.map((m) =>
          m.id === editingMatch.id ? editingMatch : m
        ),
        updatedAt: new Date().toISOString(),
      };

      // Auto-advance winner if match is completed
      if (editingMatch.completed && editingMatch.winnerId) {
        // Advance winner to next match
        updatedBracket = advanceWinner(updatedBracket, editingMatch.id, editingMatch.winnerId);
        
        // For double elimination, also advance loser to losers bracket
        if (selectedTournament.bracket.type === "double-elimination") {
          const loserId = getLoser(editingMatch);
          if (loserId) {
            updatedBracket = advanceLoser(updatedBracket, editingMatch.id, loserId);
          }
          
          // If this is a losers bracket match, also advance winner to next losers match
          const match = updatedBracket.matches.find((m) => m.id === editingMatch.id);
          if (match?.bracketType === "losers") {
            updatedBracket = advanceLosersWinner(updatedBracket, editingMatch.id, editingMatch.winnerId);
          }
        }
        
        // Repair bracket: populate all teams from completed dependencies
        // This handles cases where advancement might have missed some matches
        // Only repair if there are matches that should have teams but don't
        const needsRepair = updatedBracket.matches.some((m) => {
          if (m.completed || (m.team1Id && m.team2Id)) return false;
          const dep1 = m.dependsOnMatch1Id ? updatedBracket.matches.find((d) => d.id === m.dependsOnMatch1Id) : null;
          const dep2 = m.dependsOnMatch2Id ? updatedBracket.matches.find((d) => d.id === m.dependsOnMatch2Id) : null;
          return (dep1?.completed && !m.team1Id) || (dep2?.completed && !m.team2Id);
        });
        
        if (needsRepair) {
          updatedBracket = repairBracket(updatedBracket);
        }
      }

      const updatedTournament: Tournament = {
        ...selectedTournament,
        bracket: updatedBracket,
        status: updatedBracket.matches.some((m) => m.completed)
          ? "in-progress"
          : selectedTournament.status,
      };

      // Check if tournament is completed (grand final has winner)
      const grandFinal = updatedBracket.matches.find((m) => m.bracketType === "grand-final");
      if (grandFinal?.completed && grandFinal.winnerId) {
        updatedTournament.status = "completed";
      }

      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournament: updatedTournament }),
      });

      if (!response.ok) {
        throw new Error("Failed to save match");
      }

      await fetchTournaments();
      setSelectedTournament(updatedTournament);
      closeEditModal();
      setEditingMatch(null);
      setError(null);
    } catch (err) {
      console.error("Error saving match:", err);
      setError(err instanceof Error ? err.message : "Failed to save match");
    } finally {
      setSaving(false);
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

  return (
    <Container size="lg" pt="xl" pb={0}>
      <Stack gap="lg">
        {error && (
          <Alert color="red" title="Error" onClose={() => setError(null)} withCloseButton>
            {error}
          </Alert>
        )}

        {/* Create New Tournament */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md" c="dark.9">
            Create Tournament
          </Title>
          <Stack gap="md">
            <Select
              label="Game"
              placeholder="Select a game"
              data={GAMES.map((game) => ({ value: game, label: game }))}
              value={newGameName}
              onChange={setNewGameName}
              searchable
              labelProps={{ c: "dark.9" }}
              styles={{
                option: { color: "var(--mantine-color-dark-9)" },
                dropdown: { color: "var(--mantine-color-dark-9)" },
              }}
            />
            <Select
              label="Bracket Type"
              placeholder="Select bracket type"
              data={[
                { value: "single-elimination", label: "Single Elimination" },
                { value: "double-elimination", label: "Double Elimination" },
                { value: "round-robin", label: "Round Robin" },
                { value: "round-robin-championship", label: "Round Robin + Championship" },
              ]}
              value={newBracketType}
              onChange={setNewBracketType}
              labelProps={{ c: "dark.9" }}
              styles={{
                option: { color: "var(--mantine-color-dark-9)" },
                dropdown: { color: "var(--mantine-color-dark-9)" },
              }}
            />
            <Button
              onClick={handleCreateTournament}
              loading={saving}
              disabled={!newGameName || !newBracketType}
              fullWidth
            >
              Create Tournament
            </Button>
          </Stack>
        </Paper>

        <Divider />

        {/* Select Tournament to Edit */}
        {tournaments.length > 0 && (
          <Paper p="md" withBorder>
            <Title order={3} mb="md" c="dark.9">
              Edit Tournament
            </Title>
            <Select
              label="Select Tournament"
              placeholder="Choose a tournament to edit"
              data={tournaments.map((t) => ({
                value: t.id,
                label: t.name,
              }))}
              value={selectedTournament?.id || null}
              onChange={(value) => {
                const tournament = tournaments.find((t) => t.id === value);
                setSelectedTournament(tournament || null);
              }}
              labelProps={{ c: "dark.9" }}
              styles={{
                option: { color: "var(--mantine-color-dark-9)" },
                dropdown: { color: "var(--mantine-color-dark-9)" },
              }}
            />
          </Paper>
        )}

        {/* Edit Selected Tournament */}
        {selectedTournament && (
          <Paper p="md" withBorder>
            <Group justify="space-between" mb="md" wrap="wrap">
              <Title order={3} c="dark.9">
                {selectedTournament.name}
              </Title>
              <Badge
                color={
                  selectedTournament.status === "completed"
                    ? "green"
                    : selectedTournament.status === "in-progress"
                    ? "blue"
                    : "gray"
                }
              >
                {selectedTournament.status.replace("-", " ")}
              </Badge>
            </Group>

            {selectedTournament.bracket.type === "double-elimination" ? (
              <BracketView tournament={selectedTournament} onMatchClick={handleEditMatch} />
            ) : (
              <Stack gap="sm">
                {selectedTournament.bracket.matches.map((match) => (
                <Box
                  key={match.id}
                  p="sm"
                  style={{
                    border: "1px solid var(--mantine-color-gray-3)",
                    borderRadius: "var(--mantine-radius-sm)",
                    backgroundColor: match.completed
                      ? "var(--mantine-color-gray-0)"
                      : "transparent",
                    cursor: "pointer",
                    minHeight: "48px", // Mobile-friendly touch target
                  }}
                  onClick={() => handleEditMatch(match)}
                >
                  {match.displayNumber && (
                    <Badge size="sm" variant="filled" color="blue" mb="xs">
                      Match {match.displayNumber}
                    </Badge>
                  )}
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
                  <Text size="xs" c="dark.8" mt="xs">
                    Tap to edit
                  </Text>
                </Box>
                ))}
              </Stack>
            )}
          </Paper>
        )}

        {/* Edit Match Modal */}
        <Modal
          opened={editModalOpened}
          onClose={closeEditModal}
          title="Set Winner"
          size="auto"
          centered
        >
          {editingMatch && (
            <Stack gap="md">
              <Text size="sm" c="dark.9" fw={500} ta="center">
                {getTeamName(editingMatch.team1Id)} vs {getTeamName(editingMatch.team2Id)}
              </Text>
              
              {editingMatch.team1Id && editingMatch.team2Id ? (
                <>
                  <Button
                    onClick={() => {
                      setEditingMatch({
                        ...editingMatch,
                        winnerId: editingMatch.team1Id,
                        team1Score: 1,
                        team2Score: 0,
                        completed: true,
                      });
                    }}
                    color={getTeamColor(editingMatch.team1Id)}
                    variant={editingMatch.winnerId === editingMatch.team1Id ? "filled" : "light"}
                    size="lg"
                    fullWidth
                    style={{ minHeight: "60px", fontSize: "16px" }}
                  >
                    {getTeamName(editingMatch.team1Id)} Wins
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setEditingMatch({
                        ...editingMatch,
                        winnerId: editingMatch.team2Id,
                        team1Score: 0,
                        team2Score: 1,
                        completed: true,
                      });
                    }}
                    color={getTeamColor(editingMatch.team2Id)}
                    variant={editingMatch.winnerId === editingMatch.team2Id ? "filled" : "light"}
                    size="lg"
                    fullWidth
                    style={{ minHeight: "60px", fontSize: "16px" }}
                  >
                    {getTeamName(editingMatch.team2Id)} Wins
                  </Button>
                </>
              ) : (
                <Text size="sm" c="dark.7" ta="center" py="md">
                  Teams not yet determined. Waiting on previous matches.
                </Text>
              )}
              
              <Group mt="md">
                <Button
                  variant="outline"
                  onClick={closeEditModal}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveMatch} 
                  loading={saving} 
                  disabled={!editingMatch.winnerId}
                  style={{ flex: 1 }}
                >
                  Save
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}
