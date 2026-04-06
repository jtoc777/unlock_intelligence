/**
 * What: In-article conversion block with primary and mailto link.
 * Why: Turns readers into leads without leaving the article.
 * How: Button plus mailto whose body includes article URL.
 * Deps: next/link, next/navigation, Button, lucide Mail.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ArticleCtaProps {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
  articleTitle?: string;
  className?: string;
}

export function ArticleCta({
  heading,
  subtext,
  buttonText,
  buttonHref,
  articleTitle,
  className,
}: ArticleCtaProps) {
  const pathname = usePathname();
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://unlockintelligence.co";
  const articleUrl = `${origin}${pathname}`;

  const title = articleTitle ?? "Unlock Intelligence article";
  const mailtoSubject = encodeURIComponent(`Worth reading: ${title}`);
  const mailtoBody = encodeURIComponent(
    `Thought this was worth sharing with our team:\n\n${title}\n${articleUrl}\n\n— via Unlock Intelligence`
  );
  const mailtoHref = `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      className={cn(
        "my-12 rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 text-center backdrop-blur-xl md:p-10",
        className
      )}
    >
      <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {heading}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        {subtext}
      </p>

      <div className="mt-6 flex justify-center px-0">
        <Button
          size="lg"
          className="h-auto min-h-[44px] w-full max-w-full whitespace-normal px-4 py-3 text-center text-sm leading-snug text-white sm:max-w-md sm:px-8 sm:text-base bg-[var(--navy-deep)] text-white hover:bg-[#15293F]"
          render={<Link href={buttonHref} />}
        >
          {buttonText}
        </Button>
      </div>

      <a
        href={mailtoHref}
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-[var(--navy)]"
      >
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        Forward to your team
      </a>
    </div>
  );
}
