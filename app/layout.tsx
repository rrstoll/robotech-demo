import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Robotech - Rent Home Robots On Demand",
  description:
    "Rent cutting-edge home robots for cleaning, cooking, companionship, and more. No commitment, no maintenance hassles. Swap anytime.",
  other: {
    // Preload hints for critical resources
    "preload-demo-video": "/demo-video.mp4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical video resources */}
        <link rel="preload" href="/demo-video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/demo-video.webm" as="video" type="video/webm" />
      </head>
      <body className={inter.className}>
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
