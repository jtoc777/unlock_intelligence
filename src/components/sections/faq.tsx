/**
 * What: Accordion FAQ tied to enroll and logistics.
 * Why: Handles objections without cluttering hero narrative.
 * How: Accordion items with optional link CTAs inside answers.
 * Deps: next/link, Accordion, SectionWrapper, ScrollReveal.
 */
"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FaqEntry {
  question: string;
  answer: string | React.ReactNode;
}

const buyerFaqs: FaqEntry[] = [
  {
    question: "Is there a corporate or team option?",
    answer: (
      <p>
        Yes. For teams of 5 or more, we offer custom scheduling, role-specific
        curriculum tailoring, and volume pricing.{" "}
        <Link
          href="/contact?type=corporate"
          className="text-[var(--navy)] underline underline-offset-4 hover:text-white"
        >
          Reach out directly
        </Link>{" "}
        and we&rsquo;ll put together a proposal.
      </p>
    ),
  },
  {
    question: "How do you measure outcomes?",
    answer:
      "Everyone takes a confidence assessment before and after the program. Your team then receives an executive summary with aggregated results, completion tracking, and competency gains \u2014 data you can hand straight to L&D.",
  },
  {
    question: "What does the executive summary include?",
    answer:
      "It covers team-wide competency scores, individual progress, skills demonstrated, and recommended next steps. Basically, it gives your leadership a clear picture of what the team gained.",
  },
  {
    question: "How does scheduling work for distributed teams?",
    answer:
      "Sessions run live over video and we can schedule across time zones. For larger teams, we can run multiple cohorts. Reach out and we\u2019ll figure out what works.",
  },
  {
    question: "Is this affiliated with the University of Chicago?",
    answer: (
      <p>
        Unlock Intelligence is an independent program. Our Head of Curriculum,
        Shubham Chandra, teaches AI and entrepreneurship at the University of
        Chicago and brings that same rigor here. The curriculum is original
        and built for working professionals.
      </p>
    ),
  },
];

const participantFaqs: FaqEntry[] = [
  {
    question: "Do I need any technical background?",
    answer:
      "None. Zero. The program is specifically designed for people who have never written code and never plan to. If you can use email and a web browser, you have everything you need.",
  },
  {
    question: "Is this online or in-person?",
    answer:
      "Both options are available. Cohorts run online via video with live interaction, or at select city venues. Contact us to check what\u2019s available in your area or for your team.",
  },
  {
    question: "What if I miss a session?",
    answer:
      "Sessions are recorded in full. You\u2019ll have access to the recording within 24 hours and can rejoin a future cohort for the missed session at no extra cost.",
  },
  {
    question: "How is this different from watching YouTube tutorials?",
    answer:
      "Watching videos doesn\u2019t build skills. This is a live cohort with exercises, feedback, and accountability. You leave with an AI integration blueprint, a workflow map, and a personal AI strategy \u2014 things you\u2019ll open again on Monday.",
  },
  {
    question:
      "We already have Coursera/LinkedIn Learning. Why do we need this?",
    answer:
      "Those platforms are good reference libraries, but self-paced AI courses see 5\u201315% completion rates. This program is live and built around exercises your team does together. You leave with an AI integration blueprint, a workflow automation map, and a strategy document, plus a shared vocabulary your whole team can use.",
  },
  {
    question: "Will AI replace my job while I\u2019m taking this course?",
    answer:
      "Probably not in 8 hours. But the people who learn to use AI well are the ones who get harder to replace. That\u2019s the bet this program makes.",
  },
];

export function FAQ() {
  return (
    <SectionWrapper id="faq" className="tone-faq">
        <ScrollReveal>
        <div className="mb-12 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Common Questions
          </h2>
        </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <Accordion>
            {buyerFaqs.map((faq, i) => (
              <AccordionItem key={i} className="border-white/[0.06]">
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : (
                    faq.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
              About the Program
            </span>
            <div className="mt-2 h-px bg-white/[0.06]" />
          </div>

          <Accordion>
            {participantFaqs.map((faq, i) => (
              <AccordionItem key={i} className="border-white/[0.06]">
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : (
                    faq.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
    </SectionWrapper>
  );
}
