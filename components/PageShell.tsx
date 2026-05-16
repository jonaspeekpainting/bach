"use client";

import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Navigation, NAVBAR_WIDTH, useShowNav } from "@/components/Navigation";
import { bachFontClass } from "@/lib/bach-fonts";
import styles from "@/styles/bach-theme.module.css";

export interface PageShellProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: React.ReactNode;
  accent?: string;
  footer?: string;
  /** Omit card wrapper — for home page full-bleed sections */
  bare?: boolean;
  /** Content sits flush under divider (itinerary day rows) */
  flushContent?: boolean;
}

export function PageShell({
  children,
  eyebrow,
  title,
  accent,
  footer,
  bare = false,
  flushContent = false,
}: PageShellProps) {
  const showNav = useShowNav();
  const isMobile = useMediaQuery("(max-width: 47.99em)");
  const desktopNav = showNav && isMobile === false;
  const showHero = Boolean(eyebrow || title);

  const inner = (
    <>
      {showHero && (
        <>
          <div className={styles.hero}>
            {eyebrow && <div className={styles.heroSubtitle}>{eyebrow}</div>}
            {title && (
              <h1 className={styles.heroTitle}>
                {title}
                {accent && <span className={styles.accent}>{accent}</span>}
              </h1>
            )}
          </div>
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>
        </>
      )}
      <div
        className={
          flushContent ? styles.contentFlush : showHero ? styles.content : undefined
        }
      >
        {children}
      </div>
      {footer && <div className={styles.closing}>{footer}</div>}
    </>
  );

  return (
    <AppShell
      mode={showNav ? "static" : "fixed"}
      navbar={showNav ? { width: NAVBAR_WIDTH, breakpoint: "sm" } : undefined}
      footer={showNav && isMobile ? { height: 60 } : undefined}
    >
      <Navigation />
      <AppShell.Main p={0}>
        <div
          className={`${styles.themeRoot} ${bachFontClass} ${desktopNav ? styles.themeRootDesktopNav : ""}`}
        >
          {bare ? children : <div className={styles.container}>{inner}</div>}
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
