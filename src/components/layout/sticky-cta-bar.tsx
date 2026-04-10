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
      <div className="relative flex items-center justify-between gap-3 pr-7">
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
          className="h-9 shrink-0 rounded-none bg-foreground px-4 text-[12px] font-medium text-background transition-colors duration-150 hover:bg-foreground/85"
          render={<Link href="/contact" />}
        >
          <span className="sm:hidden">Get proposal</span>
          <span className="hidden sm:inline">Request a proposal</span>
        </Button>
        <button
          onClick={handleDismiss}
          className="absolute -top-1 right-0 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
