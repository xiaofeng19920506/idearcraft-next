import { getServiceById } from "@/lib/data";
import { Link } from "@/i18n/navigation";
import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BookingFlow } from "./BookingFlow";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "Not found" };
  const t = await getTranslations({ locale, namespace: "offerings" });
  const k = service.messageKey;
  return {
    title: t(`${k}.name`),
    description: t(`${k}.blurb`),
    alternates: {
      canonical: new URL(`/${locale}/booking/${id}`, getMetadataBase()).toString(),
    },
  };
}

export default async function BookingDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const service = getServiceById(id);
  if (!service) notFound();

  const t = await getTranslations("bookingDetail");
  const tOffer = await getTranslations("offerings");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/booking"
        className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
      >
        {t("back")}
      </Link>
      <header className="mt-6">
        <h1 className="font-display text-3xl text-[color:var(--ink)] sm:text-4xl">
          {tOffer(`${service.messageKey}.name`)}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          {tOffer(`${service.messageKey}.location`)}
        </p>
      </header>
      <div className="mt-8">
        <BookingFlow service={service} />
      </div>
    </div>
  );
}
