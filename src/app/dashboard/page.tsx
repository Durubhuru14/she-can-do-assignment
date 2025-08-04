import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { CookieUser } from "@/types/cookieUserType";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Clipboard from "@/components/ui/clipboard";
import ReferralLink from "@/components/ui/referralLink";

import { CheckCircle, HandCoins, Trophy, UserRoundPlus } from "lucide-react";
import { User } from "@/types/user";
import { formatRupees } from "@/lib/formatRupees";
import { ChartAreaLinear } from "@/components/ui/chart-area-link";
import { mergeAndSortRewards } from "@/lib/mergeAndSortRewards";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function getGreetingByHour(): string {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Good Morning 🌅";
  if (hour >= 12 && hour < 16) return "Good Afternoon ☀️";
  if (hour >= 16 && hour < 20) return "Good Evening 🌇";
  return "Good Night 🌙";
}

async function getDashboardData(username: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/users`);
    const users: User[] = await response.json();
    const user = users.find((user) => user.username === username);
    console.log(user);
    return user?.dashboardStats;
  } catch (error) {
    console.warn(error);
    throw new Error("There was an internal error, failed to fetch data");
  }
}

export default async function DashboardPage() {
  const user: CookieUser = await getUserFromCookie();
  const dashboardStats = await getDashboardData(user.username);
  const rewards = mergeAndSortRewards(dashboardStats?.rewards);

  const referralCode = `${user.username.toLowerCase()}${new Date().getFullYear()}`;
  const greeting = getGreetingByHour();
  return (
    <section className="px-4 py-4 sm:px-12 lg:px-20 w-full max-w-6xl mx-auto">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Hello {user.username} 👋, {greeting}
      </h2>
      <div className="w-full bg-secondary grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 rounded-md">
        {/* Name */}
        <Card>
          <CardHeader>
            <CardTitle>
              <h4 className="text-xl font-semibold tracking-tight">
                Intern Name
              </h4>
            </CardTitle>
            <CardDescription>
              <p>Display name of user.</p>
            </CardDescription>
            <CardAction>
              <Image
                src={user?.pfp}
                unoptimized
                alt="Profile"
                height={32}
                width={32}
                className="rounded-full object-cover border-2 border-accent shadow"
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-xl underline underline-offset-2 text-accent font-medium">
              {user.username}
            </p>
          </CardContent>
        </Card>
        {/* Referral */}
        <Card>
          <CardHeader>
            <CardTitle>
              <h4 className="text-xl font-semibold tracking-tight">
                Referral Code
              </h4>
            </CardTitle>
            <CardDescription>Share code to fellow volunteers</CardDescription>
            <CardAction>
              <UserRoundPlus />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="flex items-center justify-between text-xl relative font-medium bg-secondary p-2 rounded-md">
              {referralCode}
              <Clipboard referralCode={referralCode} />
            </p>
            <ReferralLink referralCode={referralCode} />
          </CardContent>
        </Card>
        {/* Total Donatio */}
        <Card>
          <CardHeader>
            <CardTitle>
              <h4 className="text-xl font-semibold tracking-tight">
                Total Donation Raised
              </h4>
            </CardTitle>
            <CardDescription>
              <p>Total donations raised by intern all time.</p>
            </CardDescription>
            <CardAction>
              <HandCoins />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {formatRupees(dashboardStats?.totalDonations)}
            </p>
          </CardContent>
        </Card>
        {/* Monthly Chart */}
        <ChartAreaLinear chartData={dashboardStats?.monthlyDonations} />
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Unlockables</CardTitle>
            <CardDescription>
              Complete missions to get badges and rewards.
            </CardDescription>
            <CardAction>
              <Trophy />
            </CardAction>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {rewards.map((reward) => (
                  <div key={reward.name}>
                    <div
                      className={`grid grid-cols-[40px_1fr_auto] items-center gap-4 p-2 rounded-lg bg-muted ${
                        reward.unlocked ? "" : "grayscale-100 opacity-80"
                      }`}
                    >
                      {/* 1. Icon */}
                      <Image
                        src={reward.icon}
                        alt={reward.name}
                        width={40}
                        height={40}
                        className="object-contain rounded-md border-2 border-primary"
                      />

                      {/* 2. Name + Description */}
                      <div className="flex flex-col">
                        <span className="font-medium">{reward.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {reward.description}
                        </span>
                      </div>

                      {/* 3. Progress */}
                      <span className="text-sm text-right text-primary font-medium">
                        {reward.unlocked ? (
                          <CheckCircle />
                        ) : (
                          `${reward.progress}/${reward.goal}`
                        )}
                      </span>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
