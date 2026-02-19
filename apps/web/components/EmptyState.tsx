export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-fog/60">{title}</p>
      <p className="text-base text-fog/80 mt-3">{description}</p>
    </div>
  );
}
