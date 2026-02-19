const baseSize = 120;
const center = baseSize / 2;
const maxRadius = 46;

function polarPoint(radius: number, angle: number) {
  return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
}

export default function RadarPlaceholder({ scores }: { scores: number[] }) {
  const safeScores = scores.length > 0 ? scores : [50, 50, 50, 50, 50, 50];
  const points = safeScores.map((score, index) => {
    const angle = (Math.PI * 2 * index) / safeScores.length - Math.PI / 2;
    const radius = (Math.max(10, Math.min(100, score)) / 100) * maxRadius;
    return polarPoint(radius, angle);
  });

  const ringPoints = new Array(5).fill(0).map((_, ringIndex) => {
    const radius = ((ringIndex + 1) / 5) * maxRadius;
    return safeScores.map((_, index) => {
      const angle = (Math.PI * 2 * index) / safeScores.length - Math.PI / 2;
      return polarPoint(radius, angle);
    });
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate/80 to-ink/80 p-4">
      <div className="flex items-center justify-between text-xs text-fog/60">
        <span className="uppercase tracking-[0.3em]">模块评分雷达</span>
        <span>示意</span>
      </div>
      <svg viewBox={`0 0 ${baseSize} ${baseSize}`} className="mt-4 h-40 w-full">
        <defs>
          <linearGradient id="radarFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#3fb6ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4bd3a2" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {ringPoints.map((ring, index) => (
          <polygon
            key={`ring-${index}`}
            points={ring.join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
        ))}
        <polygon points={points.join(" ")} fill="url(#radarFill)" stroke="#3fb6ff" strokeWidth="2" />
      </svg>
    </div>
  );
}
