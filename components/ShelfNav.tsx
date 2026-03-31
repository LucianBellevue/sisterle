"use client";

import { useAppSelector } from "@/store/hooks";
import type { SectionId } from "@/store/uiSlice";

type ShelfNavProps = {
  depopUrl: string;
};

export function ShelfNav({ depopUrl }: ShelfNavProps) {
  const active = useAppSelector((s) => s.ui.activeSection);
  const isActive = (id: SectionId) => active === id;

  return (
    <div className="sticky top-4 z-20">
      <div
        className={[
          "relative rounded-2xl border border-black/15 bg-white/45 p-2 shadow-[0_14px_40px_-22px_rgba(0,0,0,0.35)] backdrop-blur-md",
          "after:pointer-events-none after:absolute after:inset-[-8px] after:rounded-[22px] after:opacity-[0.55] after:content-['']",
          "after:bg-[radial-gradient(22px_16px_at_18%_20%,rgba(0,0,0,0.08),transparent_60%),radial-gradient(22px_16px_at_82%_24%,rgba(0,0,0,0.07),transparent_60%),radial-gradient(26px_18px_at_50%_88%,rgba(0,0,0,0.06),transparent_62%)]",
        ].join(" ")}
      >
        <nav
          aria-label="Page sections"
          className="flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { id: "info", label: "Info" },
              { id: "about", label: "About" },
              { id: "featured", label: "Featured" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={[
                  "inline-flex items-center rounded-xl border px-4 py-2 text-sm font-bold tracking-wide transition",
                  "text-[#141414]",
                  isActive(link.id as SectionId)
                    ? "border-black/35 bg-white/95 shadow-[0_8px_18px_-14px_rgba(0,0,0,0.55)]"
                    : "border-black/15 bg-white/65 hover:bg-white/85",
                ].join(" ")}
                style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#141414] px-4 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            Shop on Depop
          </a>
        </nav>
      </div>
    </div>
  );
}

