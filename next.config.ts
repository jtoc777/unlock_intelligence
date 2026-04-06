/**
 * What: Next.js build and export configuration.
 * Why: Static site output for Cloudflare Pages deploy.
 * How: Sets output export and unoptimized images.
 * Deps: next/config types only.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
