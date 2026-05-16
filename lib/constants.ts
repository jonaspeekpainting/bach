export const ATTENDEES = [
  "AJ",
  "August",
  "Bridger",
  "Hayes",
  "Jake",
  "Jay",
  "Jonas",
  "Keaton",
  "Luke",
  "Mason",
  "RG",
  "Riley",
  "Tim",
  "Tobin",
] as const;

export const CATEGORIES = [
  { key: "golf", label: "Golf" },
  { key: "drinking", label: "Drinking Ability" },
  { key: "athletics", label: "Athletics" },
] as const;

export type Attendee = (typeof ATTENDEES)[number];
export type CategoryKey = (typeof CATEGORIES)[number]["key"];

export const GAMES = [
  "Chippies",
  "American Challenge",
  "Pickleball",
  "Spikeball",
  "BP",
  "Relay",
  "Trout",
  "Die",
  "Cheers to the Governor",
  "Blindfolded Obstacle Course",
  "Survivor",
  "21 Cup",
  "Civil War",
  "Most Steps Walked on Saturday",
] as const;

export const TEAMS = [
  { id: "team1", name: "Team 1", color: "dark" },
  { id: "team2", name: "Team 2", color: "blue" },
  { id: "team3", name: "Team 3", color: "red" },
  { id: "team4", name: "Team 4", color: "green" },
] as const;

/** Mantine `color` names don't cover every shade — use for borders, etc. */
export const TEAM_HEX: Record<(typeof TEAMS)[number]["id"], string> = {
  team1: "#1a1a1a",
  team2: "#4169e1",
  team3: "#e03131",
  team4: "#2f9e44",
};
