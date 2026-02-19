import Link from "next/link";

const navItems = [
  { href: "/", label: "Landing" },
  { href: "/cities", label: "City Overview" },
  { href: "/modules", label: "Six Modules" },
  { href: "/matrix", label: "Scenario Matrix" },
  { href: "/reports", label: "Report Center" },
  { href: "/logs", label: "Data Update Logs" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col gap-6 bg-slate/80 backdrop-blur border-r border-white/10 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-pulse">National Rail Transit</p>
        <h1 className="text-xl font-semibold text-white">Scenario Intelligence</h1>
        <p className="text-sm text-fog/70 mt-2">Decision cockpit for rail system foresight.</p>
      </div>
      <nav className="flex flex-col gap-2 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-3 py-2 text-fog/80 hover:text-white hover:bg-white/10 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-fog/70">
        <p className="uppercase tracking-[0.2em] text-pulse">Live Signals</p>
        <p className="mt-2 text-sm text-white">6 active alerts</p>
        <p className="mt-1">Next refresh in 15 minutes</p>
      </div>
    </aside>
  );
}
