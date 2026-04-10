/**
 * What: Live preview of every team email signature.
 * Why: One editable source (src/data/signatures.ts) drives the rendering.
 * How: Server component that maps over signaturePeople and renders each as
 *      an EmailSignature inside a paper card, plus a raw-HTML view for clients
 *      that need source-code paste.
 * Deps: signaturePeople data, EmailSignature component, next/metadata.
 */
import type { Metadata } from "next";
import { signaturePeople } from "@/data/signatures";
import {
  EmailSignature,
  generateSignatureHTML,
} from "@/components/brand/email-signature";

export const metadata: Metadata = {
  title: "Email signatures",
  description: "Editorial email signatures for the Unlock Intelligence team.",
  robots: { index: false, follow: false },
};

const LOCAL_MARK_SRC = "/brand/mark-dark.png";
const PROD_MARK_SRC = "https://unlockintelligencehq.com/brand/mark-dark.png";

export default function SignaturesPage() {
  return (
    <main className="min-h-screen pt-28 pb-32">
      <div className="mx-auto max-w-[820px] px-6">
        {/* Header */}
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
          brand &middot; email signatures
        </p>
        <h1 className="text-4xl font-medium tracking-[-0.022em] leading-[1.1] md:text-5xl">
          Signatures that{" "}
          <span className="font-semibold italic">fit the voice</span>.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[17px] text-foreground/70 leading-relaxed">
          One signature per team member, driven by{" "}
          <code className="rounded bg-foreground/8 px-1.5 py-0.5 text-[14px] font-mono">
            src/data/signatures.ts
          </code>
          . Edit the data file; this page re-renders. Copy a rendered signature
          from the production URL into Gmail &mdash; the formatting, mark, and
          link travel with it.
        </p>

        {/* Deploy notice */}
        <div className="mt-10 border border-[#C49A3C]/25 bg-[#C49A3C]/5 p-5 text-[14px] text-foreground/80">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C49A3C]">
            one-time setup
          </p>
          <p className="leading-relaxed">
            The signature <em>image</em> lives at{" "}
            <code className="text-[13px] font-mono">
              unlockintelligencehq.com/brand/mark-dark.png
            </code>
            . Ship a production deploy first, then install. To actually install
            in Gmail, open{" "}
            <code className="text-[13px] font-mono">
              https://unlockintelligencehq.com/brand/signatures
            </code>{" "}
            (not the dev URL), select a signature, and paste &mdash; the
            browser rewrites the image to the absolute production URL on copy.
          </p>
        </div>

        {/* Install instructions */}
        <details className="mt-8 border-b border-foreground/10 pb-6">
          <summary className="cursor-pointer text-[13px] font-medium text-foreground/70 hover:text-foreground">
            How to install in Gmail (30 seconds)
          </summary>
          <ol className="mt-4 ml-5 list-decimal space-y-2 text-[14px] text-foreground/75 leading-relaxed">
            <li>
              Gmail &rarr; <strong className="text-foreground">Settings (gear)</strong> &rarr;{" "}
              <strong className="text-foreground">See all settings</strong> &rarr;{" "}
              <strong className="text-foreground">General</strong> tab.
            </li>
            <li>
              Scroll to <strong className="text-foreground">Signature</strong>. Click{" "}
              <strong className="text-foreground">Create new</strong> or edit an existing one.
            </li>
            <li>
              Visit the production URL above. Click into the signature card, press{" "}
              <code className="rounded bg-foreground/8 px-1.5 py-0.5 font-mono">Cmd+A</code>
              , then{" "}
              <code className="rounded bg-foreground/8 px-1.5 py-0.5 font-mono">Cmd+C</code>
              .
            </li>
            <li>
              Paste into the Gmail signature field with{" "}
              <code className="rounded bg-foreground/8 px-1.5 py-0.5 font-mono">Cmd+V</code>
              . Set as default for new emails and replies. Save.
            </li>
          </ol>
          <p className="mt-4 text-[13px] text-foreground/55 leading-relaxed">
            If your client needs raw HTML source, open &ldquo;View HTML
            source&rdquo; below each signature.
          </p>
        </details>

        {/* Signatures */}
        <div className="mt-12 space-y-14">
          {signaturePeople.map((person, i) => {
            const sourceHtml = generateSignatureHTML(person, PROD_MARK_SRC);
            return (
              <section key={person.id}>
                <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55">
                  {String(i + 1).padStart(2, "0")} &middot; {person.name}
                </h2>
                {/* Paper card — matches how the signature renders in a
                    light-mode email client. */}
                <div className="bg-[#F7F5F0] border border-[#E3DFD6] p-10">
                  <EmailSignature person={person} markSrc={LOCAL_MARK_SRC} />
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-[13px] font-medium text-foreground/55 hover:text-foreground">
                    View HTML source (absolute URL, for paste-as-source)
                  </summary>
                  <pre className="mt-3 overflow-x-auto bg-[#0A0A0A] p-5 text-[12px] leading-[1.55] text-[#F5F5F4] font-mono whitespace-pre-wrap break-all">
                    {sourceHtml}
                  </pre>
                </details>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
