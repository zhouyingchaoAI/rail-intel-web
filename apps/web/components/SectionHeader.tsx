import { ReactNode } from "react";

export default function SectionHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {subtitle && <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{subtitle}</p>}
        <h3 className="text-2xl font-semibold text-white mt-2">{title}</h3>
      </div>
      {actions && <div className="flex items-center gap-3 text-sm">{actions}</div>}
    </div>
  );
}
