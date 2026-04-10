/**
 * What: Expandable curriculum modules per session.
 * Why: Depth without wall of text on first view.
 * How: Accordion lists modules; links to contact for teams.
 * Deps: next/link, Accordion, SectionWrapper, ScrollReveal, Button.
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const sessionOne = {
  title: "Session One \u2014 Foundation & Fluency",
  modules: [
    {
      number: 1,
      title: "The Process Matrix",
      description:
        "The framework you need before any tool is useful. Most AI training thinks in verticals \u2014 give a person a tool, hope for productivity. We think in horizontals: map the process across people, tools, trainings, guardrails, and metrics.",
    },
    {
      number: 2,
      title: "The AI Toolkit",
      description:
        "Prompting, agents, and specialized tools \u2014 and where each one fits in a process. Structured prompting techniques, automation capabilities, and a decision framework for evaluating new tools as they appear.",
    },
    {
      number: 3,
      title: "Reading a Process",
      description:
        "How to map a real business process end to end: the steps, the people, the systems, the handoffs. You\u2019ll mark AI insertion points and estimate where the time savings live.",
    },
    {
      number: 4,
      title: "Building Your First AI Workflow",
      description:
        "Take the process you mapped and build the AI-assisted version. During the session. Enterprise case studies, then hands-on. You leave with something that works.",
    },
  ],
};

const sessionTwo = {
  title: "Session Two \u2014 Strategy & Mastery",
  modules: [
    {
      number: 5,
      title: "AI Strategy for Your Team",
      description:
        "From one redesigned process to many. Score your top 10 processes for AI leverage, prioritize with the Identify-Automate-Amplify-Lead framework, and draft the internal business case.",
    },
    {
      number: 6,
      title: "Workflow Guardrails",
      description:
        "How to build verification, quality gates, and governance into the process itself. Human review points, automated checks, data privacy boundaries, and hallucination detection as one guardrail among many.",
    },
    {
      number: 7,
      title: "Building AI Culture",
      description:
        "Making AI use normal, visible, and safe to experiment with on your team. The first-follower strategy, sharing wins without alienating non-adopters, and ethics as shared values.",
    },
    {
      number: 8,
      title: "Your Team\u2019s 90-Day AI Roadmap",
      description:
        "Build a 90-day implementation plan tied to the processes you mapped today. Peer review across the cohort. Certificate session. You walk out with a plan your team can execute next week.",
    },
  ],
};

function SessionColumn({ session }: { session: typeof sessionOne }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium">
        <span className="h-2 w-2 rounded-full bg-[var(--navy)]" />
        {session.title}
      </div>
      <Accordion>
        {session.modules.map((mod) => (
          <AccordionItem key={mod.number} className="border-white/[0.06]">
            <AccordionTrigger className="py-4 text-sm font-medium">
              <span>
                <span className="mr-2 font-mono text-xs text-muted-foreground">
                  Module {mod.number}:
                </span>
                {mod.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function Curriculum() {
  return (
    <SectionWrapper id="curriculum" theme="dark" className="tone-curriculum">
          <ScrollReveal>
          <div className="mb-12 space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">Curriculum</p>
            <h2 className="text-3xl font-medium tracking-[-0.022em] sm:text-4xl md:text-5xl">What you&rsquo;ll learn</h2>
            <p className="text-foreground/65 max-w-[52ch]">Eight modules. Everything maps to your job.</p>
          </div>
          </ScrollReveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <SessionColumn session={sessionOne} />
          <SessionColumn session={sessionTwo} />
        </div>

          <div className="mt-12">
            <Button
              size="lg"
              className="h-11 w-full sm:w-auto rounded-none bg-foreground px-7 text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              render={<Link href="/contact" />}
            >
              Request a curriculum walkthrough
            </Button>
          </div>
      </SectionWrapper>
  );
}
