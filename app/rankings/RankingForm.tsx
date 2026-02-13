"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Select,
  Button,
  Stack,
  Paper,
  Text,
  Group,
  Alert,
  Box,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { ATTENDEES, CATEGORIES } from "@/lib/constants";
import type { RankingSubmission } from "@/lib/edge-config";

interface RankingFormData {
  submittedBy: string;
  rankings: {
    golf: Record<string, number>;
    americanChallenge: Record<string, number>;
    athleticism: Record<string, number>;
    drinkingGame: Record<string, number>;
    drugHandling: Record<string, number>;
  };
}

interface SortableItemProps {
  id: string;
  attendee: string;
  rank: number;
}

function SortableItem({ id, attendee, rank }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={{
        ...style,
        padding: "var(--mantine-spacing-sm)",
        marginBottom: "var(--mantine-spacing-xs)",
        backgroundColor: "var(--mantine-color-gray-0)",
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "var(--mantine-radius-sm)",
        cursor: "grab",
        touchAction: "none",
      }}
      onMouseDown={(e) => {
        if (e.currentTarget.style.cursor === "grab") {
          e.currentTarget.style.cursor = "grabbing";
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = "grab";
      }}
    >
      <Group gap="sm" wrap="nowrap">
        <Box
          {...attributes}
          {...listeners}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--mantine-color-gray-6)",
            cursor: "grab",
          }}
        >
          <IconGripVertical size={20} stroke={1.5} />
        </Box>
        <Box style={{ flex: 1 }}>
          <Text fw={500} size="sm" c="dark.9">
            {attendee}
          </Text>
        </Box>
        <Text
          style={{
            minWidth: 40,
            textAlign: "center",
            fontWeight: 600,
            color: "var(--mantine-color-blue-6)",
          }}
        >
          #{rank}
        </Text>
      </Group>
    </Box>
  );
}

export function RankingForm() {
  console.log("RankingForm component rendered");
  
  const [submittedBy, setSubmittedBy] = useState<string | null>(null);
  const [categoryOrders, setCategoryOrders] = useState<
    Record<string, string[]>
  >({
    golf: [...ATTENDEES],
    americanChallenge: [...ATTENDEES],
    athleticism: [...ATTENDEES],
    drinkingGame: [...ATTENDEES],
    drugHandling: [...ATTENDEES],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setHasSubmitted] = useLocalStorage<boolean>({
    key: "ranking-submitted",
    defaultValue: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent, categoryKey: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategoryOrders((prev) => {
        const oldIndex = prev[categoryKey].indexOf(active.id as string);
        const newIndex = prev[categoryKey].indexOf(over.id as string);

        return {
          ...prev,
          [categoryKey]: arrayMove(prev[categoryKey], oldIndex, newIndex),
        };
      });
    }
  };

  const convertOrdersToRankings = (): RankingFormData["rankings"] => {
    const rankings: RankingFormData["rankings"] = {
      golf: {},
      americanChallenge: {},
      athleticism: {},
      drinkingGame: {},
      drugHandling: {},
    };

    CATEGORIES.forEach((category) => {
      const order = categoryOrders[category.key];
      order.forEach((attendee, index) => {
        rankings[category.key as keyof RankingFormData["rankings"]][attendee] =
          index + 1;
      });
    });

    return rankings;
  };

  const validateForm = (): boolean => {
    console.log("Validation - submittedBy:", submittedBy);
    console.log("Validation - categoryOrders:", categoryOrders);
    
    if (!submittedBy) {
      console.log("Validation failed: No name selected");
      setError("Please select your name");
      return false;
    }

    for (const category of CATEGORIES) {
      const order = categoryOrders[category.key];
      console.log(`Validation - ${category.label}:`, order.length, "attendees, expected", ATTENDEES.length);
      
      if (order.length !== ATTENDEES.length) {
        console.log(`Validation failed: ${category.label} has ${order.length} attendees, expected ${ATTENDEES.length}`);
        setError(`Please rank all attendees in ${category.label}`);
        return false;
      }

      // Check that all attendees are present
      const missing = ATTENDEES.filter((a) => !order.includes(a));
      if (missing.length > 0) {
        console.log(`Validation failed: Missing attendees in ${category.label}:`, missing);
        setError(`Missing attendees in ${category.label}: ${missing.join(", ")}`);
        return false;
      }
    }

    console.log("Validation passed!");
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    console.log("handleSubmit called", e);
    
    if (e) {
      e.preventDefault();
    }
    
    setError(null);

    console.log("Validating form...");
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    console.log("Form validation passed, starting submission...");
    setLoading(true);

    try {
      const rankings = convertOrdersToRankings();
      const submission: RankingSubmission = {
        submittedBy: submittedBy!,
        timestamp: new Date().toISOString(),
        rankings,
      };

      console.log("Submitting rankings...", submission);

      const response = await fetch("/api/rankings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Failed to submit rankings");
      }

      const result = await response.json();
      console.log("Submission result:", result);
      console.log("Write success:", result.writeSuccess);
      console.log("Submissions in response:", result.submissionCount);
      
      // Check if write was successful
      if (result.writeSuccess === false) {
        console.warn("Rankings submitted but may not have been saved to Edge Config");
        setError("Warning: Rankings submitted but may not have been saved. Check server logs.");
        setLoading(false);
        // Don't reload if write failed - let user see the error
        return;
      }

      console.log("Write successful, marking as submitted and reloading...");
      
      // Mark as submitted in localStorage
      setHasSubmitted(true);

      // Wait a moment to see logs, then reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit rankings");
      setLoading(false);
    }
  };

  return (
    <Container size="sm" pt="xl" pb={0} px="xs">
      <Stack gap="lg">
        <Title order={2}>Submit Your Rankings</Title>
        <Text size="sm">
          Drag and drop to order attendees in each category from best (top) to worst (bottom).
        </Text>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        <Select
          label="Your Name"
          placeholder="Select your name"
          data={ATTENDEES}
          value={submittedBy}
          onChange={(value) => setSubmittedBy(value)}
          required
          labelProps={{
            c: "white",
          }}
          styles={{
            option: { color: "var(--mantine-color-dark-9)" },
            dropdown: { color: "var(--mantine-color-dark-9)" },
          }}
        />

        {CATEGORIES.map((category) => (
          <Paper key={category.key} p="md" withBorder>
            <Title order={4} mb="md" c="dark.9">
              {category.label}
            </Title>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, category.key)}
            >
              <SortableContext
                items={categoryOrders[category.key]}
                strategy={verticalListSortingStrategy}
              >
                <Stack gap={0}>
                  {categoryOrders[category.key].map((attendee, index) => (
                    <SortableItem
                      key={attendee}
                      id={attendee}
                      attendee={attendee}
                      rank={index + 1}
                    />
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          </Paper>
        ))}

        <Button
          type="button"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Button clicked!", e);
            handleSubmit(e);
          }}
          onMouseDown={(e) => {
            console.log("Button mouse down", e);
          }}
          loading={loading}
          fullWidth
          style={{ zIndex: 1000, position: "relative" }}
          mb="md"
        >
          Submit Rankings
        </Button>
      </Stack>
    </Container>
  );
}
