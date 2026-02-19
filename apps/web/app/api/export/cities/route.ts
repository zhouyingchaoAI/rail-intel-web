import { NextResponse } from "next/server";
import { getCities } from "../../../../lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCities();
  const header = ["城市", "区域", "人口规模(百万)", "日均客流(百万)", "线路", "车站", "准点率", "安全指数", "可持续", "综合指数", "预警等级"].join(",");
  const rows = data.items.map((city: any) => {
    return [
      city.name,
      city.region,
      city.population_m,
      city.daily_ridership_m,
      city.lines,
      city.stations,
      city.on_time_rate,
      city.safety_index,
      city.sustainability_score,
      city.overall_index,
      city.signals?.alert_level || "",
    ].join(",");
  });
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rail_cities.csv",
    },
  });
}
