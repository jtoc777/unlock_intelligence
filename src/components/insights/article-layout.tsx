/**
 * What: Insight article chrome: breadcrumb, body slots, related.
 * Why: Shared layout for every /insights/[slug] page.
 * How: Mailto body embeds share URL built from pathname.
 * Deps: next/link, next/navigation, ScrollReveal, insight subcomponents.
 */
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { KeyTakeaways } from "@/components/insights/key-takeaways";
import { ArticleCta } from "@/components/insights/article-cta";
import { RelatedInsights } from "@/components/insights/related-insights";
import { ShareButton } from "@/components/insights/share-button";

interface RelatedArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime: string;
}

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  author: string;
  category: string;
  readingTime: string;
  keyTakeaways: string[];
  cta: {
    heading: string;
    subtext: string;
    buttonText: string;
    buttonHref: string;
  };
  relatedArticles: RelatedArticle[];
  children: ReactNode;
}

export function ArticleLayout({
  title,
  subtitle,
  author,
  category,
  readingTime,
  keyTakeaways,
  cta,
  relatedArticles,
  children,
}: ArticleLayoutProps) {
  const pathname = usePathname();
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://unlockintelligence.co";
  const articleUrl = `${origin}${pathname}`;

  const shareText = `Thought this was worth sharing with our team:\n\n${title}\n${articleUrl}\n\n— via Unlock Intelligence`;

  return (
    <SectionWrapper>
      {/* Breadcrumb */}
      <ScrollReveal className="min-w-0">
        <nav aria-label="Breadcrumb" className="mb-8 w-full min-w-0">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm text-foreground/55">
            <li className="shrink-0">
              <Link
                href="/insights"
                className="transition-colors hover:text-foreground"
              >
                Insights
              </Link>
            </li>
            <li className="shrink-0" aria-hidden="true">
              &rarr;
            </li>
            <li className="min-w-0 flex-1 truncate text-foreground/70">{title}</li>
          </ol>
        </nav>
      </ScrollReveal>

      {/* Article header */}
      <ScrollReveal className="min-w-0">
        <header className="mb-10 min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
              {category}
            </span>
            <span className="text-xs text-foreground/55" aria-label={`${readingTime} read`}>
              {readingTime}
            </span>
          </div>

          <h1 className="max-w-[720px] text-balance text-3xl font-medium tracking-[-0.022em] text-foreground sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-[720px] text-pretty text-lg leading-relaxed text-foreground/70">
            {subtitle}
          </p>

          {author && (
            <p className="mt-4 text-sm text-foreground/55">
              By {author}
            </p>
          )}
        </header>
      </ScrollReveal>

      {/* Key Takeaways */}
      <ScrollReveal delay={100} className="min-w-0">
        <div className="mx-auto min-w-0 max-w-[720px]">
          <KeyTakeaways takeaways={keyTakeaways} />
        </div>
      </ScrollReveal>

      {/* Article body */}
      <ScrollReveal delay={200} className="min-w-0">
        <article className={cn("mx-auto min-w-0 max-w-[720px]")}>
          {children}
        </article>
      </ScrollReveal>

      {/* Forward to team */}
      <div className="mx-auto my-8 min-w-0 max-w-[720px] text-center">
        <ShareButton
          title={title}
          url={articleUrl}
          text={shareText}
        />
      </div>

      {/* CTA */}
      <ScrollReveal delay={300} className="min-w-0">
        <div className="mx-auto min-w-0 max-w-[720px]">
          <ArticleCta
            heading={cta.heading}
            subtext={cta.subtext}
            buttonText={cta.buttonText}
            buttonHref={cta.buttonHref}
            articleTitle={title}
          />
        </div>
      </ScrollReveal>

      {/* Related Insights */}
      <ScrollReveal delay={400} className="min-w-0">
        <RelatedInsights articles={relatedArticles} />
      </ScrollReveal>
    </SectionWrapper>
  );
}
