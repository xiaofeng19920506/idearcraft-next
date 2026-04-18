/** 文案见 messages 中 `shopProducts.{messageKey}` */
export type Product = {
  id: string;
  slug: string;
  messageKey: "atelierStarterKit" | "seasonalGiftBox" | "studioMerchCap";
  priceUsd: number;
  imageGradient: string;
};

/** 与 messages 中 offerings.{messageKey} 对应 */
export type BookingService = {
  id: string;
  messageKey: "diy" | "workshop" | "party";
  priceUsd: number;
  imageUrl: string;
  /** 无 locale 前缀的路径，由 next-intl Link 自动加前缀 */
  learnMoreHref: string;
};
