/**
 * What: Share / forward button with Web Share API + clipboard fallback.
 * Why: Plain mailto fails silently on desktop when no email client is set.
 * How: Tries navigator.share(), then copies link to clipboard with feedback.
 */
"use client";

import { useState, useCallback } from "react";
import { Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  url: string;
  text: string;
  label?: string;
  className?: string;
}

export function ShareButton({
  title,
  url,
  text,
  label = "Forward this article to your team",
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    // Try native share first (mobile + some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or API failed — fall through to clipboard
      }
    }

    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: open mailto
      const subject = encodeURIComponent(`Worth reading: ${title}`);
      const body = encodeURIComponent(text);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  }, [title, text, url]);

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          Link copied — paste into an email
        </>
      ) : (
        <>
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </>
      )}
    </button>
  );
}
