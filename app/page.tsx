"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@mantine/core";
import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";
import { Navigation, SHOW_NAV } from "@/components/Navigation";
import styles from "./home.module.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-home-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-home-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-home-inter",
});

export default function Home() {
  const fontClass = `${bebas.variable} ${playfair.variable} ${inter.variable}`;

  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main p={0}>
        <div className={`${styles.root} ${fontClass}`}>
          <div className={styles.colorStripe} />

          {/* ─── Hero ──────────────────────────────────────────── */}
          <section className={styles.hero}>
            <div className={`${styles.heroEyebrow} ${styles.fadeUp} ${styles.fadeUp1}`}>
              May 21 – 26, 2025 · Vegas & Hurricane
            </div>
            <h1 className={`${styles.heroHeadline} ${styles.fadeUp} ${styles.fadeUp2}`}>
              The Weekend
              <span className={styles.heroAccent}>BONER DESERVES</span>
            </h1>
            <div className={`${styles.heroMeta} ${styles.fadeUp} ${styles.fadeUp3}`}>
              <span className={styles.heroPill}>⛳ 3 Golf Courses</span>
              <span className={styles.heroPill}>🎰 Las Vegas</span>
              <span className={styles.heroPill}>🏡 The House</span>
              <span className={styles.heroPill}>🌵 Hurricane, UT</span>
              <span className={styles.heroPill}>🤝 14 Guys</span>
            </div>
            <div className={`${styles.heroScroll} ${styles.fadeUp} ${styles.fadeUp5}`}>
              <span>Scroll</span>
              <div className={styles.heroScrollLine} />
            </div>
          </section>

          {/* ─── Stats — long scroll-driven panels ──────────────── */}
          <div className={styles.statsBar}>
            <div className={styles.statPanel}>
              <div className={`${styles.statPanelInner} ${styles.reveal}`}>
                <div className={styles.statBigNumber}>6</div>
                <div className={styles.statBigLabel}>Days of Chaos</div>
              </div>
            </div>
            <div className={styles.statPanel}>
              <div className={`${styles.statPanelInner} ${styles.reveal}`}>
                <div className={styles.statBigNumber}>14</div>
                <div className={styles.statBigLabel}>Guys</div>
              </div>
            </div>
            <div className={styles.statPanel}>
              <div className={`${styles.statPanelInner} ${styles.reveal}`}>
                <div className={styles.statBigNumber}>∞</div>
                <div className={styles.statBigLabel}>Fun</div>
              </div>
            </div>
          </div>

          {/* ─── Bio / Roast ────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionCard}>
              <div className={styles.sectionInner}>
                <span className={`${styles.sectionLabel} ${styles.reveal}`}>
                  The Man of Honor
                </span>
                <h2
                  className={`${styles.sectionTitle} ${styles.reveal}`}
                  style={{ transitionDelay: "150ms" }}
                >
                  Who Is Jonas Peek?
                </h2>

                <div
                  className={`${styles.bioGrid} ${styles.reveal}`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <div className={styles.bioPhotoWrap}>
                    <img
                      src="/jonas.jpg"
                      alt="Jonas Peek, aka Boner"
                      className={styles.bioPhoto}
                    />
                    <div className={styles.bioPhotoCaption}>JONER BONER · EST 1998</div>
                  </div>

                  <div className={styles.bioBody}>
                    <p>
                      Jonas Peek — known to his closest friends as <strong>Boner</strong> —
                      is a man of many talents, most of which remain unverified. He has the
                      confidence of a scratch golfer and the handicap of someone who just
                      found a set of clubs at a garage sale. He&apos;ll tell you about it either way.
                    </p>

                    <span className={styles.bioHighlight}>
                      &ldquo;He showed up to his own engagement party twenty minutes late,
                      claimed he&apos;d been &lsquo;locked in,&rsquo; and his shoes were on the wrong feet.&rdquo;
                    </span>

                    <p>
                      Despite this — or perhaps because of it — Jonas is somehow getting
                      married. He manages to charm everyone he meets, lose at every card
                      game he plays, and still convince the whole table it was a good time.
                      That&apos;s a gift.
                    </p>

                    <p>
                      He once spent $40 at a driving range, shot a triple bogey on the
                      first hole, and then ordered a hot dog and called it &ldquo;a really solid
                      round.&rdquo; He is not wrong. He is also not right.
                    </p>

                    <p>
                      This weekend is for him. Which means it will be chaotic, over-catered,
                      and end with at least one story nobody&apos;s allowed to repeat. Perfect.
                    </p>

                    <div className={styles.statRow}>
                      <span className={`${styles.statBadge} ${styles.statBadgeRed}`}>
                        🏌️ Bogey Machine
                      </span>
                      <span className={`${styles.statBadge} ${styles.statBadgeGreen}`}>
                        🃏 Terrible at Cards
                      </span>
                      <span className={`${styles.statBadge} ${styles.statBadgeBlue}`}>
                        🎰 Always In
                      </span>
                      <span className={`${styles.statBadge} ${styles.statBadgeBrown}`}>
                        🐇 Furry Enthusiast
                      </span>
                      <span className={`${styles.statBadge} ${styles.statBadgeGreen}`}>
                        🍇 Fruit Bowl Extraordinaire
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Are You Excited? ───────────────────────────────── */}
          <section className={styles.excitedSection}>
            <h2 className={`${styles.excitedHeadline} ${styles.reveal}`}>
              Are You Excited?
            </h2>
            <Link
              href="/itinerary"
              className={`${styles.excitedButton} ${styles.reveal}`}
              style={{ transitionDelay: "900ms" }}
            >
              See Full Itinerary
            </Link>
            <div className={styles.excitedFooter}>PEEK WEEKEND · MMXXV</div>
          </section>
        </div>
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
