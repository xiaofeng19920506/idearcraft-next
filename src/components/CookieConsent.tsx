"use client";

import { useEffect, useState, startTransition } from "react";

const KEY = "idearcraft_cookie_consent_v1";

export function CookieConsent() {
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
      window.alert("演示站点：此处可接入 Cookie 设置面板。");
      return;
    }
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[color:var(--line)] bg-white px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:px-6"
      role="dialog"
      aria-label="Cookie 提示"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
          我们使用 Cookie 改善体验与流量分析。继续浏览即表示你了解我们的做法（演示文案，可替换为真实政策链接）。
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => persist("settings")}
            className="px-3 py-2 text-sm font-medium text-[color:var(--ink)] underline-offset-2 hover:underline"
          >
            设置
          </button>
          <button
            type="button"
            onClick={() => persist("decline")}
            className="rounded-md border border-[color:var(--ink)] bg-transparent px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--surface-2)]"
          >
            全部拒绝
          </button>
          <button
            type="button"
            onClick={() => persist("accept")}
            className="rounded-md bg-[color:var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            接受
          </button>
        </div>
      </div>
    </div>
  );
}
