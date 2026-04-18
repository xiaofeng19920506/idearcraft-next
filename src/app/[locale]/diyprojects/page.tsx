import { diyProjects } from "@/lib/data";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("diy") };
}

export default async function DiyProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("diyPage");
  const tc = await getTranslations("common");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
        <p className="mt-4 text-[color:var(--muted)]">{t("intro")}</p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {diyProjects.map((d) => (
          <article
            key={d.id}
            className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              {d.difficulty} · {d.minutes} {tc("minutes")}
            </p>
            <h2 className="mt-3 font-display text-2xl text-[color:var(--ink)]">{d.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{d.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
