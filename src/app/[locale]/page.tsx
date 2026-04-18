import { GhostButton, PrimaryButton } from "@/components/PrimaryButton";
import { Section } from "@/components/Section";
import { ServicesWeOffer } from "@/components/ServicesWeOffer";
import { formatUsd } from "@/lib/format";
import { getDiyProjects } from "@/content/diy-projects";
import { products } from "@/lib/data";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";
import Image from "next/image";
import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

/** Unsplash；原 photo-1523240795612 已 404，换为可用素材 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=85";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: new URL(`/${locale}`, getMetadataBase()).toString(),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const th = await getTranslations("home");
  const tDiy = await getTranslations("diyPage");
  const tShopProducts = await getTranslations("shopProducts");
  const priceLocale = locale === "zh" ? "zh" : "en";

  const featured = products.slice(0, 2);
  const diyFeatured = getDiyProjects(locale).slice(0, 3);

  return (
    <div className="bg-white">
      <section className="relative min-h-[calc(100dvh-3.5rem)] w-full sm:min-h-[calc(100dvh-4rem)]">
        <Image
          src={HERO_IMAGE}
          alt={th("heroAlt")}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent sm:from-white/90 sm:via-white/55" />
        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-lg">
            <div className="mb-2 flex items-center gap-2 text-[color:var(--ink)]">
              <Heart
                className="h-7 w-7 fill-[#f5d000] text-[color:var(--ink)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="font-display text-4xl leading-none sm:text-5xl md:text-6xl">
                IDearCraft
              </span>
            </div>
            <p className="mt-2 text-lg font-semibold leading-snug text-[color:var(--ink)] sm:text-xl">
              {th("heroSubtitle")}
            </p>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[color:var(--muted)]">
              {th("heroBody")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/booking">{th("bookCta")}</PrimaryButton>
              <GhostButton href="/shop">{th("shopCta")}</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <ServicesWeOffer />

      <Section
        titleId="home-shop-heading"
        eyebrow={th("shopSectionEyebrow")}
        title={th("shopSectionTitle")}
        subtitle={th("shopSectionSubtitle")}
      >
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="flex overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              <div className={`w-28 shrink-0 bg-gradient-to-br sm:w-36 ${p.imageGradient}`} />
              <div className="flex flex-1 flex-col justify-center p-4">
                <p className="font-bold text-[color:var(--ink)]">
                  {tShopProducts(`${p.messageKey}.name`)}
                </p>
                <p className="mt-1 text-sm font-medium text-[color:var(--muted)]">
                  {tShopProducts(`${p.messageKey}.shortDescription`)}
                </p>
                <p className="mt-3 text-base font-bold text-[color:var(--ink)]">
                  {formatUsd(p.priceUsd, priceLocale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <GhostButton href="/shop">{th("shopCtaBottom")}</GhostButton>
        </div>
      </Section>

      <Section
        titleId="home-diy-heading"
        eyebrow={th("diySectionEyebrow")}
        title={th("diySectionTitle")}
        subtitle={th("diySectionSubtitle")}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {diyFeatured.map((d) => (
            <article
              key={d.slug}
              className="rounded-2xl border border-[color:var(--line)] bg-white p-5 shadow-[0_10px_36px_-22px_rgba(0,0,0,0.18)]"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--accent-strong)]">
                {d.tag === "party" ? tDiy("tagParty") : tDiy("tagDiy")} · {tDiy("gridDuration")}
              </p>
              <h3 className="mt-3 font-display text-xl text-[color:var(--ink)]">{d.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[color:var(--muted)]">
                {d.description.length > 140 ? `${d.description.slice(0, 140).trim()}…` : d.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PrimaryButton href="/diyprojects">{th("diyCta")}</PrimaryButton>
        </div>
      </Section>
    </div>
  );
}
