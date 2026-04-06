/**
 * What: Styled blockquote callout for pull quotes.
 * Why: Breaks long article rhythm with emphasis visually.
 * How: Border-left accent block with optional className merge.
 * Deps: cn utility only.
 */
import { cn } from "@/lib/utils";

interface CalloutBlockProps {
  quote: string;
  className?: string;
}

export function CalloutBlock({ quote, className }: CalloutBlockProps) {
  return (
    <blockquote
      className={cn(
        "relative my-8 rounded-r-lg border-l-[3px] border-l-[var(--navy)] bg-white/[0.03] px-6 py-5 backdrop-blur-sm",
        className
      )}
    >
      <p className="text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
        {quote}
      </p>
    </blockquote>
  );
}
