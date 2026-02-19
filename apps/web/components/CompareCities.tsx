"use client";

import { useMemo, useState } from "react";
import Badge from "./Badge";
import { alertLevelLabel } from "../lib/labels";

type City = {
  id: string;
  name: string;
  region: string;
  population_m: number;
  daily_ridership_m: number;
  lines: number;
  stations: number;
  on_time_rate: number;
  safety_index: number;
  sustainability_score: number;
  overall_index: number;
  signals: {
    alert_level: string;
    trend: string;
    top_risks: string[];
  };
  module_scores?: Record<string, number>;
};

export default function CompareCities({ cities }: { cities: City[] }) {
  const [selected, setSelected] = useState<string[]>(cities.slice(0, 3).map((city) => city.id));

  const selectedCities = useMemo(() => cities.filter((city) => selected.includes(city.id)), [cities, selected]);

  const toggleCity = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-fog/70">
        <p className="text-xs uppercase tracking-[0.2em] text-fog/60">选择城市（最多 3 个）</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {cities.map((city) => {
            const active = selected.includes(city.id);
            return (
              <button
                key={city.id}
                onClick={() => toggleCity(city.id)}
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.15em] transition ${
                  active ? "bg-pulse/20 text-pulse border border-pulse/40" : "bg-white/5 text-fog/70 border border-white/10"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-fog/60">提示：已选 {selected.length}/3</p>
      </div>

      {selectedCities.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-fog/70">
          尚未选择城市。请从上方列表中选择城市以生成对比视图。
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {selectedCities.map((city) => (
            <div key={city.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-fog/60">{city.region}</p>
                  <p className="text-xl text-white mt-2">{city.name}</p>
                </div>
                <Badge label={alertLevelLabel(city.signals.alert_level)} tone={city.signals.alert_level === "Normal" ? "success" : "warning"} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-fog/80">
                <div>
                  <p className="text-xs text-fog/60">综合指数</p>
                  <p className="text-white">{city.overall_index}</p>
                </div>
                <div>
                  <p className="text-xs text-fog/60">准点率</p>
                  <p className="text-white">{city.on_time_rate}%</p>
                </div>
                <div>
                  <p className="text-xs text-fog/60">安全指数</p>
                  <p className="text-white">{city.safety_index}</p>
                </div>
                <div>
                  <p className="text-xs text-fog/60">可持续</p>
                  <p className="text-white">{city.sustainability_score}</p>
                </div>
                <div>
                  <p className="text-xs text-fog/60">日均客流</p>
                  <p className="text-white">{city.daily_ridership_m}M</p>
                </div>
                <div>
                  <p className="text-xs text-fog/60">线路/车站</p>
                  <p className="text-white">{city.lines}/{city.stations}</p>
                </div>
              </div>
              <div className="text-xs text-fog/60">
                重点风险：{city.signals.top_risks.join("、")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
