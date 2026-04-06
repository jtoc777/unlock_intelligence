// What: ESLint flat config for Next.js TypeScript project.
// Why: Enforces core-web-vitals and TS rules in editor and CI.
// How: Spreads eslint-config-next presets plus custom ignores.
// Deps: eslint, eslint-config-next packages.

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
