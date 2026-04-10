/**
 * What: Dedicated team page with expanded instructor bios.
 * Why: Builds credibility beyond the homepage section — answers "why these people?"
 * How: Server component with photo + multi-paragraph bio layout.
 * Deps: next/image, ScrollReveal, SectionWrapper, GlassCard.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Meet Your Team",
  description:
    "The instructors behind Unlock Intelligence. Practitioners who build AI systems in production and teach your team to do the same.",
};

const team = [
  {
    name: "Shubham Chandra",
    role: "Head of Curriculum",
    image: "/images/team/team-member-2.jpg",
    imagePosition: "center 15%",
    paragraphs: [
      "Shubham teaches AI-driven entrepreneurship at the University of Chicago\u2019s Graduate Computer Science department, in Design, Build Launch, focusing on AI theory and real-world business application. His students learn about AI as they build functioning prototypes and deploy them before the quarter ends.",
      "By day, he builds AI automation systems at Digital Realty, one of the largest data center operators in the world. He architects the same kind of intelligent workflows he teaches in this program from automated data pipelines to AI-powered decision support tools supporting enterprise teams. Amongst other roles, he currently advises numerous Hedge Funds and start-ups on their AI strategies.",
      "This dual role, an operator and educator, is what shapes the Unlock Intelligence curriculum. Every module is built from systems Shubham has shipped in production. When your team learns to build an AI workflow, it\u2019s based on one he shipped the week before.",
      "Shubham holds a degree in Economics and an MS in Computer Science from the University of Chicago.",
    ],
  },
  {
    name: "J.T. O\u2019Connor",
    role: "Program Director",
    image: "/images/team/team-member-1.JPEG",
    imagePosition: "center 15%",
    paragraphs: [
      "J.T. is your main point of contact from the first conversation through program delivery and beyond. With a background in operations and business development, he ensures that every cohort runs smoothly, from scheduling and logistics to post-program follow-up. He\u2019s worked with enterprise organizations from 20-person businesses to Fortune 500 companies across the nation to make sure your team is in good hands.",
      "J.T. has hands-on experience building AI-powered marketing and outreach systems, which means he understands the material and can help connect the curriculum to your team\u2019s actual workflows. When you have a question between sessions or need help applying a concept to your specific context, he\u2019s the person who picks up the phone.",
      "His operational focus means you spend your time learning, not dealing with logistics. Enrollment, onboarding, technical setup, session coordination, J.T. handles all of it so the program experience is seamless from start to finish.",
      "J.T. holds a degree in Political Science from the University of Chicago.",
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="pt-28 pb-[max(6rem,calc(1.5rem+env(safe-area-inset-bottom)))]">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm text-foreground/55">Your Instructors</p>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.022em] md:text-5xl">
              Meet your team
            </h1>
            <p className="mt-4 max-w-lg text-lg text-foreground/70">
              Practitioners who build AI systems in production, and teach your
              team to do the same.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-20">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 100}>
              <div className="grid items-start gap-8 md:grid-cols-[360px_1fr] md:gap-12">
                <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-xl md:mx-0 md:max-w-none">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: member.imagePosition }}
                    sizes="(max-width: 768px) 280px, 360px"
                    priority={i === 0}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-medium">{member.name}</h2>
                  <p className="mb-4 text-sm font-medium text-foreground/70">
                    {member.role}
                  </p>
                  <div className="space-y-4 text-[15px] leading-relaxed text-foreground/70">
                    {member.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-20 text-center">
            <p className="mb-6 text-lg text-foreground/70">
              See how the program fits your team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-none bg-foreground text-[15px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground px-6 py-3"
            >
              Get in touch
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
