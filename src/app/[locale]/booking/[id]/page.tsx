import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/data";
import { BookingFlow } from "./BookingFlow";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) return { title: "未找到服务" };
  return { title: service.name };
}

export default async function BookingDetailPage({ params }: Props) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/booking"
        className="text-sm font-semibold text-[color:var(--accent-strong)] hover:underline"
      >
        ← 返回服务列表
      </Link>
      <header className="mt-6">
        <h1 className="font-display text-3xl text-[color:var(--ink)] sm:text-4xl">{service.name}</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{service.location}</p>
      </header>
      <div className="mt-8">
        <BookingFlow service={service} />
      </div>
    </main>
  );
}
