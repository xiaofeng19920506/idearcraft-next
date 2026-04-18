import { Link } from "@/i18n/navigation";

type Common = {
  children: React.ReactNode;
  className?: string;
};

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
