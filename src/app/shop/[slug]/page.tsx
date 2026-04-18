import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/data";
import { formatUsd } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "商品未找到" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/shop"
        className="text-sm font-semibold text-[color:var(--accent-strong)] hover:underline"
      >
        ← 返回商店
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div
          className={`aspect-[4/3] w-full rounded-[2rem] border border-[color:var(--line)] bg-gradient-to-br shadow-inner ${product.imageGradient}`}
        />
        <div>
          <h1 className="font-display text-4xl text-[color:var(--ink)]">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-[color:var(--accent-strong)]">
            {formatUsd(product.priceUsd)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-[color:var(--muted)]">
            {product.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AddToCartButton productId={product.id} />
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--ink)] hover:border-[color:var(--accent)]/45"
            >
              去购物车结算
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
