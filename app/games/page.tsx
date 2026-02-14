"use client";

import { AppShell, Title, Container, Paper, Text, Stack, Table, Divider, Badge, Box, Group, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation } from "@/components/Navigation";
import {
  IconGolf,
  IconBeer,
  IconBallTennis,
  IconBallBasketball,
  IconRun,
  IconGlassFull,
  IconEyeOff,
  IconTarget,
  IconSword,
  IconWalk,
  IconUsers,
  IconTie,
  IconAlertTriangle,
  IconCoin,
  IconShoe,
  IconBottle,
  IconClock,
} from "@tabler/icons-react";

interface Game {
  name: string;
  chippies: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; stroke?: number }>;
  color?: string;
}

const games: Game[] = [
  {
    name: "Chippies",
    chippies: "12-8-4-0",
    description: "Golf - Scramble - final score for ranking. Birdies are +1, Eagles are +3. Closest to the pin and longest drive are each +3. Teams with 3 rotate someone who gets two shots on every hole.",
    icon: IconGolf,
    color: "green",
  },
  {
    name: "American Challenge",
    chippies: "12-8-4-0",
    description: "First stage - 8 beers per person. Second stage - ketamine per person. Third stage - 2 shots (in measured shot glasses) per person. Fourth stage - 1 medium pizza per person. Fifth stage - 100 piece jig saw puzzle (on the ground all in the same room). Finish order determines chippies.\n\nFor each stage, the numbers can be distributed between team members however the team decides. Any team member throwing up is a 2 minute delay for the entire team. Each subsequent throw up is still a 2 minute delay but will also be -1 chippy. All things need to be consumed in each stage before moving to the next. Any cheating that is caught by another team is a 3 minute delay for the entire team.",
    icon: IconBeer,
    color: "red",
  },
  {
    name: "Pickleball",
    chippies: "12-8-4-0",
    description: "Round Robin - games to 7 - side-out - no win by two. Rally for serve. Can swap out team members from game to game but not mid-game.",
    icon: IconBallTennis,
    color: "blue",
  },
  {
    name: "BP",
    chippies: "12-8-4-0",
    description: "8 Team Double elimination - each team will have A team and B team. For the teams of three - if they have two simultaneous games, they will get the advantage of 1v2 in one of the games - they can also switch up teams. For teams of 4, the two teams cannot be mixed up after deciding pairings.",
    icon: IconBallBasketball,
    color: "orange",
  },
  {
    name: "Relay",
    chippies: "12-8-4-0",
    description: "Round robin for seeding and then single elimination bracket. 1st vs 4th and 2nd vs 3rd seeds to start the elimination bracket.",
    icon: IconRun,
    color: "cyan",
  },
  {
    name: "Trout",
    chippies: "6-4-2-0",
    description: "Elimination - two members from the same team are able to get chippies.",
    icon: IconGlassFull,
    color: "grape",
  },
  {
    name: "Cheers to the Governor",
    chippies: "6-4-2-0",
    description: "Elimination - two members from the same team are able to get chippies.",
    icon: IconGlassFull,
    color: "yellow",
  },
  {
    name: "Blindfolded Obstacle Course",
    chippies: "6-4-2-0",
    description: "Two team members from each team - one directing, one doing the course. Each team is timed.",
    icon: IconEyeOff,
    color: "pink",
  },
  {
    name: "Survivor",
    chippies: "6-4-2-0",
    description: "Round Robin - Winning is 1 point within this game. Overall chippies given based on ranking within the game.",
    icon: IconTarget,
    color: "indigo",
  },
  {
    name: "21 Cup",
    chippies: "6-4-2-0",
    description: "Round Robin then championship game between top two ranked teams.",
    icon: IconGlassFull,
    color: "teal",
  },
  {
    name: "Civil War",
    chippies: "6-4-2-0",
    description: "Round Robin - Winning is 1 point within this game. Overall chippies given based on ranking within the game. Teams with 4 will have 3 cup racks, teams with 3 will have 4 cup racks.",
    icon: IconSword,
    color: "red",
  },
  {
    name: "Most Steps Walked on Saturday",
    chippies: "6-4-2-0",
    description: "Must have an iPhone to be eligible - two members from the same team are able to get chippies. Tracking on Sunday morning.",
    icon: IconWalk,
    color: "lime",
  }
];

