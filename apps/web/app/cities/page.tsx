import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { getCities } from "../../lib/api";

export default async function CitiesPage() {
  const citiesData = await getCities();

  return (
    <div className="space-y-8">
      <Topbar />
      <section className="grid gap-6 lg:grid-cols-3">
        {citiesData.items.map((city: any) => (
          <Card key={city.id} className="bg-gradient-to-br from-white/10 to-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{city.region}</p>
                <h3 className="text-xl font-semibold text-white mt-2">{city.name}</h3>
              </div>
              <Badge label={city.signals.alert_level} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-fog/80">
              <div>
                <p className="text-xs text-fog/60">Population</p>
                <p className="text-white">{city.population_m}M</p>
              </div>
              <div>
                <p className="text-xs text-fog/60">Daily Riders</p>
                <p className="text-white">{city.daily_ridership_m}M</p>
              </div>
              <div>
                <p className="text-xs text-fog/60">Lines</p>
                <p className="text-white">{city.lines}</p>
              </div>
              <div>
                <p className="text-xs text-fog/60">Stations</p>
                <p className="text-white">{city.stations}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-fog/60">Top Risks</p>
              <ul className="mt-2 text-sm text-fog/80 space-y-1">
                {city.signals.top_risks.map((risk: string) => (
                  <li key={risk}>• {risk}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </section>

      <Card title="Performance Overview">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-fog/60">
            <tr>
              <th className="text-left pb-2">City</th>
              <th className="text-left pb-2">Overall Index</th>
              <th className="text-left pb-2">On-Time</th>
              <th className="text-left pb-2">Safety</th>
              <th className="text-left pb-2">Sustainability</th>
            </tr>
          </thead>
          <tbody className="text-fog/80">
            {citiesData.items.map((city: any) => (
              <tr key={city.id} className="border-t border-white/5">
                <td className="py-3 text-white">{city.name}</td>
                <td className="py-3">{city.overall_index}</td>
                <td className="py-3">{city.on_time_rate}%</td>
                <td className="py-3">{city.safety_index}</td>
                <td className="py-3">{city.sustainability_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
