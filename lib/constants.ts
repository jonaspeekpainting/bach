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

export const GAMES = [
  "Chippies",
  "American Challenge",
  "Pickleball",
  "BP",
  "Relay",
  "Trout",
  "Cheers to the Governor",
  "Blindfolded Obstacle Course",
  "Survivor",
  "21 Cup",
  "Civil War",
  "Most Steps Walked on Saturday",
] as const;

export const TEAMS = [
  { id: "team1", name: "Team 1", color: "blue" },
  { id: "team2", name: "Team 2", color: "red" },
  { id: "team3", name: "Team 3", color: "green" },
  { id: "team4", name: "Team 4", color: "yellow" },
] as const;
