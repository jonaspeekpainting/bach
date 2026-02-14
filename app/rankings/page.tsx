"use client";

import { AppShell } from "@mantine/core";
import { useLocalStorage, useDisclosure } from "@mantine/hooks";
import { Navigation } from "@/components/Navigation";
import { RankingForm } from "./RankingForm";
import { RankingsDisplay } from "./RankingsDisplay";

export default function RankingsPage() {
  const [hasSubmitted] = useLocalStorage<boolean>({
    key: "ranking-submitted",
    defaultValue: false,
  });
  const [opened, { toggle }] = useDisclosure();

  console.log("RankingsPage - hasSubmitted:", hasSubmitted);

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      footer={{ height: 60 }}
    >
      <AppShell.Main>
        {hasSubmitted ? <RankingsDisplay /> : <RankingForm />}
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
