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
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
          {category}
        </p>

        <h3 className="mt-3 text-lg font-medium text-foreground">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/70">
          {subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-foreground/55">{readingTime}</span>
          <span className="text-sm font-medium text-foreground/70 underline underline-offset-[6px] decoration-foreground/25 transition-colors group-hover:text-foreground group-hover:decoration-foreground/60">
            Read the article
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
