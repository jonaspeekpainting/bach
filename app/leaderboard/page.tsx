"use client";

import { AppShell, Tabs, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation, MobileHeader } from "@/components/Navigation";
import { LeaderboardDisplay } from "./LeaderboardDisplay";
import { PointsForm } from "./PointsForm";
import { TeamNamesForm } from "./TeamNamesForm";
import { IconTrophy, IconEdit, IconUsers } from "@tabler/icons-react";

export default function LeaderboardPage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      header={{ height: 60 }}
      footer={{ height: 60 }}
    >
      <MobileHeader />
      <AppShell.Main>
        <Tabs defaultValue="leaderboard" mt="md">
          <Tabs.List justify="center" grow style={{ overflowX: "auto" }}>
            <Tabs.Tab
              value="leaderboard"
              leftSection={<IconTrophy size={20} />}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                  "@media (min-width: 36em)": {
                    fontSize: "var(--mantine-font-size-sm)",
                  },
                },
              }}
            >
              <Box component="span" hiddenFrom="sm">
                Board
              </Box>
              <Box component="span" visibleFrom="sm">
                Leaderboard
              </Box>
            </Tabs.Tab>
            <Tabs.Tab 
              value="enter" 
              leftSection={<IconEdit size={20} />}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                  "@media (min-width: 36em)": {
                    fontSize: "var(--mantine-font-size-sm)",
                  },
                },
              }}
            >
              <Box component="span" hiddenFrom="sm">
                Enter
              </Box>
              <Box component="span" visibleFrom="sm">
                Enter Points
              </Box>
            </Tabs.Tab>
            <Tabs.Tab 
              value="teams" 
              leftSection={<IconUsers size={20} />}
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                  "@media (min-width: 36em)": {
                    fontSize: "var(--mantine-font-size-sm)",
                  },
                },
              }}
            >
              <Box component="span" hiddenFrom="sm">
                Teams
              </Box>
              <Box component="span" visibleFrom="sm">
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
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
