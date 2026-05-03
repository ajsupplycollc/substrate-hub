import { gridSites, gridConnections } from "../../data/grid-sites";
import GridMap from "./GridMap";

export default function GridPage() {
  const primaryNodes = gridSites.filter(
    (s) => s.type === "hub" || s.type === "primary-node"
  );
  const secondaryNodes = gridSites.filter((s) => s.type === "secondary");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Planetary Resonance Grid</h1>
      <p className="text-zinc-400 mb-3 max-w-3xl">
        {primaryNodes.length} primary nodes mapped to the 12 Tribes of Israel,
        plus {secondaryNodes.length} secondary satellites and{" "}
        {gridConnections.length} connections including the Great Circle geodetic
        alignment. Each tribe assigned as keeper of a resonance node in a
        planetary acoustic-electromagnetic network.
      </p>
      <p className="text-zinc-500 text-sm mb-8 max-w-3xl">
        The 12 primary nodes share piezoelectric geology, acoustic chamber
        design, underground infrastructure, astronomical alignment, or precision
        engineering beyond conventional explanation. Each is mapped to a Tribe
        of Israel based on the tribe&apos;s biblical characteristics and the
        node&apos;s role in the grid. Secondary nodes are satellites of the
        primary 12.
      </p>
      <GridMap />
    </div>
  );
}
