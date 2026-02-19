import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getLogs } from "../../lib/api";

const statusTone: Record<string, "neutral" | "success" | "warning"> = {
  Success: "success",
  Warning: "warning",
};

export default async function LogsPage() {
  const logsData = await getLogs();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Logs" }]} />
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="Data Update Logs" subtitle="System Activity" />
          <Card>
            {logsData.items.length === 0 ? (
              <EmptyState title="No Logs" description="Update logs will appear once the ingestion pipeline runs." />
            ) : (
              <div className="space-y-4">
                {logsData.items.map((log: any) => (
                  <div key={log.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">{log.source}</p>
                        <p className="text-xs text-fog/60 mt-1">{log.timestamp.slice(0, 16).replace("T", " ")}</p>
                      </div>
                      <Badge label={log.status} tone={statusTone[log.status] || "neutral"} />
                    </div>
                    <p className="text-sm text-fog/80 mt-3">{log.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        <Card title="Ingestion Health">
          <div className="space-y-3 text-sm text-fog/80">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Last Successful Load</p>
              <p className="text-white mt-2">2026-02-18 07:45 UTC</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Active Pipelines</p>
              <p className="text-white mt-2">8 feeds monitored</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Exceptions</p>
              <p className="text-white mt-2">1 warning awaiting review</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
