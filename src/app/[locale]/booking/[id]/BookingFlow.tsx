"use client";

import type { BookingService } from "@/lib/types";
import { formatUsd } from "@/lib/format";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type Step = 1 | 2 | 3;

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

const timeSlots = ["10:00", "13:30", "16:00", "18:30"];

export function BookingFlow({ service }: { service: BookingService }) {
  const locale = useLocale();
  const tFlow = useTranslations("bookingFlow");
  const tOffer = useTranslations("offerings");
  const k = service.messageKey;
  const priceLocale = locale === "zh" ? "zh" : "en";

  const [step, setStep] = useState<Step>(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const days = useMemo(() => {
    const start = addDays(new Date(), 1);
    return Array.from({ length: 10 }, (_, i) => addDays(start, i));
  }, []);

  const selectedDate = selectedDay === null ? null : days[selectedDay];

  function formatDateLabel(d: Date) {
    return d.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-6 shadow-sm sm:p-8">
      <ol className="mb-8 flex items-center justify-between gap-2 text-xs font-semibold text-[color:var(--muted)]">
        {[
          { n: 1 as Step, label: tFlow("stepDate") },
          { n: 2 as Step, label: tFlow("stepTime") },
          { n: 3 as Step, label: tFlow("stepConfirm") },
        ].map((s, idx) => (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
                step >= s.n
                  ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                  : "border-[color:var(--line)] bg-white"
              }`}
            >
              {s.n}
            </span>
            <span className={step >= s.n ? "text-[color:var(--ink)]" : ""}>{s.label}</span>
            {idx < 2 ? <span className="mx-1 hidden h-px flex-1 bg-[color:var(--line)] sm:block" /> : null}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">{tFlow("pickDayTitle")}</h2>
          <p className="text-sm text-[color:var(--muted)]">{tFlow("pickDayHint")}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {days.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => {
                  setSelectedDay(i);
                  setSelectedTime(null);
                }}
                className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                  selectedDay === i
                    ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]"
                    : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/50"
                }`}
              >
                <span className="block text-xs text-[color:var(--muted)]">{tFlow("available")}</span>
                <span className="mt-1 block font-semibold text-[color:var(--ink)]">
                  {formatDateLabel(d)}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={selectedDay === null}
            onClick={() => setStep(2)}
            className="mt-4 w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {tFlow("continueTime")}
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">{tFlow("pickTimeTitle")}</h2>
          <p className="text-sm text-[color:var(--muted)]">
            {selectedDate ? formatDateLabel(selectedDate) : ""} · {tOffer(`${k}.duration`)}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                  selectedTime === slot
                    ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--ink)]"
                    : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-md border border-[color:var(--line)] bg-white py-3 text-sm font-semibold text-[color:var(--ink)]"
            >
              {tFlow("back")}
            </button>
            <button
              type="button"
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="flex-1 rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {tFlow("continueContact")}
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">{tFlow("confirmTitle")}</h2>
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-4 text-sm">
            <p className="font-semibold text-[color:var(--ink)]">{tOffer(`${k}.name`)}</p>
            <p className="mt-1 text-[color:var(--muted)]">{tOffer(`${k}.location`)}</p>
            <p className="mt-3 text-[color:var(--ink-soft)]">
              {selectedDate ? formatDateLabel(selectedDate) : ""} {selectedTime ?? ""}
            </p>
            <p className="mt-2 font-semibold text-[color:var(--accent-strong)]">
              {tOffer(`${k}.priceLabel`, { price: formatUsd(service.priceUsd, priceLocale) })}
            </p>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              {tFlow("name")}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder={tFlow("nameHint")}
              />
            </label>
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              {tFlow("email")}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder={tFlow("emailPlaceholder")}
              />
            </label>
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              {tFlow("note")}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder={tFlow("notePlaceholder")}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={!name.trim() || !email.trim()}
            onClick={() => {
              alert(tFlow("doneAlert"));
            }}
            className="w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {tFlow("submit")}
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full rounded-md border border-[color:var(--line)] bg-white py-3 text-sm font-semibold text-[color:var(--ink)]"
          >
            {tFlow("backEditTime")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
