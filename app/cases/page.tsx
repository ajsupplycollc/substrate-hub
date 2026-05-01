import { cases } from "../../data/cases";
import CasesExplorer from "./CasesExplorer";

export default function CasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Cases</h1>
      <p className="text-zinc-400 mb-8">
        {cases.length} documented cases mapping the Substrate — search, filter,
        and explore connections.
      </p>
      <CasesExplorer cases={cases} />
    </div>
  );
}
