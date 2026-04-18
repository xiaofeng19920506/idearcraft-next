/** 用于 canonical、OG、sitemap；部署时设置 NEXT_PUBLIC_SITE_URL（含协议，无尾斜杠） */
export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw.endsWith("/") ? raw.slice(0, -1) : raw);
    } catch {
      /* fallthrough */
    }
  }
  return new URL("https://www.idearcrafts.com");
}

/** 默认 Open Graph 图（外链，避免仓库内再放二进制资源） */
export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&h=630&q=80";
