import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getMetadataBase } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/shop",
  "/booking",
  "/diyprojects",
  "/aboutus",
  "/cart",
  "/checkout",
  "/coming-soon",
] as const;

const SHOP_SLUGS = ["atelier-starter-kit", "seasonal-gift-box", "studio-merch-cap"] as const;
const BOOKING_IDS = ["s-diy-projects", "s-workshop", "s-party"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getMetadataBase().origin;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${origin}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.75,
      });
    }
    for (const slug of SHOP_SLUGS) {
      entries.push({
        url: `${origin}/${locale}/shop/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
    for (const id of BOOKING_IDS) {
      entries.push({
        url: `${origin}/${locale}/booking/${id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
