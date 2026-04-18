import Link from "next/link";

type Common = {
  children: React.ReactNode;
  className?: string;
};

/** Plushumi 式主按钮：黑底、白字、略方圆角 */
export function PrimaryButton({
  href,
  children,
  className = "",
}: Common & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      {children}
    </Link>
  );
}

/** 线框按钮：黑框透明底 */
export function GhostButton({
  href,
  children,
  className = "",
}: Common & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md border border-[color:var(--ink)] bg-transparent px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--surface-2)] ${className}`}
    >
      {children}
    </Link>
  );
}
