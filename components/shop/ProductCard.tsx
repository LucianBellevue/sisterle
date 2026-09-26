"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { UI_COPY } from "@/lib/copy/ui";
import { cycleTone, type PanelTone } from "@/lib/bento/tones";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type ProductCardProps = {
  product: StorefrontProduct;
  tone?: PanelTone;
  index?: number;
  featured?: boolean;
};

export function ProductCard({
  product,
  tone,
  index = 0,
  featured = false,
}: ProductCardProps) {
  const { addProduct, items } = useCart();
  const inCart = items.some((item) => item.variationId === product.variationId);
  const isDepop = product.channel === "depop";
  const href = `/shop/${product.id}`;
  const panelTone = tone ?? cycleTone(index);

  return (
    <BentoPanel
      tone={panelTone}
      as="article"
      className={[
        "bento-card-lift flex h-full flex-col",
        featured ? "p-3 sm:p-5" : "p-3 sm:p-4",
      ].join(" ")}
    >
      <Link href={href} className="block min-h-0 flex-1">
        <div
          className={[
            "relative mb-3 overflow-hidden rounded-[1rem] bg-white/40 sm:mb-4 sm:rounded-[1.25rem]",
            featured
              ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[280px] lg:h-[calc(100%-5.5rem)]"
              : "aspect-[4/5]",
          ].join(" ")}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  : "(max-width: 640px) 100vw, 280px"
              }
              priority={featured}
            />
          ) : (
            <div className="flex h-full min-h-[140px] items-center justify-center text-xs uppercase tracking-[0.18em] text-[#666]">
              Photo coming soon
            </div>
          )}
          {product.soldOut && !isDepop ? (
            <span className="absolute left-2 top-2 rounded-full bg-[#141414] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--salmon)] sm:left-3 sm:top-3 sm:px-3">
              Sold
            </span>
          ) : null}
          {isDepop ? (
            <span className="absolute left-2 top-2 rounded-full bg-[#141414] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--salmon)] sm:left-3 sm:top-3 sm:px-3">
              Depop
            </span>
          ) : null}
        </div>

        <h3
          className={[
            "bento-title text-[#141414]",
            featured ? "text-lg sm:text-2xl" : "text-base sm:text-lg",
          ].join(" ")}
        >
          {product.name}
        </h3>
        {product.description ? (
          <p
            className={[
              "mt-2 text-sm leading-relaxed text-[#222]/80",
              featured ? "line-clamp-2 sm:line-clamp-3" : "line-clamp-2",
            ].join(" ")}
          >
            {product.description}
          </p>
        ) : null}
        <p className="mt-2 text-sm font-semibold text-[#141414] sm:mt-3">
          {formatMoney(product.priceCents, product.currency)}
        </p>
      </Link>

      <div
        className={[
          "mt-auto flex gap-2 pt-3 sm:pt-4",
          featured ? "flex-col sm:flex-row" : "flex-col",
        ].join(" ")}
      >
        <Link
          href={href}
          className="bento-btn border border-black/15 bg-white/70 text-[#141414] hover:bg-white sm:flex-1"
        >
          View details 👀
        </Link>
        {isDepop && product.depopUrl ? (
          <a
            href={product.depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black sm:flex-1"
          >
            {UI_COPY.ctas.viewOnDepop}
          </a>
        ) : product.purchasable ? (
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={inCart}
            className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
          >
            {inCart ? UI_COPY.ctas.inCart : UI_COPY.ctas.addToCart}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="bento-btn border border-black/15 bg-white/50 text-[#666]"
          >
            Sold out
          </button>
        )}
      </div>
    </BentoPanel>
  );
}
