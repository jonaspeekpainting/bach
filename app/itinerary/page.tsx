"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
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
  const [opened, { toggle }] = useDisclosure();

  const fontClass = `${bebas.variable} ${playfair.variable} ${inter.variable}`;

  return (
    <AppShell footer={{ height: 60 }}>
      <AppShell.Main p={0}>
        <div className={`${styles.itineraryRoot} ${fontClass}`}>
          <div className={styles.container}>
            <div className={styles.hero}>
              <div className={styles.heroSubtitle}>Itinerary</div>
              <h1>
                Peek Weekend
                <span className={styles.accent}>VEGAS · HURRICANE</span>
              </h1>
            </div>

            <div className={styles.themes}>
              <span className={styles.themeIcon}>⛳ Golf</span>
              <span className={styles.themeIcon}>🌊 Pool</span>
              <span className={styles.themeIcon}>🌵 Desert</span>
              <span className={styles.themeIcon}>🥃 Drinks</span>
              <span className={styles.themeIcon}>🤝 Guys</span>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagVegas}`}>
                Day One · Sin City Arrival
              </span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Wednesday</div>
                <div className={styles.dayLocation}>Las Vegas</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.time}>9:00 AM</span>
                  <span className={styles.itemTitle}>Horseshoe Pool</span>
                  <span className={styles.itemDetail}>
                    Cabana hang until 12:30. Easing into it the right way.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>1:15 PM</span>
                  <span className={styles.itemTitle}>Atomic Golf</span>
                  <span className={styles.itemDetail}>
                    Two hours of swings under the neon. Nine guys, two bays, all you can eat and drink.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>3:15 PM</span>
                  <span className={styles.itemTitle}>Free Range</span>
                  <span className={styles.itemDetail}>
                    Pool / blackjack / Walk the Strip. Dealer&apos;s choice.
                  </span>
                </li>
                <li>
                <span className={styles.time}>4:00 PM</span>
                  <span className={styles.itemTitle}>Check In · Horseshoe</span>
                  <span className={styles.itemDetail}>
                    Three rooms, two queens apiece. Drop bags, grab swimsuits. Hopefully we can check in early.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>7:00 PM</span>
                  <span className={styles.itemTitle}>Comedy Cellar</span>
                  <span className={styles.itemDetail}>
                    Ninety minutes of jokes. Quiet hands, loud laughs.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>9:00 PM</span>
                  <span className={styles.itemTitle}>Fremont Street · Heart Attack Grill</span>
                  <span className={styles.itemDetail}>Dinner with a defibrillator on standby.</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Late Night</span>
                  <span className={styles.itemDetail}>Win lots of money.</span>
                </li>
              </ul>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagGolf}`}>
                Day Two · From the Strip to the Sand
              </span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Thursday</div>
                <div className={styles.dayLocation}>Hurricane</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.time}>9:00 AM</span>
                  <span className={styles.itemTitle}>Rise & Shine</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Costco Run · Liquor & Provisions</span>
                  <span className={styles.itemDetail}>Stock the cart. Stock the coolers.</span>
                </li>
                <li>
                  <span className={styles.time}>9:45 AM</span>
                  <span className={styles.itemTitle}>Roll Out for Coyote Springs</span>
                  <span className={styles.itemDetail}>
                    Breakfast on the road or at the clubhouse. 50-minute drive into the desert.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>11:30 AM</span>
                  <span className={styles.itemTitle}>Tee Times · Coyote Springs</span>
                  <div className={styles.teeTimes}>
                    <span className={styles.teeTime}>11:30</span>
                    <span className={styles.teeTime}>11:40</span>
                    <span className={styles.teeTime}>11:50</span>
                  </div>
                </li>
                <li>
                  <span className={styles.itemTitle}>Lunch at the Course</span>
                </li>
                <li>
                  <span className={styles.time}>4:00 PM</span>
                  <span className={styles.itemTitle}>Check-In · The House</span>
                  <span className={styles.itemDetail}>
                    Costco delivery should be waiting. Rooms are decided.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>4:45 PM</span>
                  <span className={styles.itemTitle}>Chipotle Pickup · Washington</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Dinner · Bowls on the Patio</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Team Draft · Shirt Decoration</span>
                  <span className={styles.itemDetail}>
                    The games begin.
                  </span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Fun activities at the house</span>
                  <span className={styles.itemDetail}>You&apos;ll find out when you get there.</span>
                </li>
              </ul>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagGuys}`}>
                Day Three · Designated Driver Day
              </span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Friday</div>
                <div className={styles.dayLocation}>Hurricane</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.itemTitle}>Breakfast at the House</span>
                  <span className={styles.itemDetail}>
                    Mimosas and Bloody Marys. Hair of the dog.
                  </span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Lunch · Taco Bowls (Leftovers)</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Dinner · Pan Chicken</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Fun activities at the house</span>
                  <span className={styles.itemDetail}>
                    Morning, afternoon, and well into the night. The lineup stays a surprise.
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagDesert}`}>
                Day Four · Sunrise in the Red Rocks
              </span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Saturday</div>
                <div className={styles.dayLocation}>Hurricane</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.itemTitle}>Breakfast at the Course</span>
                </li>
                <li>
                  <span className={styles.time}>8:30 AM</span>
                  <span className={styles.itemTitle}>Tee Times · Coral Canyon</span>
                  <div className={styles.teeTimes}>
                    <span className={styles.teeTime}>8:30</span>
                    <span className={styles.teeTime}>8:40</span>
                    <span className={styles.teeTime}>8:50</span>
                  </div>
                </li>
                <li>
                  <span className={styles.itemTitle}>Lunch at the House · Sandwiches</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Fun activities at the house</span>
                  <span className={styles.itemDetail}>
                    Bring your competitive side. It&apos;s a surprise.
                  </span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Dinner · Pulled Pork Sandos (Probably)</span>
                </li>
              </ul>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagPool}`}>
                Day Five · The Long Goodbye
              </span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Sunday</div>
                <div className={styles.dayLocation}>Hurricane</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.itemTitle}>Breakfast at the House</span>
                  <span className={styles.itemDetail}>Mimosas and Bloody Marys. Round two.</span>
                </li>
                <li>
                  <span className={styles.time}>10:45 AM</span>
                  <span className={styles.itemTitle}>Roll Out for Sand Hollow · The Links</span>
                  <span className={styles.itemDetail}>
                    Eighteen-minute drive. Get there early — a cold one before the round.
                  </span>
                </li>
                <li>
                  <span className={styles.time}>12:00 PM</span>
                  <span className={styles.itemTitle}>Noon Scramble · 9 Holes</span>
                  <div className={styles.teeTimes}>
                    <span className={styles.teeTime}>12:00</span>
                    <span className={styles.teeTime}>12:09</span>
                    <span className={styles.teeTime}>12:18</span>
                    <span className={styles.teeTime}>12:27</span>
                  </div>
                </li>
                <li>
                  <span className={styles.itemTitle}>Lunch at the Course</span>
                  <span className={styles.itemDetail}>Whatever the cooler still has to offer.</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Chill Time</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Dinner · Burgers & Dawgs</span>
                </li>
                <li>
                  <span className={styles.itemTitle}>Fun activities at the house</span>
                  <span className={styles.itemDetail}>Closing ceremonies. Bring your A-game.</span>
                </li>
              </ul>
            </div>

            <div className={styles.day}>
              <span className={`${styles.dayTag} ${styles.tagVegas}`}>Day Six · The Reckoning</span>
              <div className={styles.dayHeader}>
                <div className={styles.dayName}>Monday</div>
                <div className={styles.dayLocation}>Las Vegas</div>
              </div>
              <ul className={styles.schedule}>
                <li>
                  <span className={styles.time}>11:00 AM</span>
                  <span className={styles.itemTitle}>Checkout</span>
                  <span className={styles.itemDetail}>Heads home. Stories stay.</span>
                </li>
              </ul>
            </div>

            <div className={styles.closing}></div>
          </div>
        </div>
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
