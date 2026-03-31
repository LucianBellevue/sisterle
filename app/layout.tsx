import type { Metadata } from "next";
import { Black_Ops_One, Fraunces, Geist } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const handmade = Black_Ops_One({
  variable: "--font-handmade",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sisterle — Thrift & vintage on Depop",
  description:
    "Sisterle is a curated storefront for antique, thrifted, and one-of-a-kind finds. Shop with us on Depop.",
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
      </body>
    </html>
  );
}
