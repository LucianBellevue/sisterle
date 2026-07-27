"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { UI_COPY } from "@/lib/copy/ui";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type ProductPurchaseActionsProps = {
  product: StorefrontProduct;
};

export function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const { addProduct, items, openCart } = useCart();
  const inCart = items.some((item) => item.variationId === product.variationId);
  const isDepop = product.channel === "depop";

  if (isDepop && product.depopUrl) {
    return (
      <a
        href={product.depopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-semibold text-(--salmon) transition hover:bg-black sm:w-auto"
      >
        Buy on Depop 💬
      </a>
    );
  }

  if (product.purchasable) {
    return (
      <button
        type="button"
        onClick={() => {
          addProduct(product);
          openCart();
        }}
        disabled={inCart}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-semibold text-(--salmon) transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {inCart
          ? UI_COPY.ctas.inCart
          : `${UI_COPY.ctas.addToCart} · ${formatMoney(product.priceCents, product.currency)}`}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        disabled
        className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 bg-white/50 px-7 text-sm font-semibold text-[#666]"
      >
        Sold out
      </button>
      <Link
        href="/#shop"
        className="text-sm font-semibold text-[#141414] underline underline-offset-2"
      >
        Browse other finds ✨
      </Link>
    </div>
  );
}

type ProductHeroImageProps = {
  product: StorefrontProduct;
};

export function ProductHeroImage({ product }: ProductHeroImageProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-black/5">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-[#666]">
          Photo coming soon
        </div>
      )}
    </div>
  );
}
