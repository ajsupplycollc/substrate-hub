import { cases } from "../../data/cases";
import GraphView from "./GraphView";

export default function GraphPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      <GraphView cases={cases} />
    </div>
  );
}
