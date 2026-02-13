"use client";

import { AppShell, Title, Container, Paper, Text, Stack, Divider, Group, ThemeIcon, Box, List, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation, MobileHeader } from "@/components/Navigation";
import {
  IconCalendar,
  IconMapPin,
  IconClock,
  IconGolf,
  IconBeer,
  IconToolsKitchen2,
  IconCar,
  IconBuilding,
  IconMoodSmile,
  IconCoin,
  IconChefHat,
  IconBread,
  IconMeat,
  IconGrill,
} from "@tabler/icons-react";

interface DaySchedule {
  day: string;
  location: string;
  activities: Array<{
    time?: string;
    title: string;
    details?: string;
    icon?: React.ComponentType<{ size?: number; stroke?: number }>;
    color?: string;
  }>;
}

const schedule: DaySchedule[] = [
  {
    day: "Wednesday",
    location: "Las Vegas",
    activities: [
      { time: "~12 PM", title: "Go Karting", details: "Go Karting - 3 races $70\nSpeed vegas - outdoors 3 races $85", icon: IconCar, color: "red" },
      { time: "2-4 PM", title: "Atomic Golf", icon: IconGolf, color: "green" },
      { time: "4-6 PM", title: "Hang at the pool of our hotel", icon: IconBuilding, color: "blue" },
      { time: "8 PM", title: "Comedy Show", details: "Comedy Cellar", icon: IconMoodSmile, color: "yellow" },
      { title: "Heartattack Grill for dinner", icon: IconToolsKitchen2, color: "orange" },
      { title: "Win lots of money", icon: IconCoin, color: "grape" },
    ],
  },
  {
    day: "Thursday",
    location: "Hurricane",
    activities: [
      { time: "9:00 AM", title: "Wake up", icon: IconClock, color: "gray" },
      { title: "Costco Alcohol in the morning", details: "222 S M.L.K. Blvd", icon: IconCar, color: "blue" },
      { title: "Breakfast on the way or at the course", icon: IconToolsKitchen2, color: "orange" },
      { time: "9:45 AM", title: "Leave for Coyote Springs", details: "50 minute drive", icon: IconCar, color: "cyan" },
      { time: "11:30 AM", title: "Tee Time", details: "11:30 & 11:40", icon: IconGolf, color: "green" },
      { title: "Lunch at the course", icon: IconToolsKitchen2, color: "orange" },
      { title: "Pick up Costco food in St. George After Golf", icon: IconCar, color: "blue" },
      { time: "4:00 PM", title: "Check-in Time", icon: IconBuilding, color: "indigo" },
      { title: "Dinner at the house - Taco Bowls", icon: IconToolsKitchen2, color: "orange" },
      { title: "Team Draft", icon: IconBeer, color: "yellow" },
      { title: "Shirt Decoration", icon: IconMoodSmile, color: "pink" },
      { title: "Beer Pong Tournament", icon: IconBeer, color: "red" },
    ],
  },
  {
    day: "Friday",
    location: "Hurricane",
    activities: [
      { title: "Breakfast at the course", icon: IconToolsKitchen2, color: "orange" },
      { time: "~8:00 AM", title: "Early tee time at Coral Canyon", icon: IconGolf, color: "green" },
      { title: "Lunch at the house (Sandwiches)", icon: IconToolsKitchen2, color: "orange" },
      { title: "Pickleball Tournament", icon: IconBeer, color: "blue" },
      { title: "Trout about it", icon: IconBeer, color: "cyan" },
      { title: "Blindfolded Obstacle Course", icon: IconBeer, color: "pink" },
      { title: "Relay Tournament", icon: IconBeer, color: "teal" },
      { title: "Dinner at the house - Pulled Pork Sandos", icon: IconToolsKitchen2, color: "orange" },
    ],
  },
  {
    day: "Saturday",
    location: "Hurricane",
    activities: [
      { title: "Breakfast at the house with Mimos and Bloodys", icon: IconToolsKitchen2, color: "orange" },
      { title: "Die + Spikeball for fun", icon: IconBeer, color: "blue" },
      { title: "Trivia", icon: IconBeer, color: "violet" },
      { title: "Lunch (Taco Bowls - leftovers)", icon: IconToolsKitchen2, color: "orange" },
      { title: "American Challenge", icon: IconBeer, color: "red" },
      { title: "Cheers to the Governor", icon: IconBeer, color: "yellow" },
      { title: "Dinner (Pan Chicken)", icon: IconToolsKitchen2, color: "orange" },
      { title: "21 Cup", icon: IconBeer, color: "teal" },
      { title: "Poker? Liars Dice", icon: IconBeer, color: "grape" },
    ],
  },
  {
    day: "Sunday",
    location: "Hurricane",
    activities: [
      { title: "Breakfast at the house with Mimos and Bloodys", icon: IconToolsKitchen2, color: "orange" },
      { time: "10:45 AM", title: "Leave for Sand Hollow", details: "18 minute drive - leave by 10:45 to hang and have a drink before the round", icon: IconCar, color: "cyan" },
      { time: "12:00 PM", title: "9 Hole scramble on links at sand hollow", details: "Tee times: 12:00, 12:09, 12:18, 12:27", icon: IconGolf, color: "green" },
      { title: "Lunch at the course after", details: "Menu depends on how much food we have left", icon: IconToolsKitchen2, color: "orange" },
      { title: "Some chill time", icon: IconMoodSmile, color: "blue" },
      { title: "Dinner (Burgers and dawgs)", icon: IconToolsKitchen2, color: "orange" },
      { title: "Civil War", icon: IconBeer, color: "red" },
      { title: "Survivor", icon: IconBeer, color: "indigo" },
    ],
  },
  {
    day: "Monday",
    location: "Las Vegas",
    activities: [
      { time: "11:00 AM", title: "Check-out Time", icon: IconBuilding, color: "indigo" },
    ],
  },
];

