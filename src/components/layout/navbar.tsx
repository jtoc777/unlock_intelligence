/**
 * What: Fixed site header with links and mobile sheet.
 * Why: Persistent navigation on every marketing page.
 * How: Scroll listener toggles compact style; Sheet for mobile.
 * Deps: next/link, lucide, Logo, Button, Sheet primitives.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "top-3 mx-3 md:mx-auto max-w-[860px] rounded-full border border-white/[0.06] bg-background/88 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-b border-white/[0.06] bg-background/80 backdrop-blur-lg"
      )}
      style={{ height: scrolled ? 52 : 64 }}
    >
      <div className={cn(
        "mx-auto flex h-full items-center justify-between",
        scrolled ? "max-w-full px-6" : "max-w-[1120px] px-6"
      )}>
        <Link href="/" className="flex items-center gap-2.5" aria-label="Unlock Intelligence home">
          <Logo size={scrolled ? 22 : 28} />
          <span className={cn("font-semibold tracking-tight transition-all", scrolled ? "text-sm" : "text-base")}>
            Unlock <GradientText>Intelligence</GradientText>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:inline-flex">
            <Button
              size={scrolled ? "sm" : "default"}
              className="bg-[var(--navy-deep)] text-white font-medium hover:bg-[#15293F] transition-colors rounded-full"
            >
              Get a Proposal
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<button className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md" aria-label="Open menu" />}
            >
              <Menu size={22} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-white/[0.06]">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex flex-col gap-2 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center min-h-[44px] text-lg text-muted-foreground hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" onClick={() => setOpen(false)} className="mt-4">
                  <Button className="w-full min-h-[44px] bg-[var(--navy-deep)] text-white font-medium hover:bg-[#15293F] transition-colors rounded-full">
                    Get a Proposal
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
