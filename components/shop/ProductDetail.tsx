"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
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
  const urls =
    product.imageUrls.length > 0
      ? product.imageUrls
      : product.imageUrl
        ? [product.imageUrl]
        : [];
  const [live, setLive] = useState(false);
  const engage = useCallback(() => {
    if (urls.length > 1) setLive(true);
  }, [urls.length]);
  const disengage = useCallback(() => setLive(false), []);

  return (
    <div
      className="rounded-2xl border border-black/10 bg-black/5"
      onMouseEnter={engage}
      onMouseLeave={disengage}
      onFocus={engage}
      onBlur={disengage}
      onTouchStart={engage}
      onTouchEnd={() => window.setTimeout(disengage, 3200)}
    >
      <ProductImageGallery
        urls={urls}
        alt={product.name}
        sizes="(max-width: 768px) 100vw, 480px"
        priority
        live={live}
        className="aspect-[4/5] w-full rounded-2xl"
      />
    </div>
  );
}
