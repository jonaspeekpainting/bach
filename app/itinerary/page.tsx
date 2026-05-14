"use client";

import { AppShell } from "@mantine/core";
import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";
import { Navigation, SHOW_NAV } from "@/components/Navigation";
import styles from "./itinerary.module.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-itinerary-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-itinerary-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-itinerary-inter",
});

export default function ItineraryPage() {
  const fontClass = `${bebas.variable} ${playfair.variable} ${inter.variable}`;

  return (
    <AppShell footer={SHOW_NAV ? { height: 60 } : undefined}>
      <AppShell.Main p={0}>
        <div className={`${styles.itineraryRoot} ${fontClass}`}>
          <div className={styles.container}>

            <div className={styles.hero}>
              <div className={styles.heroSubtitle}>The Official Itinerary</div>
              <h1>
                Jonas&apos;s Bachelor Party
                <span className={styles.accent}>VEGAS · HURRICANE · NO REGRETS</span>
              </h1>
            </div>

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerDot} />
              <span className={styles.dividerLine} />
            </div>

            {/* Wednesday */}
            <div className={`${styles.dayRow} ${styles.colorVegas}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>🍸</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Wednesday</div>
                  <div className={styles.dayLocation}>Las Vegas</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>9:00 AM</span>
                    <span className={styles.itemTitle}>Horseshoe Pool</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>1:15 PM</span>
                    <span className={styles.itemTitle}>Atomic Golf</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>7:00 PM</span>
                    <span className={styles.itemTitle}>Comedy Cellar</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>9:00 PM</span>
                    <span className={styles.itemTitle}>Heart Attack Grill · Fremont</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            {/* Thursday */}
            <div className={`${styles.dayRow} ${styles.colorGolf}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>⛳</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Thursday</div>
                  <div className={styles.dayLocation}>Hurricane</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>9:00 AM</span>
                    <span className={styles.itemTitle}>Costco Run · Liquor &amp; Provisions</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>11:30 AM</span>
                    <span className={styles.itemTitle}>Golf at Coyote Springs</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>4:00 PM</span>
                    <span className={styles.itemTitle}>Check-In · The House</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>EVE</span>
                    <span className={styles.itemTitle}>Team Draft · Shirt Night · Games</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className={`${styles.dayRow} ${styles.colorGuys}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>🍺</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Friday</div>
                  <div className={styles.dayLocation}>Hurricane</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>AM</span>
                    <span className={styles.itemTitle}>Breakfast — Mimosas &amp; Bloodys</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>MID</span>
                    <span className={styles.itemTitle}>Fun activities at the house</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>EVE</span>
                    <span className={styles.itemTitle}>Pan Chicken Dinner</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            {/* Saturday */}
            <div className={`${styles.dayRow} ${styles.colorDesert}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>⛳</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Saturday</div>
                  <div className={styles.dayLocation}>Hurricane</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>8:30 AM</span>
                    <span className={styles.itemTitle}>Golf at Coral Canyon</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>MID</span>
                    <span className={styles.itemTitle}>Sandwiches at the House</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>PM</span>
                    <span className={styles.itemTitle}>Fun activities at the house</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>EVE</span>
                    <span className={styles.itemTitle}>Pulled Pork Dinner</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            {/* Sunday */}
            <div className={`${styles.dayRow} ${styles.colorPool}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>🏌️</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Sunday</div>
                  <div className={styles.dayLocation}>Hurricane</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>AM</span>
                    <span className={styles.itemTitle}>Breakfast — Mimosas &amp; Bloodys</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>12:00 PM</span>
                    <span className={styles.itemTitle}>9-Hole Scramble at Sand Hollow</span>
                  </li>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>EVE</span>
                    <span className={styles.itemTitle}>Burgers, Dawgs &amp; House Games</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            {/* Monday */}
            <div className={`${styles.dayRow} ${styles.colorVegas}`}>
              <div className={styles.dayLeft}>
                <div className={styles.dayIcon}>🚗</div>
                <div className={styles.dayText}>
                  <div className={styles.dayName}>Monday</div>
                  <div className={styles.dayLocation}>Las Vegas</div>
                </div>
              </div>
              <div className={styles.dayRight}>
                <div className={styles.scheduleWrap}>
                <ul className={styles.scheduleList}>
                  <li className={styles.scheduleItem}>
                    <span className={styles.time}>11:00 AM</span>
                    <span className={styles.itemTitle}>Checkout</span>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            <div className={styles.closing}>FOR JONAS · BY THE BOYS</div>
          </div>
        </div>
      </AppShell.Main>
      <Navigation />
    </AppShell>
  );
}
