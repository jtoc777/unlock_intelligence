/**
 * What: Dismissible mobile bottom CTA strip.
 * Why: Conversion nudge without blocking desktop layout.
 * How: IntersectionObserver hides when enroll visible; localStorage.
 * Deps: next/link, next/navigation, Button, lucide.
 */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyCTABar() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  const [dismissed, setDismissed] = useState(true); // hidden by default to prevent flash
  const [mounted, setMounted] = useState(false);
  const [enrollVisible, setEnrollVisible] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem("sticky-cta-dismissed") === "true");
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = document.getElementById("enroll");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setEnrollVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem("sticky-cta-dismissed", "true");
  }

  const shouldShow = mounted && !dismissed && !isContactPage && !enrollVisible;

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 md:hidden",
        "border-t border-white/[0.06] bg-background/90 backdrop-blur-xl",
        "px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3",
        "transition-transform duration-300 ease-out",
        shouldShow ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-foreground/90">
            Spring 2026 Cohort
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Limited Spots Available
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0 min-h-[36px] rounded-full bg-[var(--navy-deep)] px-4 text-xs font-medium text-white hover:bg-[#15293F]"
          render={<Link href="/contact" />}
        >
          Get Your Proposal
        </Button>
        <button
          onClick={handleDismiss}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
