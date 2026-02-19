import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getLogs } from "../../lib/api";
import { logStatusLabel } from "../../lib/labels";

export const dynamic = "force-dynamic";

const statusTone: Record<string, "neutral" | "success" | "warning"> = {
  Success: "success",
  Warning: "warning",
};

export default async function LogsPage() {
  const logsData = await getLogs();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "日志" }]} />
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="数据更新日志" subtitle="系统活动" />
          <Card>
            {logsData.items.length === 0 ? (
              <EmptyState title="暂无日志" description="数据管道运行后将呈现更新日志。" />
            ) : (
              <div className="space-y-4">
                {logsData.items.map((log: any) => (
                  <div key={log.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">{log.source}</p>
                        <p className="text-xs text-fog/60 mt-1">{log.timestamp.slice(0, 16).replace("T", " ")}</p>
                      </div>
                      <Badge label={logStatusLabel(log.status)} tone={statusTone[log.status] || "neutral"} />
                    </div>
                    <p className="text-sm text-fog/80 mt-3">{log.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        <Card title="入库健康度">
          <div className="space-y-3 text-sm text-fog/80">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">最近成功入库</p>
              <p className="text-white mt-2">2026-02-18 07:45 UTC</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">活跃管道</p>
              <p className="text-white mt-2">监测 8 条数据流</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">异常情况</p>
              <p className="text-white mt-2">1 条告警待复核</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
