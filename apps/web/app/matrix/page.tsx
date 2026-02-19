import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import EmptyState from "../../components/EmptyState";
import { getMatrix, getScenarios } from "../../lib/api";

export const dynamic = "force-dynamic";

export default async function MatrixPage() {
  const matrix = await getMatrix();
  const scenariosData = await getScenarios();
  const rows = matrix.rows || [];
  const columns = matrix.columns || [];

  const intensityColor = (value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    const alpha = 0.15 + (clamped / 100) * 0.7;
    return `rgba(63, 182, 255, ${alpha})`;
  };

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "情景矩阵" }]} />
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader title="情景诊断矩阵" subtitle="强度" />
          <Card>
            {rows.length === 0 ? (
              <EmptyState title="暂无矩阵" description="矩阵数据就绪后将呈现诊断结果。" />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-xs uppercase text-fog/60">
                    <tr>
                      <th className="text-left pb-2 pr-4">情景</th>
                      {columns.map((col: string) => (
                        <th key={col} className="pb-2 pr-4 text-left">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-fog/80">
                    {rows.map((row: string, rowIndex: number) => (
                      <tr key={row} className="border-t border-white/5 odd:bg-white/5">
                        <td className="py-3 pr-4 text-white">{row}</td>
                        {matrix.cells[rowIndex].map((cell: number, cellIndex: number) => (
                          <td key={`${row}-${cellIndex}`} className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="h-10 w-10 rounded-xl border border-white/10 shadow-card"
                                style={{ backgroundColor: intensityColor(cell) }}
                              />
                              <span className="text-sm text-fog/80">{cell}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex items-center gap-3 text-xs text-fog/60">
                  <span>低</span>
                  <div className="h-2 w-24 rounded-full bg-gradient-to-r from-white/5 via-pulse/40 to-pulse" />
                  <span>高</span>
                </div>
              </div>
            )}
          </Card>
        </div>
        <Card title="情景概览">
          {scenariosData.items.length === 0 ? (
            <EmptyState title="暂无情景" description="下一轮数据入库后将呈现情景简报。" />
          ) : (
            <div className="space-y-4">
              {scenariosData.items.map((scenario: any) => (
                <div key={scenario.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white">{scenario.name}</p>
                  <p className="text-xs text-fog/60 mt-2">{scenario.description}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-fog/50 mt-3">驱动因素</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {scenario.drivers.map((driver: string) => (
                      <span key={driver} className="rounded-full bg-white/10 px-3 py-1 text-xs text-fog/70">
                        {driver}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
