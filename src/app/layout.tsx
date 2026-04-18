import type { Metadata } from "next";
import { Gochi_Hand, Poppins } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Providers } from "./providers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";
import { siteTagline } from "@/lib/data";

const brand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IDearCraft",
    template: "%s · IDearCraft",
  },
  description: siteTagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={`${brand.variable} ${poppins.variable} h-full`}>
      <body className={`${poppins.className} min-h-full flex flex-col antialiased`}>
        <Providers>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
