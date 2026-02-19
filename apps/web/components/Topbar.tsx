export default function Topbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-fog/60">National Rail Transit</p>
        <h2 className="text-3xl font-semibold text-white">Scenario Intelligence Framework</h2>
        <p className="text-sm text-fog/70 mt-2">Strategic monitoring across infrastructure, operations, and resilience.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-fog/70">Feb 19, 2026</div>
        <div className="rounded-full border border-pulse/50 bg-pulse/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-pulse">Live Demo</div>
      </div>
    </div>
  );
}