export default function GamesPage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      footer={{ height: 60 }}
    >
      <AppShell.Main>
        <Container pt={{ base: "md", sm: "xl" }} pb={{ base: "md", sm: "xl" }} px={{ base: "xs", sm: "md" }} size="lg">
          <Title order={1} mb={{ base: "md", sm: "xl" }}>
            Games and Rules
          </Title>

          <Stack gap="md">
            {/* Draft Section */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-blue-6)" }}>
              <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
                <ThemeIcon color="blue" variant="light" size="lg" radius="md">
                  <IconUsers size={24} />
                </ThemeIcon>
                <Title order={2} c="dark.9">Draft</Title>
              </Group>
              <Text mb="sm" c="dark.9" size="sm">
                Captains are picked based on the 4 worst overall power rankings. Captain 1 is the worst overall power ranking, Captain 2 is the second worst, etc.
              </Text>
              <Box mt="md">
                <Text fw={600} mb="xs" c="dark.9" size="sm">Pick Order:</Text>
                <Text size="sm" c="dark.9" style={{ wordBreak: "break-word" }}>
                  Captain 1 → Captain 2 → Captain 3 → Captain 4 → Captain 4 → Captain 3 → Captain 2 → Captain 1 → Captain 3 → Captain 4
                </Text>
              </Box>
            </Paper>

            {/* Games and Scoring Section */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-violet-6)" }}>
              <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
                <ThemeIcon color="violet" variant="light" size="lg" radius="md">
                  <IconCoin size={24} />
                </ThemeIcon>
                <Title order={2} c="dark.9">Games and Scoring</Title>
              </Group>
              
              {/* Mobile Card View */}
              <Box hiddenFrom="sm">
                <Stack gap="md">
                  {games.map((game) => {
                    const Icon = game.icon || IconBallTennis;
                    const color = game.color || "blue";
                    return (
                      <Paper key={game.name} p="sm" withBorder style={{ borderLeft: `3px solid var(--mantine-color-${color}-6)` }}>
                        <Group justify="space-between" mb="xs" wrap="nowrap">
                          <Group gap="xs">
                            <ThemeIcon color={color} variant="light" size="md" radius="sm">
                              <Icon size={18} />
                            </ThemeIcon>
                            <Text fw={500} c="dark.9" size="sm">{game.name}</Text>
                          </Group>
                          <Badge color={color} variant="light" size="sm">{game.chippies}</Badge>
                        </Group>
                        <Text size="xs" c="dark.9" style={{ whiteSpace: "pre-line" }}>
                          {game.description}
                        </Text>
                      </Paper>
                    );
                  })}
                </Stack>
              </Box>

              {/* Desktop Table View */}
              <Table.ScrollContainer minWidth={600} visibleFrom="sm">
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="dark.9">Game</Table.Th>
                      <Table.Th c="dark.9">Chippies</Table.Th>
                      <Table.Th c="dark.9">Description</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {games.map((game) => {
                      const Icon = game.icon || IconBallTennis;
                      const color = game.color || "blue";
                      return (
                        <Table.Tr key={game.name}>
                          <Table.Td>
                            <Group gap="xs">
                              <ThemeIcon color={color} variant="light" size="sm" radius="sm">
                                <Icon size={16} />
                              </ThemeIcon>
                              <Text fw={500} c="dark.9">{game.name}</Text>
                            </Group>
                          </Table.Td>
                          <Table.Td width={100}>
                            <Badge color={color} variant="light">{game.chippies}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" c="dark.9" style={{ whiteSpace: "pre-line" }}>
                              {game.description}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Paper>

            <Divider />

            {/* Tie Rule */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-yellow-6)" }}>
              <Group gap="sm" mb="sm">
                <ThemeIcon color="yellow" variant="light" size="md" radius="md">
                  <IconTie size={20} />
                </ThemeIcon>
                <Title order={3} c="dark.9">Tie Rules</Title>
              </Group>
              <Text size="xs" c="dark.9">
                If there is a tie in any of the games, the chippies for those two slots are added and split.
              </Text>
            </Paper>

            {/* Other Rules Section */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-orange-6)" }}>
              <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
                <ThemeIcon color="orange" variant="light" size="lg" radius="md">
                  <IconAlertTriangle size={24} />
                </ThemeIcon>
                <Title order={2} c="dark.9">Other Rules</Title>
              </Group>
              <Stack gap="sm">
                <Group gap="xs" align="flex-start">
                  <ThemeIcon color="blue" variant="light" size="xs" radius="sm">
                    <IconCoin size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dark.9" style={{ flex: 1 }}>
                    Betting team chippies on anything between two teams is allowed - max of three chippies.
                  </Text>
                </Group>
                <Group gap="xs" align="flex-start">
                  <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                    <IconAlertTriangle size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dark.9" style={{ flex: 1 }}>
                    Cheating caught and validated in any sanctioned game = -3 chippies
                  </Text>
                </Group>
                <Group gap="xs" align="flex-start">
                  <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                    <IconShoe size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dark.9" style={{ flex: 1 }}>
                    Falling asleep with shoes on = -3 chippies
                  </Text>
                </Group>
                <Group gap="xs" align="flex-start">
                  <ThemeIcon color="green" variant="light" size="xs" radius="sm">
                    <IconBottle size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="dark.9" style={{ flex: 1 }}>
                    Cleanly completed shotgun at any point throughout the weekend = 0.5 chippies
                  </Text>
                </Group>
                <Group gap="xs" align="flex-start" mt="xs">
                  <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                    <IconClock size={12} />
                  </ThemeIcon>
                  <Text size="xs" c="red" fw={500} style={{ flex: 1 }}>
                    All additional rules are no longer valid after the completion of survivor (the last game)
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
