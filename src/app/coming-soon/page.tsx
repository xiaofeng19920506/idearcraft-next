import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "即将上线",
};

export default function ComingSoonPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
        Coming Soon
      </p>
      <h1 className="mt-6 font-display text-4xl text-[color:var(--ink)]">新系列正在路上</h1>
      <p className="mt-4 text-[color:var(--muted)]">
        原站 Framer 搜索索引中包含{" "}
        <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">/coming-soon</code>{" "}
        路由。这里保留为「预告落地页」，可替换为邮件订阅或新品倒计时组件。
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-md bg-[color:var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-sm"
      >
        返回首页
      </Link>
    </main>
  );
}
