import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-white pb-24 pt-12 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-3xl text-[color:var(--ink)]">IDearCraft</p>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-[color:var(--muted)]">
            {t("tagline")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">{t("explore")}</p>
            <ul className="space-y-2 font-medium text-[color:var(--muted)]">
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/shop">
                  {tn("shop")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/booking">
                  {tn("booking")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/diyprojects">
                  {tn("diy")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">{t("location")}</p>
            <p className="font-medium text-[color:var(--muted)]">
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">{t("contact")}</p>
            <p className="font-medium text-[color:var(--muted)]">{t("email")}</p>
            <Link href="/coming-soon" className="font-semibold text-[color:var(--ink)] hover:underline">
              {t("comingSoon")}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-[color:var(--line)] py-4 text-center text-xs font-medium text-[color:var(--muted)]">
        {t("copyright", { year })}
      </div>
    </footer>
  );
}
