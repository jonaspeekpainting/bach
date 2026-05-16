"use client";

import { useLocalStorage } from "@mantine/hooks";
import { PageShell } from "@/components/PageShell";
import { RankingForm } from "./RankingForm";
import { RankingsDisplay } from "./RankingsDisplay";

export default function RankingsPage() {
  const [hasSubmitted] = useLocalStorage<boolean>({
    key: "ranking-submitted",
    defaultValue: false,
  });

  return (
    <PageShell
      eyebrow="Power Rankings"
      title="Rank the Boys"
      accent="GOLF · BEER · ATHLETICS"
    >
      {hasSubmitted ? <RankingsDisplay /> : <RankingForm />}
    </PageShell>
  );
}
