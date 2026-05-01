"use client";

import { useEffect, useRef, useState } from "react";
import type { Case } from "../../data/types";
import { CATEGORY_META, CREDIBILITY_META } from "../../data/types";

interface Region {
  name: string;
  lat: number;
  lng: number;
  cases: Case[];
}

const REGIONS: { name: string; bounds: { latMin: number; latMax: number; lngMin: number; lngMax: number } }[] = [
  { name: "North America", bounds: { latMin: 15, latMax: 72, lngMin: -170, lngMax: -50 } },
  { name: "Central & South America", bounds: { latMin: -56, latMax: 15, lngMin: -120, lngMax: -30 } },
  { name: "Europe", bounds: { latMin: 35, latMax: 72, lngMin: -12, lngMax: 40 } },
  { name: "Middle East & North Africa", bounds: { latMin: 15, latMax: 42, lngMin: -12, lngMax: 65 } },
  { name: "Sub-Saharan Africa", bounds: { latMin: -35, latMax: 15, lngMin: -20, lngMax: 52 } },
  { name: "Central & South Asia", bounds: { latMin: 5, latMax: 55, lngMin: 40, lngMax: 100 } },
  { name: "East Asia & Pacific", bounds: { latMin: -50, latMax: 55, lngMin: 100, lngMax: 180 } },
];

function assignRegion(lat: number, lng: number): string {
  for (const r of REGIONS) {
    const b = r.bounds;
    if (lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax) {
      return r.name;
    }
  }
  return "Other";
}

export default function MapView({ cases }: { cases: Case[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const casesWithCoords = cases.filter((c) => c.coordinates);

  const regions: Region[] = [];
  const regionMap = new Map<string, Case[]>();
  for (const c of casesWithCoords) {
    const name = assignRegion(c.coordinates!.lat, c.coordinates!.lng);
    if (!regionMap.has(name)) regionMap.set(name, []);
    regionMap.get(name)!.push(c);
  }
  for (const [name, regionCases] of regionMap) {
    const avgLat = regionCases.reduce((s, c) => s + c.coordinates!.lat, 0) / regionCases.length;
    const avgLng = regionCases.reduce((s, c) => s + c.coordinates!.lng, 0) / regionCases.length;
    regions.push({ name, lat: avgLat, lng: avgLng, cases: regionCases });
  }
  regions.sort((a, b) => b.cases.length - a.cases.length);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      for (const c of casesWithCoords) {
        const color = CREDIBILITY_META[c.credibility].color;
        const catColor = CATEGORY_META[c.categories[0]]?.color ?? "#71717a";

        const marker = L.circleMarker([c.coordinates!.lat, c.coordinates!.lng], {
          radius: 6,
          fillColor: catColor,
          color: color,
          weight: 1.5,
          opacity: 0.8,
          fillOpacity: 0.6,
        }).addTo(map);

        marker.bindTooltip(c.name, {
          permanent: false,
          direction: "top",
          offset: [0, -8],
          className: "substrate-tooltip",
        });

        marker.bindPopup(
          `<div style="font-family:system-ui;min-width:200px">
            <div style="font-weight:600;margin-bottom:4px">${c.name}</div>
            <div style="font-size:11px;color:#a1a1aa;margin-bottom:6px">${c.location} · ${c.date}</div>
            <div style="font-size:12px;color:#d4d4d8;margin-bottom:8px">${c.summary.slice(0, 150)}${c.summary.length > 150 ? "..." : ""}</div>
            <a href="/cases/${c.slug}" style="font-size:12px;color:#34d399">View case</a>
          </div>`,
          { maxWidth: 300 }
        );
      }

      leafletMapRef.current = map;
      setMapReady(true);
    }

    initMap();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        className="w-full rounded-xl overflow-hidden border border-zinc-800"
        style={{ height: "500px" }}
      />

      <div className="flex flex-wrap gap-3 mt-6 mb-6">
        {Object.entries(CATEGORY_META).map(([key, meta]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
            <span className="text-xs text-zinc-500">{meta.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Cases by Region</h2>
      <div className="space-y-4">
        {regions.map((region) => (
          <section key={region.name}>
            <button
              onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
              className="w-full flex items-center gap-3 py-2 text-left"
            >
              <h3 className="text-base font-semibold text-zinc-200 flex-1">
                {region.name}
              </h3>
              <span className="text-sm text-zinc-500">
                {region.cases.length} case{region.cases.length !== 1 ? "s" : ""}
              </span>
              <svg
                className={`w-4 h-4 text-zinc-500 transition-transform ${selectedRegion === region.name ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {selectedRegion === region.name && (
              <div className="grid md:grid-cols-2 gap-2 mt-2 mb-4">
                {region.cases.map((c) => (
                  <a
                    key={c.id}
                    href={`/cases/${c.slug}`}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 hover:border-zinc-600 transition-colors group"
                  >
                    <div className="font-medium text-sm group-hover:text-emerald-400 transition-colors">
                      {c.name}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {c.location} · {c.date}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
