import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  metadataBase: new URL("https://unlockintelligencehq.com"),
  openGraph: {
    title: "Unlock Intelligence — AI Training for Teams",
    description: "Make your team AI-fluent in 8 hours. A live, cohort-based program built for companies.",
    type: "website",
    url: "https://unlockintelligencehq.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Unlock Intelligence — AI Training for Teams",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock Intelligence — AI Training for Teams",
    description: "Make your team AI-fluent in 8 hours. A live, cohort-based program built for companies.",
    images: ["/og.png"],
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
        {children}
      </body>
    </html>
  );
}
