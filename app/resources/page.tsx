"use client";

import { AppShell, Title, Text, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation } from "@/components/Navigation";

export default function ResourcesPage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      footer={{ height: 60 }}
    >
      <AppShell.Main>
        <Container pt="xl" pb={0}>
          <Title order={1} mb="md">
            Resources
          </Title>
          <Text c="gray.7">Resources and helpful information will be added here.</Text>
        </Container>
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
