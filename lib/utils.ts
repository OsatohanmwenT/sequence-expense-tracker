import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {format} from "date-fns";

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
  month: string;
  totalSpent: number;
}

export const fillData = (data: FillDataType[], maxLength: number): FillDataType[] => {
  const allMonths = Array.from({ length: maxLength }, (_, i) =>
      format(new Date(new Date().getFullYear(), i), "MMM")
  );

  return allMonths.map((month) => {
    const existing = data.find((item) => item.month === month);
    return existing || {month, totalSpent: 0};
  });
};

