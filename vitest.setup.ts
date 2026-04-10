/**
 * What: Registers jest-dom matchers for Vitest.
 * Why: Enables expect(element).toBeInTheDocument() style.
 * How: Side-effect import extends Vitest expect.
 * Deps: @testing-library/jest-dom.
 */
import "@testing-library/jest-dom/vitest";
