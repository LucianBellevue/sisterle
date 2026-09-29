"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/components/cart/CartProvider";
import { BentoCornerStars } from "@/components/stars/BentoCornerStars";
import { MENU_LINKS, MOBILE_TABS } from "@/lib/nav/config";
import { getDepopShopUrl, SITE_NAME } from "@/lib/site";
import { useAppSelector } from "@/store/hooks";
import type { SectionId } from "@/store/uiSlice";

function isHomePath(pathname: string) {
  return pathname === "/";
}

function isTabActive(
  tabId: string,
  pathname: string,
  activeSection: SectionId | null,
) {
  if (tabId === "home") return pathname === "/";
  if (tabId === "shop") {
    return pathname.startsWith("/shop") || activeSection === "shop";
  }
  if (tabId === "depop") {
    return activeSection === "depop";
  }
  return false;
}

export function MobileNavigation() {
  const pathname = usePathname();
  const activeSection = useAppSelector((s) => s.ui.activeSection);
  const { itemCount, openCart } = useCart();
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
  const menuOpen = menuOpenAt === pathname;
  const depopUrl = getDepopShopUrl();

  const closeMenu = useCallback(() => setMenuOpenAt(null), []);
  const openMenu = useCallback(() => setMenuOpenAt(pathname), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const onHome = isHomePath(pathname);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 md:hidden mobile-safe-top">
        <div className="nav-glass nav-stars-host mx-2 mt-2 flex h-14 items-center justify-between gap-3 overflow-visible rounded-2xl px-3">
          <BentoCornerStars seed={71} count={4} idPrefix="mnav-top" />
          <Link
            href="/"
            className="flex min-w-0 items-center"
            aria-label={`${SITE_NAME} home`}
          >
            <BrandLogo size="nav" priority />
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
              className="nav-pill relative !min-h-11 px-3"
            >
              Cart
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#141414] px-1 text-[10px] font-bold text-(--salmon)">
                  {itemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="nav-pill nav-pill-active !min-h-11 px-3"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Primary mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden mobile-safe-bottom"
      >
        <div className="nav-glass nav-stars-host relative mx-2 mb-2 overflow-visible rounded-2xl px-1.5 py-1.5">
          <BentoCornerStars seed={77} count={4} idPrefix="mnav-bot" />
          <div className="relative z-[2] grid grid-cols-4 gap-1">
          {MOBILE_TABS.map((tab) => {
            const active = isTabActive(tab.id, pathname, activeSection);
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={["nav-tab", active ? "nav-tab-active" : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <span className="font-hand text-xs font-semibold tracking-wide">
                  {tab.label}
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openCart}
            className={[
              "nav-tab",
              itemCount > 0 ? "nav-tab-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="Open cart"
          >
            <span className="font-hand text-xs font-semibold tracking-wide">
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </span>
          </button>
          </div>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={closeMenu}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="nav-glass absolute inset-y-2 right-2 flex w-[min(100%,19.5rem)] flex-col rounded-3xl mobile-safe-top mobile-safe-bottom"
          >
            <div className="flex items-center justify-between border-b border-black/8 px-4 py-4">
              <BrandLogo size="nav" />
              <button
                type="button"
                onClick={closeMenu}
                className="nav-pill !min-h-11"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#666]">
                Browse
              </p>
              <ul className="space-y-1.5">
                {MENU_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="nav-pill !min-h-11 w-full justify-start px-3"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-4 px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#666]">
                External
              </p>
              <a
                href={depopUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="nav-pill !min-h-11 w-full justify-start px-3"
              >
                Depop shop ↗ 🛍️
              </a>
            </div>

            {!onHome ? (
              <div className="border-t border-black/8 p-3">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="bento-btn w-full bg-[#141414] text-(--salmon) hover:bg-black"
                >
                  Back to home
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}
    </>
  );
}
