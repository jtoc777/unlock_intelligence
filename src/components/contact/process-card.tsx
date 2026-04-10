/**
 * What: Three-step timeline card for contact flow.
 * Why: Sets expectations after form submission visually.
 * How: Maps static steps array into GlassCard subsections.
 * Deps: GlassCard, lucide-react Star icon.
 */
import { GlassCard } from "@/components/ui/glass-card";
import { Star } from "lucide-react";

const steps = [
  { number: "01", title: "We review your details", desc: "Within one business day." },
  { number: "02", title: "We match you to a cohort", desc: "Based on your schedule and interests." },
  { number: "03", title: "You\u2019re in", desc: "You\u2019ll receive confirmation, prep materials, and calendar invites." },
];

export function ProcessCard() {
  return (
    <div className="space-y-8">
      <GlassCard>
        <h3 className="text-lg font-medium mb-6">What happens next</h3>
        <ol className="space-y-6">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-4">
              <span className="font-mono text-sm text-foreground/70 font-medium">{step.number}</span>
              <div>
                <strong className="text-sm font-medium">{step.title}</strong>
                <p className="text-sm text-foreground/70 mt-0.5">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </GlassCard>

      <div className="flex gap-3 text-sm text-foreground/70">
        <Star className="h-5 w-5 text-[var(--navy-deep)] shrink-0 mt-0.5" />
        <p>
          If you complete both sessions and don&rsquo;t feel you&rsquo;ve gained immediately
          applicable skills, we&rsquo;ll refund you. No questions, no forms, no friction.
        </p>
      </div>

      <div className="text-sm">
        <p className="text-foreground/70">Prefer email?</p>
        <a href="mailto:hello@unlockintelligence.co" className="text-foreground/70 hover:underline">
          hello@unlockintelligence.co
        </a>
      </div>
    </div>
  );
}
