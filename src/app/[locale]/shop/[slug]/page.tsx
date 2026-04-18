import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/data";
import { formatUsd } from "@/lib/format";
import { getMetadataBase } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  const t = await getTranslations({ locale, namespace: "shop" });
  const tProducts = await getTranslations({ locale, namespace: "shopProducts" });
  if (!product) return { title: t("notFound") };
  return {
    title: tProducts(`${product.messageKey}.name`),
    description: tProducts(`${product.messageKey}.shortDescription`),
    alternates: {
      canonical: new URL(`/${locale}/shop/${slug}`, getMetadataBase()).toString(),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tp = await getTranslations("product");
  const tProducts = await getTranslations("shopProducts");
  const priceLocale = locale === "zh" ? "zh" : "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/shop"
        className="text-sm font-semibold text-[color:var(--accent-strong)] hover:underline"
      >
        {t("back")}
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div
          className={`aspect-[4/3] w-full rounded-[2rem] border border-[color:var(--line)] bg-gradient-to-br shadow-inner ${product.imageGradient}`}
        />
        <div>
          <h1 className="font-display text-4xl text-[color:var(--ink)]">
            {tProducts(`${product.messageKey}.name`)}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-[color:var(--accent-strong)]">
            {formatUsd(product.priceUsd, priceLocale)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-[color:var(--muted)]">
            {tProducts(`${product.messageKey}.description`)}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AddToCartButton productId={product.id} />
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[color:var(--ink)] hover:border-[color:var(--accent)]/45"
            >
              {tp("goCart")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
