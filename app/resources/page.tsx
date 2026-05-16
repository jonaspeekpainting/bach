"use client";

import { Text } from "@mantine/core";
import { PageShell } from "@/components/PageShell";

export default function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Helpful Links"
      title="Resources"
      accent="MAPS · INFO · MORE"
    >
      <Text c="#3d1f0f" size="sm">
        Resources and helpful information will be added here.
      </Text>
    </PageShell>
  );
}
