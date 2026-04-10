/**
 * What: Lists all insight articles as cards.
 * Why: Hub route linking to long-form marketing content.
 * How: Maps insights data to InsightCard grid layout.
 * Deps: data/insights, SectionWrapper, ScrollReveal.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/data/insights";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InsightCard } from "@/components/insights/insight-card";
import { GradientDivider } from "@/components/ui/gradient-divider";

export const metadata: Metadata = {
  title: "Insights | Unlock Intelligence",
  description:
    "Perspectives on AI workforce development — from the classroom and the enterprise.",
  openGraph: {
    title: "Insights | Unlock Intelligence",
    description:
      "Perspectives on AI workforce development — from the classroom and the enterprise.",
  },
};

export default function InsightsPage() {
  return (
    <main className="min-w-0 pt-28 pb-[max(6rem,calc(1.5rem+env(safe-area-inset-bottom)))]">
      <SectionWrapper>
        {/* Hero */}
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
              Insights
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-[-0.022em] sm:text-4xl">
              Perspectives on AI workforce development
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              From the classroom and the enterprise.
            </p>
          </div>
        </ScrollReveal>

        <GradientDivider />

        {/* Article grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 100}>
              <InsightCard
                slug={article.slug}
                title={article.title}
                subtitle={article.subtitle}
                category={article.category}
                readingTime={article.readingTime}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Subtle CTA */}
        <ScrollReveal delay={insights.length * 100}>
          <div className="mt-16 text-center">
            <p className="text-foreground/70">
              Want to bring structured AI training to your team?
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-block text-sm font-medium text-foreground/70 transition-colors hover:text-white"
            >
              Get in touch
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </main>
  );
}
