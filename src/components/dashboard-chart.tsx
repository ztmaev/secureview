'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', views: 186, revenue: 80 },
  { month: 'February', views: 305, revenue: 200 },
  { month: 'March', views: 237, revenue: 120 },
  { month: 'April', views: 73, revenue: 190 },
  { month: 'May', views: 209, revenue: 130 },
  { month: 'June', views: 214, revenue: 140 },
];

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--secondary-foreground))',
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function DashboardChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Analytics Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              yAxisId="left"
              orientation="left"
              stroke="hsl(var(--primary))"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--secondary-foreground))"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} yAxisId="left" />
            <Bar dataKey="views" fill="var(--color-views)" radius={4} yAxisId="right" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
