import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCheckout = await getTranslations({ locale, namespace: "checkout" });
  return {
    title: t("checkout"),
    description: tCheckout("intro"),
    alternates: {
      canonical: new URL(`/${locale}/checkout`, getMetadataBase()).toString(),
    },
  };
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
