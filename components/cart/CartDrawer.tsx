"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/square/money";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotalCents,
    isOpen,
    closeCart,
    removeItem,
    clearCart,
  } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckingOut(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((item) => ({
            variationId: item.variationId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        setError(data.error || "Checkout failed. Please try again.");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setError("Checkout failed. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-black/15 bg-[#fff8fa] shadow-[-18px_0_50px_-28px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/70"
              style={{
                fontFamily:
                  "var(--font-handmade), var(--font-fraunces), serif",
              }}
            >
              Cart
            </p>
            <p className="mt-1 text-sm text-[#333]">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-black/15 bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#141414] transition hover:bg-white"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm leading-relaxed text-[#333]/85">
              Your cart is empty. Add a Sisterle piece from the shop to check
              out here.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variationId}
                  className="flex gap-3 rounded-2xl border border-black/10 bg-white/70 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black/5">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-wider text-[#666]">
                        No photo
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#141414]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-[#333]">
                      {formatMoney(item.priceCents, item.currency)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variationId)}
                      className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#7a2e48] underline-offset-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-[#141414]">Subtotal</span>
            <span className="font-semibold text-[#141414]">
              {formatMoney(subtotalCents)}
            </span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-[#444]/80">
            Shipping and tax are calculated at Square checkout. Stock is
            confirmed when you pay.
          </p>
          {error ? (
            <p className="mb-3 rounded-xl border border-red-300/70 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            disabled={items.length === 0 || checkingOut}
            onClick={handleCheckout}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#141414] px-6 text-sm font-semibold text-(--salmon) transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checkingOut ? "Starting checkout…" : "Checkout with Square"}
          </button>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full border border-black/15 bg-white/70 px-6 text-sm font-semibold text-[#141414] transition hover:bg-white"
            >
              Clear cart
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
