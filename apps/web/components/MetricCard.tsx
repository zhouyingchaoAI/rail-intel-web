import Card from "./Card";

export default function MetricCard({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: number[];
}) {
  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5">
      <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{label}</p>
      <p className="text-3xl font-semibold text-white mt-3">{value}</p>
      {delta && <p className="text-xs text-moss mt-2">{delta}</p>}
      {trend && trend.length > 0 && (
        <div className="mt-4 flex h-10 items-end gap-1">
          {trend.map((valuePoint, index) => (
            <div key={`${label}-${index}`} className="flex-1 rounded-full bg-white/10 h-full">
              <div
                className="w-full rounded-full bg-pulse"
                style={{ height: `${Math.max(18, Math.min(100, valuePoint))}%` }}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
