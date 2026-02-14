"use client";

import { AppShell, NavLink, Stack, Group, Box } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconTrophy,
  IconDice,
  IconChartBar,
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
    { label: "Leaderboard", href: "/leaderboard", icon: IconChartBar },
    { label: "Games", href: "/games", icon: IconDice },
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
      <AppShell.Footer 
        hiddenFrom="sm" 
        p="xs"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Group justify="space-around" gap={0} wrap="nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Box
                key={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.href);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  padding: "4px 2px",
                  cursor: "pointer",
                  borderRadius: "var(--mantine-radius-sm)",
                  backgroundColor: isActive ? "var(--mantine-color-blue-0)" : "transparent",
                  minWidth: 0,
                }}
              >
                <Icon 
                  size="1.1rem" 
                  stroke={1.5}
                  color={isActive ? "var(--mantine-color-blue-6)" : "var(--mantine-color-gray-6)"}
                />
                <Box
                  component="span"
                  style={{
                    fontSize: "0.6rem",
                    lineHeight: 1.2,
                    color: isActive ? "var(--mantine-color-blue-6)" : "var(--mantine-color-gray-7)",
                    fontWeight: isActive ? 600 : 400,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            );
          })}
        </Group>
      </AppShell.Footer>
    </>
  );
}

