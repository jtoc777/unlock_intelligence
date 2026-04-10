/**
 * What: Pricing cards for individual and team enrollment.
 * Why: Primary commercial decision section on homepage.
 * How: Reads lib/constants; GlassCards with CTAs and badges.
 * Deps: lib/constants, next/link, Button, ScrollReveal, GlassCard.
 */
"use client";

import Link from "next/link";
import { Check, Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { FOUNDING_SPOTS_REMAINING, FOUNDING_SPOTS_TOTAL } from "@/lib/constants";

const professionalFeatures = [
  "Both live sessions (8 hours total)",
  "Full curriculum access + session recordings",
  "Private cohort community (6 months)",
  "AI Integration Blueprint for your workflows",
  "90-Day AI Roadmap (yours to keep)",
  "Certificate of completion",
];

const corporateFeatures = [
  "5+ seats, custom scheduling",
  "Role-specific curriculum tailoring",
  "Private cohort for your team only",
  "Executive summary report post-program",
  "Volume pricing & invoicing available",
];

export function Enroll() {
  return (
    <SectionWrapper id="enroll" className="tone-enroll">
        <ScrollReveal>
        <div className="mb-12 space-y-2 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
            Enroll
          </p>
          <h2 className="text-3xl font-medium tracking-[-0.022em] sm:text-4xl">
            Enroll your team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
            Spring 2026 cohort is open. Founding members get our lowest
            price and direct access to the instructors to shape the
            curriculum. Reach out and we&rsquo;ll send a proposal within
            a business day.
          </p>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <div className="mx-auto mb-8 flex items-center justify-center gap-2 text-sm">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--sage)]" aria-hidden="true" />
          <span className="font-medium text-foreground/90">
            {FOUNDING_SPOTS_REMAINING} of {FOUNDING_SPOTS_TOTAL} founding spots remaining
          </span>
        </div>
        </ScrollReveal>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Corporate License */}
        <ScrollReveal>
          <GlassCard className="relative flex h-full flex-col border-[var(--navy)]/30 bg-[var(--navy)]/[0.06] hover:border-[var(--navy)]/50">
            <span className="mb-4 inline-block rounded-full bg-[var(--navy)]/10 px-3 py-1 text-xs font-medium text-[var(--navy)]">
              Recommended for organizations
            </span>
            <h3 className="mb-2 text-xl font-medium">Team Training</h3>
            <p className="mb-4 text-sm text-foreground/70">
              Bring the program to your team. We&rsquo;ll tailor the curriculum
              to your industry and run a private cohort.
            </p>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">Starting at $1,095</span>
                <span className="text-sm text-foreground/70">/seat</span>
              </div>
              <p className="mt-1 text-xs font-medium text-foreground/70">
                Founding cohort rate
              </p>
              <p className="mt-0.5 text-xs text-foreground/55">
                Increases to $1,595/seat after Spring 2026
              </p>
            </div>
            <ul className="mb-0 space-y-3">
              {corporateFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sage)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="mt-auto h-11 w-full rounded-none bg-foreground text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              render={<Link href="/contact?type=corporate" />}
            >
              Request a proposal
            </Button>
          </GlassCard>
        </ScrollReveal>

        {/* Professional Seat */}
        <ScrollReveal delay={150}>
          <GlassCard className="flex h-full flex-col">
            <span className="mb-4 inline-block rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-foreground/55">
              For individuals
            </span>
            <h3 className="mb-2 text-xl font-medium">Individual Enrollment</h3>
            <p className="mb-4 text-sm text-foreground/70">
              Join an upcoming cohort on your own. You&rsquo;ll work
              alongside peers from different industries, which tends to
              make the conversations better.
            </p>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">$1,295</span>
                <span className="text-sm text-foreground/70">per person</span>
              </div>
              <p className="mt-1 text-xs font-medium text-foreground/70">
                Founding cohort rate
              </p>
              <p className="mt-0.5 text-xs text-foreground/55">
                Increases to $1,995 after Spring 2026
              </p>
            </div>
            <ul className="mb-0 space-y-3">
              {professionalFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sage)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              variant="outline"
              className="mt-auto h-11 w-full rounded-none border-foreground/30 bg-transparent text-[15px] font-medium text-foreground transition-colors duration-150 hover:bg-foreground/5 hover:border-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              render={<Link href="/contact" />}
            >
              Get started
            </Button>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Guarantee */}
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-[var(--sage)]/20 bg-[var(--sage)]/[0.06] px-6 py-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 shrink-0 text-[var(--sage)]" />
            <p className="text-base font-medium text-foreground/90">
              Risk-free guarantee
            </p>
          </div>
          <p className="mt-2 text-sm text-foreground/70">
            If your team finishes both sessions and doesn&rsquo;t feel
            they gained usable skills, we&rsquo;ll refund you. No
            paperwork.
          </p>
        </div>
    </SectionWrapper>
  );
}
