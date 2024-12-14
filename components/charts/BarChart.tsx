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
import {fillData, FillDataType, generateColor, generateWeeklyData} from "@/lib/utils";
import {ViewType} from "@/components/ChartSection";
import {AnalyticsWeekly} from "@/lib/entities";

interface Props {
    viewType: ViewType;
    data: FillDataType[];
}

export function BarChartComponent({viewType, data}: Props) {
    const chartData: FillDataType[] = viewType === 'weekly' ? generateWeeklyData() : fillData(data || [], 12);
    const dataKey = viewType === 'weekly' ? 'day' : 'month';

    const chartConfig = chartData.reduce<Record<string, { label: string; color: string }>>((config, item, index) => {
        const key = item[dataKey]; // this will either be 'day' or 'month'
        if (key) {
            config[key] = {
                label: key,
                color: generateColor(index), // Ensure color is generated correctly based on index
            };
        }
        return config;
    }, {} as Record<string, { label: string; color: string }>);



    return (
        <Card className="border-none font-inter shadow-none">
            <CardHeader>
                <div>
                    <CardTitle>Bar Chart - {viewType === 'weekly' ? 'Weekly' : 'Monthly'} Overview</CardTitle>
                    <CardDescription>
                        {viewType === 'weekly'
                            ? `Week of ${format(new Date(), "MMMM d, yyyy")}`
                            : `January - December ${format(new Date(), "yyyy")}`
                        }
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="h-[200px]">
                <ChartContainer className="h-[200px] w-full" config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey={"month"}
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
                                <Cell key={`cell-${entry.month}`} fill={chartConfig[entry[dataKey] as string].color} />
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

