"use client";

import { Title, Paper, Text, Stack, Table, Divider, Badge, Box, Group, ThemeIcon } from "@mantine/core";
import { PageShell } from "@/components/PageShell";
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
  IconDice,
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
    name: "Scramble",
    chippies: "12-8-4-0",
    description:
      "Golf — Scramble. Final score for ranking. Birdies are +1, Eagles are +3, Doubles or Worse -2. Closest to the pin and longest drive are each +3. Teams with 3 rotate someone who gets two shots on every hole.",
    icon: IconGolf,
    color: "green",
  },
  {
    name: "American Challenge",
    chippies: "12-8-4-0",
    description:
      "First stage — 8 beers per person. Second stage — option for weed, ketamine, etc. Fourth stage — 1 large pizza for two people. Fifth stage — 100 piece jig saw puzzle (on the ground all in the same room). Finish order determines chippies.\n\nFor each stage, the numbers can be distributed between team members however the team decides. Any team member throwing up is a 2 minute delay for the entire team. Each subsequent throw up is still a 2 minute delay but will also be -1 chippy. All things need to be consumed in each stage before moving to the next. Any cheating that is caught by another team is a 3 minute delay for the entire team.",
    icon: IconBeer,
    color: "red",
  },
  {
    name: "Pickleball",
    chippies: "12-8-4-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconBallTennis,
    color: "blue",
  },
  {
    name: "Spikeball",
    chippies: "12-8-4-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconBallTennis,
    color: "cyan",
  },
  {
    name: "BP",
    chippies: "12-8-4-0",
    description:
      "8 Team Double elimination — each team will have A team and B team. For the teams of three — if they have two simultaneous games, they will get the advantage of 1v2 in one of the games — they can also switch up teams. For teams of 4, the two teams cannot be mixed up after deciding pairings.",
    icon: IconBallBasketball,
    color: "orange",
  },
  {
    name: "Relay",
    chippies: "12-8-4-0",
    description: "4 Team Double elimination.",
    icon: IconRun,
    color: "teal",
  },
  {
    name: "Trout",
    chippies: "6-4-2-0",
    description:
      "Elimination — two members from the same team are able to get chippies.",
    icon: IconGlassFull,
    color: "grape",
  },
  {
    name: "Die",
    chippies: "6-4-2-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconDice,
    color: "violet",
  },
  {
    name: "Cheers to the Governor",
    chippies: "6-4-2-0",
    description:
      "Elimination — two members from the same team are able to get chippies.",
    icon: IconGlassFull,
    color: "yellow",
  },
  {
    name: "Blindfolded Obstacle Course",
    chippies: "6-4-2-0",
    description:
      "Two team members from each team — one directing, one doing the course. All teams will start at the same time.",
    icon: IconEyeOff,
    color: "pink",
  },
  {
    name: "Survivor",
    chippies: "6-4-2-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconTarget,
    color: "indigo",
  },
  {
    name: "21 Cup",
    chippies: "6-4-2-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconGlassFull,
    color: "teal",
  },
  {
    name: "Civil War",
    chippies: "6-4-2-0",
    description:
      "Round robin for seeding and then championship game and losers match.",
    icon: IconSword,
    color: "red",
  },
  {
    name: "Most Steps Walked on Saturday",
    chippies: "6-4-2-0",
    description:
      "Must have an iPhone to be eligible — two members from the same team are able to get chippies. Tracking on Sunday morning.",
    icon: IconWalk,
    color: "lime",
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="The Rulebook"
      title="Games & Rules"
      accent="DRAFT · CHIPPIES · CHAOS"
    >
      <Stack gap="md">
        <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid #c1440e" }}>
          <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
            <ThemeIcon color="orange" variant="light" size="lg" radius="md">
              <IconUsers size={24} />
            </ThemeIcon>
            <Title order={2} c="#2c1810">Draft</Title>
          </Group>
          <Text mb="sm" c="#3d1f0f" size="sm">
            Captains are picked based on the 4 worst overall power rankings. Captain 1 is the worst overall power ranking, Captain 2 is the second worst, etc.
          </Text>
          <Box mt="md">
            <Text fw={600} mb="xs" c="#2c1810" size="sm">Pick Order:</Text>
            <Text size="sm" c="#3d1f0f" style={{ wordBreak: "break-word" }}>
              Captain 1 → Captain 2 → Captain 3 → Captain 4 → Captain 4 → Captain 3 → Captain 2 → Captain 1 → Captain 3 → Captain 4
            </Text>
          </Box>
        </Paper>

        <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid #6b8e4e" }}>
          <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
            <ThemeIcon color="green" variant="light" size="lg" radius="md">
              <IconCoin size={24} />
            </ThemeIcon>
            <Title order={2} c="#2c1810">Games and Scoring</Title>
          </Group>

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
                        <Text fw={500} c="#2c1810" size="sm">{game.name}</Text>
                      </Group>
                      <Badge color={color} variant="light" size="sm">{game.chippies}</Badge>
                    </Group>
                    <Text size="xs" c="#3d1f0f" style={{ whiteSpace: "pre-line" }}>
                      {game.description}
                    </Text>
                  </Paper>
                );
              })}
            </Stack>
          </Box>

          <Table.ScrollContainer minWidth={600} visibleFrom="sm">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th c="#2c1810">Game</Table.Th>
                  <Table.Th c="#2c1810">Chippies</Table.Th>
                  <Table.Th c="#2c1810">Description</Table.Th>
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
                          <Text fw={500} c="#2c1810">{game.name}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td width={100}>
                        <Badge color={color} variant="light">{game.chippies}</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="#3d1f0f" style={{ whiteSpace: "pre-line" }}>
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

        <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid #e8a33d" }}>
          <Group gap="sm" mb="sm">
            <ThemeIcon color="yellow" variant="light" size="md" radius="md">
              <IconTie size={20} />
            </ThemeIcon>
            <Title order={3} c="#2c1810">Tie Rules</Title>
          </Group>
          <Text size="xs" c="#3d1f0f">
            If there is a tie in any of the games, the chippies for those two slots are added and split.
          </Text>
        </Paper>

        <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid #b8743a" }}>
          <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
            <ThemeIcon color="orange" variant="light" size="lg" radius="md">
              <IconAlertTriangle size={24} />
            </ThemeIcon>
            <Title order={2} c="#2c1810">Other Rules</Title>
          </Group>
          <Stack gap="sm">
            <Group gap="xs" align="flex-start">
              <ThemeIcon color="blue" variant="light" size="xs" radius="sm">
                <IconCoin size={12} />
              </ThemeIcon>
              <Text size="xs" c="#3d1f0f" style={{ flex: 1 }}>
                Betting team chippies on anything between two teams is allowed - max of three chippies.
              </Text>
            </Group>
            <Group gap="xs" align="flex-start">
              <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                <IconAlertTriangle size={12} />
              </ThemeIcon>
              <Text size="xs" c="#3d1f0f" style={{ flex: 1 }}>
                Cheating caught and validated in any sanctioned game = -3 chippies
              </Text>
            </Group>
            <Group gap="xs" align="flex-start">
              <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                <IconShoe size={12} />
              </ThemeIcon>
              <Text size="xs" c="#3d1f0f" style={{ flex: 1 }}>
                Falling asleep with shoes on = -3 chippies
              </Text>
            </Group>
            <Group gap="xs" align="flex-start">
              <ThemeIcon color="green" variant="light" size="xs" radius="sm">
                <IconBottle size={12} />
              </ThemeIcon>
              <Text size="xs" c="#3d1f0f" style={{ flex: 1 }}>
                Cleanly completed shotgun at any point throughout the weekend = 0.5 chippies
              </Text>
            </Group>
            <Group gap="xs" align="flex-start" mt="xs">
              <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                <IconClock size={12} />
              </ThemeIcon>
              <Text size="xs" c="#c1440e" fw={500} style={{ flex: 1 }}>
                All additional rules are no longer valid after the completion of survivor (the last game)
              </Text>
            </Group>
            <Group gap="xs" align="flex-start" mt="xs">
              <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                <IconClock size={12} />
              </ThemeIcon>
              <Text size="xs" c="#c1440e" fw={500} style={{ flex: 1 }}>
                Winners split the pot.
              </Text>
            </Group>
            <Group gap="xs" align="flex-start" mt="xs">
              <ThemeIcon color="red" variant="light" size="xs" radius="sm">
                <IconClock size={12} />
              </ThemeIcon>
              <Text size="xs" c="#c1440e" fw={500} style={{ flex: 1 }}>
                Losers have to wear vegas shirts for trip home.
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </PageShell>
  );
}
