import Card from "./Card";

export default function MetricCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5">
      <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{label}</p>
      <p className="text-3xl font-semibold text-white mt-3">{value}</p>
      {delta && <p className="text-xs text-moss mt-2">{delta}</p>}
    </Card>
  );
}
