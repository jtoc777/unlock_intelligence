/**
 * What: Above-the-fold hero — eyebrow, H1, sub, two CTAs, trust row.
 * Why: Primary conversion. Editorial restraint matching the bracket mark.
 * How: Single fade in, no word-stagger. Ink-on-paper primary CTA, text-link secondary.
 * Deps: framer-motion, next/link, Button.
 */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FOUNDING_SPOTS_REMAINING, FOUNDING_SPOTS_TOTAL } from "@/lib/constants";

const trustItems = [
  "Taught by a University of Chicago instructor",
  "Curriculum tailored to your industry",
  "Completion certificate for L&D",
];

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="tone-hero relative flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14"
    >
      <div className="relative z-10 mx-auto max-w-[1120px] px-6 text-center">
        {/* Eyebrow — engraved, not shouted */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55"
        >
          <span>Founding cohort</span>
          <span className="h-px w-6 bg-foreground/25" aria-hidden="true" />
          <span>Spring 2026</span>
          <span className="h-px w-6 bg-foreground/25" aria-hidden="true" />
          <span>
            {FOUNDING_SPOTS_REMAINING} of {FOUNDING_SPOTS_TOTAL} seats
          </span>
        </motion.div>

        {/* Headline — already written */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[18ch] text-[2.25rem] font-medium leading-[1.05] tracking-[-0.022em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          Make your team<br className="hidden sm:block" />
          {" "}
          <span className="font-semibold italic">AI&#8209;fluent</span> in eight hours
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-[52ch] text-lg leading-[1.55] text-foreground/65 md:text-xl"
        >
          A live, instructor-led program that gets your team using AI
          confidently. Two half-day sessions, built around the tools and
          workflows they already use. No coding required.
        </motion.p>

        {/* CTAs — one primary button, one text link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8"
        >
          <Button
            className="h-11 rounded-none bg-foreground px-7 text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            render={<Link href="/contact" />}
          >
            Request a proposal
          </Button>
          <a
            href="#curriculum"
            className="text-[15px] font-medium text-foreground/65 underline underline-offset-[6px] decoration-foreground/25 transition-colors hover:text-foreground hover:decoration-foreground/60 focus-visible:outline-none focus-visible:text-foreground focus-visible:decoration-foreground"
          >
            View the curriculum
          </a>
        </motion.div>

        {/* Trust row — flat hierarchy, thin rule separators on desktop */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center gap-3 text-[15px] text-foreground/75 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-0 sm:divide-x sm:divide-foreground/20"
        >
          {trustItems.map((item) => (
            <span key={item} className="px-0 sm:px-6">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
