export default function Topbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-fog/60">国家轨道交通</p>
        <h2 className="text-3xl font-semibold text-white">情景智识框架</h2>
        <p className="text-sm text-fog/70 mt-2">覆盖基础设施、运营与韧性的战略监测。</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-fog/70">2026-02-19</div>
        <div className="rounded-full border border-pulse/50 bg-pulse/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-pulse">实时演示</div>
      </div>
    </div>
  );
}
