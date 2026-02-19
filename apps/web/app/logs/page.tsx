import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
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
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" title="Data Update Logs">
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
        </Card>
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
