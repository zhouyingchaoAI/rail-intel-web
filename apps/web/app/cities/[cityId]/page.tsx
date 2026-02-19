import Topbar from "../../../components/Topbar";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import MetricCard from "../../../components/MetricCard";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SectionHeader from "../../../components/SectionHeader";
import EmptyState from "../../../components/EmptyState";
import RadarPlaceholder from "../../../components/RadarPlaceholder";
import { getCity, getModules } from "../../../lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CityDetailPage({ params }: { params: { cityId: string } }) {
  const city = await getCity(params.cityId);
  if (!city || city.error) {
    notFound();
  }

  const modulesData = await getModules();
  const moduleScores = modulesData.items.map((module: any) => ({
    ...module,
    score: city.module_scores?.[module.id] ?? 0,
  }));

  const timeline = [
    {
      title: "Signal Scan Completed",
      detail: `Alert level set to ${city.signals.alert_level} with ${city.signals.trend.toLowerCase()} trend.`,
      date: "2026-02-18",
    },
    {
      title: "Ridership Forecast Updated",
      detail: `${city.daily_ridership_m}M daily riders confirmed for current operating plan.`,
      date: "2026-02-14",
    },
    {
      title: "Infrastructure Assessment",
      detail: `Top risk focus: ${city.signals.top_risks.join(", ")}.`,
      date: "2026-02-08",
    },
  ];

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: city.name }]} />

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{city.region}</p>
              <h3 className="text-3xl font-semibold text-white mt-2">{city.name}</h3>
              <p className="text-sm text-fog/70 mt-2">Scenario intelligence profile and operational readiness overview.</p>
            </div>
            <Badge label={city.signals.alert_level} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-fog/80">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">Population</p>
              <p className="text-white">{city.population_m}M</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">Daily Riders</p>
              <p className="text-white">{city.daily_ridership_m}M</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">Lines</p>
              <p className="text-white">{city.lines}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">Stations</p>
              <p className="text-white">{city.stations}</p>
            </div>
          </div>
        </Card>

        <Card title="Signal Summary">
          <div className="space-y-3 text-sm text-fog/70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Trend</p>
              <p className="text-white mt-2">{city.signals.trend}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Top Risks</p>
              <ul className="mt-2 space-y-1 text-fog/80">
                {city.signals.top_risks.map((risk: string) => (
                  <li key={risk}>• {risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Key Performance KPIs" subtitle="Operational Metrics" />
        <div className="grid gap-6 lg:grid-cols-4">
          <MetricCard label="Overall Index" value={`${city.overall_index}`} delta="Composite score" trend={[62, 70, 75, 78, 82, 85, 88]} />
          <MetricCard label="On-Time Rate" value={`${city.on_time_rate}%`} delta="Service punctuality" trend={[68, 70, 72, 74, 77, 79, 82]} />
          <MetricCard label="Safety Index" value={`${city.safety_index}`} delta="Risk managed" trend={[64, 66, 68, 72, 75, 78, 80]} />
          <MetricCard label="Sustainability" value={`${city.sustainability_score}`} delta="Emissions tracking" trend={[55, 58, 62, 66, 69, 73, 76]} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="Module Score Radar" subtitle="Benchmark" />
          <RadarPlaceholder scores={moduleScores.map((module) => module.score)} />
        </div>
        <Card title="Module Scores">
          {moduleScores.length === 0 ? (
            <EmptyState title="No Modules" description="Module scores will populate after analytics runs." />
          ) : (
            <div className="space-y-3 text-sm text-fog/70">
              {moduleScores.map((module: any) => (
                <div key={module.id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white">{module.name}</p>
                    <span className="text-sm text-pulse">{module.score}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-moss" style={{ width: `${module.score}%` }} />
                  </div>
                  <Link href={`/modules/${module.id}`} className="mt-3 inline-flex text-xs uppercase tracking-[0.2em] text-pulse hover:text-white">
                    View Module
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Timeline Signals" subtitle="Recent Activity" />
        <Card>
          <div className="grid gap-4 lg:grid-cols-3">
            {timeline.map((event) => (
              <div key={event.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-fog/60">{event.date}</p>
                <p className="text-sm text-white mt-2">{event.title}</p>
                <p className="text-xs text-fog/70 mt-2">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
