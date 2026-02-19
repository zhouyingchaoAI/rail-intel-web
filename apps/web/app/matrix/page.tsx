import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import { getMatrix, getScenarios } from "../../lib/api";

export default async function MatrixPage() {
  const matrix = await getMatrix();
  const scenariosData = await getScenarios();

  return (
    <div className="space-y-8">
      <Topbar />
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" title="Scenario Diagnosis Matrix">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-fog/60">
                <tr>
                  <th className="text-left pb-2 pr-4">Scenario</th>
                  {matrix.columns.map((col: string) => (
                    <th key={col} className="pb-2 pr-4 text-left">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-fog/80">
                {matrix.rows.map((row: string, rowIndex: number) => (
                  <tr key={row} className="border-t border-white/5">
                    <td className="py-3 pr-4 text-white">{row}</td>
                    {matrix.cells[rowIndex].map((cell: number, cellIndex: number) => (
                      <td key={`${row}-${cellIndex}`} className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 w-24 rounded-full bg-white/10"
                          >
                            <div
                              className="h-2 rounded-full bg-pulse"
                              style={{ width: `${cell}%` }}
                            />
                          </div>
                          <span>{cell}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Scenario Briefs">
          <div className="space-y-4">
            {scenariosData.items.map((scenario: any) => (
              <div key={scenario.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white">{scenario.name}</p>
                <p className="text-xs text-fog/60 mt-2">{scenario.description}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-fog/50 mt-3">Drivers</p>
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
        </Card>
      </section>
    </div>
  );
}
