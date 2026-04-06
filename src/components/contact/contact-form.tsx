/**
 * What: Client contact form with validation and submit UX.
 * Why: Captures leads with accessible controlled inputs.
 * How: React state, search params prefill, fetch to endpoint.
 * Deps: next/navigation, shadcn Input Label Select Button.
 */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard } from "@/components/ui/glass-card";
import { Check, X } from "lucide-react";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<FormState>("idle");
  const [interest, setInterest] = useState("individual");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && ["individual", "corporate", "question"].includes(type)) {
      setInterest(type);
    }
  }, [searchParams]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate
    const newErrors: Record<string, boolean> = {};
    if (!formData.get("name")?.toString().trim()) newErrors.name = true;
    const email = formData.get("email")?.toString().trim() || "";
    if (!email || !email.includes("@")) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setState("submitting");
    formData.set("interest", interest);

    try {
      const res = await fetch("https://formspree.io/f/xwpkgjbr", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent("New enquiry from Unlock Intelligence");
      const body = encodeURIComponent(
        `Name: ${formData.get("name") || ""}\nEmail: ${formData.get("email") || ""}\nCompany: ${formData.get("company") || ""}\nInterest: ${interest}\n\nMessage:\n${formData.get("message") || ""}`
      );
      window.location.href = `mailto:hello@unlockintelligence.co?subject=${subject}&body=${body}`;
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <GlassCard className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sage)]/30">
          <Check className="h-6 w-6 text-[var(--sage)]" />
        </div>
        <h3 className="text-xl font-semibold">Message Sent</h3>
        <p className="mt-2 text-muted-foreground">
          We&rsquo;ll review your details and get back to you within one business day.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm text-[var(--navy)] hover:underline">
          Back to Home &rarr;
        </Link>
      </GlassCard>
    );
  }

  if (state === "error") {
    return (
      <GlassCard className="text-center py-16">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30">
          <X className="h-6 w-6 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold">Something Went Wrong</h3>
        <p className="mt-2 text-muted-foreground">
          Please try again, or email us directly at{" "}
          <a href="mailto:hello@unlockintelligence.co" className="text-[var(--navy)] hover:underline">
            hello@unlockintelligence.co
          </a>
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-[var(--navy)] hover:underline"
        >
          Try Again
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="_subject" value="New enquiry from Unlock Intelligence" />

        <div className="space-y-5">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              autoComplete="name"
              className={errors.name ? "border-red-500" : ""}
              onChange={() => setErrors((e) => ({ ...e, name: false }))}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
              className={errors.email ? "border-red-500" : ""}
              onChange={() => setErrors((e) => ({ ...e, email: false }))}
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Your company (optional)"
              autoComplete="organization"
            />
          </div>
          <div>
            <Label htmlFor="interest">I&rsquo;m interested in&hellip;</Label>
            <Select value={interest} onValueChange={(v) => { if (v) setInterest(v); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate">Ready to train my team</SelectItem>
                <SelectItem value="individual">Attend as an individual first</SelectItem>
                <SelectItem value="question">Evaluating for a future quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {interest === "corporate" && (
            <div>
              <Label htmlFor="team-size">Team Size</Label>
              <Select name="team_size" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">5–10 people</SelectItem>
                  <SelectItem value="11-25">11–25 people</SelectItem>
                  <SelectItem value="26-50">26–50 people</SelectItem>
                  <SelectItem value="50+">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us anything else that would be helpful (optional)"
            />
          </div>
          <Button
            type="submit"
            disabled={state === "submitting"}
            className="w-full min-h-[44px] bg-[var(--navy-deep)] text-white font-medium hover:bg-[#15293F] rounded-lg"
          >
            {state === "submitting" ? "Sending..." : "Start a Conversation \u2192"}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
