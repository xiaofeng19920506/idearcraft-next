import { CookieConsent } from "@/components/CookieConsent";
import { JsonLdOrganization } from "@/components/JsonLdOrganization";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";
import { DEFAULT_OG_IMAGE, getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Gochi_Hand, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Providers } from "./providers";

const brand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const base = getMetadataBase();
  const ogLocale = locale === "zh" ? "zh_CN" : "en_US";
  const ogAltLocale = locale === "zh" ? "en_US" : "zh_CN";

  return {
    metadataBase: base,
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "IDearCraft" }],
    creator: "IDearCraft",
    alternates: {
      languages: {
        en: `${base.origin}/en`,
        zh: `${base.origin}/zh`,
      },
    },
    openGraph: {
      type: "website",
      url: new URL(`/${locale}`, base).toString(),
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      locale: ogLocale,
      alternateLocale: [ogAltLocale],
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const ta = await getTranslations({ locale, namespace: "a11y" });
  const htmlLang = locale === "zh" ? "zh-CN" : "en";

  return (
    <html lang={htmlLang} className={`${brand.variable} ${poppins.variable} h-full`}>
      <body className={`${poppins.className} min-h-full flex flex-col antialiased`}>
        <JsonLdOrganization />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <a
              href="#main-content"
              className="fixed left-4 top-4 z-[200] -translate-y-[150vh] rounded-md bg-[color:var(--ink)] px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[color:var(--brand)]"
            >
              {ta("skipToContent")}
            </a>
            <SiteHeader />
            <main
              id="main-content"
              tabIndex={-1}
              aria-label={ta("mainLabel")}
              className="flex-1 outline-none"
            >
              {children}
            </main>
            <SiteFooter />
            <CookieConsent />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
