"use client";

import { Link } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";
import { formatUsd } from "@/lib/format";
import { useLocale, useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const priceLocale = locale === "zh" ? "zh" : "en";
  const { items, subtotalUsd, setQty, remove, clear } = useCart();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{t("intro")}</p>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-[color:var(--line)] bg-white/70 p-10 text-center">
          <p className="text-[color:var(--muted)]">{t("empty")}</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-md bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            {t("goShop")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--line)] bg-white/90 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${product.imageGradient}`} />
                <div>
                  <p className="font-semibold text-[color:var(--ink)]">{product.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">
                    {formatUsd(product.priceUsd, priceLocale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(product.id, Number(e.target.value))}
                  className="w-20 rounded-2xl border border-[color:var(--line)] bg-white px-2 py-2 text-center text-sm"
                />
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  className="text-sm font-semibold text-[color:var(--accent-strong)] hover:underline"
                >
                  {t("remove")}
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[color:var(--muted)]">{t("subtotalHint")}</p>
              <p className="mt-1 text-2xl font-semibold text-[color:var(--ink)]">
                {formatUsd(subtotalUsd, priceLocale)}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center rounded-md bg-[color:var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-sm"
              >
                {t("checkout")}
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(t("clearConfirm"))) clear();
                }}
                className="text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--accent-strong)]"
              >
                {t("clear")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
