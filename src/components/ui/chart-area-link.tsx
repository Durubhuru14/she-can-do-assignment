"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartEntry } from "@/types/user";
import { formatRupees } from "@/lib/formatRupees";

export const description = "A linear area chart";

const chartConfig = {
  desktop: {
    label: "Amount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaLinear({
  chartData,
}: {
  chartData: ChartEntry[] | undefined;
}) {
  const totalSum = chartData?.reduce(
    (sum, chartEntry) => sum + chartEntry.amount,
    0
  );
  const averageDonationPerMonth = totalSum ? totalSum / (chartData?.length ?? 1) : 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Donations</CardTitle>
        <CardDescription>
          Showing total donations received in the last months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-30}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="amount"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Average Donation: {formatRupees(averageDonationPerMonth)} /per
              month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Till {new Date().toLocaleString("default", { month: "long" })}{" "}
              {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
