/**
 * What: Decorative blurred orbs parallax on scroll.
 * Why: Adds depth behind hero without heavy imagery.
 * How: useScroll maps scrollY to motion div translateY values.
 * Deps: framer-motion useScroll, useTransform, motion.
 */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxOrbs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 80]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-indigo-500/8 blur-[100px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -top-[5%] -right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-violet-500/8 blur-[100px]"
      />
    </div>
  );
}
