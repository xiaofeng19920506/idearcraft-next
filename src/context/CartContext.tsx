"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

type Line = { productId: string; qty: number };

type CartContextValue = {
  lines: Line[];
  items: { product: Product; qty: number }[];
  subtotalUsd: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "idearcraft_cart_v1";

function readLines(): Line[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is Line =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as Line).productId === "string" &&
        typeof (x as Line).qty === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    startTransition(() => {
      setLines(readLines());
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId);
      if (idx === -1) return [...prev, { productId, qty }];
      const next = [...prev];
      next[idx] = { productId, qty: next[idx].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const q = Math.max(0, Math.floor(qty));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.productId !== productId);
      const idx = prev.findIndex((l) => l.productId === productId);
      if (idx === -1) return [...prev, { productId, qty: q }];
      const next = [...prev];
      next[idx] = { productId, qty: q };
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        if (!product) return null;
        return { product, qty: l.qty };
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    const subtotalUsd = items.reduce(
      (sum, i) => sum + i.product.priceUsd * i.qty,
      0,
    );

    return { lines, items, subtotalUsd, add, setQty, remove, clear };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
