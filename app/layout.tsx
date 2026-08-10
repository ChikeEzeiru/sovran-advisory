import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { SquircleNoScript } from "@squircle-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sovran Advisory",
    default: "Sovran Advisory — African Markets Advisory",
  },
  description:
    "Sovran is an Africa-focused advisory firm working with governments, institutions, and corporates on policy, strategy, digital transformation, and stakeholder engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SquircleNoScript />
        {children}
        <SanityLive />
        <SpeedInsights />
      </body>
    </html>
  );
}
