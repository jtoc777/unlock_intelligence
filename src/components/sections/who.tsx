/**
 * What: Fit matrix for ideal versus poor-fit buyers.
 * Why: Qualifies leads and sets expectations honestly.
 * How: Two GlassCard columns with check and X icon rows.
 * Deps: lucide, SectionWrapper, GlassCard, GradientDivider, ScrollReveal.
 */
"use client";

import { Check, X } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const yesItems = [
  "You\u2019re in a non-technical role and feel left behind",
  "You use AI occasionally but have no real system",
  "Your company is starting to talk about \u201CAI strategy\u201D",
  "You want to be the one who leads that conversation",
  "You\u2019ve tried tutorials but nothing has stuck",
  "You want practical skills, not theoretical overviews",
];

const noItems = [
  "You\u2019re already an AI engineer or developer",
  "You want a certificate without doing the work",
  "You prefer fully self-paced learning with no live interaction",
  "You think AI is a fad that\u2019ll blow over",
];

export function Who() {
  return (
    <>
      <GradientDivider direction="dark-to-light" />
      <SectionWrapper id="who" theme="light">
        <ScrollReveal>
          <div className="mb-12 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Who It&rsquo;s For</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">This Is Built for You If&hellip;</h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Yes column */}
          <ScrollReveal>
            <GlassCard className="h-full">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <Check className="h-5 w-5 text-emerald-500" />
                You&rsquo;re in the right place
              </div>
              <ul className="space-y-3">
                {yesItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>

          {/* No column */}
          <ScrollReveal delay={150}>
            <GlassCard className="h-full">
              <div className="mb-4 flex items-center gap-2 font-semibold text-muted-foreground">
                <X className="h-5 w-5 text-gray-500" />
                This isn&rsquo;t for you if&hellip;
              </div>
              <ul className="space-y-3">
                {noItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
