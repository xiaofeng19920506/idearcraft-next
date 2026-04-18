import { defineRouting } from "next-intl/routing";

/**
 * 默认语言：英文。
 * - `defaultLocale`：无合法 locale 时的回退，以及 `localeDetection: false` 时首访 `/` 的重定向目标。
 * - `localeDetection: false`：不根据浏览器 Accept-Language 自动选中文，统一先进英文站；用户仍可用顶栏切换中文。
 */
export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});
