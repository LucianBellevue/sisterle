"use client";

import Image from "next/image";
import { useState } from "react";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { toneClass, type PanelTone } from "@/lib/bento/tones";
import type { StorefrontProduct } from "@/lib/square/types";

type CategoryItem = {
  id: string;
  label: string;
  href: string;
  tone: PanelTone;
  blurb: string;
};

const CATEGORIES: CategoryItem[] = [
  {
    id: "shop",
    label: UI_COPY.sections.shop,
    href: "/#shop",
    tone: "yellow",
    blurb:
      "One-of-one thrift and vintage you can buy right here with Square checkout.",
  },
  {
    id: "depop",
    label: UI_COPY.sections.depop,
    href: "/#depop",
    tone: "blue",
    blurb: "Mirrored listings that live on Depop — tap through to buy there.",
  },
  {
    id: "info",
    label: UI_COPY.sections.info,
    href: "/#info",
    tone: "coral",
    blurb: "Shipping notes, what we stock, and how Sisterle drops work.",
  },
  {
    id: "contact",
    label: UI_COPY.sections.contact,
    href: "/#contact",
    tone: "pink",
    blurb: "Sizing questions, bundles, or a quick check before you buy.",
  },
];

type CategoryPillsProps = {
  featuredProduct?: StorefrontProduct | null;
};

export function CategoryPills({ featuredProduct }: CategoryPillsProps) {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  return (
    <section aria-label="Browse categories" className="flex flex-col gap-3">
      <h2 className="bento-title text-2xl text-[#141414] sm:text-3xl">
        Browse ✨
      </h2>
      <ul className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => {
          const expanded = activeId === cat.id;
          return (
            <li key={cat.id}>
              {expanded ? (
                <BentoPanel tone={cat.tone} className="overflow-hidden p-5 sm:p-6">
                  <button
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    className="bento-title w-full text-left text-xl sm:text-2xl"
                  >
                    {cat.label}
                  </button>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <p className="max-w-md text-sm leading-relaxed text-current/90">
                      {cat.blurb}
                    </p>
                    <div className="flex items-center gap-3">
                      {featuredProduct?.imageUrl && cat.id === "shop" ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white/50">
                          <Image
                            src={featuredProduct.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      ) : null}
                      <a
                        href={cat.href}
                        className={[
                          "bento-btn",
                          cat.tone === "coral"
                            ? "bg-[#fff8f0] text-[#141414]"
                            : "bg-[#141414] text-[var(--salmon)]",
                        ].join(" ")}
                      >
                        Open
                      </a>
                    </div>
                  </div>
                </BentoPanel>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={[
                    "bento-panel flex w-full items-center justify-between rounded-full px-5 py-4 text-left transition",
                    toneClass(cat.tone),
                  ].join(" ")}
                >
                  <span className="bento-title text-lg sm:text-xl">
                    {cat.label}
                  </span>
                  <span className="text-sm font-semibold opacity-70">Open</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
