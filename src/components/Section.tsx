export function Section({
  id,
  titleId,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  /** 供 `aria-labelledby` 关联标题，提升区块可访问性 */
  titleId?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      {...(titleId ? { "aria-labelledby": titleId } : {})}
      className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
            {eyebrow}
          </p>
        ) : null}
        <h2
          {...(titleId ? { id: titleId } : {})}
          className="mt-3 font-display text-3xl leading-tight text-[color:var(--ink)] sm:text-[2.25rem]"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base font-medium leading-relaxed text-[color:var(--muted)]">{subtitle}</p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}
