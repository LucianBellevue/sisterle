import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type StoryBentoProps = {
  featuredProduct?: StorefrontProduct | null;
};

export function StoryBento({ featuredProduct }: StoryBentoProps) {
  return (
    <div className="grid gap-3 md:grid-cols-5 md:gap-4">
      <BentoPanel
        tone="cream"
        className="bento-enter flex flex-col justify-between p-6 sm:p-8 md:col-span-3 md:row-span-2"
        as="section"
      >
        <div id="about" className="scroll-anchor">
          <h2 className="bento-title text-2xl sm:text-3xl">{UI_COPY.sections.about}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#222]/90 sm:text-lg">
            Sisterle is a curated thrift and vintage shop with a soft spot for
            texture, shape, and that “wait… where did you find that?” energy.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#222]/80">
            We select pre-loved fashion and small antiques that feel wearable,
            photographable, and worth keeping—no filler. Expect one-of-one
            drops, quick sell-outs, and pieces that become your new favorite.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {["Quality over quantity", "Clear photos + measurements", "Reuse, rewear, re-love"].map(
            (value) => (
              <li
                key={value}
                className="rounded-full bg-[var(--panel-pink)] px-3 py-1.5 text-xs font-semibold text-[#141414]"
              >
                {value}
              </li>
            ),
          )}
        </ul>
      </BentoPanel>

      <BentoPanel
        tone="blue"
        className="bento-enter bento-enter-delay-1 p-6 sm:p-7 md:col-span-2"
        as="section"
      >
        <div id="info" className="scroll-anchor">
          <h2 className="bento-title text-xl sm:text-2xl">{UI_COPY.sections.info}</h2>
          <p className="mt-2 text-sm font-semibold text-[#141414]/75">
            {UI_COPY.labels.whatYoullFind}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#222]/90">
            <li>Vintage clothing, accessories, and soft antiques</li>
            <li>Small home and decor with texture and shape</li>
            <li>Honest one-of-one listings with clear photos</li>
          </ul>
        </div>
      </BentoPanel>

      {featuredProduct ? (
        <BentoPanel
          tone="yellow"
          className="bento-enter bento-enter-delay-2 overflow-hidden p-4 md:col-span-2"
        >
          <Link href={`/shop/${featuredProduct.id}`} className="block">
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-white/50">
              {featuredProduct.imageUrl ? (
                <Image
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-3xl">🛍️</span>
              )}
            </div>
            <p className="bento-title text-lg">{featuredProduct.name}</p>
            <p className="mt-1 text-sm font-semibold">
              {formatMoney(featuredProduct.priceCents, featuredProduct.currency)}
            </p>
          </Link>
        </BentoPanel>
      ) : (
        <BentoPanel
          tone="yellow"
          className="bento-enter bento-enter-delay-2 p-6 md:col-span-2"
        >
          <p className="bento-title text-xl">{UI_COPY.labels.shippingDrops}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#222]/90">
            Buy Sisterle shop items here with secure Square checkout. Pieces we
            also sell on Depop appear under On Depop.
          </p>
        </BentoPanel>
      )}
    </div>
  );
}
