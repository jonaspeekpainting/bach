"use client";

import { AppShell } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Navigation, SHOW_NAV } from "@/components/Navigation";
import { RankingForm } from "./RankingForm";
import { RankingsDisplay } from "./RankingsDisplay";

export default function RankingsPage() {
  const [hasSubmitted] = useLocalStorage<boolean>({
    key: "ranking-submitted",
    defaultValue: false,
  });
  console.log("RankingsPage - hasSubmitted:", hasSubmitted);

  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main>
        {hasSubmitted ? <RankingsDisplay /> : <RankingForm />}
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
