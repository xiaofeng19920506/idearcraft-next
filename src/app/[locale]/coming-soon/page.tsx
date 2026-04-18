import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("comingSoon") };
}

export default async function ComingSoonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comingSoon");

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
        {t("eyebrow")}
      </p>
      <h1 className="mt-6 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
      <p className="mt-4 text-[color:var(--muted)]">{t("body")}</p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-md bg-[color:var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-sm"
      >
        {t("home")}
      </Link>
    </main>
  );
}
