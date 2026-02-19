import Topbar from "../../components/Topbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionHeader from "../../components/SectionHeader";
import CompareCities from "../../components/CompareCities";
import { getCities } from "../../lib/api";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const citiesData = await getCities();

  return (
    <div className="space-y-8">
      <Topbar />
      <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "城市对比" }]} />

      <section className="space-y-4">
        <SectionHeader title="城市对比" subtitle="多维对照" />
        <CompareCities cities={citiesData.items} />
      </section>
    </div>
  );
}
