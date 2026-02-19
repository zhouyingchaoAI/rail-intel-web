import { ReactNode } from "react";

export default function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 shadow-card ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
}
