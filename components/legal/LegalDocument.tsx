import Link from "next/link";
import type { PolicyDocument } from "@/lib/legal/policies";
import { LEGAL_ROUTES } from "@/lib/legal/policies";
import { SITE_NAME } from "@/lib/site";

type LegalDocumentProps = {
  policy: PolicyDocument;
};

export function LegalDocument({ policy }: LegalDocumentProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-4 sm:px-10 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#333]/85">
          <Link href="/" className="font-semibold hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#141414]">{policy.title}</span>
        </nav>

        <article className="rounded-2xl border border-black/15 bg-white/75 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
          <p className="font-hand text-lg font-semibold text-[#1a1a1a]/70">
            {SITE_NAME} ✨
          </p>
          <h1 className="font-hand mt-3 text-3xl font-semibold text-[#141414] sm:text-4xl">
            {policy.title}
          </h1>
          <p className="mt-3 text-sm text-[#444]/85">
            Last updated: {policy.lastUpdated}
          </p>

          <div className="mt-8 space-y-8">
            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-hand text-xl font-semibold text-[#141414]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#222]/90">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {LEGAL_ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="font-semibold text-[#141414] underline underline-offset-2"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
