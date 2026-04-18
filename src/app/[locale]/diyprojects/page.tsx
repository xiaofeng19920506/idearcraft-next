import { DiyProjectsSection } from "@/components/diy/DiyProjectsSection";
import { getDiyProjects } from "@/content/diy-projects";
import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tPage = await getTranslations({ locale, namespace: "diyPage" });
  return {
    title: t("diy"),
    description: tPage("intro"),
    alternates: {
      canonical: new URL(`/${locale}/diyprojects`, getMetadataBase()).toString(),
    },
  };
}

export default async function DiyProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("diyPage");
  const projects = getDiyProjects(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
        <p className="mt-4 text-[color:var(--muted)]">{t("intro")}</p>
      </header>

      <DiyProjectsSection projects={projects} gridDuration={t("gridDuration")} />
    </div>
  );
}
