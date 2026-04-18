import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-white pb-24 pt-12 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-3xl text-[color:var(--ink)]">IDearCraft</p>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-[color:var(--muted)]">
            手作体验工作室 · 课程、派对与材料商店。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">逛逛</p>
            <ul className="space-y-2 font-medium text-[color:var(--muted)]">
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/shop">
                  商店
                </Link>
              </li>
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/booking">
                  预约
                </Link>
              </li>
              <li>
                <Link className="hover:text-[color:var(--ink)]" href="/diyprojects">
                  DIY
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">门店</p>
            <p className="font-medium text-[color:var(--muted)]">
              示例地址
              <br />
              Pasadena, CA
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-[color:var(--ink)]">联系</p>
            <p className="font-medium text-[color:var(--muted)]">hello@idearcraft.example</p>
            <Link href="/coming-soon" className="font-semibold text-[color:var(--ink)] hover:underline">
              新品预告
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-[color:var(--line)] py-4 text-center text-xs font-medium text-[color:var(--muted)]">
        © {new Date().getFullYear()} IDearCraft
      </div>
    </footer>
  );
}
