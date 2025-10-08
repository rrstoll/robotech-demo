import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Useful for conditional Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
