"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
import { UI_COPY } from "@/lib/copy/ui";
import { cycleTone, type PanelTone } from "@/lib/bento/tones";
import type { CatalogDensity } from "@/lib/shop/catalog-layout";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

type ProductCardProps = {
  product: StorefrontProduct;
  tone?: PanelTone;
  index?: number;
  density?: CatalogDensity;
  nested?: boolean;
};

function imageUrlsFor(product: StorefrontProduct): string[] {
  if (product.imageUrls.length > 0) return product.imageUrls;
  return product.imageUrl ? [product.imageUrl] : [];
}

function imageFrameClass(density: CatalogDensity): string {
  switch (density) {
    case "solo":
      return "aspect-[4/5] max-h-[min(520px,70vh)] w-full rounded-[1.25rem] sm:rounded-[1.5rem]";
    case "compact":
      return "aspect-[3/4] max-h-[10.5rem] w-full rounded-[0.875rem] sm:max-h-[11.5rem] sm:rounded-[1rem]";
    default:
      return "aspect-[4/5] max-h-[15rem] w-full rounded-[1rem] sm:max-h-[17rem] sm:rounded-[1.25rem]";
  }
}

function imageSizes(density: CatalogDensity): string {
  switch (density) {
    case "solo":
      return "(max-width: 640px) 100vw, 480px";
    case "compact":
      return "(max-width: 640px) 45vw, 200px";
    default:
      return "(max-width: 640px) 45vw, 280px";
  }
}

export function ProductCard({
  product,
  tone,
  index = 0,
  density = "standard",
  nested = false,
}: ProductCardProps) {
  const { addProduct, items } = useCart();
  const inCart = items.some((item) => item.variationId === product.variationId);
  const isDepop = product.channel === "depop";
  const href = `/shop/${product.id}`;
  const panelTone = tone ?? cycleTone(index);
  const urls = imageUrlsFor(product);
  const [galleryLive, setGalleryLive] = useState(false);

  const engageGallery = useCallback(() => {
    if (urls.length > 1) setGalleryLive(true);
  }, [urls.length]);

  const disengageGallery = useCallback(() => {
    setGalleryLive(false);
  }, []);

  const compactPanel = density === "compact";
  const soloPanel = density === "solo";

  const padding = compactPanel
    ? "p-2.5 sm:p-3"
    : soloPanel
      ? "p-4 sm:p-6"
      : "p-3 sm:p-4";

  const body = (
    <>
      <Link
        href={href}
        className="block min-h-0 flex-1 outline-none"
        onMouseEnter={engageGallery}
        onMouseLeave={disengageGallery}
        onFocus={engageGallery}
        onBlur={disengageGallery}
        onTouchStart={engageGallery}
        onTouchEnd={() => {
          window.setTimeout(disengageGallery, 3200);
        }}
      >
        <div className="relative mb-2 sm:mb-3">
          <ProductImageGallery
            urls={urls}
            alt={product.name}
            sizes={imageSizes(density)}
            priority={soloPanel && index === 0}
            live={galleryLive}
            className={imageFrameClass(density)}
          />
          {product.soldOut && !isDepop ? (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-[#141414] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--salmon)] sm:left-2.5 sm:top-2.5 sm:px-2.5 sm:text-[10px]">
              Sold
            </span>
          ) : null}
          {isDepop ? (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-[#141414] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--salmon)] sm:left-2.5 sm:top-2.5 sm:px-2.5 sm:text-[10px]">
              Depop
            </span>
          ) : null}
        </div>

        <h3
          className={[
            "bento-title text-[#141414]",
            soloPanel
              ? "text-lg sm:text-2xl"
              : compactPanel
                ? "text-sm sm:text-base"
                : "text-base sm:text-lg",
          ].join(" ")}
        >
          {product.name}
        </h3>
        {product.description && !compactPanel ? (
          <p
            className={[
              "bento-copy",
              soloPanel ? "line-clamp-3" : "line-clamp-2",
            ].join(" ")}
          >
            {product.description}
          </p>
        ) : null}
        <p
          className={[
            "font-semibold text-[#141414]",
            compactPanel ? "mt-1 text-xs sm:text-sm" : "mt-2 text-sm",
          ].join(" ")}
        >
          {formatMoney(product.priceCents, product.currency)}
        </p>
      </Link>

      <div
        className={[
          "mt-auto flex gap-2",
          compactPanel ? "pt-2" : "pt-3",
          soloPanel ? "flex-col sm:flex-row" : "flex-col",
        ].join(" ")}
      >
        <Link
          href={href}
          className={[
            "bento-btn border border-black/12 bg-[#f5f5f5] text-[#141414] hover:bg-[#ececec] sm:flex-1",
            compactPanel ? "!min-h-10 text-xs" : "",
          ].join(" ")}
        >
          View 👀
        </Link>
        {isDepop && product.depopUrl ? (
          <a
            href={product.depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black sm:flex-1",
              compactPanel ? "!min-h-10 text-xs" : "",
            ].join(" ")}
          >
            {UI_COPY.ctas.viewOnDepop}
          </a>
        ) : product.purchasable ? (
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={inCart}
            className={[
              "bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1",
              compactPanel ? "!min-h-10 text-xs" : "",
            ].join(" ")}
          >
            {inCart ? UI_COPY.ctas.inCart : UI_COPY.ctas.addToCart}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className={[
              "bento-btn border border-black/10 bg-[#f0f0f0] text-[#666]",
              compactPanel ? "!min-h-10 text-xs" : "",
            ].join(" ")}
          >
            Sold out
          </button>
        )}
      </div>
    </>
  );

  if (nested) {
    return (
      <article
        className={[
          "product-tile bento-card-lift flex h-full flex-col",
          padding,
        ].join(" ")}
      >
        {body}
      </article>
    );
  }

  return (
    <BentoPanel
      tone={panelTone}
      as="article"
      starSeed={index * 5 + 21}
      starCount={soloPanel ? 6 : 4}
      className={["bento-card-lift flex h-full flex-col", padding].join(" ")}
    >
      {body}
    </BentoPanel>
  );
}