const meals = {
  breakfast: {
    name: "Breakfast Bar (Repeat Daily)",
    icon: IconBread,
    color: "yellow",
    items: [
      {
        category: "Main",
        items: ["Scrambled eggs (big skillet / flat top)", "Breakfast sausage links or patties"],
      },
      {
        category: "Carbs",
        items: ["Toast + butter", "OR bagels"],
      },
      {
        category: "Extras",
        items: ["Hot sauce", "Shredded cheese", "Fruit (bananas, oranges)", "Frozen hash browns (baked or pan-fried)"],
      },
    ],
  },
  lunch1: {
    name: "Lunch 1 – Friday 22nd - Italian Sub / Deli Sandwich Bar",
    icon: IconBread,
    color: "orange",
    items: [
      {
        category: "Ingredients",
        items: ["Hoagie rolls", "Ham, turkey, salami", "Provolone or mozzarella", "Lettuce, tomato, onion", "Mayo, mustard"],
      },
      {
        category: "Sides",
        items: ["Chips", "Pickles"],
      },
    ],
  },
  lunch2: {
    name: "Lunch 2 – Saturday 23rd - Taco Leftover Bowls",
    icon: IconToolsKitchen2,
    color: "red",
    items: [
      {
        category: "Ingredients",
        items: ["Leftover taco meat (from Dinner #2)", "Rice", "Beans", "Shredded cheese", "Tortillas or tortilla chips", "Salsa / sour cream"],
      },
    ],
  },
  dinner1: {
    name: "Dinner 1 — Tacos",
    icon: IconToolsKitchen2,
    color: "red",
    items: [
      {
        category: "Taco Meat (Ground Beef)",
        items: [
          "Brown beef in a large pan",
          "Drain excess fat",
          "Add seasoning + water per packet",
          "Simmer 5–10 min",
        ],
      },
      {
        category: "Optional Chicken Tacos",
        items: [
          "Dice chicken thighs",
          "Season with taco seasoning",
          "Sauté until cooked through",
        ],
      },
      {
        category: "Serve with",
        items: ["Warm tortillas", "Cheese, lettuce, salsa, sour cream", "Make extra on purpose → Lunch 2"],
      },
    ],
  },
  dinner2: {
    name: "Dinner 2 — Pulled Pork Sandwiches",
    icon: IconMeat,
    color: "orange",
    items: [
      {
        category: "Slow Cooker Method (Best)",
        items: [
          "Season pork heavily",
          "Place in a slow cooker (add sliced onion if using)",
          "Cook 8–10 hrs on LOW or 5–6 hrs on HIGH",
          "Shred with forks",
          "Mix with BBQ sauce",
        ],
      },
      {
        category: "Oven Backup",
        items: ["Cover tightly, bake 300°F for ~5 hours"],
      },
      {
        category: "Serve with",
        items: ["Buns", "Coleslaw", "Baked beans"],
      },
    ],
  },
  dinner3: {
    name: "Dinner 3 — Sheet Pan Chicken",
    icon: IconChefHat,
    color: "blue",
    items: [
      {
        category: "Ingredients",
        items: ["Chicken thighs", "Italian dressing or BBQ sauce", "Potatoes (chunked)", "Bell peppers & onions", "Olive oil", "Salt & pepper"],
      },
      {
        category: "Steps",
        items: [
          "Preheat oven to 425°F",
          "Toss potatoes + veggies with oil, salt, pepper",
          "Place on sheet pans",
          "Place chicken on top, brush with sauce",
          "Bake 40–45 min, flip chicken once",
          "Broil 3–5 min if you want crispy skin",
        ],
      },
    ],
  },
  dinner4: {
    name: "Dinner 4 — Grill Night",
    icon: IconGrill,
    color: "red",
    items: [
      {
        category: "Burgers",
        items: [
          "Season patties with salt & pepper",
          "Grill medium-high, ~3–4 min per side",
          "Add cheese last minute if using",
          "Cut tomatoes, onions, and lettuce",
          "Sautee mushrooms",
        ],
      },
      {
        category: "Sausages",
        items: [
          "Grill over medium heat",
          "Turn frequently to avoid splitting",
          "Cook until the internal temp is hot throughout",
        ],
      },
      {
        category: "Serve with",
        items: ["Buns", "Chips", "Store-bought potato salad or slaw"],
      },
    ],
  },
};

