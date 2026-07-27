import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  getDepopShopUrl,
  getInstagramUrl,
} from "@/lib/site";
import { LEGAL_ROUTES } from "@/lib/legal/policies";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} for sizing questions, order help, and vintage thrift shopping support at ${CONTACT_EMAIL}.`,
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  const depopUrl = getDepopShopUrl();
  const instagramUrl = getInstagramUrl();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-4 sm:px-10 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#333]/85">
          <Link href="/" className="font-semibold hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#141414]">Contact</span>
        </nav>

        <article className="rounded-2xl border border-black/15 bg-white/75 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
          <p className="font-hand text-lg font-semibold text-[#1a1a1a]/70">
            {SITE_NAME} ✨
          </p>
          <h1 className="font-hand mt-3 text-3xl font-semibold text-[#141414] sm:text-4xl">
            Contact us ✉️
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#222]/90">
            Questions about sizing, shipping, or an order? We&apos;re happy to
            help before and after you buy.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-[#141414]">Email</h2>
              <p className="mt-2 text-sm text-[#222]/90">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="mt-2 text-sm text-[#444]/85">
                Best for order help, measurements, and bundle requests.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#141414]">Depop</h2>
              <p className="mt-2 text-sm text-[#222]/90">
                <a
                  href={depopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  Message us on Depop
                </a>
              </p>
              <p className="mt-2 text-sm text-[#444]/85">
                For items listed in our On Depop section.
              </p>
            </section>

            {instagramUrl ? (
              <section>
                <h2 className="text-lg font-semibold text-[#141414]">
                  Instagram
                </h2>
                <p className="mt-2 text-sm text-[#222]/90">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    Follow on Instagram
                  </a>
                </p>
              </section>
            ) : null}

            <section>
              <h2 className="text-lg font-semibold text-[#141414]">
                Shop policies
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {LEGAL_ROUTES.filter((r) => r.href !== "/contact").map(
                  (route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className="font-semibold text-[#141414] underline underline-offset-2"
                      >
                        {route.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </section>
          </div>
        </article>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-semibold text-[#141414] underline underline-offset-2"
        >
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}
