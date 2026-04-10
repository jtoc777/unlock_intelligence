/**
 * What: Instructor bios with photos and credentials.
 * Why: Human trust for a high-touch education product.
 * How: next/image cards inside GlassCard grid layout.
 * Deps: next/image, SectionWrapper, GlassCard, ScrollReveal.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const members = [
  {
    name: "Shubham Chandra",
    role: "Head of Curriculum",
    image: "/images/team/team-member-2.jpg",
    bio: "Teaches AI-driven entrepreneurship at the University of Chicago. Builds AI automation systems at Digital Realty, where he implements the kind of workflows he teaches in this program. Researches cutting edge AI technologies for large asset managers. Holds a degree in Economics and an MS in Computer Science from the University of Chicago.",
    imageStyle: { objectPosition: "center 15%" },
  },
  {
    name: "J.T. O\u2019Connor",
    role: "Program Director",
    image: "/images/team/team-member-1.JPEG",
    bio: "Your main point of contact from first conversation through program delivery. Background in operations and business development, with hands-on experience building AI-powered marketing and outreach systems. Holds a degree in Political Science from the University of Chicago.",
    imageStyle: { objectPosition: "center 15%" },
  },
];

export function Team() {
  return (
    <SectionWrapper id="team" className="tone-team">
        <ScrollReveal>
        <div className="mb-12 space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
            Your Instructors
          </p>
          <h2 className="text-3xl font-medium tracking-[-0.022em] sm:text-4xl">
            Who&rsquo;s teaching
          </h2>
        </div>
        </ScrollReveal>

      <ScrollReveal>
      <div className="grid gap-6 md:grid-cols-2">
        {members.map((member) => (
            <GlassCard key={member.name} className="h-full overflow-hidden p-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[3/4]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  style={member.imageStyle}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-foreground/70">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {member.bio}
                </p>
              </div>
            </GlassCard>
        ))}
      </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-8 text-center">
          <Link
            href="/team"
            className="text-sm font-medium text-foreground/70 underline underline-offset-[6px] decoration-foreground/25 transition-colors hover:text-foreground hover:decoration-foreground/60"
          >
            Meet your full team
          </Link>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
