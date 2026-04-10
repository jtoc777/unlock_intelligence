"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/cockpit", label: "Tasks" },
  { href: "/cockpit/wiki", label: "Wiki" },
];

export function CockpitNav() {
  const pathname = usePathname();

  return (
    <nav className="ml-4 flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/cockpit"
          ? pathname === "/cockpit"
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2.5 py-1 text-sm transition-colors",
              active
                ? "bg-black/[0.04] font-medium text-[#1a1a2e]"
                : "text-[#6b7280] hover:bg-black/[0.03] hover:text-[#1a1a2e]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
