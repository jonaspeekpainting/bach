import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itinerary — Jonas' Bachelor Website",
  description: "The Bachelor Party — Vegas & Hurricane. Official itinerary.",
};

export default function ItineraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
