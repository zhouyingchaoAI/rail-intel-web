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
import { alertLevelLabel } from "../lib/labels";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dashboard = await getDashboard();
  const citiesData = await getCities();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页" }]} />

      <section className="space-y-4">
        <SectionHeader title="网络态势快照" subtitle="管理层指标" />
        <div className="grid gap-6 lg:grid-cols-4">
          <MetricCard
            label="网络健康度"
            value={`${dashboard.network_health}%`}
            delta="较上月 +1.6%"
            trend={[54, 62, 68, 72, 80, 78, 84]}
          />
          <MetricCard
            label="可靠性指数"
            value={`${dashboard.reliability_index}%`}
            delta="保持稳定"
            trend={[45, 52, 58, 64, 60, 66, 71]}
          />
          <MetricCard
            label="风险指数"
            value={`${dashboard.risk_index}`}
            delta="趋势下降 2.4"
            trend={[72, 68, 60, 62, 55, 50, 48]}
          />
          <MetricCard
            label="活跃预警"
            value={`${dashboard.active_alerts}`}
            delta="3 项高优先级"
            trend={[35, 48, 60, 52, 46, 38, 30]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="运行重点" subtitle="今日" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="优先行动">
            {dashboard.priority_actions.length === 0 ? (
              <EmptyState title="暂无行动" description="今日暂无待推进的优先事项。" />
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
          <Card title="区域脉动">
            <div className="space-y-4">
              <ChartPlaceholder label="可靠性趋势" />
              <ChartPlaceholder label="客流动能" />
            </div>
          </Card>
          <Card title="城市信号">
            {citiesData.items.length === 0 ? (
              <EmptyState title="暂无城市信号" description="城市监测数据接入后将在此展示。" />
            ) : (
              <div className="space-y-4">
                {citiesData.items.slice(0, 3).map((city: any) => (
                  <div key={city.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <Link href={`/cities/${city.id}`} className="text-sm text-white hover:text-pulse transition">
                        {city.name}
                      </Link>
                      <Badge label={alertLevelLabel(city.signals.alert_level)} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
                    </div>
                    <p className="text-xs text-fog/60 mt-2">趋势：{city.signals.trend}</p>
                    <p className="text-xs text-fog/60">重点风险：{city.signals.top_risks[0]}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="战略语境" subtitle="综述" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="项目叙述">
            <p className="text-sm text-fog/75 leading-relaxed">
              国家轨道交通情景智识框架聚合基础设施健康、运营可靠性、乘客体验、安全保障、可持续与数字化创新，形成统一的战略视角。
              平台持续识别前瞻信号并排序跨城市干预优先级，确保韧性与乘客优先的出行体系。
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-fog/60">战略覆盖</p>
                <p className="text-lg text-white">覆盖 27 条走廊，跟踪 184 项情景</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-fog/60">最新更新</p>
                <p className="text-lg text-white">资产遥测刷新完成 {dashboard.as_of.slice(0, 10)}</p>
              </div>
            </div>
          </Card>
          <Card title="重点城市概览">
            {citiesData.items.length === 0 ? (
              <EmptyState title="暂无城市" description="监测数据接入后将展示城市快照。" />
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-fog/60">
                  <tr>
                    <th className="text-left pb-2">城市</th>
                    <th className="text-left pb-2">综合指数</th>
                    <th className="text-left pb-2">准点率</th>
                    <th className="text-left pb-2">预警</th>
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
                        <Badge label={alertLevelLabel(city.signals.alert_level)} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
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
