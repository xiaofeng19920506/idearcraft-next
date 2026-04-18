import type { Metadata } from "next";
import { PrimaryButton } from "@/components/PrimaryButton";

export const metadata: Metadata = {
  title: "关于我们",
  description: "IDearCraft 的故事与价值观。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
        About
      </p>
      <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">关于 IDearCraft</h1>
      <div className="prose prose-neutral mt-8 max-w-none text-[color:var(--muted)] prose-p:leading-relaxed">
        <p>
          这一页对应原 Framer 站点路由{" "}
          <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs text-[color:var(--ink-soft)]">
            /aboutus
          </code>
          。我们用 Next.js 重建信息架构，视觉与动线则借鉴{" "}
          <a
            className="font-semibold text-[color:var(--accent-strong)]"
            href="https://www.plushumi.com/"
            target="_blank"
            rel="noreferrer"
          >
            Plushumi
          </a>{" "}
          的「工作室首页」语气：温暖、邀请式、强调社群与体验。
        </p>
        <p className="mt-4">
          我们相信手作不是「学会技巧」而已，而是把注意力放回当下：选色、折线、打结——这些微小决定堆叠成
          confidence，也堆叠成礼物。
        </p>
      </div>
      <div className="mt-10">
        <PrimaryButton href="/booking">预约来店里看看</PrimaryButton>
      </div>
    </main>
  );
}