export default function SchedulePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      header={{ height: 60 }}
      footer={{ height: 60 }}
    >
      <MobileHeader />
      <AppShell.Main>
        <Container pt={{ base: "md", sm: "xl" }} pb={{ base: "md", sm: "xl" }} px={{ base: "xs", sm: "md" }} size="lg">
          <Title order={1} mb={{ base: "md", sm: "xl" }}>
            Schedule
          </Title>

          <Stack gap="md">
            {/* Calendar Section */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-blue-6)" }}>
              <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
                <ThemeIcon color="blue" variant="light" size="lg" radius="md">
                  <IconCalendar size={24} />
                </ThemeIcon>
                <Title order={2} c="dark.9">Calendar</Title>
              </Group>

              <Stack gap="lg">
                {schedule.map((day) => (
                  <Box key={day.day}>
                    <Group gap="xs" mb="sm">
                      <Title order={3} c="dark.9">{day.day}</Title>
                      <Badge color="blue" variant="light" size="sm">
                        <Group gap={4}>
                          <IconMapPin size={12} />
                          {day.location}
                        </Group>
                      </Badge>
                    </Group>
                    <Stack gap="xs">
                      {day.activities.map((activity, idx) => {
                        const Icon = activity.icon || IconClock;
                        const color = activity.color || "gray";
                        return (
                          <Group key={idx} gap="sm" align="flex-start" wrap="nowrap">
                            <ThemeIcon color={color} variant="light" size="sm" radius="sm" style={{ flexShrink: 0 }}>
                              <Icon size={16} />
                            </ThemeIcon>
                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Group gap="xs" mb={activity.details ? 2 : 0} wrap="nowrap">
                                {activity.time && (
                                  <Badge color="gray" variant="light" size="xs">
                                    {activity.time}
                                  </Badge>
                                )}
                                <Text fw={500} c="dark.9" size="sm" style={{ wordBreak: "break-word" }}>
                                  {activity.title}
                                </Text>
                              </Group>
                              {activity.details && (
                                <Text size="xs" c="dark.7" style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}>
                                  {activity.details}
                                </Text>
                              )}
                            </Box>
                          </Group>
                        );
                      })}
                    </Stack>
                    {day.day !== schedule[schedule.length - 1].day && <Divider mt="md" />}
                  </Box>
                ))}
              </Stack>
            </Paper>

            <Divider />

            {/* Meal Plan Section */}
            <Paper p={{ base: "sm", sm: "md" }} withBorder style={{ borderLeft: "4px solid var(--mantine-color-orange-6)" }}>
              <Group gap="sm" mb={{ base: "sm", sm: "md" }}>
                <ThemeIcon color="orange" variant="light" size="lg" radius="md">
                  <IconChefHat size={24} />
                </ThemeIcon>
                <Title order={2} c="dark.9">Meal Plan</Title>
              </Group>

              <Stack gap="lg">
                {/* Breakfast */}
                <Box>
                  <Group gap="xs" mb="sm">
                    <ThemeIcon color={meals.breakfast.color} variant="light" size="md" radius="md">
                      <meals.breakfast.icon size={18} />
                    </ThemeIcon>
                    <Title order={3} c="dark.9" size="h4">{meals.breakfast.name}</Title>
                  </Group>
                  {meals.breakfast.items.map((section, idx) => (
                    <Box key={idx} mb="xs">
                      <Text fw={600} size="sm" c="dark.9" mb={4}>{section.category}</Text>
                      <List size="sm" c="dark.7" spacing={2}>
                        {section.items.map((item, itemIdx) => (
                          <List.Item key={itemIdx}>{item}</List.Item>
                        ))}
                      </List>
                    </Box>
                  ))}
                </Box>

                <Divider />

                {/* Lunches */}
                <Box>
                  <Title order={3} c="dark.9" size="h4" mb="md">Lunches</Title>
                  <Stack gap="md">
                    {[meals.lunch1, meals.lunch2].map((lunch, idx) => (
                      <Box key={idx}>
                        <Group gap="xs" mb="sm">
                          <ThemeIcon color={lunch.color} variant="light" size="sm" radius="sm">
                            <lunch.icon size={16} />
                          </ThemeIcon>
                          <Text fw={600} size="sm" c="dark.9">{lunch.name}</Text>
                        </Group>
                        {lunch.items.map((section, sectionIdx) => (
                          <Box key={sectionIdx} mb="xs" ml="md">
                            <Text fw={600} size="xs" c="dark.8" mb={2}>{section.category}</Text>
                            <List size="xs" c="dark.7" spacing={1}>
                              {section.items.map((item, itemIdx) => (
                                <List.Item key={itemIdx}>{item}</List.Item>
                              ))}
                            </List>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                {/* Dinners */}
                <Box>
                  <Title order={3} c="dark.9" size="h4" mb="md">Dinners (4 Nights)</Title>
                  <Stack gap="md">
                    {[meals.dinner1, meals.dinner2, meals.dinner3, meals.dinner4].map((dinner, idx) => (
                      <Box key={idx}>
                        <Group gap="xs" mb="sm">
                          <ThemeIcon color={dinner.color} variant="light" size="sm" radius="sm">
                            <dinner.icon size={16} />
                          </ThemeIcon>
                          <Text fw={600} size="sm" c="dark.9">{dinner.name}</Text>
                        </Group>
                        {dinner.items.map((section, sectionIdx) => (
                          <Box key={sectionIdx} mb="xs" ml="md">
                            <Text fw={600} size="xs" c="dark.8" mb={2}>{section.category}</Text>
                            <List size="xs" c="dark.7" spacing={1}>
                              {section.items.map((item, itemIdx) => (
                                <List.Item key={itemIdx}>{item}</List.Item>
                              ))}
                            </List>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </AppShell.Main>
      <Navigation opened={opened} toggle={toggle} />
    </AppShell>
  );
}
