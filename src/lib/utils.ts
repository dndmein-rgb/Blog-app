import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // keep letters, numbers, spaces, hyphens
    .replace(/\s+/g, "-")         // collapse spaces → dash
    .replace(/-+/g, "-");         // collapse multiple dashes
}
