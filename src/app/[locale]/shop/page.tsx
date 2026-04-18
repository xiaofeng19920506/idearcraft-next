import { Link } from "@/i18n/navigation";
import { products } from "@/lib/data";
import { formatUsd } from "@/lib/format";
import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: new URL(`/${locale}/shop`, getMetadataBase()).toString(),
    },
  };
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  const tProducts = await getTranslations("shopProducts");
  const priceLocale = locale === "zh" ? "zh" : "en";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
        <p className="mt-4 text-[color:var(--muted)]">{t("intro")}</p>
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
                {tProducts(`${p.messageKey}.name`)}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                {tProducts(`${p.messageKey}.shortDescription`)}
              </p>
              <p className="mt-4 text-lg font-semibold text-[color:var(--accent-strong)]">
                {formatUsd(p.priceUsd, priceLocale)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
