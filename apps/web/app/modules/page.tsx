import Topbar from "../../components/Topbar";
import Card from "../../components/Card";
import ChartPlaceholder from "../../components/ChartPlaceholder";
import { getModules } from "../../lib/api";
import Link from "next/link";

export default async function ModulesPage() {
  const modulesData = await getModules();

  return (
    <div className="space-y-8">
      <Topbar />
      <section className="grid gap-6 lg:grid-cols-2">
        {modulesData.items.map((module: any) => (
          <Card key={module.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-fog/60">Module</p>
                <h3 className="text-2xl font-semibold text-white mt-2">{module.name}</h3>
              </div>
              <Link href={`/modules/${module.id}`} className="text-sm text-pulse hover:text-white">
                View Detail →
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
              <ChartPlaceholder label="Module Score Trend" />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
