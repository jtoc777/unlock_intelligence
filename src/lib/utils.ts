/**
 * What: Merges Tailwind class strings safely.
 * Why: Conditional styles without conflicting utilities.
 * How: clsx then tailwind-merge dedupes conflicting classes.
 * Deps: clsx, tailwind-merge.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
