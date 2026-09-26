"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { MENU_LINKS, MOBILE_TABS } from "@/lib/nav/config";
import { getDepopShopUrl, SITE_NAME } from "@/lib/site";
import { useAppSelector } from "@/store/hooks";
import type { SectionId } from "@/store/uiSlice";

const LOGO_SRC = "/sisterle-logo.png";

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
      {/* Fixed top bar — mobile only */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[var(--panel-cream)]/95 backdrop-blur-md md:hidden mobile-safe-top">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            aria-label={`${SITE_NAME} home`}
          >
            <span className="inline-flex shrink-0 rounded-lg border border-black/15 bg-black p-1">
              <Image
                src={LOGO_SRC}
                alt=""
                width={96}
                height={28}
                className="h-7 w-auto"
                priority
              />
            </span>
            <span className="font-hand truncate text-base font-semibold tracking-wide text-[#141414]">
              {SITE_NAME}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
              className="relative inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-black/15 bg-white px-3 text-sm font-semibold text-[#141414] transition active:scale-95"
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
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-[var(--panel-coral)] px-3 text-sm font-semibold text-[#fff8f0] transition active:scale-95"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Bottom tab bar — mobile only */}
      <nav
        aria-label="Primary mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[var(--panel-cream)]/95 backdrop-blur-md md:hidden mobile-safe-bottom"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-2 pt-1">
          {MOBILE_TABS.map((tab) => {
            const active = isTabActive(tab.id, pathname, activeSection);
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={[
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-2 text-center text-[11px] font-semibold transition active:scale-95",
                  active
                    ? "bg-[var(--panel-pink)] text-[#141414]"
                    : "text-[#444]/85",
                ].join(" ")}
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
              "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-2 text-center text-[11px] font-semibold transition active:scale-95",
              itemCount > 0
                ? "bg-[var(--panel-yellow)] text-[#141414]"
                : "text-[#444]/85",
            ].join(" ")}
            aria-label="Open cart"
          >
            <span className="font-hand text-xs font-semibold tracking-wide">
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </span>
          </button>
        </div>
      </nav>

      {/* Full-screen menu sheet */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/45"
            onClick={closeMenu}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-black/15 bg-[var(--panel-cream)] shadow-[-18px_0_50px_-28px_rgba(0,0,0,0.45)] mobile-safe-top mobile-safe-bottom"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-4">
              <p className="font-hand text-lg font-semibold text-[#1a1a1a]/80">
                Menu ✨
              </p>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-black/15 bg-white/80 px-4 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#666]">
                Browse
              </p>
              <ul className="space-y-1">
                {MENU_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[#141414] transition hover:bg-white/80 active:bg-white"
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
                className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[#141414] transition hover:bg-white/80"
              >
                Depop shop ↗ 🛍️
              </a>
            </div>

            {!onHome ? (
              <div className="border-t border-black/10 p-3">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#141414] text-sm font-semibold text-(--salmon)"
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
