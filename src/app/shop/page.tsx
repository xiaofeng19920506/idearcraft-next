import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data";
import { formatUsd } from "@/lib/format";

export const metadata: Metadata = {
  title: "商店",
  description: "材料包、礼盒与工作室周边。",
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
          Shop
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">Shop A Plushie 式商店动线</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          对应原站{" "}
          <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">/shop</code>
          ：网格浏览 → 商品详情 → 购物车 → 结账。此处为演示商品与前端流程，支付可替换为 Stripe /
          Square 等。
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/shop/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]/35 hover:shadow-md"
          >
            <div className={`h-44 bg-gradient-to-br ${p.imageGradient}`} />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-xl text-[color:var(--ink)] group-hover:text-[color:var(--accent-strong)]">
                {p.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                {p.shortDescription}
              </p>
              <p className="mt-4 text-lg font-semibold text-[color:var(--accent-strong)]">
                {formatUsd(p.priceUsd)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
