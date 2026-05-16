"use client";

import { Tabs, Box } from "@mantine/core";
import { PageShell } from "@/components/PageShell";
import { TournamentsDisplay } from "./TournamentsDisplay";
import { TournamentAdmin } from "./TournamentAdmin";

export default function TournamentsPage() {
  return (
    <PageShell
      eyebrow="Bracket Central"
      title="Tournaments"
      accent="BEER PONG · PICKLEBALL · MORE"
    >
      <Tabs defaultValue="brackets">
        <Tabs.List justify="center" grow style={{ overflowX: "auto" }}>
          <Tabs.Tab value="brackets">Brackets</Tabs.Tab>
          <Tabs.Tab value="admin">Admin</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="brackets" pt="md">
          <TournamentsDisplay />
        </Tabs.Panel>

        <Tabs.Panel value="admin" pt="md">
          <TournamentAdmin />
        </Tabs.Panel>
      </Tabs>
    </PageShell>
  );
}
