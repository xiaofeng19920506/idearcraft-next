import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "结账",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
