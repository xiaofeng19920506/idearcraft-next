"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({ productId }: { productId: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(productId, 1);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
      className="w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto sm:px-10"
    >
      {done ? "已加入购物车" : "加入购物车"}
    </button>
  );
}
