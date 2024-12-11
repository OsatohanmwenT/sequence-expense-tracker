"use client";

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import { format } from "date-fns";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { fillData, generateColor } from "@/lib/utils";

const data = [
    { month: "Jan", totalSpent: 18700 },
    { month: "Feb", totalSpent: 20000 },
    { month: "Mar", totalSpent: 27500 },
    { month: "Apr", totalSpent: 17300 },
    { month: "May", totalSpent: 9000 },
];

const chartData = fillData(data, 12);

const chartConfig = chartData.reduce((config, item, index) => {
    config[item.month] = {
        label: item.month,
        color: generateColor(index),
    };
    return config;
}, {} as Record<string, { label: string; color: string }>);

export function BarChartComponent() {
    return (
        <Card className="border-none font-inter shadow-none">
            <CardHeader>
                <CardTitle>Bar Chart - Monthly Overview</CardTitle>
                <CardDescription>January - December {format(new Date(), "yyyy")}</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
                <ChartContainer className="h-[200px] w-full" config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar
                            dataKey="totalSpent"
                            fillOpacity={0.8}
                            radius={4}
                            strokeWidth={2}
                        >
                            {chartData.map((entry) => (
                                <Cell key={`cell-${entry.month}`} fill={chartConfig[entry.month].color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total expenses for January to December
                </div>
            </CardFooter>
        </Card>
    );
}

