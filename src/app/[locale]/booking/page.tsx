import { bookingServices } from "@/lib/data";
import { formatUsd } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: new URL(`/${locale}/booking`, getMetadataBase()).toString(),
    },
  };
}

export default async function BookingListingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tOffer = await getTranslations("offerings");
  const priceLocale = locale === "zh" ? "zh" : "en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[color:var(--muted)]">{t("intro")}</p>
      </header>

      <div className="mt-12 space-y-8">
        {bookingServices.map((s) => {
          const k = s.messageKey;
          const price = formatUsd(s.priceUsd, priceLocale);
          return (
            <article
              key={s.id}
              className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-sm sm:flex"
            >
              <div className="relative h-52 w-full shrink-0 sm:min-h-[260px] sm:w-72">
                <Image
                  src={s.imageUrl}
                  alt={tOffer(`${k}.name`)}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 288px"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800">{tOffer(`${k}.name`)}</h2>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{tOffer(`${k}.location`)}</p>
                  </div>
                  <span className="w-fit rounded-full bg-[color:var(--brand)] px-3 py-1 text-xs font-semibold text-white">
                    {tOffer(`${k}.duration`)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{tOffer(`${k}.blurb`)}</p>
                <p className="mt-3 text-lg font-bold text-neutral-800">
                  {tOffer(`${k}.priceLabel`, { price })}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[color:var(--line)] pt-5">
                  <p className="text-xs text-[color:var(--muted)]">{t("slotHint")}</p>
                  <Link
                    href={s.learnMoreHref}
                    className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
                  >
                    {t("learnMore")}
                  </Link>
                  <Link
                    href={`/booking/${s.id}`}
                    className="ml-auto inline-flex rounded-full bg-[color:var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                  >
                    {t("bookNow")}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
