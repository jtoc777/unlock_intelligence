/**
 * What: Problem framing — editorial treatment with pain points.
 * Why: Explains pain before presenting the program solution.
 * How: Full-width editorial layout with prominent blockquote and ROI framing.
 * Deps: next/link, lucide, SectionWrapper, Button, GradientDivider.
 */
"use client";

import Link from "next/link";
import { TrendingDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const negativeItems = [
  "Teams experimenting with AI individually, with no shared approach",
  "People prompting differently, no way to share what works",
  "No standard for judging whether AI output is good enough to use",
  "Competitors in your space are training their teams, and the gap widens every quarter",
  "The only options are 8-week courses nobody finishes, or YouTube",
  "Your best people are figuring it out alone and keeping it to themselves",
];

export function Problem() {
  return (
    <>
      <GradientDivider direction="dark-to-light" />
      <SectionWrapper id="problem" theme="light">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start">
          {/* Copy column — editorial, no label */}
          <div className="space-y-6">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              The AI Skills Gap Is Already
              <br />
              Costing You.
            </h2>

            <p className="text-foreground/70 leading-relaxed">
              Leadership is talking about AI transformation. But across the
              org, adoption looks the same everywhere: a handful of early
              adopters experimenting alone, no shared playbook, and no way to
              tell if the output is any good.
            </p>

            <p className="text-foreground/70 leading-relaxed">
              That gap between &ldquo;we should use AI&rdquo; and &ldquo;we
              use AI well&rdquo; doesn&rsquo;t close on its own. It closes
              when someone gives your people a shared framework, hands-on
              practice, and a clear standard.
            </p>
          </div>

          {/* Negative checklist — no glass card, lighter treatment */}
          <div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-6">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
              What&rsquo;s actually happening across teams
            </p>
            <ul className="space-y-4">
              {negativeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROI framing — the number the champion forwards to their VP */}
        <div className="mt-14 border-l-2 border-[var(--navy-deep)]/30 rounded-r-lg bg-foreground/[0.02] px-5 py-8 text-left sm:px-6">
          <p className="text-base font-medium text-foreground/70">
            What inaction costs, per person, per year
          </p>
          <p className="mt-2 text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
            <TrendingDown className="mr-2 inline h-5 w-5 text-red-500/70 sm:h-6 sm:w-6" />
            $9,750
          </p>
          <p className="mt-2 text-base text-foreground/80">
            per employee, per year in recoverable time
          </p>
          <p className="mt-1.5 text-sm text-foreground/55">
            The average knowledge worker spends 2.5 hours/week on tasks AI
            could handle. At $75/hour, this adds up fast.
          </p>
        </div>

        {/* Industry stats strip */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              value: "82%",
              label:
                "of enterprises invest in AI training, yet 59% still report a skills gap",
              source: "DataCamp, 2026",
            },
            {
              value: "$5.5T",
              label:
                "in market performance at risk from the global AI skills gap",
              source: "IDC, 2026",
            },
            {
              value: "86%",
              label:
                "of companies are increasing their AI budgets this year",
              source: "Deloitte, 2026",
            },
          ].map((stat) => (
            <div key={stat.value} className="text-center sm:text-left">
              <span className="text-2xl font-medium text-foreground md:text-3xl">
                {stat.value}
              </span>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {stat.label}
              </p>
              <p className="mt-1 text-xs italic text-foreground/40">
                {stat.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="h-11 w-full sm:w-auto rounded-none bg-foreground px-7 text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            render={<Link href="/contact" />}
          >
            Talk to us about your team
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
