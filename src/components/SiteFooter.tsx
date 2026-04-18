import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const SOCIAL = {
  instagram: "https://www.instagram.com/idearcrafts/",
  tiktok: "https://www.tiktok.com/@idearcrafts",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/5b3417374eacab54ac7727bc",
} as const;

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const ta = await getTranslations("a11y");

  return (
    <footer
      role="contentinfo"
      className="mt-auto border-t border-[color:var(--line)] bg-white pb-24 pt-12 md:pb-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-3xl text-[color:var(--ink)]">IDearCraft</p>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-[color:var(--muted)]">
            {t("tagline")}
          </p>
          <p className="mt-6 text-sm font-medium leading-relaxed text-[color:var(--ink)]">
            {t("addressLine1")}
            <br />
            {t("addressLine2")}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-bold text-[color:var(--ink)]">{t("hoursTitle")}</p>
          <p className="font-medium leading-relaxed text-[color:var(--muted)]">{t("hoursMonThu")}</p>
          <p className="font-medium leading-relaxed text-[color:var(--muted)]">{t("hoursFriSun")}</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-bold text-[color:var(--ink)]">{t("aboutTitle")}</p>
          <ul className="space-y-2 font-medium text-[color:var(--muted)]">
            <li>
              <Link className="hover:text-[color:var(--ink)]" href="/aboutus">
                {t("ourStory")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-[color:var(--ink)]" href="/aboutus#contactus">
                {t("contactUs")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-bold text-[color:var(--ink)]">{t("contactTitle")}</p>
          <ul className="space-y-2 font-medium text-[color:var(--muted)]">
            <li>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--ink)]"
                aria-label={`${t("instagram")} — ${ta("opensNewTab")}`}
              >
                {t("instagram")}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--ink)]"
                aria-label={`${t("tiktok")} — ${ta("opensNewTab")}`}
              >
                {t("tiktok")}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.xiaohongshu}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--ink)]"
                aria-label={`${t("xiaohongshu")} — ${ta("opensNewTab")}`}
              >
                {t("xiaohongshu")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[color:var(--line)] px-4 pb-2 pt-8 text-center text-sm font-medium text-[color:var(--muted)] sm:px-6">
        {t("madeWith")} {t("copyright")}
      </div>
    </footer>
  );
}
