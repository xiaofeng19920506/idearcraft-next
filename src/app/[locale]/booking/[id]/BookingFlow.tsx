"use client";

import { useMemo, useState } from "react";
import type { BookingService } from "@/lib/types";
import { formatUsd } from "@/lib/format";

type Step = 1 | 2 | 3;

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateLabel(d: Date) {
  return d.toLocaleDateString("zh-Hans", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

const timeSlots = ["10:00", "13:30", "16:00", "18:30"];

export function BookingFlow({ service }: { service: BookingService }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const days = useMemo(() => {
    const start = addDays(new Date(), 1);
    return Array.from({ length: 10 }, (_, i) => addDays(start, i));
  }, []);

  const selectedDate = selectedDay === null ? null : days[selectedDay];

  return (
    <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-6 shadow-sm sm:p-8">
      <ol className="mb-8 flex items-center justify-between gap-2 text-xs font-semibold text-[color:var(--muted)]">
        {[
          { n: 1 as Step, label: "日期" },
          { n: 2 as Step, label: "时间" },
          { n: 3 as Step, label: "确认" },
        ].map((s, idx) => (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] ${
                step >= s.n
                  ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                  : "border-[color:var(--line)] bg-white"
              }`}
            >
              {s.n}
            </span>
            <span className={step >= s.n ? "text-[color:var(--ink)]" : ""}>{s.label}</span>
            {idx < 2 ? <span className="mx-1 hidden h-px flex-1 bg-[color:var(--line)] sm:block" /> : null}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">选择一天</h2>
          <p className="text-sm text-[color:var(--muted)]">
            演示数据：未来 10 天均可选。真实站点可接入 Cal.com、Wix Bookings 或自研库存 API。
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {days.map((d, i) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => {
                  setSelectedDay(i);
                  setSelectedTime(null);
                }}
                className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                  selectedDay === i
                    ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]"
                    : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/50"
                }`}
              >
                <span className="block text-xs text-[color:var(--muted)]">可预约</span>
                <span className="mt-1 block font-semibold text-[color:var(--ink)]">
                  {formatDateLabel(d)}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={selectedDay === null}
            onClick={() => setStep(2)}
            className="mt-4 w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            继续选择时间
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">选择时段</h2>
          <p className="text-sm text-[color:var(--muted)]">
            {selectedDate ? formatDateLabel(selectedDate) : ""} · {service.durationLabel}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {timeSlots.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                  selectedTime === t
                    ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] text-[color:var(--ink)]"
                    : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-md border border-[color:var(--line)] bg-white py-3 text-sm font-semibold text-[color:var(--ink)]"
            >
              返回
            </button>
            <button
              type="button"
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="flex-1 rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              填写联系信息
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-[color:var(--ink)]">确认预约</h2>
          <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-4 text-sm">
            <p className="font-semibold text-[color:var(--ink)]">{service.name}</p>
            <p className="mt-1 text-[color:var(--muted)]">{service.location}</p>
            <p className="mt-3 text-[color:var(--ink-soft)]">
              {selectedDate ? formatDateLabel(selectedDate) : ""} {selectedTime ?? ""}
            </p>
            <p className="mt-2 font-semibold text-[color:var(--accent-strong)]">
              {formatUsd(service.priceUsd)} 起
            </p>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              姓名
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder="用于签到与确认信"
              />
            </label>
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              邮箱
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-[color:var(--ink-soft)]">
              备注（可选）
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-2xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--brand)]/35 focus:ring-2"
                placeholder="过敏信息、儿童年龄、团建人数等"
              />
            </label>
          </div>
          <button
            type="button"
            disabled={!name.trim() || !email.trim()}
            onClick={() => {
              alert("演示完成：此处可接入支付定金或发送确认邮件。");
            }}
            className="w-full rounded-md bg-[color:var(--accent)] py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            提交预约申请
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full rounded-md border border-[color:var(--line)] bg-white py-3 text-sm font-semibold text-[color:var(--ink)]"
          >
            返回修改时间
          </button>
        </div>
      ) : null}
    </div>
  );
}
