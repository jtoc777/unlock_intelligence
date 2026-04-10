/**
 * What: Instructor credential and logo credibility strip.
 * Why: Social proof directly under hero fold.
 * How: SectionWrapper, ScrollReveal, static logo assets.
 * Deps: ScrollReveal, img tags, public logo paths.
 */
const proofPoints = [
  { metric: "University of Chicago", label: "Instructor" },
  { metric: "8 hours", label: "Two half-day sessions" },
  { metric: "3 deliverables", label: "Customized to your team" },
];

const institutions = [
  { name: "University of Chicago", logo: "/images/logos/uchicago.png", invert: true },
  { name: "Digital Realty", logo: "/images/logos/digital-realty.png", invert: true },
  { name: "Garner Health", logo: "/images/logos/garner-health.svg", invert: false },
];

export function ProofBar() {
  return (
    <section className="relative border-y border-white/[0.04] bg-black/20 py-10" aria-label="Instructor credentials">
        <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-8">
          {/* Proof points — quiet editorial row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
            {proofPoints.map((point, i) => (
              <div key={point.label} className="flex items-center gap-x-10 md:gap-x-14">
                {i > 0 && (
                  <div className="hidden md:block h-6 w-px bg-white/[0.1]" />
                )}
                <div className="flex flex-col items-center text-center gap-0.5">
                  <span className="text-base font-medium text-foreground/90 md:text-[17px]">
                    {point.metric}
                  </span>
                  <span className="text-[13px] text-foreground/55">
                    {point.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <span className="text-[13px] text-foreground/55">
            Our team teaches at the University of Chicago and builds AI at
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
            {institutions.map((inst) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={inst.name}
                src={inst.logo}
                alt={inst.name}
                className={`h-7 md:h-8 w-auto max-w-[140px] md:max-w-none opacity-70 ${
                  inst.invert ? "brightness-0 invert" : ""
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  );
}
