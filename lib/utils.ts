import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {addMonths, eachDayOfInterval, endOfWeek, format, startOfWeek} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number | undefined)=> {
  if(num === undefined) return "0.00"
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export function generateColor(index: number): string {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

export type FillDataType = {
  month?: string;
  day?: string;
  totalSpent: number;
};

export const fillData = (data: FillDataType[], maxLength: number) => {
  const fillerData = { month: "N/A", totalAmount: 0, totalSpent: 0 };
  const currentMonth = new Date();
  const repeatCount = maxLength - data.length;

  for (let i = 0; i < repeatCount; i++) {
    const monthName = format(addMonths(currentMonth, i), "MMM");
    data.push({ ...fillerData, month: monthName });
  }
  return data;
};

export function getWeekDates(): string[] {
  const today = new Date();
  const start = startOfWeek(today);
  const end = endOfWeek(today);

  return eachDayOfInterval({ start, end }).map(day => format(day, 'EEE'));
}

export function generateWeeklyData(): FillDataType[] {
  const weekDays = getWeekDates();
  console.log(weekDays)
  return weekDays.map(day => ({
    day,
    totalSpent: 0
  }));
}


