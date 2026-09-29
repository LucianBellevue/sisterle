"use client";

import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { LEGAL_ROUTES } from "@/lib/legal/policies";

type ContactSectionProps = {
  depopUrl: string;
  email: string;
};

export function ContactSection({ depopUrl, email }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-anchor">
      <BentoPanel
        tone="yellow"
        className="bento-enter flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-7"
      >
        <div className="max-w-lg">
          <h2 className="bento-title text-2xl sm:text-3xl">
            {UI_COPY.sections.contact}
          </h2>
          <p className="bento-copy">
            For sizing questions, bundles, or quick checks before you buy, reach
            out by email or Depop message.
          </p>
          <div className="bento-actions sm:flex-row">
            <a
              href={depopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black"
            >
              {UI_COPY.ctas.messageOnDepop}
            </a>
            <a
              href={`mailto:${email}`}
              className="bento-btn border border-black/12 bg-[#f5f5f5] text-[#141414] hover:bg-[#ececec]"
            >
              {UI_COPY.ctas.email}
            </a>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-black/8 bg-[#f7f7f7] p-4 sm:min-w-[200px]">
          <p className="bento-title text-base">{UI_COPY.labels.quickLinks}</p>
          <div className="mt-2.5 flex flex-col gap-1.5 text-sm">
            <a href="#shop" className="font-semibold hover:underline">
              {UI_COPY.sections.shop}
            </a>
            <a href="#depop" className="font-semibold hover:underline">
              {UI_COPY.sections.depop}
            </a>
            <Link href="/contact" className="font-semibold hover:underline">
              Contact page 📝
            </Link>
            {LEGAL_ROUTES.filter((r) => r.href !== "/contact").map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="font-semibold hover:underline"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </BentoPanel>
    </section>
  );
}
