"use client";

import { Tabs, Box } from "@mantine/core";
import { PageShell } from "@/components/PageShell";
import { LeaderboardDisplay } from "./LeaderboardDisplay";
import { PointsForm } from "./PointsForm";
import { TeamNamesForm } from "./TeamNamesForm";
import { IconTrophy, IconEdit, IconUsers } from "@tabler/icons-react";

export default function LeaderboardPage() {
  return (
    <PageShell
      eyebrow="Competition HQ"
      title="Leaderboard"
      accent="TEAM CHIPPIES · LIVE STANDINGS"
    >
      <Tabs defaultValue="leaderboard">
        <Tabs.List justify="center" grow style={{ overflowX: "auto" }}>
          <Tabs.Tab value="leaderboard" leftSection={<IconTrophy size={20} />}>
            <Box component="span" hiddenFrom="sm" style={{ fontSize: "var(--mantine-font-size-xs)", whiteSpace: "nowrap" }}>
              Board
            </Box>
            <Box component="span" visibleFrom="sm" style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "nowrap" }}>
              Leaderboard
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="enter" leftSection={<IconEdit size={20} />}>
            <Box component="span" hiddenFrom="sm" style={{ fontSize: "var(--mantine-font-size-xs)", whiteSpace: "nowrap" }}>
              Enter
            </Box>
            <Box component="span" visibleFrom="sm" style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "nowrap" }}>
              Enter Points
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="teams" leftSection={<IconUsers size={20} />}>
            <Box component="span" hiddenFrom="sm" style={{ fontSize: "var(--mantine-font-size-xs)", whiteSpace: "nowrap" }}>
              Teams
            </Box>
            <Box component="span" visibleFrom="sm" style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "nowrap" }}>
              Team Names
            </Box>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="leaderboard" pt="md">
          <LeaderboardDisplay />
        </Tabs.Panel>

        <Tabs.Panel value="enter" pt="md">
          <PointsForm />
        </Tabs.Panel>

        <Tabs.Panel value="teams" pt="md">
          <TeamNamesForm />
        </Tabs.Panel>
      </Tabs>
    </PageShell>
  );
}
