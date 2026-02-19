import Topbar from "../../../components/Topbar";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import ChartPlaceholder from "../../../components/ChartPlaceholder";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SectionHeader from "../../../components/SectionHeader";
import EmptyState from "../../../components/EmptyState";
import { getCities, getModule } from "../../../lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = await getModule(params.moduleId);
  if (!module || module.error) {
    notFound();
  }

  const citiesData = await getCities();
  const rankedCities = [...citiesData.items]
    .map((city: any) => ({
      ...city,
      moduleScore: city.module_scores?.[module.id] ?? 0,
    }))
    .sort((a, b) => b.moduleScore - a.moduleScore);

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Modules", href: "/modules" }, { label: module.name }]} />
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fog/60">Module Detail</p>
              <h3 className="text-3xl font-semibold text-white mt-2">{module.name}</h3>
              <p className="text-sm text-fog/70 mt-3 max-w-2xl">{module.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-fog/70">
              <p className="uppercase tracking-[0.2em] text-pulse">Focus Signals</p>
              <p className="mt-2 text-sm text-white">6 cities benchmarked</p>
              <p className="mt-1">Updated 2026-02-18</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {module.key_fields.map((field: string) => (
              <div key={field} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-fog/80">
                {field}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ChartPlaceholder label="Module Score Trend" />
          </div>
        </Card>
        <Card title="Top City Performance">
          {rankedCities.length === 0 ? (
            <EmptyState title="No Rankings" description="City benchmark scores will appear after analytics run." />
          ) : (
            <div className="space-y-3">
              {rankedCities.slice(0, 4).map((city: any) => (
                <div key={city.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <Link href={`/cities/${city.id}`} className="text-sm text-white hover:text-pulse">
                      {city.name}
                    </Link>
                    <Badge label={`${city.moduleScore}`} tone={city.moduleScore >= 85 ? "success" : "warning"} />
                  </div>
                  <p className="text-xs text-fog/60 mt-2">Overall Index: {city.overall_index}</p>
                  <p className="text-xs text-fog/60">Alert: {city.signals.alert_level}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="City Benchmark Table" subtitle="Comparative" />
        <Card>
          <div className="overflow-x-auto">
            {rankedCities.length === 0 ? (
              <EmptyState title="No Benchmarks" description="Benchmark comparisons will be visible once scores are computed." />
            ) : (
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-fog/60">
                  <tr>
                    <th className="text-left pb-2">City</th>
                    <th className="text-left pb-2">Module Score</th>
                    <th className="text-left pb-2">On-Time</th>
                    <th className="text-left pb-2">Alert</th>
                  </tr>
                </thead>
                <tbody className="text-fog/80">
                  {rankedCities.map((city: any) => (
                    <tr key={city.id} className="border-t border-white/5 odd:bg-white/5 hover:bg-white/10">
                      <td className="py-3 text-white">
                        <Link href={`/cities/${city.id}`} className="hover:text-pulse">
                          {city.name}
                        </Link>
                      </td>
                      <td className="py-3">{city.moduleScore}</td>
                      <td className="py-3">{city.on_time_rate}%</td>
                      <td className="py-3">{city.signals.alert_level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
