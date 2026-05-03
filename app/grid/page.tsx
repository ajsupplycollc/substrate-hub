import { gridSites, gridConnections } from "../../data/grid-sites";
import GridMap from "./GridMap";

export default function GridPage() {
  const hubs = gridSites.filter((s) => s.type === "hub").length;
  const majorNodes = gridSites.filter((s) => s.type === "major-node").length;
  const nodes = gridSites.filter((s) => s.type === "node").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Planetary Resonance Grid</h1>
      <p className="text-zinc-400 mb-3 max-w-3xl">
        {gridSites.length} ancient sites mapped as nodes in a planetary
        acoustic-electromagnetic network. {hubs} central hub, {majorNodes} major
        nodes, {nodes} nodes, and {gridConnections.length} connections including
        the Great Circle geodetic alignment.
      </p>
      <p className="text-zinc-500 text-sm mb-8 max-w-3xl">
        Each node shares one or more properties: piezoelectric geology, acoustic
        chamber design, underground infrastructure, astronomical alignment, or
        precision engineering beyond conventional explanation. The connections
        show geodetic alignments, geological corridors, and the Great Circle
        that links Giza, Angkor Wat, Easter Island, Nazca, and Teotihuacan
        within a narrow band around the Earth.
      </p>
      <GridMap />
    </div>
  );
}
