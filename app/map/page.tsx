import { cases } from "../../data/cases";
import MapView from "./MapView";

export default function MapPage() {
  const casesWithCoords = cases.filter((c) => c.coordinates);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Case Map</h1>
      <p className="text-zinc-400 mb-8">
        {casesWithCoords.length} cases with known coordinates plotted on the
        world map. Zoom in to explore individual cases. Click a marker for
        details.
      </p>
      <MapView cases={cases} />
    </div>
  );
}
