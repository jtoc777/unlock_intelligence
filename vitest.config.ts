/**
 * What: Vitest config for unit and component tests.
 * Why: Runs React tests with path aliases matching Next.
 * How: Vite react plugin, jsdom, setup file, @ alias.
 * Deps: vitest, @vitejs/plugin-react, testing-library.
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react() as any],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
