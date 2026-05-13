import type { Metadata } from "next";

const title = "The Bachelor Party — Itinerary";
const description =
  "Vegas & Hurricane: pool, golf, desert, and the official week plan.";

export const metadata: Metadata = {
  title: "Itinerary — Jonas' Bachelor Website",
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/itinerary",
    siteName: "Jonas' Bachelor Website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
