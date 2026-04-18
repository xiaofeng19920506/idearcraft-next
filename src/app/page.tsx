import Image from "next/image";
import Link from "next/link";
import { GhostButton, PrimaryButton } from "@/components/PrimaryButton";
import { Section } from "@/components/Section";
import { ServicesWeOffer } from "@/components/ServicesWeOffer";
import { Heart } from "lucide-react";
import { diyProjects, products, siteTagline } from "@/lib/data";
import { formatUsd } from "@/lib/format";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b055737?auto=format&fit=crop&w=2000&q=85";

export default function HomePage() {
  const featured = products.slice(0, 2);

  return (
    <main className="bg-white">
      <section className="relative min-h-[calc(100dvh-3.5rem)] w-full sm:min-h-[calc(100dvh-4rem)]">
        <Image
          src={HERO_IMAGE}
          alt="手作工坊氛围"
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
              原创「动手做」手作体验工坊
            </p>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[color:var(--muted)]">
              {siteTagline}
              ：小班课程、派对策划与材料商店，把灵感变成摸得着的作品。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/booking">预约体验</PrimaryButton>
              <GhostButton href="/shop">逛逛商店</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <ServicesWeOffer />

      <Section
        eyebrow="Shop"
        title="Shop 精选"
        subtitle="商店列表 → 商品页 → 购物车 → 结账。"
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
                <p className="font-bold text-[color:var(--ink)]">{p.name}</p>
                <p className="mt-1 text-sm font-medium text-[color:var(--muted)]">{p.shortDescription}</p>
                <p className="mt-3 text-base font-bold text-[color:var(--ink)]">{formatUsd(p.priceUsd)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <GhostButton href="/shop">进入商店</GhostButton>
        </div>
      </Section>

      <Section eyebrow="DIY" title="灵感项目" subtitle="周末就能完成的小目标。">
        <div className="grid gap-5 sm:grid-cols-3">
          {diyProjects.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-[color:var(--line)] bg-white p-5 shadow-[0_10px_36px_-22px_rgba(0,0,0,0.18)]"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--accent-strong)]">
                {d.difficulty} · {d.minutes} min
              </p>
              <h3 className="mt-3 font-display text-xl text-[color:var(--ink)]">{d.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[color:var(--muted)]">{d.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PrimaryButton href="/diyprojects">更多灵感</PrimaryButton>
        </div>
      </Section>
    </main>
  );
}
