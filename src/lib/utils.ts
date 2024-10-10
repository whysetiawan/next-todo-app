import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<P extends readonly unknown[], T>(
  func: (...args: P) => T,
  time: number,
) {
  let timeout: NodeJS.Timeout | null;
  return (...args: P) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, time);
  };
}
