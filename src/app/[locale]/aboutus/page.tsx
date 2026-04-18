import { PrimaryButton } from "@/components/PrimaryButton";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("about") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
      <div className="prose prose-neutral mt-8 max-w-none text-[color:var(--muted)] prose-p:leading-relaxed">
        <p>{t("p1")}</p>
        <p className="mt-4">{t("p2")}</p>
      </div>
      <div className="mt-10">
        <PrimaryButton href="/booking">{t("cta")}</PrimaryButton>
      </div>

      <section id="contactus" className="mt-16 scroll-mt-24 border-t border-[color:var(--line)] pt-12">
        <h2 className="font-display text-2xl text-[color:var(--ink)]">{t("contactTitle")}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-[color:var(--muted)]">{t("contactBody")}</p>
      </section>
    </main>
  );
}
