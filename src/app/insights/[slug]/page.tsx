/**
 * What: Static insight article page by slug.
 * Why: SEO and deep links for each long-form piece.
 * How: generateStaticParams plus ArticleLayout body mapping.
 * Deps: data/insights, ArticleLayout, CalloutBlock, GlassCard.
 */
import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { insights, getInsightBySlug, getRelatedInsights } from "@/data/insights";
import { ArticleLayout } from "@/components/insights/article-layout";
import { CalloutBlock } from "@/components/insights/callout-block";
import { GlassCard } from "@/components/ui/glass-card";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return { title: "Not Found" };
  }

  return {
    title: `${article.title} | Unlock Intelligence`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedInsights(article.relatedSlugs).map(
    (r) => ({
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle,
      category: r.category,
      readingTime: r.readingTime,
    })
  );

  return (
    <main className="min-w-0 pt-28 pb-[max(6rem,calc(1.5rem+env(safe-area-inset-bottom)))]">
      <ArticleLayout
        title={article.title}
        subtitle={article.subtitle}
        author={article.author}
        category={article.category}
        readingTime={article.readingTime}
        keyTakeaways={article.keyTakeaways}
        cta={{
          heading: "Want to try a different approach?",
          subtext:
            "See what the program looks like.",
          buttonText: article.cta.text,
          buttonHref: article.cta.href,
        }}
        relatedArticles={relatedArticles}
      >
        {article.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="mt-10 mb-4 text-2xl font-semibold">
              {section.heading}
            </h2>

            {/* Stat highlights */}
            {section.stats && section.stats.length > 0 && (
              <div className="my-6 grid gap-4 sm:grid-cols-3">
                {section.stats.map((stat) => (
                  <GlassCard
                    key={stat.label}
                    className="p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-[var(--navy)] md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-foreground/30">
                      {stat.source}
                    </p>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Paragraphs */}
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 leading-relaxed text-foreground/80"
              >
                {paragraph}
              </p>
            ))}

            {/* Styled bullet list */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="my-6 space-y-3 border-l-2 border-white/[0.06] pl-5">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet.bold}
                    className="text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="font-semibold text-foreground">
                      {bullet.bold}:
                    </span>{" "}
                    {bullet.text}
                  </li>
                ))}
              </ul>
            )}

            {/* Comparison table */}
            {section.comparison && (
              <div className="my-6 w-full min-w-0 max-w-full overflow-x-auto rounded-xl border border-white/[0.06]">
                <div className="min-w-[520px]">
                  <div className="grid grid-cols-[1fr_1fr_1fr] text-sm">
                    <div className="border-b border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" />
                    <div className="border-b border-l border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.comparison.leftHeader}
                    </div>
                    <div className="border-b border-l border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                      {section.comparison.rightHeader}
                    </div>
                    {section.comparison.rows.map((row) => (
                      <Fragment key={row.label}>
                        <div className="border-b border-white/[0.06] px-4 py-3 text-xs font-medium text-foreground/70">
                          {row.label}
                        </div>
                        <div className="border-b border-l border-white/[0.06] px-4 py-3 text-xs text-muted-foreground">
                          {row.left}
                        </div>
                        <div className="border-b border-l border-white/[0.06] px-4 py-3 text-xs text-foreground/90">
                          {row.right}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Callout block */}
            {section.callout && <CalloutBlock quote={section.callout} />}
          </div>
        ))}
      </ArticleLayout>
    </main>
  );
}
