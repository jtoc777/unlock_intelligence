/**
 * What: Site footer with logo and anchor links.
 * Why: Repeat navigation and brand at page bottom.
 * How: Static link grid using shared footer link list.
 * Deps: next/link, Logo, GradientText.
 */
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { GradientText } from "@/components/ui/gradient-text";

const footerLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Insights", href: "/insights" },
  { label: "Enroll", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <Link href="/" className="flex items-center gap-2" aria-label="Unlock Intelligence home">
            <Logo size={24} />
            <span className="font-semibold text-sm tracking-tight">
              Unlock <GradientText>Intelligence</GradientText>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm inline-flex items-center min-h-[44px]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.06] text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Unlock Intelligence. All rights reserved.</span>
          <span className="hidden md:inline">Chicago, IL</span>
          <a href="mailto:hello@unlockintelligence.co" className="text-muted-foreground hover:text-foreground transition-colors focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm inline-flex items-center min-h-[44px]">
            hello@unlockintelligence.co
          </a>
        </div>
      </div>
    </footer>
  );
}
