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
    bio: "Teaches AI-driven entrepreneurship at the University of Chicago. Builds AI automation systems at Digital Realty, where he implements the kind of workflows he teaches in this program. Researches cutting edge AI technologies for large asset managers.",
    imageStyle: { objectPosition: "center 15%" },
  },
  {
    name: "J.T. O\u2019Connor",
    role: "Program Director",
    image: "/images/team/team-member-1.JPEG",
    bio: "Your main point of contact from first conversation through program delivery. Background in operations and business development, with hands-on experience building AI-powered marketing and outreach systems.",
    imageStyle: { objectPosition: "center 15%" },
  },
];

export function Team() {
  return (
    <SectionWrapper id="team" className="tone-team">
        <ScrollReveal>
        <div className="mb-12 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
            Your Instructors
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Who&rsquo;s Teaching
          </h2>
        </div>
        </ScrollReveal>

      <ScrollReveal>
      <div className="grid gap-6 md:grid-cols-2">
        {members.map((member) => (
            <GlassCard key={member.name} className="h-full overflow-hidden p-0">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
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
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-[var(--navy)]">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
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
            className="text-sm font-medium text-[var(--indigo)] transition-colors hover:text-[var(--indigo)]/80"
          >
            Meet your full team &rarr;
          </Link>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
