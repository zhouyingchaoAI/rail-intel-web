export default function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate/80 to-ink/80 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{label}</p>
        <span className="text-xs text-fog/50">示意图</span>
      </div>
      <svg viewBox="0 0 200 80" className="mt-4 h-20 w-full">
        <defs>
          <linearGradient id="pulse" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3fb6ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3fb6ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#3fb6ff"
          strokeWidth="3"
          points="0,60 30,50 60,55 90,30 120,35 150,20 180,28 200,18"
        />
        <polygon fill="url(#pulse)" points="0,80 0,60 30,50 60,55 90,30 120,35 150,20 180,28 200,18 200,80" />
      </svg>
    </div>
  );
}
