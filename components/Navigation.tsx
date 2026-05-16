"use client";

import { AppShell, NavLink, Stack, Group, Box } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import {
  IconTrophy,
  IconDice,
  IconChartBar,
  IconClipboardList,
} from "@tabler/icons-react";

/** Force nav on for everyone (e.g. launch). Otherwise nav shows when admin is true. */
export const SHOW_NAV = false;

export const NAVBAR_WIDTH = 200;

export function useShowNav() {
  const [isAdmin] = useLocalStorage<boolean>({
    key: "admin",
    defaultValue: false,
  });
  return SHOW_NAV || isAdmin;
}

const navItems = [
  { label: "Itinerary", href: "/itinerary", icon: IconClipboardList },
  { label: "Rankings", href: "/rankings", icon: IconTrophy },
  { label: "Leaderboard", href: "/leaderboard", icon: IconChartBar },
  { label: "Games", href: "/games", icon: IconDice },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const showNav = useShowNav();

  if (!showNav) return null;

  return (
    <>
      {/* Desktop: left sidebar */}
      <AppShell.Navbar p="md" visibleFrom="sm" style={{ background: "#faf3e7", borderRight: "1px solid #e0ceb0" }}>
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
                  label: { color: "#2c1810" },
                  root: {
                    "&[data-active]": {
                      backgroundColor: "rgba(193, 68, 14, 0.12)",
                      color: "#c1440e",
                    },
                  },
                }}
              />
            );
          })}
        </Stack>
      </AppShell.Navbar>

      {/* Mobile: bottom tab bar (not hamburger — 5 primary sections, one tap each) */}
      <AppShell.Footer
        hiddenFrom="sm"
        p="xs"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          willChange: "transform",
          background: "#faf3e7",
          borderTop: "1px solid #e0ceb0",
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
                  backgroundColor: isActive ? "rgba(193, 68, 14, 0.12)" : "transparent",
                  minWidth: 0,
                }}
              >
                <Icon
                  size="1.1rem"
                  stroke={1.5}
                  color={isActive ? "#c1440e" : "#8b5e3c"}
                />
                <Box
                  component="span"
                  style={{
                    fontSize: "0.6rem",
                    lineHeight: 1.2,
                    color: isActive ? "#c1440e" : "#6b4423",
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
