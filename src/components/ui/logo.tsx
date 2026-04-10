/**
 * What: Half-bracket mark. A `[` that opens the wordmark.
 * Why: Intelligence is an opening, not a container. Editorial restraint.
 * How: Single closed path on a 24-unit grid. currentColor inherits CSS color.
 * Deps: None; pure SVG React element.
 */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9 3H16V6H12V18H16V21H9Z" />
    </svg>
  );
}
