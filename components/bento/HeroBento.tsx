import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import type { StorefrontProduct } from "@/lib/square/types";

const LOGO_SRC = "/sisterle-logo.png";
const MOSAIC_PLACEHOLDERS = ["✨", "👗", "🛍️", "💌", "🪡", "💖", "📦", "👀", "🎀"];

type MosaicCell = {
  key: string;
  href: string;
  imageUrl?: string | null;
  emoji?: string;
};

type HeroBentoProps = {
  products: StorefrontProduct[];
};

export function HeroBento({ products }: HeroBentoProps) {
  const withImages = products.filter((p) => p.imageUrl).slice(0, 9);
  const cells: MosaicCell[] = withImages.map((p) => ({
    key: p.id,
    imageUrl: p.imageUrl,
    href: `/shop/${p.id}`,
  }));

  while (cells.length < 9) {
    const i = cells.length;
    cells.push({
      key: `ph-${i}`,
      emoji: MOSAIC_PLACEHOLDERS[i % MOSAIC_PLACEHOLDERS.length],
      href: "/#shop",
    });
  }

  return (
    <section aria-label="Hero" className="grid gap-3 md:grid-cols-2 md:gap-4">
      <BentoPanel
        tone="pink"
        className="bento-enter flex min-h-[280px] flex-col justify-between p-6 sm:min-h-[340px] sm:p-8"
      >
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#141414]/70">
            {SITE_TAGLINE} ✨
          </p>
          <h1 className="mb-4 inline-block rounded-2xl border border-black/15 bg-black p-2.5">
            <Image
              src={LOGO_SRC}
              alt={SITE_NAME}
              width={220}
              height={64}
              priority
              className="h-auto w-[min(200px,70vw)]"
            />
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#222]/90 sm:text-base">
            {UI_COPY.hero.support}
          </p>
        </div>
        <div className="mt-8">
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
        className="bento-enter bento-enter-delay-1 flex min-h-[280px] flex-col p-4 sm:min-h-[340px] sm:p-5"
      >
        <p className="bento-title mb-3 px-1 text-lg sm:text-xl">Fresh finds 👀</p>
        <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
          {cells.map((cell) => (
            <Link
              key={cell.key}
              href={cell.href}
              className="relative aspect-square overflow-hidden rounded-2xl bg-white/80 transition hover:opacity-90"
            >
              {cell.imageUrl ? (
                <Image
                  src={cell.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-2xl">
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
