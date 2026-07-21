"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type ProductCardProps = {
  product: StorefrontProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct, items } = useCart();
  const inCart = items.some((item) => item.variationId === product.variationId);
  const isDepop = product.channel === "depop";

  return (
    <article className="relative rounded-2xl border border-black/10 bg-white/65 p-4 transition hover:bg-white/80">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-black/5">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 280px"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-[#666]">
            Photo coming soon
          </div>
        )}
        {product.soldOut && !isDepop ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#141414]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-(--salmon)">
            Sold
          </span>
        ) : null}
        {isDepop ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#141414]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-(--salmon)">
            Depop
          </span>
        ) : null}
      </div>

      <h3 className="text-base font-semibold text-[#141414]">{product.name}</h3>
      {product.description ? (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#222]/80">
          {product.description}
        </p>
      ) : null}
      <p className="mt-3 text-sm font-semibold text-[#141414]">
        {formatMoney(product.priceCents, product.currency)}
      </p>

      <div className="mt-4">
        {isDepop && product.depopUrl ? (
          <a
            href={product.depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#141414] px-5 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            View on Depop
          </a>
        ) : product.purchasable ? (
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={inCart}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#141414] px-5 text-sm font-semibold text-(--salmon) transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {inCart ? "In cart" : "Add to cart"}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/15 bg-white/50 px-5 text-sm font-semibold text-[#666]"
          >
            Sold out
          </button>
        )}
      </div>
    </article>
  );
}
