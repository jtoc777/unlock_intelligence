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
import { ShareButton } from "@/components/insights/share-button";

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
  const shareText = `Thought this was worth sharing with our team:\n\n${title}\n${articleUrl}\n\n— via Unlock Intelligence`;

  return (
    <div
      className={cn(
        "my-12 rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 text-center backdrop-blur-xl md:p-10",
        className
      )}
    >
      <h3 className="text-2xl font-medium tracking-[-0.022em] text-foreground md:text-3xl">
        {heading}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-foreground/70">
        {subtext}
      </p>

      <div className="mt-6 flex justify-center px-0">
        <Button
          size="lg"
          className="h-auto min-h-[44px] w-full max-w-full rounded-none whitespace-normal bg-foreground px-4 py-3 text-center text-sm font-medium leading-snug text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:max-w-md sm:px-8 sm:text-base"
          render={<Link href={buttonHref} />}
        >
          {buttonText}
        </Button>
      </div>

      <ShareButton
        title={title}
        url={articleUrl}
        text={shareText}
        label="Forward to your team"
        className="mt-4"
      />
    </div>
  );
}
