/**
 * What: Icon grid of tangible workshop outputs.
 * Why: Shows concrete artifacts buyers receive from training.
 * How: GlassCard grid with inline icon layout, ScrollReveal on sections.
 * Deps: lucide icons, SectionWrapper, GlassCard, GradientDivider, ScrollReveal.
 */
"use client";

import { BookOpen, GitBranch, Map, Award, FileText, Users } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const deliverables = [
  { icon: BookOpen, title: "AI Integration Blueprint", description: "Maps where AI fits in your team\u2019s processes" },
  { icon: GitBranch, title: "Workflow Automation Map", description: "Ready to implement Monday morning" },
  { icon: Map, title: "90-Day AI Strategy", description: "Your personal implementation roadmap" },
  { icon: Award, title: "Completion Certificate", description: "For L&D records and LinkedIn" },
  { icon: FileText, title: "Executive Summary", description: "Team competency report for leadership" },
  { icon: Users, title: "6-Month Community Access", description: "Ongoing peer support and resources" },
];

export function Deliverables() {
  return (
    <>
      <GradientDivider direction="light-to-dark" />
      <SectionWrapper id="deliverables" className="tone-deliverables">
        <ScrollReveal>
          <div className="mb-8 space-y-2 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
              Deliverables
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.022em] sm:text-4xl">
              What you leave with
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              Documents and tools, not just slides.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="h-full p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--navy-deep)]/20">
                    <Icon className="h-5 w-5 text-[var(--navy)]" />
                  </div>
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
