"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Case, Category } from "../../data/types";
import { CATEGORY_META } from "../../data/types";

interface CategoryNode {
  category: Category;
  label: string;
  color: string;
  count: number;
  x: number;
  y: number;
}

interface CategoryLink {
  source: Category;
  target: Category;
  weight: number;
}

function buildCategoryGraph(cases: Case[], containerW: number, containerH: number) {
  const caseMap = new Map<string, Case>();
  for (const c of cases) caseMap.set(c.id, c);

  const counts = new Map<Category, number>();
  for (const c of cases) {
    const primary = c.categories[0];
    if (primary) counts.set(primary, (counts.get(primary) ?? 0) + 1);
  }

  const linkMap = new Map<string, number>();
  for (const c of cases) {
    const srcCat = c.categories[0];
    if (!srcCat) continue;
    for (const rid of c.relatedCaseIds ?? []) {
      const related = caseMap.get(rid);
      if (!related) continue;
      const tgtCat = related.categories[0];
      if (!tgtCat || tgtCat === srcCat) continue;
      const key = [srcCat, tgtCat].sort().join("|");
      linkMap.set(key, (linkMap.get(key) ?? 0) + 1);
    }
  }

  const categories = Object.keys(CATEGORY_META) as Category[];
  const activeCategories = categories.filter((c) => (counts.get(c) ?? 0) > 0);

  const cx = containerW / 2;
  const cy = containerH / 2;
  const rx = containerW * 0.4;
  const ry = containerH * 0.4;

  const nodes: CategoryNode[] = activeCategories.map((cat, i) => {
    const angle = (i / activeCategories.length) * Math.PI * 2 - Math.PI / 2;
    return {
      category: cat,
      label: CATEGORY_META[cat].label,
      color: CATEGORY_META[cat].color,
      count: counts.get(cat) ?? 0,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  });

  const links: CategoryLink[] = [];
  for (const [key, weight] of linkMap) {
    const [src, tgt] = key.split("|") as [Category, Category];
    links.push({ source: src, target: tgt, weight });
  }

  return { nodes, links, totalCases: cases.length, cx, cy };
}

export default function GraphView({ cases }: { cases: Case[] }) {
  const [hoveredNode, setHoveredNode] = useState<Category | null>(null);
  const [selectedNode, setSelectedNode] = useState<Category | null>(null);
  const [zoom, setZoom] = useState(1);
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 600 });
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgContainerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setContainerSize({ w: width, h: height });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const vbW = containerSize.w;
  const vbH = containerSize.h;

  const { nodes, links, totalCases, cx, cy } = useMemo(
    () => buildCategoryGraph(cases, vbW, vbH),
    [cases, vbW, vbH]
  );

  const nodeMap = useMemo(() => {
    const m = new Map<Category, CategoryNode>();
    for (const n of nodes) m.set(n.category, n);
    return m;
  }, [nodes]);

  const maxWeight = Math.max(...links.map((l) => l.weight), 1);
  const maxCount = Math.max(...nodes.map((n) => n.count), 1);

  const zoomedVB = useMemo(() => {
    const w = vbW / zoom;
    const h = vbH / zoom;
    const x = cx - w / 2;
    const y = cy - h / 2;
    return `${x} ${y} ${w} ${h}`;
  }, [vbW, vbH, zoom, cx, cy]);

  const connectedCategories = useMemo(() => {
    if (!hoveredNode && !selectedNode) return null;
    const active = selectedNode ?? hoveredNode;
    const connected = new Set<Category>();
    connected.add(active!);
    for (const l of links) {
      if (l.source === active) connected.add(l.target);
      if (l.target === active) connected.add(l.source);
    }
    return connected;
  }, [hoveredNode, selectedNode, links]);

  const selectedCases = useMemo(() => {
    if (!selectedNode) return [];
    return cases
      .filter((c) => c.categories[0] === selectedNode)
      .sort((a, b) => (b.relatedCaseIds?.length ?? 0) - (a.relatedCaseIds?.length ?? 0))
      .slice(0, 20);
  }, [selectedNode, cases]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      setZoom((z) => Math.min(3, Math.max(0.5, z + (e.deltaY < 0 ? 0.1 : -0.1))));
    }
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  const baseFontLabel = Math.max(14, Math.min(22, vbH * 0.03));
  const baseFontCount = baseFontLabel * 0.75;
  const baseNodeRadius = Math.max(20, Math.min(45, vbH * 0.05));

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          {nodes.length} domains · {links.length} cross-connections ·{" "}
          {totalCases} total cases
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
            className="w-8 h-8 flex items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 text-lg font-mono"
          >
            +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
            className="w-8 h-8 flex items-center justify-center rounded border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 text-lg font-mono"
          >
            -
          </button>
          <button
            onClick={() => setZoom(1)}
            className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1"
          >
            Reset
          </button>
          {selectedNode && (
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1 rounded border border-zinc-700 ml-2"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div
          ref={svgContainerRef}
          className={`${selectedNode ? "w-2/3" : "w-full"} relative transition-all`}
        >
          <svg
            ref={svgRef}
            viewBox={zoomedVB}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            style={{ background: "#09090b" }}
          >
            {links.map((l) => {
              const src = nodeMap.get(l.source);
              const tgt = nodeMap.get(l.target);
              if (!src || !tgt) return null;

              const isActive =
                !connectedCategories ||
                (connectedCategories.has(l.source) && connectedCategories.has(l.target));
              const thickness = 1 + (l.weight / maxWeight) * 6;

              const mx = (src.x + tgt.x) / 2;
              const my = (src.y + tgt.y) / 2;
              const qx = cx + (mx - cx) * 0.3;
              const qy = cy + (my - cy) * 0.3;

              return (
                <path
                  key={`${l.source}-${l.target}`}
                  d={`M ${src.x} ${src.y} Q ${qx} ${qy} ${tgt.x} ${tgt.y}`}
                  fill="none"
                  stroke={isActive ? "rgba(52, 211, 153, 0.25)" : "rgba(63, 63, 70, 0.08)"}
                  strokeWidth={isActive ? thickness : thickness * 0.3}
                />
              );
            })}

            {nodes.map((n) => {
              const isActive = !connectedCategories || connectedCategories.has(n.category);
              const isHovered = hoveredNode === n.category;
              const isSelected = selectedNode === n.category;
              const nodeRadius = baseNodeRadius + (n.count / maxCount) * baseNodeRadius * 0.8;

              return (
                <g
                  key={n.category}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(n.category)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() =>
                    setSelectedNode(selectedNode === n.category ? null : n.category)
                  }
                  opacity={isActive ? 1 : 0.15}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={nodeRadius + 4}
                    fill={n.color}
                    opacity={isHovered || isSelected ? 0.15 : 0}
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={nodeRadius}
                    fill={n.color + "30"}
                    stroke={isSelected ? n.color : n.color + "60"}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={n.x}
                    y={n.y - 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? "#f4f4f5" : "#52525b"}
                    fontSize={baseFontLabel}
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + baseFontLabel + 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? n.color : "#3f3f46"}
                    fontSize={baseFontCount}
                    fontFamily="system-ui, sans-serif"
                  >
                    {n.count} cases
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {selectedNode && (
          <div className="w-1/3 border-l border-zinc-800 overflow-y-auto bg-zinc-950 p-4">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: CATEGORY_META[selectedNode].color }}
              />
              <h3 className="font-bold" style={{ color: CATEGORY_META[selectedNode].color }}>
                {CATEGORY_META[selectedNode].label}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              Top cases by connections. Click to explore.
            </p>
            <div className="space-y-2">
              {selectedCases.map((c) => (
                <a
                  key={c.id}
                  href={`/cases/${c.slug}`}
                  className="block bg-zinc-900 border border-zinc-800 rounded-lg p-3 hover:border-zinc-600 transition-colors group"
                >
                  <div className="font-medium text-sm group-hover:text-emerald-400 transition-colors">
                    {c.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {c.date} · {c.relatedCaseIds?.length ?? 0} connections
                  </div>
                </a>
              ))}
            </div>
            <a
              href={`/cases?category=${selectedNode}`}
              className="block text-center text-sm text-emerald-400 hover:text-emerald-300 mt-4 py-2"
            >
              View all {CATEGORY_META[selectedNode].label} cases
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
