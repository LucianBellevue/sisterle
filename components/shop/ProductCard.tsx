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
};

export function ProductCard({ product, tone, index = 0 }: ProductCardProps) {
  const { addProduct, items } = useCart();
  const inCart = items.some((item) => item.variationId === product.variationId);
  const isDepop = product.channel === "depop";
  const href = `/shop/${product.id}`;
  const panelTone = tone ?? cycleTone(index);

  return (
    <BentoPanel
      tone={panelTone}
      as="article"
      className="bento-card-lift flex h-full flex-col p-4"
    >
      <Link href={href} className="block">
        <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-white/40">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 280px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-[#666]">
              Photo coming soon
            </div>
          )}
          {product.soldOut && !isDepop ? (
            <span className="absolute left-3 top-3 rounded-full bg-[#141414] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--salmon)]">
              Sold
            </span>
          ) : null}
          {isDepop ? (
            <span className="absolute left-3 top-3 rounded-full bg-[#141414] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--salmon)]">
              Depop
            </span>
          ) : null}
        </div>

        <h3 className="bento-title text-lg text-[#141414]">{product.name}</h3>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#222]/80">
            {product.description}
          </p>
        ) : null}
        <p className="mt-3 text-sm font-semibold text-[#141414]">
          {formatMoney(product.priceCents, product.currency)}
        </p>
      </Link>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <Link
          href={href}
          className="bento-btn border border-black/15 bg-white/70 text-[#141414] hover:bg-white"
        >
          View details 👀
        </Link>
        {isDepop && product.depopUrl ? (
          <a
            href={product.depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black"
          >
            {UI_COPY.ctas.viewOnDepop}
          </a>
        ) : product.purchasable ? (
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={inCart}
            className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
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
