import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type StoryBentoProps = {
  featuredProduct?: StorefrontProduct | null;
  depopUrl: string;
  email: string;
};

export function StoryBento({
  featuredProduct,
  depopUrl,
  email,
}: StoryBentoProps) {
  return (
    <section aria-label="About and contact" className="scroll-anchor">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-6">
        <BentoPanel
          tone="cream"
          starSeed={8}
          starCount={8}
          className="bento-enter flex flex-col justify-between p-5 sm:col-span-2 sm:p-7 md:col-span-3 md:row-span-2"
          as="div"
        >
          <div id="about">
            <h2 className="bento-title text-xl sm:text-3xl">
              {UI_COPY.sections.about}
            </h2>
            <p className="bento-copy">{UI_COPY.about.lead}</p>
            <p className="bento-copy">{UI_COPY.about.body}</p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {[
              "Quality over quantity",
              "Clear photos + measurements",
              "Reuse, rewear, re-love",
            ].map((value) => (
              <li
                key={value}
                className="rounded-full bg-[var(--panel-pink)] px-3 py-1.5 text-xs font-semibold text-[#141414]"
              >
                {value}
              </li>
            ))}
          </ul>
        </BentoPanel>

        <BentoPanel
          tone="blue"
          starSeed={14}
          starCount={6}
          className="bento-enter bento-enter-delay-1 p-5 sm:col-span-2 sm:p-6 md:col-span-3"
          as="div"
        >
          <div id="info">
            <h2 className="bento-title text-xl sm:text-2xl">
              {UI_COPY.sections.info}
            </h2>
            <p className="bento-meta">{UI_COPY.labels.whatYoullFind}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#222]/88 sm:mt-3.5">
              {UI_COPY.info.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </BentoPanel>

        <BentoPanel
          tone="yellow"
          starSeed={19}
          starCount={6}
          className="bento-enter bento-enter-delay-2 flex flex-col justify-between p-5 sm:p-6 md:col-span-2"
          as="div"
        >
          <div id="contact">
            <h2 className="bento-title text-xl sm:text-2xl">
              {UI_COPY.sections.contact}
            </h2>
            <p className="bento-copy">
              Sizing, bundles, or a quick check before you buy.
            </p>
          </div>
          <div className="bento-actions">
            <a
              href={`mailto:${email}`}
              className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black"
            >
              {UI_COPY.ctas.email}
            </a>
            <a
              href={depopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn border border-black/12 bg-[#f5f5f5] text-[#141414] hover:bg-[#ececec]"
            >
              {UI_COPY.ctas.messageOnDepop}
            </a>
          </div>
        </BentoPanel>

        {featuredProduct ? (
          <BentoPanel
            tone="pink"
            starSeed={23}
            starCount={5}
            className="bento-enter bento-enter-delay-2 p-4 sm:p-5 md:col-span-1"
          >
            <Link href={`/shop/${featuredProduct.id}`} className="block h-full">
              <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-2xl bg-[#f3f3f3] sm:aspect-square">
                {featuredProduct.imageUrl ? (
                  <Image
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 160px"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-3xl">
                    🛍️
                  </span>
                )}
              </div>
              <p className="bento-title line-clamp-2 text-base leading-snug">
                {featuredProduct.name}
              </p>
              <p className="bento-meta text-sm text-[#141414]">
                {formatMoney(
                  featuredProduct.priceCents,
                  featuredProduct.currency,
                )}
              </p>
            </Link>
          </BentoPanel>
        ) : (
          <BentoPanel
            tone="pink"
            starSeed={27}
            starCount={5}
            className="bento-enter bento-enter-delay-2 flex flex-col justify-center p-5 sm:p-6 md:col-span-1"
          >
            <p className="bento-title text-lg">
              {UI_COPY.labels.shippingDrops}
            </p>
            <p className="bento-copy">Pack &amp; ship after Square checkout.</p>
          </BentoPanel>
        )}
      </div>
    </section>
  );
}
