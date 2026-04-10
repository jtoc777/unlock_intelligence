/**
 * What: Closing headline plus proposal button — conversion peak.
 * Why: Last conversion chance after full page story.
 * How: Large extrabold heading with single opacity-fade animation.
 * Deps: next/link, framer-motion, Button.
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const metaItems = [
  "Founding cohort: Spring 2026",
  "Limited to 10 teams",
  "No technical background required",
];

export function FinalCTA() {
  return (
    <section className="tone-cta relative py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1120px] px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-4xl font-medium tracking-[-0.022em] sm:text-5xl md:text-6xl"
        >
          The Companies Investing in AI Fluency Now Will{" "}
          <span className="text-white">Lead.</span>
        </motion.h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 md:text-lg">
            Early-moving teams build the workflows, habits, and institutional knowledge that late adopters spend years trying to replicate.
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              className="h-11 w-full sm:w-auto rounded-none bg-foreground px-8 text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              render={<Link href="/contact" />}
            >
              Request a proposal
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-foreground/70">
            {metaItems.map((item, i) => (
              <span key={item} className="inline-flex items-center gap-2">
                {item}
                {i < metaItems.length - 1 && (
                  <span aria-hidden="true" className="text-foreground/40">
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>
      </div>
    </section>
  );
}
