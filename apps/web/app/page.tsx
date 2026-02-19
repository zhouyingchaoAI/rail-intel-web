import Topbar from "../components/Topbar";
import Card from "../components/Card";
import MetricCard from "../components/MetricCard";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Badge from "../components/Badge";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import Link from "next/link";
import { getDashboard, getCities } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dashboard = await getDashboard();
  const citiesData = await getCities();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "Home" }]} />

      <section className="space-y-4">
        <SectionHeader title="Network Snapshot" subtitle="Executive KPIs" />
        <div className="grid gap-6 lg:grid-cols-4">
          <MetricCard
            label="Network Health"
            value={`${dashboard.network_health}%`}
            delta="+1.6% vs last month"
            trend={[54, 62, 68, 72, 80, 78, 84]}
          />
          <MetricCard
            label="Reliability Index"
            value={`${dashboard.reliability_index}%`}
            delta="Stable"
            trend={[45, 52, 58, 64, 60, 66, 71]}
          />
          <MetricCard
            label="Risk Index"
            value={`${dashboard.risk_index}`}
            delta="-2.4 trend"
            trend={[72, 68, 60, 62, 55, 50, 48]}
          />
          <MetricCard
            label="Active Alerts"
            value={`${dashboard.active_alerts}`}
            delta="3 critical"
            trend={[35, 48, 60, 52, 46, 38, 30]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Operational Focus" subtitle="Today" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Priority Actions">
            {dashboard.priority_actions.length === 0 ? (
              <EmptyState title="No Actions" description="All priority actions are cleared for today." />
            ) : (
              <ul className="space-y-3 text-sm text-fog/80">
                {dashboard.priority_actions.map((action: string) => (
                  <li key={action} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    {action}
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Regional Pulse">
            <div className="space-y-4">
              <ChartPlaceholder label="Reliability Trend" />
              <ChartPlaceholder label="Ridership Momentum" />
            </div>
          </Card>
          <Card title="City Signals">
            {citiesData.items.length === 0 ? (
              <EmptyState title="No City Signals" description="City monitoring data will appear here once available." />
            ) : (
              <div className="space-y-4">
                {citiesData.items.slice(0, 3).map((city: any) => (
                  <div key={city.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <Link href={`/cities/${city.id}`} className="text-sm text-white hover:text-pulse transition">
                        {city.name}
                      </Link>
                      <Badge label={city.signals.alert_level} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
                    </div>
                    <p className="text-xs text-fog/60 mt-2">Trend: {city.signals.trend}</p>
                    <p className="text-xs text-fog/60">Top Risk: {city.signals.top_risks[0]}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Strategic Context" subtitle="Narrative" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Program Narrative">
            <p className="text-sm text-fog/75 leading-relaxed">
              The National Rail Transit Scenario Intelligence Framework synthesizes infrastructure health, operational reliability,
              passenger experience, safety, sustainability, and digital innovation into a unified strategic outlook. The platform
              surfaces early-warning signals and prioritizes cross-city interventions to ensure resilient, passenger-first mobility.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Strategic Coverage</p>
                <p className="text-lg text-white">27 corridors monitored, 184 scenarios tracked</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Recent Update</p>
                <p className="text-lg text-white">Asset telemetry refresh completed {dashboard.as_of.slice(0, 10)}</p>
              </div>
            </div>
          </Card>
          <Card title="Top Cities Snapshot">
            {citiesData.items.length === 0 ? (
              <EmptyState title="No Cities" description="City snapshots will appear once the monitoring feeds are live." />
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-fog/60">
                  <tr>
                    <th className="text-left pb-2">City</th>
                    <th className="text-left pb-2">Overall Index</th>
                    <th className="text-left pb-2">On-Time</th>
                    <th className="text-left pb-2">Alert</th>
                  </tr>
                </thead>
                <tbody className="text-fog/80">
                  {citiesData.items.map((city: any) => (
                    <tr key={city.id} className="border-t border-white/5 odd:bg-white/5 hover:bg-white/10">
                      <td className="py-3 text-white">
                        <Link href={`/cities/${city.id}`} className="hover:text-pulse transition">
                          {city.name}
                        </Link>
                      </td>
                      <td className="py-3">{city.overall_index}</td>
                      <td className="py-3">{city.on_time_rate}%</td>
                      <td className="py-3">
                        <Badge label={city.signals.alert_level} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
