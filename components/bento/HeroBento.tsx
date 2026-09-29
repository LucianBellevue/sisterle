import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { SITE_HEADLINE, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { StorefrontProduct } from "@/lib/square/types";

const MOSAIC_PLACEHOLDERS = ["✨", "👗", "🛍️", "💌", "🪡", "💖"];

type MosaicCell = {
  key: string;
  href: string;
  imageUrl?: string | null;
  alt?: string;
  emoji?: string;
};

type HeroBentoProps = {
  products: StorefrontProduct[];
};

export function HeroBento({ products }: HeroBentoProps) {
  const withImages = products.filter((p) => p.imageUrl).slice(0, 6);
  const cells: MosaicCell[] = withImages.map((p) => ({
    key: p.id,
    imageUrl: p.imageUrl,
    alt: p.name,
    href: `/shop/${p.id}`,
  }));

  while (cells.length < 6) {
    const i = cells.length;
    cells.push({
      key: `ph-${i}`,
      emoji: MOSAIC_PLACEHOLDERS[i % MOSAIC_PLACEHOLDERS.length],
      href: "/#shop",
      alt: "Sisterle thrift find",
    });
  }

  return (
    <section aria-label="Hero" className="grid gap-3 md:grid-cols-2 md:gap-4">
      <BentoPanel
        tone="pink"
        starSeed={2}
        starCount={7}
        className="bento-enter flex flex-col justify-between p-5 sm:min-h-[300px] sm:p-7 md:min-h-[340px] md:p-8"
      >
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/65 sm:text-xs sm:tracking-[0.18em]">
            {SITE_TAGLINE} ✨
          </p>
          <div className="mb-4">
            <BrandLogo size="hero" priority decorative />
          </div>
          <h1 className="bento-title text-[1.65rem] text-[#141414] sm:text-3xl">
            {SITE_HEADLINE}
          </h1>
          <p className="bento-copy max-w-md">{UI_COPY.hero.support}</p>
        </div>
        <div className="bento-actions">
          <Link
            href="/#shop"
            className="bento-btn bg-[var(--panel-coral)] text-[#fff8f0] hover:bg-[#d44c3c]"
          >
            Shop 🛍️
          </Link>
        </div>
      </BentoPanel>

      <BentoPanel
        tone="cream"
        bordered
        starSeed={5}
        starCount={6}
        className="bento-enter bento-enter-delay-1 flex flex-col p-5 sm:p-6"
      >
        <p className="bento-title mb-3 text-lg sm:mb-4 sm:text-xl">
          Fresh finds 👀
        </p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {cells.map((cell, index) => (
            <Link
              key={cell.key}
              href={cell.href}
              className="relative aspect-square overflow-hidden rounded-xl bg-[#f3f3f3] transition active:opacity-80 sm:rounded-2xl"
            >
              {cell.imageUrl ? (
                <Image
                  src={cell.imageUrl}
                  alt={cell.alt || SITE_NAME}
                  fill
                  priority={index < 3}
                  className="object-cover"
                  sizes="(max-width: 640px) 30vw, 120px"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-xl sm:text-2xl">
                  {cell.emoji ?? "✨"}
                </span>
              )}
            </Link>
          ))}
        </div>
      </BentoPanel>
    </section>
  );
}
