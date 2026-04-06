/**
 * What: Contact page with form and process cards.
 * Why: Dedicated route for inbound leads and questions.
 * How: Server page renders heading plus ContactForm layout.
 * Deps: contact components, ScrollReveal, Next.js.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ProcessCard } from "@/components/contact/process-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to reserve your seat or bring the program to your team.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-[max(6rem,calc(1.5rem+env(safe-area-inset-bottom)))]">
      <div className="mx-auto max-w-[1120px] px-6">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-sm text-muted-foreground">Contact</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Tell us about yourself and we&rsquo;ll get back within one business day.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_380px] gap-12">
          <ScrollReveal>
            <Suspense>
              <ContactForm />
            </Suspense>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <ProcessCard />
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
