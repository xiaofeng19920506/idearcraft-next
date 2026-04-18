import type { ReactNode } from "react";
import "./globals.css";

/**
 * 根 layout 仅透传子节点；带 `<html>` 的完整布局在 `app/[locale]/layout.tsx`。
 * @see https://next-intl.dev/docs/routing/setup
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
