import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import { getCityBasics } from "../../lib/api";

export const dynamic = "force-dynamic";

const renderValue = (value: number | string | null | undefined, suffix = "") => {
  if (value === null || value === undefined || value === "") {
    return "待补充";
  }
  return `${value}${suffix}`;
};

export default async function CityBasicsPage() {
  const basics = await getCityBasics();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "城市基本面" }]} />

      <section className="space-y-4">
        <SectionHeader title="城市轨交基本面" subtitle="前 20 城市" />
        <Card>
          {basics.items.length === 0 ? (
            <EmptyState title="暂无数据" description="基础数据入库后将在此展示。" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-fog/60">
                  <tr>
                    <th className="text-left pb-2">城市</th>
                    <th className="text-left pb-2">区域</th>
                    <th className="text-left pb-2">GDP(亿元)</th>
                    <th className="text-left pb-2">常住人口(万人)</th>
                    <th className="text-left pb-2">财政收入(亿元)</th>
                    <th className="text-left pb-2">运营里程(km)</th>
                    <th className="text-left pb-2">开通线路数</th>
                    <th className="text-left pb-2">在建线路数</th>
                    <th className="text-left pb-2">日均客运量(万人次)</th>
                    <th className="text-left pb-2">客运强度</th>
                    <th className="text-left pb-2">轨交分担率(%)</th>
                    <th className="text-left pb-2">运营集团</th>
                    <th className="text-left pb-2">数据状态</th>
                  </tr>
                </thead>
                <tbody className="text-fog/80">
                  {basics.items.map((item: any) => (
                    <tr key={item.city_id} className="border-t border-white/5 odd:bg-white/5">
                      <td className="py-3 text-white">{item.city_name}</td>
                      <td className="py-3">{item.region}</td>
                      <td className="py-3">{renderValue(item.gdp_billion)}</td>
                      <td className="py-3">{renderValue(item.population_10k)}</td>
                      <td className="py-3">{renderValue(item.fiscal_revenue_billion)}</td>
                      <td className="py-3">{renderValue(item.rail_mileage_km)}</td>
                      <td className="py-3">{renderValue(item.lines_open)}</td>
                      <td className="py-3">{renderValue(item.lines_under_construction)}</td>
                      <td className="py-3">{renderValue(item.daily_ridership_10k)}</td>
                      <td className="py-3">{renderValue(item.passenger_intensity)}</td>
                      <td className="py-3">{renderValue(item.modal_share)}</td>
                      <td className="py-3">{renderValue(item.operator_name)}</td>
                      <td className="py-3">{item.data_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
