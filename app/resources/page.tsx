"use client";

import { AppShell, Title, Text, Container } from "@mantine/core";
import { Navigation, SHOW_NAV } from "@/components/Navigation";

export default function ResourcesPage() {
  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main>
        <Container pt="xl" pb={0}>
          <Title order={1} mb="md">
            Resources
          </Title>
          <Text c="gray.7">Resources and helpful information will be added here.</Text>
        </Container>
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
