import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getCities } from "../../lib/api";
import { alertLevelLabel } from "../../lib/labels";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CitiesPage() {
  const citiesData = await getCities();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "城市" }]} />
      <section className="space-y-4">
        <SectionHeader title="城市概况" subtitle="组合" />
        {citiesData.items.length === 0 ? (
          <EmptyState title="暂无城市" description="数据源接入后将生成城市画像。" />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {citiesData.items.map((city: any) => (
              <Card key={city.id} className="flex flex-col bg-gradient-to-br from-white/10 to-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{city.region}</p>
                    <Link href={`/cities/${city.id}`} className="text-xl font-semibold text-white mt-2 inline-flex items-center gap-2">
                      {city.name}
                      <span className="text-sm text-pulse">→</span>
                    </Link>
                  </div>
                  <Badge label={alertLevelLabel(city.signals.alert_level)} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-fog/80">
                  <div>
                    <p className="text-xs text-fog/60">人口规模</p>
                    <p className="text-white">{city.population_m}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-fog/60">日均客流</p>
                    <p className="text-white">{city.daily_ridership_m}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-fog/60">线路数量</p>
                    <p className="text-white">{city.lines}</p>
                  </div>
                  <div>
                    <p className="text-xs text-fog/60">车站数量</p>
                    <p className="text-white">{city.stations}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-fog/60">重点风险</p>
                  <ul className="mt-2 text-sm text-fog/80 space-y-1">
                    {city.signals.top_risks.map((risk: string) => (
                      <li key={risk}>• {risk}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm text-fog/70">
                  <span>综合指数</span>
                  <span className="text-white">{city.overall_index}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader title="绩效概览" subtitle="对标" />
        <Card>
          {citiesData.items.length === 0 ? (
            <EmptyState title="暂无指标" description="首轮数据入库后将呈现对标指标。" />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-fog/60">
                <tr>
                  <th className="text-left pb-2">城市</th>
                  <th className="text-left pb-2">综合指数</th>
                  <th className="text-left pb-2">准点率</th>
                  <th className="text-left pb-2">安全指数</th>
                  <th className="text-left pb-2">可持续</th>
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
                    <td className="py-3">{city.safety_index}</td>
                    <td className="py-3">{city.sustainability_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </section>
    </div>
  );
}
