import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { bookingServices } from "@/lib/data";
import { formatUsd } from "@/lib/format";
import { getLocale, getTranslations } from "next-intl/server";

export async function ServicesWeOffer() {
  const t = await getTranslations("offerings");
  const locale = await getLocale();
  const priceLocale = locale === "zh" ? "zh" : "en";

  return (
    <section className="border-y border-[color:var(--line)] bg-[#faf9f6] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-700 sm:text-3xl">
          {t("sectionTitle")}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {bookingServices.map((s) => {
            const k = s.messageKey;
            const price = formatUsd(s.priceUsd, priceLocale);
            return (
              <article
                key={s.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
              >
                <div className="relative aspect-[4/3] w-full bg-neutral-100">
                  <Image
                    src={s.imageUrl}
                    alt={t(`${k}.name`)}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-neutral-800">{t(`${k}.name`)}</h3>
                  <span className="mt-3 inline-flex w-fit rounded-full bg-[color:var(--brand)] px-3 py-1 text-xs font-semibold text-white">
                    {t(`${k}.duration`)}
                  </span>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">{t(`${k}.blurb`)}</p>
                  <p className="mt-2 text-sm font-bold text-neutral-800">
                    {t(`${k}.priceLabel`, { price })}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href={`/booking/${s.id}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-95"
                    >
                      {t("bookNow")}
                    </Link>
                    <Link
                      href={s.learnMoreHref}
                      className="text-center text-sm font-semibold text-[color:var(--brand)] transition hover:underline"
                    >
                      {t("learnMore")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
