import { getMetadataBase } from "@/lib/site";

/** LocalBusiness / 组织结构化数据，供搜索引擎展示 */
export function JsonLdOrganization() {
  const base = getMetadataBase();
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "IDearCraft",
    description:
      "Crafting experience studio — DIY projects, workshops, parties, and handmade supplies in Philadelphia.",
    url: base.toString().replace(/\/$/, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "3804 Lancaster Ave",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19104",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/idearcrafts/",
      "https://www.tiktok.com/@idearcrafts",
      "https://www.xiaohongshu.com/user/profile/5b3417374eacab54ac7727bc",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
