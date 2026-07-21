"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { StorefrontProduct } from "@/lib/square/types";

const STORAGE_KEY = "sisterle-cart-v1";

export type CartItem = {
  variationId: string;
  productId: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addProduct: (product: StorefrontProduct) => void;
  removeItem: (variationId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type Listener = () => void;

let cartItems: CartItem[] = [];
let seeded = false;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.variationId === "string" &&
        typeof item.name === "string" &&
        typeof item.priceCents === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function ensureSeeded() {
  if (seeded || typeof window === "undefined") return;
  cartItems = parseCart(window.localStorage.getItem(STORAGE_KEY));
  seeded = true;
}

function persist(next: CartItem[]) {
  cartItems = next;
  seeded = true;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  emit();
}

function subscribe(listener: Listener) {
  ensureSeeded();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureSeeded();
  return cartItems;
}

function getServerSnapshot() {
  return cartItems;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addProduct = useCallback((product: StorefrontProduct) => {
    if (!product.purchasable) return;
    ensureSeeded();
    if (cartItems.some((item) => item.variationId === product.variationId)) {
      setIsOpen(true);
      return;
    }
    persist([
      ...cartItems,
      {
        variationId: product.variationId,
        productId: product.id,
        name: product.name,
        priceCents: product.priceCents,
        currency: product.currency,
        imageUrl: product.imageUrl,
        quantity: 1,
      },
    ]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variationId: string) => {
    ensureSeeded();
    persist(cartItems.filter((item) => item.variationId !== variationId));
  }, []);

  const clearCart = useCallback(() => persist([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotalCents: items.reduce(
        (sum, item) => sum + item.priceCents * item.quantity,
        0,
      ),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addProduct,
      removeItem,
      clearCart,
    }),
    [items, isOpen, addProduct, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
