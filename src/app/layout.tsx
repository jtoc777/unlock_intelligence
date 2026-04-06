/**
 * What: Root HTML shell, fonts, chrome around pages.
 * Why: Shared metadata, viewport, nav, footer everywhere.
 * How: Wraps children with Navbar, Footer, StickyCTABar.
 * Deps: next/font, layout components, globals.css.
 */
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyCTABar } from "@/components/layout/sticky-cta-bar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Unlock Intelligence — From Zero to AI Authority",
    template: "%s — Unlock Intelligence",
  },
  description:
    "Two focused live sessions. Eight hours total. Go from curious professional to the go-to AI authority in your organization.",
  openGraph: {
    title: "Unlock Intelligence — AI Training for Teams",
    description: "Make your team AI-fluent in 8 hours. A live, cohort-based program built for companies.",
    type: "website",
    url: "https://unlockintelligence.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock Intelligence — AI Training for Teams",
    description: "Make your team AI-fluent in 8 hours. A live, cohort-based program built for companies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
        <Navbar />
        {children}
        <Footer />
        <StickyCTABar />
      </body>
    </html>
  );
}
