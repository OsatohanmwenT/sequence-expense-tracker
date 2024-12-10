import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {number} from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number | undefined): string => {
  if(num === undefined) return ""
  return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
