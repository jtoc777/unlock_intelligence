/**
 * What: Card link preview for one insight article.
 * Why: Reused on index grid and related section below posts.
 * How: next/link wraps GlassCard with line-clamped subtitle.
 * Deps: next/link, GlassCard, cn utility.
 */
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

interface InsightCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
  className?: string;
}

export function InsightCard({
  slug,
  title,
  subtitle,
  category,
  readingTime,
  className,
}: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className={cn("group block", className)}
      aria-label={`Read article: ${title}`}
    >
      <GlassCard className="flex h-full flex-col transition-colors duration-200 group-hover:border-white/[0.12] group-hover:bg-white/[0.05]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
          {category}
        </p>

        <h3 className="mt-3 text-lg font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-muted-foreground">{readingTime}</span>
          <span className="text-sm font-medium text-[var(--navy)] transition-transform duration-200 group-hover:translate-x-0.5">
            Read &rarr;
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
