/**
 * What: Standard section padding, width, optional light theme.
 * Why: Keeps vertical rhythm consistent across homepage sections.
 * How: Section tag plus centered max-width div and theme class.
 * Deps: cn utility, React children only.
 */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function SectionWrapper({ children, id, theme = "dark", className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24",
        theme === "light" && "theme-light",
        className
      )}
    >
      <div className="mx-auto min-w-0 max-w-[1120px] px-6">
        {children}
      </div>
    </section>
  );
}
