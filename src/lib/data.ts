import type { BookingService, Product } from "./types";

/** 原站 idearcrafts.com 信息架构 */
export const siteTagline = "Crafting Experience Services";

export const bookingServices: BookingService[] = [
  {
    id: "s-diy-projects",
    messageKey: "diy",
    priceUsd: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/diyprojects",
  },
  {
    id: "s-workshop",
    messageKey: "workshop",
    priceUsd: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/aboutus",
  },
  {
    id: "s-party",
    messageKey: "party",
    priceUsd: 420,
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/aboutus",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "atelier-starter-kit",
    messageKey: "atelierStarterKit",
    priceUsd: 48,
    imageGradient: "from-rose-200 via-amber-100 to-sky-100",
  },
  {
    id: "p2",
    slug: "seasonal-gift-box",
    messageKey: "seasonalGiftBox",
    priceUsd: 72,
    imageGradient: "from-fuchsia-200 via-rose-100 to-amber-50",
  },
  {
    id: "p3",
    slug: "studio-merch-cap",
    messageKey: "studioMerchCap",
    priceUsd: 32,
    imageGradient: "from-stone-200 via-neutral-100 to-zinc-100",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getServiceById(id: string) {
  return bookingServices.find((s) => s.id === id);
}
