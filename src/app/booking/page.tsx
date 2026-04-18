import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookingServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "预约服务",
  description: "DIY Projects、Workshop、Party — 选择档期。",
};

export default function BookingListingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
          Book Online
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">Services we offer</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[color:var(--muted)]">
          与 idearcrafts.com 首页一致的三类服务。选择一项后进入日期与时段。
        </p>
      </header>

      <div className="mt-12 space-y-8">
        {bookingServices.map((s) => (
          <article
            key={s.id}
            className="overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-sm sm:flex"
          >
            <div className="relative h-52 w-full shrink-0 sm:min-h-[260px] sm:w-72">
              <Image
                src={s.imageUrl}
                alt={s.name}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, 288px"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800">{s.name}</h2>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{s.location}</p>
                </div>
                <span className="w-fit rounded-full bg-[color:var(--brand)] px-3 py-1 text-xs font-semibold text-white">
                  {s.durationLabel}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{s.blurb}</p>
              <p className="mt-3 text-lg font-bold text-neutral-800">{s.priceLabel}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[color:var(--line)] pt-5">
                <Link
                  href={s.learnMoreHref}
                  className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
                >
                  Learn more
                </Link>
                <Link
                  href={`/booking/${s.id}`}
                  className="ml-auto inline-flex rounded-full bg-[color:var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
