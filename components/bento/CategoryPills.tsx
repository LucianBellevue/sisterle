import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import type { PanelTone } from "@/lib/bento/tones";
import type { StorefrontProduct } from "@/lib/square/types";

type BrowseTile = {
  id: string;
  label: string;
  href: string;
  tone: PanelTone;
  blurb: string;
  emoji: string;
  className: string;
};

const TILES: BrowseTile[] = [
  {
    id: "shop",
    label: UI_COPY.sections.shop,
    href: "/#shop",
    tone: "yellow",
    blurb:
      "One-of-one thrift and vintage you can buy right here with Square checkout.",
    emoji: "🛍️",
    className:
      "min-h-[260px] sm:row-span-2 sm:min-h-[340px] lg:col-span-2 lg:row-span-2 lg:min-h-[360px]",
  },
  {
    id: "depop",
    label: UI_COPY.sections.depop,
    href: "/#depop",
    tone: "blue",
    blurb: "Mirrored listings that live on Depop — tap through to buy there.",
    emoji: "👗",
    className: "min-h-[170px] lg:col-span-2",
  },
  {
    id: "info",
    label: UI_COPY.sections.info,
    href: "/#info",
    tone: "coral",
    blurb: "Shipping notes, what we stock, and how Sisterle drops work.",
    emoji: "💌",
    className: "min-h-[170px]",
  },
  {
    id: "contact",
    label: UI_COPY.sections.contact,
    href: "/#contact",
    tone: "pink",
    blurb: "Sizing questions, bundles, or a quick check before you buy.",
    emoji: "✉️",
    className: "min-h-[170px]",
  },
];

type CategoryPillsProps = {
  featuredProduct?: StorefrontProduct | null;
};

export function CategoryPills({ featuredProduct }: CategoryPillsProps) {
  return (
    <section aria-label="Browse categories" className="flex flex-col gap-3">
      <h2 className="bento-title text-2xl text-[#141414] sm:text-3xl">
        Browse ✨
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {TILES.map((tile) => {
          const isShop = tile.id === "shop";
          const showFeatured = isShop && featuredProduct?.imageUrl;

          return (
            <Link
              key={tile.id}
              href={tile.href}
              className={[
                "group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-coral)]",
                tile.className,
              ].join(" ")}
            >
              <BentoPanel
                tone={tile.tone}
                className="bento-card-lift relative flex h-full flex-col justify-between overflow-hidden p-5 sm:p-6"
              >
                {showFeatured ? (
                  <div className="pointer-events-none absolute inset-0 opacity-[0.22] transition group-hover:opacity-[0.3]">
                    <Image
                      src={featuredProduct.imageUrl!}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : null}

                <div className="relative z-[1] flex items-start justify-between gap-3">
                  <p className="bento-title text-xl leading-tight sm:text-2xl lg:text-[1.65rem]">
                    {tile.label}
                  </p>
                  <span
                    className="text-2xl sm:text-3xl"
                    aria-hidden
                  >
                    {tile.emoji}
                  </span>
                </div>

                <div className="relative z-[1] mt-6 flex flex-col gap-4 sm:mt-auto">
                  <p className="max-w-sm text-sm leading-relaxed text-current/90">
                    {tile.blurb}
                  </p>
                  {showFeatured ? (
                    <div className="flex items-end justify-between gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-sm sm:h-20 sm:w-20">
                        <Image
                          src={featuredProduct.imageUrl!}
                          alt={featuredProduct.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <span
                        className={[
                          "bento-btn",
                          tile.tone === "coral"
                            ? "bg-[#fff8f0] text-[#141414]"
                            : "bg-[#141414] text-[var(--salmon)]",
                        ].join(" ")}
                      >
                        Open
                      </span>
                    </div>
                  ) : (
                    <span
                      className={[
                        "bento-btn w-fit",
                        tile.tone === "coral"
                          ? "bg-[#fff8f0] text-[#141414]"
                          : "bg-[#141414] text-[var(--salmon)]",
                      ].join(" ")}
                    >
                      Open
                    </span>
                  )}
                </div>
              </BentoPanel>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
