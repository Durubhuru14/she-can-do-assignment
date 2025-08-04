import { masterRewards } from "@/data/rewards";
import { UserReward } from "@/types/user";

type Reward = {
  category: string;
  name: string;
  description: string;
  icon: string;
  goal: number;
};

type MergedReward = Reward & {
  progress: number;
  unlocked: boolean;
};

export function mergeAndSortRewards(
  userRewards: UserReward[] | undefined
): MergedReward[] {
  const userMap = new Map<string, UserReward>();
  if (!userRewards) return [];

  for (const reward of userRewards) {
    const key = `${reward.category}|${reward.name}`;
    userMap.set(key, reward);
  }

  const merged: MergedReward[] = masterRewards.map((reward) => {
    const key = `${reward.category}|${reward.name}`;
    const userData = userMap.get(key);
    return {
      ...reward,
      progress: userData?.progress ?? 0,
      unlocked: userData?.unlocked ?? false,
    };
  });

  // Sorting algo
  return merged.sort((a, b) => {
    // 1. Unlocked first
    if (a.unlocked !== b.unlocked) {
      return a.unlocked ? -1 : 1;
    }

    // 2. Same unlocked status → group by category
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }

    // 3. Same category → preserve original master order
    const aIndex = masterRewards.findIndex(
      (r) => r.category === a.category && r.name === a.name
    );
    const bIndex = masterRewards.findIndex(
      (r) => r.category === b.category && r.name === b.name
    );
    return aIndex - bIndex;
  });
}
