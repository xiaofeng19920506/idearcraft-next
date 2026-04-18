import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "购物车",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
