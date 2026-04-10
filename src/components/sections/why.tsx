/**
 * What: Three pillars why this program differs, plus comparison table.
 * Why: Differentiation after features and curriculum blocks.
 * How: Light theme section with top-border accent cards, responsive comparison grid.
 * Deps: lucide, SectionWrapper, GradientDivider, cn.
 */

"use client";

import { Monitor, Target, Clock, Check } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const comparisonRows = [
  { dimension: "Format", us: "Live, instructor-led", ga: "Live online", coursera: "Self-paced video", harvard: "In-person seminar" },
  { dimension: "Duration", us: "8 hours (2 sessions)", ga: "32 hours", coursera: "40+ hours", harvard: "3\u20135 days" },
  { dimension: "Deliverables", us: "3 custom documents", ga: "Certificate only", coursera: "Certificate only", harvard: "Certificate only" },
  { dimension: "Customization", us: "Industry-tailored", ga: "Generic", coursera: "Generic", harvard: "Limited" },
];

const cards = [
  {
    icon: Monitor,
    title: "Live, Not Recorded",
    description:
      "Every session is instructor-led with real-time Q&A, group exercises, and live feedback. Your team learns together, not in isolation.",
  },
  {
    icon: Target,
    title: "Outcomes, Not Theory",
    description:
      "Your team leaves with documents they\u2019ll use Monday morning, not notes they\u2019ll forget by Tuesday. Every deliverable is tailored to your team\u2019s workflows.",
  },
  {
    icon: Clock,
    title: "8 Hours, Not 8 Weeks",
    description:
      "Two half-day sessions. None of the self-paced modules that never get finished. Your team is up and running within a week.",
  },
];

export function Why() {
  return (
    <>
      <GradientDivider direction="dark-to-light" />
      <SectionWrapper id="why" theme="light">
          <ScrollReveal>
          <div className="mb-12 space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
              Why This Program
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.022em] sm:text-4xl">
              Why this program works
            </h2>
          </div>
          </ScrollReveal>

        <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <GlassCard key={card.title} className="pt-6 px-5 pb-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/[0.04]">
                <card.icon className="h-5 w-5 text-foreground/60" />
              </div>
              <h3 className="mb-2 text-lg font-medium">{card.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {card.description}
              </p>
            </GlassCard>
          ))}
        </div>
        </ScrollReveal>

          <h3 className="mt-16 mb-6 text-center text-2xl font-medium tracking-[-0.022em]">
            How we compare
          </h3>

          {/* Desktop: CSS grid table (md+ so tablet portrait gets stacked cards instead of a cramped 5-col) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 text-sm">
              {/* Header row */}
              <div className="p-3" />
              <div className="p-3 text-center font-medium text-foreground">
                Unlock Intelligence
              </div>
              <div className="p-3 text-center text-foreground/70">
                General Assembly
              </div>
              <div className="p-3 text-center text-foreground/70">
                Coursera
              </div>
              <div className="p-3 text-center text-foreground/70">
                Harvard Exec Ed
              </div>

              {/* Data rows */}
              {comparisonRows.map((row, i) => (
                <div key={row.dimension} className="col-span-5 grid grid-cols-5">
                  <div
                    className={cn(
                      "p-3 text-xs font-medium uppercase tracking-wider text-foreground/55",
                      i % 2 === 0 && "bg-foreground/[0.02]"
                    )}
                  >
                    {row.dimension}
                  </div>
                  <div
                    className={cn(
                      "p-3 text-center font-medium text-foreground bg-[var(--navy-deep)]/[0.06]",
                      i % 2 === 0 && "bg-[var(--navy-deep)]/[0.08]"
                    )}
                  >
                    <Check className="mr-1 inline h-4 w-4 text-[var(--sage-deep)]" />
                    {row.us}
                  </div>
                  <div
                    className={cn(
                      "p-3 text-center text-foreground/70",
                      i % 2 === 0 && "bg-foreground/[0.02]"
                    )}
                  >
                    {row.ga}
                  </div>
                  <div
                    className={cn(
                      "p-3 text-center text-foreground/70",
                      i % 2 === 0 && "bg-foreground/[0.02]"
                    )}
                  >
                    {row.coursera}
                  </div>
                  <div
                    className={cn(
                      "p-3 text-center text-foreground/70",
                      i % 2 === 0 && "bg-foreground/[0.02]"
                    )}
                  >
                    {row.harvard}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile + tablet portrait: stacked cards */}
          <div className="space-y-4 md:hidden">
            {comparisonRows.map((row) => (
              <div key={row.dimension} className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/55">
                  {row.dimension}
                </p>
                <p className="text-sm font-medium text-foreground"><Check className="mr-1 inline h-4 w-4 text-[var(--sage-deep)]" />{row.us}</p>
                <div className="mt-2 space-y-1 text-xs text-foreground/70">
                  <p>GA: {row.ga}</p>
                  <p>Coursera: {row.coursera}</p>
                  <p>Harvard: {row.harvard}</p>
                </div>
              </div>
            ))}
          </div>
      </SectionWrapper>
      <GradientDivider direction="light-to-dark" />
    </>
  );
}
