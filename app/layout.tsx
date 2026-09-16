import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { SanityVisualEditing } from "@/components/ui/SanityVisualEditing";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SquircleNoScript />
        {children}
        <SanityLive />
        {isDraftMode && <SanityVisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
