"use client";

import { AppShell, Title, Text, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation, MobileHeader } from "@/components/Navigation";

export default function SchedulePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      header={{ height: 60 }}
      footer={{ height: 60 }}
    >
      <MobileHeader />
      <AppShell.Main>
        <Container pt="xl" pb={0}>
          <Title order={1} mb="md">
            Schedule
          </Title>
          <Text c="gray.7">Schedule information will be added here.</Text>
        </Container>
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
