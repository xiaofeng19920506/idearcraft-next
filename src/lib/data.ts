import type { BookingService, DiyProject, Product } from "./types";

/** 原站 idearcrafts.com 信息架构：首页、商店、预约、关于、DIY、即将上线 */
export const siteTagline = "Crafting Experience Services";

/** 首页「Services we offer」与预约列表：与 idearcrafts.com 三项服务对齐 */
export const bookingServices: BookingService[] = [
  {
    id: "s-diy-projects",
    name: "DIY Projects",
    location: "In-studio experience",
    durationLabel: "1h 30mins",
    priceUsd: 45,
    priceLabel: "From $45 / person",
    blurb:
      "Explore hands-on creative projects, perfect for crafting enthusiasts or just having fun! Projects last around 1.5 hours.",
    imageUrl:
      "https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/diyprojects",
  },
  {
    id: "s-workshop",
    name: "Workshop",
    location: "In-studio · guided sessions",
    durationLabel: "2 Hours - 4 Hours",
    priceUsd: 95,
    priceLabel: "From $95 / session",
    blurb:
      "Participate in various workshops that span 2 to 4 hours, designed to inspire creativity through guided activities with instructors.",
    imageUrl:
      "https://images.unsplash.com/photo-1615876237516-e998f650f836?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/aboutus",
  },
  {
    id: "s-party",
    name: "Party",
    location: "Private events & celebrations",
    durationLabel: "3 Hours",
    priceUsd: 420,
    priceLabel: "From $420 / party",
    blurb:
      "Enjoy a vibrant party atmosphere with creative themes and activities, perfect for gatherings and celebrations, lasting around 3 hours.",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    learnMoreHref: "/aboutus",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "atelier-starter-kit",
    name: "手作入门材料包",
    shortDescription: "含工具与基础材料，适合第一次体验。",
    description:
      "精选纸张、线材与基础工具，搭配图文教程，让你在家也能延续工作室的体验节奏。",
    priceUsd: 48,
    imageGradient: "from-rose-200 via-amber-100 to-sky-100",
  },
  {
    id: "p2",
    slug: "seasonal-gift-box",
    name: "节日礼盒 · 限定配色",
    shortDescription: "包装与配色随季节更新，适合送礼。",
    description:
      "内含三款小型手作项目，附手写祝福卡与礼品包装。数量有限，售完即止。",
    priceUsd: 72,
    imageGradient: "from-fuchsia-200 via-rose-100 to-amber-50",
  },
  {
    id: "p3",
    slug: "studio-merch-cap",
    name: "工作室周边 · 棒球帽",
    shortDescription: "刺绣 Logo，日常佩戴也舒适。",
    description:
      "透气棉质面料，低调刺绣。支持到店自取或快递配送（结账时填写地址）。",
    priceUsd: 32,
    imageGradient: "from-stone-200 via-neutral-100 to-zinc-100",
  },
];

export const diyProjects: DiyProject[] = [
  {
    id: "d1",
    title: "纸艺小夜灯",
    summary: "折叠 + 镂空光影，适合亲子周末。",
    difficulty: "入门",
    minutes: 60,
  },
  {
    id: "d2",
    title: "植物拓印帆布袋",
    summary: "采集叶片纹理，把自然留在布料上。",
    difficulty: "进阶",
    minutes: 90,
  },
  {
    id: "d3",
    title: "迷你装订画册",
    summary: "线装结构 + 封面拼贴，完成可翻阅成品。",
    difficulty: "挑战",
    minutes: 150,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getServiceById(id: string) {
  return bookingServices.find((s) => s.id === id);
}
