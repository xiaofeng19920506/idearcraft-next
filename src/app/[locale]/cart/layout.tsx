import { getMetadataBase } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tCart = await getTranslations({ locale, namespace: "cart" });
  return {
    title: t("cart"),
    description: tCart("intro"),
    alternates: {
      canonical: new URL(`/${locale}/cart`, getMetadataBase()).toString(),
    },
  };
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
