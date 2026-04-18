"use client";

import type { DiyProjectRecord } from "@/content/diy-projects";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Props = {
  projects: DiyProjectRecord[];
  /** 卡片上展示的时长文案（与弹层内「预计时间」可不同） */
  gridDuration: string;
};

export function DiyProjectsSection({ projects, gridDuration }: Props) {
  const t = useTranslations("diyPage");
  const [open, setOpen] = useState<DiyProjectRecord | null>(null);

  const onClose = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-6 shadow-sm"
          >
            <h3 className="font-display text-2xl text-[color:var(--ink)]">{p.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              <span className="rounded-full bg-[color:var(--brand)]/12 px-2.5 py-0.5 text-[color:var(--brand)]">
                {p.tag === "party" ? t("tagParty") : t("tagDiy")}
              </span>
              <span className="text-[color:var(--muted)]">{gridDuration}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(p)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[color:var(--ink)] bg-transparent py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--surface-2)]"
            >
              {t("priceList")}
            </button>
          </article>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="diy-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            aria-label={t("close")}
          />
          <div className="relative flex max-h-[min(90dvh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b border-[color:var(--line)] px-5 py-4">
              <h2 id="diy-dialog-title" className="font-display text-2xl text-[color:var(--ink)]">
                {open.title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[color:var(--muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--ink)]"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 text-sm leading-relaxed text-neutral-700">
              <DiyDialogBody project={open} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DiyDialogBody({ project: p }: { project: DiyProjectRecord }) {
  const t = useTranslations("diyPage");

  return (
    <>
      <p className="whitespace-pre-line text-[color:var(--muted)]">{p.description}</p>

      <dl className="mt-6 space-y-3 border-t border-[color:var(--line)] pt-5 text-[color:var(--ink)]">
        {p.reservationFee ? (
          <div className="flex justify-between gap-4">
            <dt className="font-semibold">{t("reservationFee")}</dt>
            <dd className="text-right font-medium">{p.reservationFee}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="font-semibold">{t("estimatedTime")}</dt>
          <dd className="text-right font-medium">{p.estimatedTime}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Link
          href={p.bookHref}
          className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          {t("bookNow")}
        </Link>
      </div>

      <div className="mt-8 border-t border-[color:var(--line)] pt-6">
        <h3 className="font-display text-lg text-[color:var(--ink)]">{t("priceHeading")}</h3>
        {p.priceIntro ? (
          <p className="mt-2 whitespace-pre-line text-xs text-[color:var(--muted)]">{p.priceIntro}</p>
        ) : null}
        {p.priceRows.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--line)]">
            <table className="w-full min-w-[280px] border-collapse text-left text-xs sm:text-sm">
              <thead className="bg-[color:var(--surface-2)] text-[color:var(--ink)]">
                <tr>
                  <th className="px-3 py-2 font-semibold">{t("tableItem")}</th>
                  <th className="px-3 py-2 font-semibold">{t("tableSize")}</th>
                  <th className="px-3 py-2 font-semibold">{t("tablePrice")}</th>
                </tr>
              </thead>
              <tbody>
                {p.priceRows.map((row, i) => (
                  <tr key={i} className="border-t border-[color:var(--line)]">
                    <td className="px-3 py-2 align-top">{row.item}</td>
                    <td className="px-3 py-2 align-top text-[color:var(--muted)]">{row.size}</td>
                    <td className="px-3 py-2 align-top font-medium">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {p.priceFooter ? (
          <p className="mt-4 whitespace-pre-line text-sm text-[color:var(--muted)]">{p.priceFooter}</p>
        ) : null}
      </div>
    </>
  );
}
