import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getReports } from "../../lib/api";
import { reportStatusLabel } from "../../lib/labels";

export const dynamic = "force-dynamic";

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
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "报告" }]} />
      <section className="space-y-4">
        <SectionHeader title="报告中心" subtitle="已发布智识" />
        <Card>
          {reportsData.items.length === 0 ? (
            <EmptyState title="暂无报告" description="报告发布后将在此处展示。" />
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {reportsData.items.map((report: any) => (
                <div key={report.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">{report.title}</p>
                    <Badge label={reportStatusLabel(report.status)} tone={statusTone[report.status] || "neutral"} />
                  </div>
                  <p className="text-xs text-fog/60 mt-2">城市：{report.city}</p>
                  <p className="text-xs text-fog/60">关注：{report.focus}</p>
                  <p className="text-xs text-fog/60">更新：{report.updated_at.slice(0, 10)}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="分析师队列" subtitle="处理中" />
        <Card>
          <div className="space-y-3 text-sm text-fog/80">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Metrovale 扩展走廊</p>
              <p className="text-xs text-fog/60 mt-1">等待排放模型刷新</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Rivergate 车站现代化</p>
              <p className="text-xs text-fog/60 mt-1">待乘客满意度审阅</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
