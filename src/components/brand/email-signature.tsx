/**
 * What: Email signature component. Table-based, inline styles, email-safe.
 * Why: One source of truth so signatures stay in sync with brand updates.
 * How: Renders a SignaturePerson as an HTML table with inline CSS so the
 *      styling survives a copy-paste into Gmail / Outlook / Apple Mail.
 * Deps: SignaturePerson type from @/data/signatures.
 */
import type { SignaturePerson } from "@/data/signatures";

interface EmailSignatureProps {
  person: SignaturePerson;
  /**
   * URL of the bracket mark PNG. Defaults to an absolute URL so that
   * when the rendered signature is copy-pasted into an email client,
   * the image continues to resolve from the production CDN.
   */
  markSrc?: string;
}

const DEFAULT_MARK_SRC = "https://unlockintelligencehq.com/brand/mark-dark.png";

/**
 * Generate the raw HTML source for a signature — used by the preview page's
 * "View HTML source" block so the exact markup can be pasted into email
 * clients that require source-level input (e.g., Outlook desktop).
 *
 * Keep this in sync with the <EmailSignature> JSX below; both must render
 * identical output.
 */
export function generateSignatureHTML(
  person: SignaturePerson,
  markSrc: string = DEFAULT_MARK_SRC,
): string {
  const credentialLines = person.credentials
    .map((line, i) => line + (i < person.credentials.length - 1 ? "<br>" : ""))
    .join("");

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.5; border-collapse: collapse;">
  <tbody>
    <tr>
      <td style="padding: 0; vertical-align: top;">
        <img src="${markSrc}" alt="[" width="28" height="28" style="display: block; border: 0; width: 28px; height: 28px;">
      </td>
      <td style="padding: 0 0 0 14px; vertical-align: top;">
        <div style="font-size: 15px; font-weight: 600; color: #0A0A0A; letter-spacing: -0.01em; line-height: 1.3;">${person.name}</div>
        <div style="font-size: 13px; color: #666666; line-height: 1.4; margin-top: 2px;">${person.role} &middot; Unlock Intelligence</div>
        <div style="font-size: 13px; color: #666666; font-style: italic; line-height: 1.5; margin-top: 12px;">${credentialLines}</div>
        <div style="height: 1px; background: #D6D3CB; width: 220px; margin: 16px 0 12px 0; font-size: 0; line-height: 0;">&nbsp;</div>
        <div style="font-size: 13px; color: #666666; line-height: 1.5;">
          <a href="${person.link.href}" style="color: #666666; text-decoration: none; border-bottom: 1px solid #D6D3CB;">${person.link.label}</a>
        </div>
      </td>
    </tr>
  </tbody>
</table>`;
}

export function EmailSignature({
  person,
  markSrc = DEFAULT_MARK_SRC,
}: EmailSignatureProps) {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      role="presentation"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        lineHeight: 1.5,
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: 0, verticalAlign: "top" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={markSrc}
              alt="["
              width={28}
              height={28}
              style={{ display: "block", border: 0, width: 28, height: 28 }}
            />
          </td>
          <td style={{ padding: "0 0 0 14px", verticalAlign: "top" }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#0A0A0A",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {person.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666666",
                lineHeight: 1.4,
                marginTop: 2,
              }}
            >
              {person.role} &middot; Unlock Intelligence
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666666",
                fontStyle: "italic",
                lineHeight: 1.5,
                marginTop: 12,
              }}
            >
              {person.credentials.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < person.credentials.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div
              style={{
                height: 1,
                background: "#D6D3CB",
                width: 220,
                margin: "16px 0 12px 0",
                fontSize: 0,
                lineHeight: 0,
              }}
            >
              &nbsp;
            </div>
            <div style={{ fontSize: 13, color: "#666666", lineHeight: 1.5 }}>
              <a
                href={person.link.href}
                style={{
                  color: "#666666",
                  textDecoration: "none",
                  borderBottom: "1px solid #D6D3CB",
                }}
              >
                {person.link.label}
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
