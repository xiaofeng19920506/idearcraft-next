export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceUsd: number;
  imageGradient: string;
};

export type BookingService = {
  id: string;
  name: string;
  location: string;
  durationLabel: string;
  priceLabel: string;
  priceUsd: number;
  /** 列表 / 首页卡片说明（与 idearcrafts.com Services we offer 一致） */
  blurb: string;
  /** 首页服务卡片配图 */
  imageUrl: string;
  /** 「Learn more」跳转 */
  learnMoreHref: string;
};

export type DiyProject = {
  id: string;
  title: string;
  summary: string;
  difficulty: "入门" | "进阶" | "挑战";
  minutes: number;
};
