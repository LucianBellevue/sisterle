import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { SITE_HEADLINE, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { StorefrontProduct } from "@/lib/square/types";

const LOGO_SRC = "/sisterle-logo.png";
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
        className="bento-enter flex flex-col justify-between p-4 sm:min-h-[300px] sm:p-6 md:min-h-[340px] md:p-8"
      >
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/70 sm:mb-3 sm:text-xs sm:tracking-[0.18em]">
            {SITE_TAGLINE} ✨
          </p>
          <div className="mb-3 inline-block rounded-xl border border-black/15 bg-black p-2 sm:rounded-2xl sm:p-2.5">
            <Image
              src={LOGO_SRC}
              alt=""
              width={220}
              height={64}
              priority
              className="h-auto w-[min(168px,58vw)] sm:w-[min(200px,70vw)]"
            />
          </div>
          <h1 className="bento-title text-[1.65rem] leading-tight text-[#141414] sm:text-3xl">
            {SITE_HEADLINE}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#222]/90 sm:text-base">
            {UI_COPY.hero.support}
          </p>
        </div>
        <div className="mt-5 sm:mt-8">
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
        className="bento-enter bento-enter-delay-1 flex flex-col p-3 sm:p-5"
      >
        <p className="bento-title mb-2 px-1 text-base sm:mb-3 sm:text-xl">
          Fresh finds 👀
        </p>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {cells.map((cell, index) => (
            <Link
              key={cell.key}
              href={cell.href}
              className="relative aspect-square overflow-hidden rounded-xl bg-white/80 transition active:opacity-80 sm:rounded-2xl"
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
