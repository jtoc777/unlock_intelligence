/**
 * What: Composes homepage sections in one scroll page.
 * Why: Marketing landing is section-driven static content.
 * How: Renders ordered section components inside main.
 * Deps: Section components from components/sections.
 */
import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Deliverables } from "@/components/sections/deliverables";
import { Curriculum } from "@/components/sections/curriculum";
import { Why } from "@/components/sections/why";
import { Team } from "@/components/sections/team";
import { Enroll } from "@/components/sections/enroll";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <Problem />
      <Team />
      <HowItWorks />
      <Deliverables />
      <Curriculum />
      <Why />
      <Enroll />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
