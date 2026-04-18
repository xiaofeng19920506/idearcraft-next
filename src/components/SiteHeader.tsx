"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { Cat, Menu, ShoppingBag, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, startTransition } from "react";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: "/booking", label: t("booking") },
    { href: "/shop", label: t("shop") },
    { href: "/diyprojects", label: t("diy") },
    { href: "/aboutus", label: t("about") },
  ] as const;

  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startTransition(() => setOpen(false));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[color:var(--brand)] shadow-sm">
        <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-nav-drawer"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--ink)] transition hover:bg-black/5"
            aria-label={t("openMenu")}
          >
            <Menu className="h-6 w-6" strokeWidth={2.25} />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5 sm:flex-row sm:gap-1.5"
          >
            <Cat
              className="h-5 w-5 text-neutral-600 sm:h-6 sm:w-6"
              strokeWidth={2}
              aria-hidden
            />
            <span className="font-display text-[1.35rem] leading-none tracking-wide text-white sm:text-2xl">
              IDearCraft
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            <Link
              href="/cart"
              className="flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--ink)] transition hover:bg-black/5"
              aria-label={t("cart")}
            >
              <ShoppingBag className="h-6 w-6" strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          />
          <div
            id="site-nav-drawer"
            className="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
              <span className="font-display text-xl text-[color:var(--ink)]">{t("menu")}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--ink)]"
                aria-label={t("close")}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 p-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-lg font-semibold text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cart"
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]"
                >
                  {t("cart")}
                </Link>
              </li>
            </ul>
            <div className="border-t border-[color:var(--line)] p-4">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-[color:var(--accent)] py-3 text-center text-sm font-semibold text-white"
              >
                {t("bookNow")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
