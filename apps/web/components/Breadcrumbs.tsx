import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-fog/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-fog/70 hover:text-white transition">
                  {item.label}
                </Link>
              ) : (
                <span className="text-fog/80">{item.label}</span>
              )}
              {!isLast && <span className="text-fog/40">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
