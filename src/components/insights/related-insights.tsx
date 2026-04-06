/**
 * What: Two-up grid of related InsightCard links.
 * Why: Keeps readers inside insights funnel after articles.
 * How: Slices related articles array then maps InsightCard.
 * Deps: InsightCard, cn for optional className merge.
 */
import { cn } from "@/lib/utils";
import { InsightCard } from "@/components/insights/insight-card";

interface RelatedArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
}

interface RelatedInsightsProps {
  articles: RelatedArticle[];
  className?: string;
}

export function RelatedInsights({ articles, className }: RelatedInsightsProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className={cn("my-12", className)}>
      <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Related Insights
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.slice(0, 2).map((article) => (
          <InsightCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle}
            category={article.category}
            readingTime={article.readingTime}
          />
        ))}
      </div>
    </div>
  );
}
