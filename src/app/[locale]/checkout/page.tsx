"use client";

import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";
import { formatUsd } from "@/lib/format";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type Step = "shipping" | "review" | "done";

export default function CheckoutPage() {
  const router = useRouter();
  const t = useTranslations("checkout");
  const tProducts = useTranslations("shopProducts");
  const locale = useLocale();
  const priceLocale = locale === "zh" ? "zh" : "en";
  const { items, subtotalUsd, clear } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const disabledShipping = useMemo(
    () => !name.trim() || !email.trim() || !address.trim(),
    [name, email, address],
  );

  if (items.length === 0 && step !== "done") {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-3xl text-[color:var(--ink)]">{t("emptyTitle")}</h1>
        <p className="mt-3 text-sm text-[color:var(--muted)]">{t("emptyBody")}</p>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="mt-8 inline-flex rounded-md bg-[color:var(--accent)] px-8 py-3 text-sm font-semibold text-white"
        >
          {t("backShop")}
        </button>
      </main>
    );
  }

  const steps: { id: Step; labelKey: "stepShipping" | "stepReview" | "stepDone" }[] = [
    { id: "shipping", labelKey: "stepShipping" },
    { id: "review", labelKey: "stepReview" },
    { id: "done", labelKey: "stepDone" },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-[color:var(--ink)]">{t("title")}</h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{t("intro")}</p>

      <ol className="mt-8 flex gap-2 text-xs font-semibold text-[color:var(--muted)]">
        {steps.map((s, i) => {
          const active =
            (step === "shipping" && s.id === "shipping") ||
            (step === "review" && (s.id === "shipping" || s.id === "review")) ||
            step === "done";
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                    : "border-[color:var(--line)] bg-white"
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{t(s.labelKey)}</span>
            </li>
          );
        })}
      </ol>

      {step === "shipping" ? (
        <div className="mt-8 space-y-4 rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-6">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">{t("shippingTitle")}</h2>
          <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
            {t("recipient")}
            <input
              className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
            {t("emailOrder")}
            <input
              type="email"
              className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
            {t("address")}
            <textarea
              rows={3}
              className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <button
            type="button"
            disabled={disabledShipping}
            onClick={() => setStep("review")}
            className="mt-2 w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:opacity-40"
          >
            {t("continue")}
          </button>
        </div>
      ) : null}

      {step === "review" ? (
        <div className="mt-8 space-y-4 rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-6">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">{t("reviewTitle")}</h2>
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-4 text-sm">
            <p className="font-semibold text-[color:var(--ink)]">{name}</p>
            <p className="text-[color:var(--muted)]">{email}</p>
            <p className="mt-2 whitespace-pre-line text-[color:var(--ink-soft)]">{address}</p>
          </div>
          <ul className="space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.product.id} className="flex justify-between text-[color:var(--ink-soft)]">
                <span>
                  {tProducts(`${i.product.messageKey}.name`)} × {i.qty}
                </span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {formatUsd(i.product.priceUsd * i.qty, priceLocale)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-right text-lg font-semibold text-[color:var(--accent-strong)]">
            {t("total", { price: formatUsd(subtotalUsd, priceLocale) })}
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep("shipping")}
              className="flex-1 rounded-md border border-[color:var(--line)] bg-white py-3 text-sm font-semibold"
            >
              {t("backEdit")}
            </button>
            <button
              type="button"
              onClick={() => {
                clear();
                setStep("done");
              }}
              className="flex-1 rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm"
            >
              {t("payMock")}
            </button>
          </div>
        </div>
      ) : null}

      {step === "done" ? (
        <div className="mt-10 rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-10 text-center">
          <h2 className="font-display text-3xl text-[color:var(--ink)]">{t("doneTitle")}</h2>
          <p className="mt-3 text-sm text-[color:var(--muted)]">{t("doneBody")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-md bg-[color:var(--accent)] px-8 py-3 text-sm font-semibold text-white"
            >
              {t("continueShopping")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/booking")}
              className="rounded-md border border-[color:var(--line)] bg-white px-8 py-3 text-sm font-semibold"
            >
              {t("goBooking")}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
