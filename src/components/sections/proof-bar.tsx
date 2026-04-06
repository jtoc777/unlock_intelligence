/**
 * What: Instructor credential and logo credibility strip.
 * Why: Social proof directly under hero fold.
 * How: SectionWrapper, ScrollReveal, static logo assets.
 * Deps: ScrollReveal, img tags, public logo paths.
 */
const proofPoints = [
  { metric: "University of Chicago", label: "Instructor" },
  { metric: "8 Hours", label: "Two Half-Day Sessions" },
  { metric: "3 Deliverables", label: "Customized to Your Team" },
];

const institutions = [
  { name: "University of Chicago", logo: "/images/logos/uchicago.png", invert: true },
  { name: "Digital Realty", logo: "/images/logos/digital-realty.png", invert: true },
  { name: "Garner Health", logo: "/images/logos/garner-health.svg", invert: false },
];

export function ProofBar() {
  return (
    <section className="relative border-y border-white/[0.04] bg-black/20 py-8" aria-label="Instructor credentials">
        <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-5">
          {/* Proof points */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {proofPoints.map((point, i) => (
              <div key={point.label} className="flex items-center gap-x-8 md:gap-x-12">
                {i > 0 && (
                  <div className="hidden md:block h-8 w-px bg-white/[0.08]" />
                )}
                <div className="flex flex-col items-center text-center">
                  <span className="text-lg font-bold text-foreground/90 md:text-xl">
                    {point.metric}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {point.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Our team teaches at the University of Chicago and builds AI at
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {institutions.map((inst) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={inst.name}
                src={inst.logo}
                alt={inst.name}
                className={`h-8 md:h-10 w-auto max-w-[140px] md:max-w-none opacity-80 ${
                  inst.invert ? "brightness-0 invert" : ""
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  );
}
