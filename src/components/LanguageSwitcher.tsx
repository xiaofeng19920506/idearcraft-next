"use client";

import { routing } from "@/i18n/routing";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("languageSwitcher")}
      className="flex items-center gap-1 rounded-full border border-black/10 bg-white/15 px-1 py-0.5 text-[11px] font-semibold text-[color:var(--ink)]"
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={`rounded-full px-2 py-0.5 transition ${
            loc === locale ? "bg-white/90 text-[color:var(--ink)]" : "hover:bg-white/20"
          }`}
          scroll={false}
          hrefLang={loc === "en" ? "en" : "zh"}
          aria-current={loc === locale ? "true" : undefined}
        >
          {loc === "en" ? t("en") : t("zh")}
        </Link>
      ))}
    </div>
  );
}
