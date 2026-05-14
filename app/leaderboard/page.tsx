"use client";

import { AppShell, Tabs, Box } from "@mantine/core";
import { Navigation, SHOW_NAV } from "@/components/Navigation";
import { LeaderboardDisplay } from "./LeaderboardDisplay";
import { PointsForm } from "./PointsForm";
import { TeamNamesForm } from "./TeamNamesForm";
import { IconTrophy, IconEdit, IconUsers } from "@tabler/icons-react";

export default function LeaderboardPage() {
  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main>
        <Tabs defaultValue="leaderboard" mt="md">
          <Tabs.List justify="center" grow style={{ overflowX: "auto" }}>
            <Tabs.Tab
              value="leaderboard"
              leftSection={<IconTrophy size={20} />}
            >
              <Box 
                component="span" 
                hiddenFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                }}
              >
                Board
              </Box>
              <Box 
                component="span" 
                visibleFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Leaderboard
              </Box>
            </Tabs.Tab>
            <Tabs.Tab 
              value="enter" 
              leftSection={<IconEdit size={20} />}
            >
              <Box 
                component="span" 
                hiddenFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                }}
              >
                Enter
              </Box>
              <Box 
                component="span" 
                visibleFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Enter Points
              </Box>
            </Tabs.Tab>
            <Tabs.Tab 
              value="teams" 
              leftSection={<IconUsers size={20} />}
            >
              <Box 
                component="span" 
                hiddenFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                }}
              >
                Teams
              </Box>
              <Box 
                component="span" 
                visibleFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Team Names
              </Box>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="leaderboard" pt="xl">
            <LeaderboardDisplay />
          </Tabs.Panel>

          <Tabs.Panel value="enter" pt="xl">
            <PointsForm />
          </Tabs.Panel>

          <Tabs.Panel value="teams" pt="xl">
            <TeamNamesForm />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
