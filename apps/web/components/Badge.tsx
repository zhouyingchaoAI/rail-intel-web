export default function Badge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "success" | "warning" | "danger" }) {
  const tones: Record<string, string> = {
    neutral: "bg-white/10 text-fog/70",
    success: "bg-moss/20 text-moss",
    warning: "bg-ember/20 text-ember",
    danger: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${tones[tone]}`}>
      {label}
    </span>
  );
}
