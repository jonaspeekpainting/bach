import { ATTENDEES, CATEGORIES, type Attendee, type CategoryKey } from "./constants";
import type { RankingSubmission } from "./edge-config";

export interface CategoryRanking {
  attendee: Attendee;
  averageRank: number;
  rank: number;
}

export interface OverallRanking {
  attendee: Attendee;
  averageScore: number;
  rank: number;
  categoryScores: Record<CategoryKey, number>;
}

export function calculateCategoryRankings(
  submissions: RankingSubmission[],
  categoryKey: CategoryKey
): CategoryRanking[] {
  if (submissions.length === 0) {
    return ATTENDEES.map((attendee) => ({
      attendee,
      averageRank: 0,
      rank: 0,
    }));
  }

  const categoryRankings: Record<Attendee, number[]> = {} as Record<Attendee, number[]>;

  // Initialize arrays for each attendee
  ATTENDEES.forEach((attendee) => {
    categoryRankings[attendee] = [];
  });

  // Collect all ranks for this category
  submissions.forEach((submission) => {
    const categoryRanking = submission.rankings[categoryKey];
    ATTENDEES.forEach((attendee) => {
      const rank = categoryRanking[attendee];
      if (rank !== undefined) {
        categoryRankings[attendee].push(rank);
      }
    });
  });

  // Calculate averages
  const averages: CategoryRanking[] = ATTENDEES.map((attendee) => {
    const ranks = categoryRankings[attendee];
    const averageRank =
      ranks.length > 0
        ? ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length
        : 0;
    return {
      attendee,
      averageRank,
      rank: 0, // Will be set after sorting
    };
  });

  // Sort by average rank (lower is better)
  averages.sort((a, b) => a.averageRank - b.averageRank);

  // Assign ranks
  averages.forEach((ranking, index) => {
    ranking.rank = index + 1;
  });

  return averages;
}

export function calculateOverallRankings(
  submissions: RankingSubmission[]
): OverallRanking[] {
  if (submissions.length === 0) {
    return ATTENDEES.map((attendee) => ({
      attendee,
      averageScore: 0,
      rank: 0,
      categoryScores: {
        golf: 0,
        americanChallenge: 0,
        athleticism: 0,
        drinkingGame: 0,
        drugHandling: 0,
      },
    }));
  }

  // Calculate category rankings first
  const categoryRankingsMap: Record<CategoryKey, CategoryRanking[]> = {} as Record<
    CategoryKey,
    CategoryRanking[]
  >;

  CATEGORIES.forEach((category) => {
    categoryRankingsMap[category.key] = calculateCategoryRankings(
      submissions,
      category.key
    );
  });

  // Create a map of attendee to their rank in each category
  const attendeeCategoryRanks: Record<
    Attendee,
    Record<CategoryKey, number>
  > = {} as Record<Attendee, Record<CategoryKey, number>>;

  ATTENDEES.forEach((attendee) => {
    attendeeCategoryRanks[attendee] = {} as Record<CategoryKey, number>;
    CATEGORIES.forEach((category) => {
      const categoryRanking = categoryRankingsMap[category.key].find(
        (r) => r.attendee === attendee
      );
      attendeeCategoryRanks[attendee][category.key] =
        categoryRanking?.rank || 0;
    });
  });

  // Calculate overall scores (average of category ranks, lower is better)
  const overallRankings: OverallRanking[] = ATTENDEES.map((attendee) => {
    const categoryScores: Record<CategoryKey, number> = {} as Record<
      CategoryKey,
      number
    >;
    let totalScore = 0;

    CATEGORIES.forEach((category) => {
      const rank = attendeeCategoryRanks[attendee][category.key];
      categoryScores[category.key] = rank;
      totalScore += rank;
    });

    const averageScore = totalScore / CATEGORIES.length;

    return {
      attendee,
      averageScore,
      rank: 0, // Will be set after sorting
      categoryScores,
    };
  });

  // Sort by average score (lower is better)
  overallRankings.sort((a, b) => a.averageScore - b.averageScore);

  // Assign ranks
  overallRankings.forEach((ranking, index) => {
    ranking.rank = index + 1;
  });

  return overallRankings;
}
