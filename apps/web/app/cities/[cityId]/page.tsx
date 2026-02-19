import Topbar from "../../../components/Topbar";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import MetricCard from "../../../components/MetricCard";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SectionHeader from "../../../components/SectionHeader";
import EmptyState from "../../../components/EmptyState";
import RadarPlaceholder from "../../../components/RadarPlaceholder";
import { getCity, getModules } from "../../../lib/api";
import { alertLevelLabel } from "../../../lib/labels";
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
      title: "信号扫描完成",
      detail: `预警等级设定为 ${alertLevelLabel(city.signals.alert_level)}，趋势为 ${city.signals.trend.toLowerCase()}。`,
      date: "2026-02-18",
    },
    {
      title: "客流预测更新",
      detail: `当前运营方案确认日均客流 ${city.daily_ridership_m}M。`,
      date: "2026-02-14",
    },
    {
      title: "基础设施评估",
      detail: `重点风险：${city.signals.top_risks.join(", ")}。`,
      date: "2026-02-08",
    },
  ];

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "城市", href: "/cities" }, { label: city.name }]} />

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{city.region}</p>
              <h3 className="text-3xl font-semibold text-white mt-2">{city.name}</h3>
              <p className="text-sm text-fog/70 mt-2">情景智识画像与运营准备度概览。</p>
            </div>
            <Badge label={alertLevelLabel(city.signals.alert_level)} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-fog/80">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">人口规模</p>
              <p className="text-white">{city.population_m}M</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">日均客流</p>
              <p className="text-white">{city.daily_ridership_m}M</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">线路数量</p>
              <p className="text-white">{city.lines}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-fog/60">车站数量</p>
              <p className="text-white">{city.stations}</p>
            </div>
          </div>
        </Card>

        <Card title="信号摘要">
          <div className="space-y-3 text-sm text-fog/70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">趋势</p>
              <p className="text-white mt-2">{city.signals.trend}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">重点风险</p>
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
        <SectionHeader title="关键绩效指标" subtitle="运营指标" />
        <div className="grid gap-6 lg:grid-cols-4">
          <MetricCard label="综合指数" value={`${city.overall_index}`} delta="综合评分" trend={[62, 70, 75, 78, 82, 85, 88]} />
          <MetricCard label="准点率" value={`${city.on_time_rate}%`} delta="服务准点" trend={[68, 70, 72, 74, 77, 79, 82]} />
          <MetricCard label="安全指数" value={`${city.safety_index}`} delta="风险受控" trend={[64, 66, 68, 72, 75, 78, 80]} />
          <MetricCard label="可持续" value={`${city.sustainability_score}`} delta="排放跟踪" trend={[55, 58, 62, 66, 69, 73, 76]} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="模块评分雷达" subtitle="对标" />
          <RadarPlaceholder scores={moduleScores.map((module) => module.score)} />
        </div>
        <Card title="模块评分">
          {moduleScores.length === 0 ? (
            <EmptyState title="暂无模块" description="分析完成后将生成模块评分。" />
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
                    查看模块
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="时间线信号" subtitle="近期动态" />
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
