import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { getReports } from "../../lib/api";

const statusTone: Record<string, "neutral" | "success" | "warning"> = {
  Published: "success",
  Draft: "neutral",
  "In Review": "warning",
};

export default async function ReportsPage() {
  const reportsData = await getReports();

  return (
    <div className="space-y-8">
      <Topbar />
      <Card title="Report Center">
        <div className="grid gap-4 lg:grid-cols-3">
          {reportsData.items.map((report: any) => (
            <div key={report.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white">{report.title}</p>
                <Badge label={report.status} tone={statusTone[report.status] || "neutral"} />
              </div>
              <p className="text-xs text-fog/60 mt-2">City: {report.city}</p>
              <p className="text-xs text-fog/60">Focus: {report.focus}</p>
              <p className="text-xs text-fog/60">Updated: {report.updated_at.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Analyst Queue">
        <div className="space-y-3 text-sm text-fog/80">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white">Metrovale Expansion Corridor</p>
            <p className="text-xs text-fog/60 mt-1">Awaiting emissions model refresh</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white">Rivergate Station Modernization</p>
            <p className="text-xs text-fog/60 mt-1">Pending passenger sentiment review</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
