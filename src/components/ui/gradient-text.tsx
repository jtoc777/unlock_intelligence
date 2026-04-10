/**
 * What: Inline span with navy-to-amber gradient text fill.
 * Why: Brand emphasis on headlines and logo wordmark.
 * How: bg-clip-text transparent text with gradient utilities.
 * Deps: cn utility, ReactNode children.
 */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-br from-[#94BDE0] to-[#C49A3C] bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}
