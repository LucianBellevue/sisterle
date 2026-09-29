"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/components/cart/CartProvider";
import { BentoCornerStars } from "@/components/stars/BentoCornerStars";
import { PRIMARY_SECTIONS } from "@/lib/nav/config";
import { SITE_NAME } from "@/lib/site";
import { useAppSelector } from "@/store/hooks";
import type { SectionId } from "@/store/uiSlice";

type ShelfNavProps = {
  depopUrl: string;
};

export function ShelfNav({ depopUrl }: ShelfNavProps) {
  const pathname = usePathname();
  const active = useAppSelector((s) => s.ui.activeSection);
  const isActive = (id: SectionId) => {
    if (id === "shop" && pathname.startsWith("/shop")) return true;
    return active === id;
  };
  const { itemCount, openCart } = useCart();

  return (
    <nav
      aria-label="Page sections"
      className="nav-glass nav-stars-host flex flex-wrap items-center justify-between gap-3 overflow-visible rounded-[var(--radius-bento)] p-2.5"
    >
      <BentoCornerStars seed={61} count={6} idPrefix="shelf-star" />
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="shrink-0 rounded-xl px-1 py-0.5 transition hover:opacity-90"
          aria-label={`${SITE_NAME} home`}
        >
          <BrandLogo size="nav" priority />
        </Link>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {PRIMARY_SECTIONS.map((link) => {
            const on =
              Boolean(link.sectionId) && isActive(link.sectionId as SectionId);
            return (
              <a
                key={link.id}
                href={link.href}
                className={["nav-pill", on ? "nav-pill-active" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={openCart} className="nav-pill">
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
