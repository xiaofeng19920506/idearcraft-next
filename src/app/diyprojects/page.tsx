import type { Metadata } from "next";
import { diyProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "DIY 灵感",
  description: "项目卡片：难度、耗时与简介。",
};

export default function DiyProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
          DIY Projects
        </p>
        <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">灵感项目墙</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          对应原站{" "}
          <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">/diyprojects</code>
          。此处用卡片列出可在家完成的小项目，后续可接 CMS 或 Notion 数据源。
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {diyProjects.map((d) => (
          <article
            key={d.id}
            className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              {d.difficulty} · {d.minutes} 分钟
            </p>
            <h2 className="mt-3 font-display text-2xl text-[color:var(--ink)]">{d.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{d.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
