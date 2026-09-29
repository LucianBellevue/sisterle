"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  catalogPageCount,
  getCatalogLayout,
  paginateProducts,
  type CatalogLayout,
} from "@/lib/shop/catalog-layout";
import type { StorefrontProduct } from "@/lib/square/types";

type CatalogProductGridProps = {
  products: StorefrontProduct[];
  /** Render tiles inside the main catalog bento (not standalone panels). */
  nested?: boolean;
  layout?: CatalogLayout;
};

export function CatalogProductGrid({
  products,
  nested = false,
  layout: layoutProp,
}: CatalogProductGridProps) {
  const layout = useMemo(
    () => layoutProp ?? getCatalogLayout(products.length),
    [layoutProp, products.length],
  );
  const [page, setPage] = useState(0);

  const pageCount = catalogPageCount(products.length, layout.pageSize);
  const safePage = Math.min(page, Math.max(0, pageCount - 1));

  const visible = layout.paginate
    ? paginateProducts(products, safePage, layout.pageSize)
    : products;

  const gridClass =
    layout.density === "solo"
      ? "mx-auto grid max-w-md grid-cols-1"
      : layout.density === "compact"
        ? "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
        : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3";

  return (
    <div className="flex flex-col gap-4">
      <div className={gridClass}>
        {visible.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={layout.paginate ? safePage * layout.pageSize + index : index}
            density={layout.density}
            nested={nested}
          />
        ))}
      </div>

      {layout.paginate && pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
          <button
            type="button"
            className="nav-pill !min-h-10 disabled:opacity-40"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ← Previous
          </button>
          <p className="text-sm font-semibold text-[#141414]/70">
            Page {safePage + 1} of {pageCount}
            <span className="hidden sm:inline">
              {" "}
              · {products.length} pieces
            </span>
          </p>
          <button
            type="button"
            className="nav-pill !min-h-10 disabled:opacity-40"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          >
            Next →
          </button>
        </div>
      ) : null}
    </div>
  );
}
