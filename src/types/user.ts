export type UserReward = {
  category: "Referrals" | "Money Raised" | "Donations Made";
  name: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  goal: number;
};

export type ChartEntry = {
  month: string;
  amount: number;
};

export type DashboardStats = {
  totalDonations: number;
  monthlyDonations: ChartEntry[];
  rewards: UserReward[];
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  pfp: string;
  dashboardStats?: DashboardStats;
};
