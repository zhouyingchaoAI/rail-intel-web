import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import ChartPlaceholder from "../../components/ChartPlaceholder";
import MetricCard from "../../components/MetricCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getModules } from "../../lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  const modulesData = await getModules();
  const totalModules = modulesData.items.length;
  const totalFields = modulesData.items.reduce((sum: number, module: any) => sum + module.key_fields.length, 0);
  const averageFields = totalModules > 0 ? Math.round(totalFields / totalModules) : 0;
  const mostCoverage = modulesData.items.reduce(
    (top: any, module: any) => (module.key_fields.length > top.key_fields.length ? module : top),
    modulesData.items[0] || { name: "N/A", key_fields: [] }
  );

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "模块" }]} />

      <section className="space-y-4">
        <SectionHeader title="模块体系" subtitle="系统覆盖" />
        <div className="grid gap-6 lg:grid-cols-3">
          <MetricCard label="模块总数" value={`${totalModules}`} delta="六维框架" trend={[40, 55, 62, 68, 72, 78, 82]} />
          <MetricCard label="平均指标" value={`${averageFields}`} delta="每模块" trend={[30, 42, 50, 58, 64, 70, 75]} />
          <MetricCard label="覆盖最多" value={`${mostCoverage.key_fields.length}`} delta={mostCoverage.name} trend={[35, 48, 60, 66, 72, 78, 84]} />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="模块探索" subtitle="深度剖析" actions={
          <Link href="/reports" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-fog/70 hover:text-white">
            查看报告
          </Link>
        } />
        {modulesData.items.length === 0 ? (
          <EmptyState title="暂无模块" description="系统配置加载后将呈现模块定义。" />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {modulesData.items.map((module: any) => (
              <Card key={module.id} className="flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-fog/60">模块</p>
                    <h3 className="text-2xl font-semibold text-white mt-2">{module.name}</h3>
                  </div>
                  <Link href={`/modules/${module.id}`} className="text-sm text-pulse hover:text-white">
                    查看详情 →
                  </Link>
                </div>
                <p className="text-sm text-fog/70 mt-3">{module.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-fog/60">
                  {module.key_fields.map((field: string) => (
                    <div key={field} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      {field}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <ChartPlaceholder label="模块评分趋势" />
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <Link href={`/modules/${module.id}`} className="text-pulse hover:text-white">
                    打开仪表板 →
                  </Link>
                  <Link href={`/cities`} className="text-fog/70 hover:text-white">
                    对比城市
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
