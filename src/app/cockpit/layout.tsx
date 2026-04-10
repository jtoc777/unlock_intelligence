import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { CockpitNav } from "@/components/cockpit/cockpit-nav";

export const metadata: Metadata = {
  title: "Cockpit",
  robots: { index: false, follow: false },
};

export default function CockpitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fa] text-[#1a1a2e]">
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link href="/" className="flex items-center gap-2 text-[#1a1a2e]/40 transition-colors hover:text-[#1a1a2e]/80">
            <Logo size={22} />
          </Link>
          <div className="h-4 w-px bg-black/[0.08]" />
          <span className="text-sm font-semibold tracking-wide text-[#1a1a2e]">
            Cockpit
          </span>
          <CockpitNav />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
