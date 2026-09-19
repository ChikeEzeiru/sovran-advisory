import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { SanityVisualEditing } from "@/components/ui/SanityVisualEditing";
import { SquircleNoScript } from "@squircle-js/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    template: "%s | Sovran Advisory",
    default: "African Markets Advisory | Sovran Advisory",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{name: SITE_NAME, url: SITE_URL}],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Business and professional services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "African Markets Advisory | Sovran Advisory",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1440,
        height: 810,
        alt: "Sovran Advisory — African markets advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "African Markets Advisory | Sovran Advisory",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
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
