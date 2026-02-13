export const ATTENDEES = [
  "Jonas",
  "Riley",
  "RG",
  "Hayes",
  "August",
  "Keaton",
  "Jake",
  "Bridger",
  "Mason",
  "Tim",
  "Jay",
  "Luke",
  "Tobin",
  "AJ",
] as const;

export const CATEGORIES = [
  { key: "golf", label: "Golf Ability" },
  { key: "americanChallenge", label: "American Challenge Ability" },
  { key: "athleticism", label: "General Athleticism" },
  { key: "drinkingGame", label: "Drinking Game Ability" },
  { key: "drugHandling", label: "Drug Handling Ability" },
] as const;

export type Attendee = (typeof ATTENDEES)[number];
export type CategoryKey = (typeof CATEGORIES)[number]["key"];
