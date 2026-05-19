"use client";

import { PageShell } from "@/components/PageShell";
import styles from "./itinerary.module.css";

function Entry({
  time,
  title,
  details,
}: {
  time: string;
  title: string;
  details?: string;
}) {
  return (
    <li className={styles.scheduleItem}>
      <span className={styles.time}>{time}</span>
      <div className={styles.itemBody}>
        <span className={styles.itemTitle}>{title}</span>
        {details ? <span className={styles.itemDetails}>{details}</span> : null}
      </div>
    </li>
  );
}

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
              <Entry
                time="LODGE"
                title="Horseshoe Las Vegas"
                details="3 rooms with 2 queen beds · Conf #9087394168546"
              />
              <Entry
                time="9:00 AM"
                title="Horseshoe Pool"
                details="$100 · 9:00 AM – 12:30 PM"
              />
              <Entry
                time="1:15 PM"
                title="Atomic Golf"
                details="1:15 – 3:15 PM · Happy Hour #2128493 · 9 people"
              />
              <Entry
                time="3:15 PM"
                title="Afternoon on the Strip"
                details="Hang at the pool · Gamble · Walk the strip"
              />
              <Entry
                time="7:00 PM"
                title="Comedy Cellar"
                details="7:00 – 8:30 PM · $34.24 pp · Conf #VCWS-004P9XMZ"
              />
              <Entry
                time="9:00 PM"
                title="Heart Attack Grill · Fremont"
                details="Win lots of money"
              />
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
              <Entry time="9:00 AM" title="Wake Up" />
              <Entry
                time="AM"
                title="Costco Alcohol Run"
                details="222 S M.L.K. Blvd"
              />
              <Entry
                time="AM"
                title="Breakfast"
                details="On the way or at the course"
              />
              <Entry
                time="9:45 AM"
                title="Drive to Coyote Springs"
                details="~50 min · Leave by 9:45"
              />
              <Entry
                time="11:30 AM"
                title="Golf at Coyote Springs"
                details="Tee times: 11:30 · 11:40 · 11:50"
              />
              <Entry time="MID" title="Lunch at the Course" />
              <Entry time="PM" title="Costco Food Delivery" />
              <Entry
                time="4:00 PM"
                title="Check-In · The House"
                details="Check-in time: 4:00 PM"
              />
              <Entry
                time="4:45 PM"
                title="Pick Up Chipotle · Washington"
                details="After golf"
              />
              <Entry time="EVE" title="Dinner — Chipotle Bowls" />
              <Entry
                time="EVE"
                title="House Games"
                details="Team Draft · Shirt Decoration · Beer Pong · Civil War"
              />
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
            <div className={styles.dayLocation}>DD · Yard Games</div>
          </div>
        </div>
        <div className={styles.dayRight}>
          <div className={styles.scheduleWrap}>
            <ul className={styles.scheduleList}>
              <Entry
                time="AM"
                title="Breakfast at the House"
                details="Mimosas & Bloodys"
              />
              <Entry
                time="AM"
                title="Tournaments (Simultaneous)"
                details="Spikeball · Pickleball · Die · Trivia"
              />
              <Entry
                time="MID"
                title="Lunch — Taco Bowls"
                details="Leftovers"
              />
              <Entry
                time="PM"
                title="Afternoon Games"
                details="Trout About It Elim · Blindfolded Obstacle Course"
              />
              <Entry time="EVE" title="Dinner — Hibachi" />
              <Entry
                time="EVE"
                title="Night Games"
                details="21 Cup · Survivor"
              />
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
            <div className={styles.dayLocation}>Golf · Drinking Day</div>
          </div>
        </div>
        <div className={styles.dayRight}>
          <div className={styles.scheduleWrap}>
            <ul className={styles.scheduleList}>
              <Entry time="AM" title="Breakfast at the Course" />
              <Entry
                time="8:30 AM"
                title="Golf at Coral Canyon"
                details="Tee times: 8:30 · 8:40 · 8:50"
              />
              <Entry
                time="MID"
                title="Lunch at the House"
                details="Sandwiches"
              />
              <Entry
                time="PM"
                title="American Challenge"
                details="Pre-order Domino&apos;s"
              />
              <Entry time="PM" title="Cheers to the Governor" />
              <Entry time="EVE" title="Dinner — Domino&apos;s" />
              <Entry time="EVE" title="Relay Tournament" />
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
            <div className={styles.dayLocation}>DD · Chill · Finale</div>
          </div>
        </div>
        <div className={styles.dayRight}>
          <div className={styles.scheduleWrap}>
            <ul className={styles.scheduleList}>
              <Entry
                time="AM"
                title="Breakfast at the House"
                details="Mimosas & Bloodys"
              />
              <Entry
                time="10:45 AM"
                title="Drive to Sand Hollow"
                details="~18 min · Leave by 10:45 to hang and have a drink before the round"
              />
              <Entry
                time="12:00 PM"
                title="9-Hole Scramble · Links at Sand Hollow"
                details="Tee times: 12:00 · 12:09 · 12:18 · 12:27"
              />
              <Entry
                time="AFTER"
                title="Lunch at the Course"
                details="Menu depends on how much food we have left"
              />
              <Entry time="PM" title="Chill Time" />
              <Entry time="EVE" title="Dinner — Burgers & Dawgs" />
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
              <Entry
                time="11:00 AM"
                title="Checkout · Horseshoe"
                details="Check-out time: 11:00 AM"
              />
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
