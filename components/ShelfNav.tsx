"use client";

import { useAppSelector } from "@/store/hooks";
import type { SectionId } from "@/store/uiSlice";
import { useCart } from "@/components/cart/CartProvider";
import { PRIMARY_SECTIONS } from "@/lib/nav/config";

type ShelfNavProps = {
  depopUrl: string;
};

export function ShelfNav({ depopUrl }: ShelfNavProps) {
  const active = useAppSelector((s) => s.ui.activeSection);
  const isActive = (id: SectionId) => active === id;
  const { itemCount, openCart } = useCart();

  return (
    <nav
      aria-label="Page sections"
      className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-bento)] border-[3px] border-[var(--panel-coral)] bg-[var(--panel-cream)] p-2"
    >
      <div className="flex flex-wrap gap-2">
        {PRIMARY_SECTIONS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={[
              "bento-title inline-flex items-center rounded-full px-4 py-2 text-sm transition",
              link.sectionId && isActive(link.sectionId)
                ? "bg-[var(--panel-coral)] text-[#fff8f0]"
                : "bg-white/70 text-[#141414] hover:bg-white",
            ].join(" ")}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={openCart}
          className="bento-btn border border-black/10 bg-white/80 text-[#141414] hover:bg-white"
        >
          Cart{itemCount > 0 ? ` (${itemCount})` : ""}
        </button>
        <a
          href={depopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-btn bg-[#141414] text-[var(--salmon)] hover:bg-black"
        >
          Depop shop 🛍️
        </a>
      </div>
    </nav>
  );
}
