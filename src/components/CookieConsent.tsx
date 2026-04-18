"use client";

import { useEffect, useState, startTransition } from "react";
import { useTranslations } from "next-intl";

const KEY = "idearcraft_cookie_consent_v1";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    startTransition(() => {
      try {
        if (!localStorage.getItem(KEY)) setVisible(true);
      } catch {
        setVisible(true);
      }
    });
  }, []);

  if (!visible) return null;

  function persist(value: "accept" | "decline" | "settings") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    if (value === "settings") {
      window.alert(t("settingsAlert"));
      return;
    }
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[color:var(--line)] bg-white px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:px-6"
      role="dialog"
      aria-label={t("aria")}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">{t("text")}</p>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => persist("settings")}
            className="px-3 py-2 text-sm font-medium text-[color:var(--ink)] underline-offset-2 hover:underline"
          >
            {t("settings")}
          </button>
          <button
            type="button"
            onClick={() => persist("decline")}
            className="rounded-md border border-[color:var(--ink)] bg-transparent px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--surface-2)]"
          >
            {t("declineAll")}
          </button>
          <button
            type="button"
            onClick={() => persist("accept")}
            className="rounded-md bg-[color:var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
