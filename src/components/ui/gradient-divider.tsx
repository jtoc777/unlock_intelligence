/**
 * What: Full-width hairline gradient horizontal rule.
 * Why: Separates sections without heavy borders visually.
 * How: Chooses Tailwind gradient class from direction prop.
 * Deps: None beyond React.
 */
export function GradientDivider({ direction = "dark-to-light" }: { direction?: "dark-to-light" | "light-to-dark" }) {
  return (
    <div
      className={
        direction === "dark-to-light"
          ? "h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          : "h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
      }
    />
  );
}
