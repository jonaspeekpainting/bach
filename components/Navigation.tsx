"use client";

import { AppShell, NavLink, Stack, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconTrophy,
  IconBook,
} from "@tabler/icons-react";

interface NavigationProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Navigation({ opened, toggle }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Schedule", href: "/schedule", icon: IconCalendar },
    { label: "Rankings", href: "/rankings", icon: IconTrophy },
    { label: "Resources", href: "/resources", icon: IconBook },
  ];

  return (
    <>
      <AppShell.Navbar p="md" visibleFrom="sm">
        <Stack gap="xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                leftSection={<Icon size="1.2rem" stroke={1.5} />}
                active={pathname === item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                styles={{
                  label: { color: "var(--mantine-color-dark-9)" },
                }}
              />
            );
          })}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Navbar p="md" hiddenFrom="sm" hidden={!opened}>
        <Stack gap="xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                leftSection={<Icon size="1.2rem" stroke={1.5} />}
                active={pathname === item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                  toggle?.();
                }}
                styles={{
                  label: { color: "var(--mantine-color-dark-9)" },
                }}
              />
            );
          })}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Footer hiddenFrom="sm" p="md">
        <Group justify="space-around" gap={0}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                leftSection={<Icon size="1.2rem" stroke={1.5} />}
                active={pathname === item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                style={{ flex: 1 }}
                styles={{
                  label: { color: "var(--mantine-color-dark-9)" },
                }}
              />
            );
          })}
        </Group>
      </AppShell.Footer>
    </>
  );
}

export function MobileHeader() {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const title = pathname === "/schedule" ? "Schedule" : 
                pathname === "/rankings" ? "Rankings" : 
                pathname === "/resources" ? "Resources" : "App";

  return (
    <AppShell.Header hiddenFrom="sm" p="md">
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" />
        <span style={{ fontWeight: 600, color: "var(--mantine-color-dark-9)" }}>{title}</span>
      </Group>
    </AppShell.Header>
  );
}
