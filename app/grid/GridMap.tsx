"use client";

import { useEffect, useRef, useState } from "react";
import {
  gridSites,
  gridConnections,
  SITE_TYPE_META,
  CONNECTION_TYPE_META,
  type GridSite,
} from "../../data/grid-sites";

export default function GridMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<unknown>(null);
  const [selectedSite, setSelectedSite] = useState<GridSite | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 30],
        zoom: 3,
        minZoom: 2,
        maxZoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const siteMap = new Map<string, GridSite>();
      for (const site of gridSites) {
        siteMap.set(site.id, site);
      }

      for (const conn of gridConnections) {
        const fromSite = siteMap.get(conn.from);
        const toSite = siteMap.get(conn.to);
        if (!fromSite || !toSite) continue;

        const meta = CONNECTION_TYPE_META[conn.type];

        const latlngs: [number, number][] = [
          [fromSite.lat, fromSite.lng],
          [toSite.lat, toSite.lng],
        ];

        const polyline = L.polyline(latlngs, {
          color: meta.color,
          weight: conn.type === "nile-corridor" ? 3 : 1.5,
          opacity: conn.type === "great-circle" ? 0.6 : 0.35,
          dashArray: meta.dash || undefined,
        }).addTo(map);

        if (conn.label) {
          polyline.bindTooltip(conn.label, {
            permanent: false,
            direction: "center",
            className: "substrate-tooltip",
          });
        }
      }

      for (const site of gridSites) {
        const meta = SITE_TYPE_META[site.type];

        const marker = L.circleMarker([site.lat, site.lng], {
          radius: meta.radius,
          fillColor: meta.color,
          color: "#fff",
          weight: site.type === "hub" ? 2.5 : 1.5,
          opacity: 0.9,
          fillOpacity: 0.75,
        }).addTo(map);

        if (site.type === "hub") {
          L.circleMarker([site.lat, site.lng], {
            radius: meta.radius + 6,
            fillColor: "transparent",
            color: meta.color,
            weight: 1,
            opacity: 0.4,
            fillOpacity: 0,
          }).addTo(map);
        }

        marker.bindTooltip(site.name, {
          permanent: false,
          direction: "top",
          offset: [0, -meta.radius],
          className: "substrate-tooltip",
        });

        const propsHtml = site.properties
          .slice(0, 5)
          .map(
            (p) =>
              `<span style="display:inline-block;background:#27272a;border:1px solid #3f3f46;border-radius:4px;padding:1px 6px;margin:1px;font-size:10px;color:#a1a1aa">${p}</span>`
          )
          .join("");

        marker.bindPopup(
          `<div style="font-family:system-ui;min-width:240px;max-width:320px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
              <div style="width:8px;height:8px;border-radius:50%;background:${meta.color}"></div>
              <span style="font-size:10px;color:${meta.color};text-transform:uppercase;letter-spacing:0.5px">${meta.label}</span>
            </div>
            <div style="font-weight:600;font-size:14px;margin-bottom:6px">${site.name}</div>
            <div style="font-size:12px;color:#a1a1aa;margin-bottom:4px">${site.region}</div>
            <div style="margin-bottom:8px">${propsHtml}</div>
            <div style="font-size:12px;color:#d4d4d8;line-height:1.5">${site.description.slice(0, 250)}${site.description.length > 250 ? "..." : ""}</div>
          </div>`,
          { maxWidth: 340 }
        );

        marker.on("click", () => setSelectedSite(site));
      }

      leafletMapRef.current = map;
    }

    initMap();
    return () => {
      cancelled = true;
    };
  }, []);

  const groupedByRegion = new Map<string, GridSite[]>();
  for (const site of gridSites) {
    if (!groupedByRegion.has(site.region)) groupedByRegion.set(site.region, []);
    groupedByRegion.get(site.region)!.push(site);
  }

  return (
    <div>
      <div
        ref={mapRef}
        className="w-full rounded-xl overflow-hidden border border-zinc-800"
        style={{ height: "550px" }}
      />

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
        <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mr-2">
          Nodes
        </div>
        {Object.entries(SITE_TYPE_META).map(([key, meta]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{
                backgroundColor: meta.color,
                width: `${meta.radius * 1.5}px`,
                height: `${meta.radius * 1.5}px`,
              }}
            />
            <span className="text-xs text-zinc-400">{meta.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 mb-8">
        <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mr-2">
          Links
        </div>
        {Object.entries(CONNECTION_TYPE_META).map(([key, meta]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-6 h-0 border-t-2" style={{ borderColor: meta.color, borderStyle: meta.dash ? "dashed" : "solid" }} />
            <span className="text-xs text-zinc-400">{meta.label}</span>
          </div>
        ))}
      </div>

      {selectedSite && (
        <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SITE_TYPE_META[selectedSite.type].color }}
                />
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: SITE_TYPE_META[selectedSite.type].color }}
                >
                  {SITE_TYPE_META[selectedSite.type].label}
                </span>
              </div>
              <h3 className="text-xl font-bold">{selectedSite.name}</h3>
              <p className="text-sm text-zinc-500">{selectedSite.region}</p>
            </div>
            <button
              onClick={() => setSelectedSite(null)}
              className="text-zinc-500 hover:text-zinc-300 p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">
            {selectedSite.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {selectedSite.properties.map((p) => (
              <span
                key={p}
                className="text-xs bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedSite.substrateTags.map((t) => (
              <span
                key={t}
                className="text-xs bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 text-emerald-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Grid Nodes by Region</h2>
      <div className="space-y-6">
        {Array.from(groupedByRegion.entries()).map(([region, sites]) => (
          <section key={region}>
            <h3 className="text-base font-semibold text-zinc-300 mb-3 flex items-center gap-2">
              {region}
              <span className="text-xs text-zinc-600 font-normal">
                {sites.length} node{sites.length !== 1 ? "s" : ""}
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors text-left group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: SITE_TYPE_META[site.type].color }}
                    />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">
                      {SITE_TYPE_META[site.type].label}
                    </span>
                  </div>
                  <div className="font-medium text-sm group-hover:text-emerald-400 transition-colors">
                    {site.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {site.description.slice(0, 120)}...
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
