"use client";

import { PageShell } from "@/components/PageShell";
import styles from "./itinerary.module.css";

export default function ItineraryPage() {
  return (
    <PageShell
      eyebrow="The Official Itinerary"
      title={<>Jonas&apos;s Bachelor Party</>}
      accent="VEGAS · HURRICANE · NO REGRETS"
      footer="FOR JONAS · BY THE BOYS"
      flushContent
    >
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
                <span className={styles.itemTitle}>Team Draft · Shirt Night · Games · Chipotle</span>
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
                <span className={styles.itemTitle}>Hibachi + Sake Bombs</span>
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
                <span className={styles.itemTitle}>Pizza &amp; Games</span>
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
    </PageShell>
  );
}
