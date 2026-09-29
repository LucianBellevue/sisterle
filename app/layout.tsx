import type { Metadata } from "next";
import { Fraunces, Geist, Shantell_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { AnalyticsGate } from "@/components/AnalyticsGate";
import { CookieConsent } from "@/components/CookieConsent";
import {
  SITE_ASSETS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  getPublicSiteUrl,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const handmade = Shantell_Sans({
  variable: "--font-handmade",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getPublicSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Sisterle",
    "sisterle.com",
    "thrift shop",
    "vintage clothing",
    "pre-loved fashion",
    "one of one",
    "antique thrift",
    "vintage thrift store",
    "Depop",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_ASSETS.ogDefault,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${SITE_NAME} — thrift and vintage shop`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_ASSETS.ogDefault,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — thrift and vintage shop`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // File conventions also ship app/favicon.ico, app/icon.png, app/apple-icon.png.
  icons: {
    icon: [
      { url: SITE_ASSETS.favicon, sizes: "any" },
      { url: SITE_ASSETS.icon32, sizes: "32x32", type: "image/png" },
      { url: SITE_ASSETS.icon192, sizes: "192x192", type: "image/png" },
      { url: SITE_ASSETS.icon512, sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: SITE_ASSETS.appleTouchIcon,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [SITE_ASSETS.favicon],
  },
  manifest: SITE_ASSETS.manifest,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3a8bf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} ${handmade.variable} h-full antialiased`}
    >
      <body className="min-h-full text-(--ink)">
        <Providers>{children}</Providers>
        <AnalyticsGate />
        <CookieConsent />
      </body>
    </html>
  );
}
