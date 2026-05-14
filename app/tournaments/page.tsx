"use client";

import { AppShell, Tabs, Box } from "@mantine/core";
import { Navigation, SHOW_NAV } from "@/components/Navigation";
import { TournamentsDisplay } from "./TournamentsDisplay";
import { TournamentAdmin } from "./TournamentAdmin";

export default function TournamentsPage() {
  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main>
        <Tabs defaultValue="brackets" mt="md">
          <Tabs.List justify="center" grow style={{ overflowX: "auto" }}>
            <Tabs.Tab
              value="brackets"
            >
              <Box 
                component="span" 
                hiddenFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                }}
              >
                Brackets
              </Box>
              <Box 
                component="span" 
                visibleFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Brackets
              </Box>
            </Tabs.Tab>
            <Tabs.Tab 
              value="admin"
            >
              <Box 
                component="span" 
                hiddenFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  whiteSpace: "nowrap",
                }}
              >
                Admin
              </Box>
              <Box 
                component="span" 
                visibleFrom="sm"
                style={{
                  fontSize: "var(--mantine-font-size-sm)",
                  whiteSpace: "nowrap",
                }}
              >
                Admin
              </Box>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="brackets" pt="xl">
            <TournamentsDisplay />
          </Tabs.Panel>

          <Tabs.Panel value="admin" pt="xl">
            <TournamentAdmin />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
