"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "总览" },
  { href: "/cities", label: "城市概况" },
  { href: "/compare", label: "城市对比" },
  { href: "/modules", label: "六大模块" },
  { href: "/matrix", label: "情景矩阵" },
  { href: "/reports", label: "报告中心" },
  { href: "/logs", label: "数据更新日志" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-64 flex-col gap-6 bg-slate/80 backdrop-blur border-r border-white/10 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-pulse">国家轨道交通</p>
        <h1 className="text-xl font-semibold text-white">情景智识</h1>
        <p className="text-sm text-fog/70 mt-2">面向轨道系统前瞻研判的决策座舱。</p>
      </div>
      <nav className="flex flex-col gap-2 text-sm">
        {navItems.map((item) => {
          const isActive = item.href === "/"
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2 transition ${
                isActive
                  ? "bg-white/15 text-white shadow-card"
                  : "text-fog/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-fog/70">
        <p className="uppercase tracking-[0.2em] text-pulse">实时信号</p>
        <p className="mt-2 text-sm text-white">当前预警 6 条</p>
        <p className="mt-1">下次刷新：15 分钟后</p>
      </div>
    </aside>
  );
}
