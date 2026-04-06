/**
 * What: Bulleted key takeaways inside a GlassCard.
 * Why: Skimmable summary before long article body text.
 * How: Maps string array to icon rows with checkmarks.
 * Deps: GlassCard, lucide CheckCircle2, cn utility.
 */
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2 } from "lucide-react";

interface KeyTakeawaysProps {
  takeaways: string[];
  className?: string;
}

export function KeyTakeaways({ takeaways, className }: KeyTakeawaysProps) {
  return (
    <GlassCard className={cn("my-8", className)}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Key Takeaways
      </p>
      <ul className="space-y-3" role="list">
        {takeaways.map((takeaway) => (
          <li
            key={takeaway}
            className="flex min-w-0 items-start gap-3 text-sm leading-relaxed text-foreground/90"
          >
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--navy)]"
              aria-hidden="true"
            />
            <span className="min-w-0 break-words">{takeaway}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
