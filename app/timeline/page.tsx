"use client";

import Link from "next/link";
import { useState } from "react";
import { timeline } from "../../data/timeline";
import { figures } from "../../data/figures";
import { cases } from "../../data/cases";
import { CATEGORY_META } from "../../data/types";

const ERAS = [
  {
    id: "ancient",
    label: "Ancient World",
    range: "Pre-1000 CE",
    yearStart: -10000,
    yearEnd: 999,
    color: "#b45309",
    intro: "The earliest documented phenomena, ancient construction programs, and the original texts encoding a planetary technology framework.",
  },
  {
    id: "medieval",
    label: "Medieval to Enlightenment",
    range: "1000 - 1800",
    yearStart: 1000,
    yearEnd: 1799,
    color: "#a855f7",
    intro: "Celestial phenomena documented across Europe and Asia, the suppression of Hermetic knowledge, and the institutional consolidation of information control.",
  },
  {
    id: "industrial",
    label: "Industrial Age",
    range: "1800 - 1940",
    yearStart: 1800,
    yearEnd: 1939,
    color: "#854d0e",
    intro: "The airship wave, early scientific investigations, and the first government-level awareness of anomalous phenomena.",
  },
  {
    id: "postwar",
    label: "Post-WWII",
    range: "1940 - 1970",
    yearStart: 1940,
    yearEnd: 1969,
    color: "#dc2626",
    intro: "Roswell, the creation of classified programs, Project Blue Book, and the beginning of systematic government secrecy.",
  },
  {
    id: "coldwar",
    label: "Cold War to Pre-Disclosure",
    range: "1970 - 2000",
    yearStart: 1970,
    yearEnd: 1999,
    color: "#1e40af",
    intro: "Rendlesham, the Belgian wave, remote viewing programs, and the build-up of whistleblower testimony that would eventually break through.",
  },
  {
    id: "modern",
    label: "Modern Disclosure Era",
    range: "2000 - Present",
    yearStart: 2000,
    yearEnd: 2100,
    color: "#16a34a",
    intro: "The Pentagon videos, Congressional hearings, AATIP disclosure, and the unprecedented convergence of government acknowledgment with independent research.",
  },
];

export default function TimelinePage() {
  const [expandedEras, setExpandedEras] = useState<Set<string>>(new Set(["modern"]));

  const sorted = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const eventsByEra = new Map<string, typeof sorted>();
  for (const era of ERAS) {
    eventsByEra.set(era.id, []);
  }
  for (const event of sorted) {
    const year = new Date(event.date).getFullYear();
    const era = ERAS.find((e) => year >= e.yearStart && year <= e.yearEnd);
    if (era) eventsByEra.get(era.id)!.push(event);
  }

  function toggleEra(id: string) {
    setExpandedEras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Timeline</h1>
      <p className="text-zinc-400 mb-4">
        {timeline.length} events spanning{" "}
        {new Date(sorted[0].date).getFullYear()} to{" "}
        {new Date(sorted[sorted.length - 1].date).getFullYear()}.
      </p>
      <p className="text-sm text-zinc-500 mb-8">
        Organized by era. Expand a chapter to explore the events within it.
      </p>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="space-y-4">
          {ERAS.map((era) => {
            const events = eventsByEra.get(era.id) ?? [];
            if (events.length === 0) return null;
            const isExpanded = expandedEras.has(era.id);

            return (
              <section key={era.id} className="relative">
                <button
                  onClick={() => toggleEra(era.id)}
                  className="w-full relative pl-14 pr-4 py-4 flex items-center gap-3 text-left group"
                >
                  <div
                    className="absolute left-4 w-5 h-5 rounded-full border-2 border-zinc-950"
                    style={{ backgroundColor: era.color }}
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold" style={{ color: era.color }}>
                      {era.label}
                    </h2>
                    <span className="text-xs text-zinc-500">
                      {era.range} · {events.length} event{events.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-zinc-500 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="pl-14 pr-4 pb-4">
                  <p className="text-sm text-zinc-500 mb-4">{era.intro}</p>
                  <div className="space-y-3">
                    {(isExpanded ? events : events.slice(0, 3)).map((event) => {
                        const figure = event.keyFigureId
                          ? figures.find((f) => f.id === event.keyFigureId)
                          : null;
                        const caseData = event.caseId
                          ? cases.find((c) => c.id === event.caseId)
                          : null;

                        return (
                          <div
                            key={event.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-xs text-zinc-500 font-mono">
                                {event.date}
                              </span>
                              {event.categories.slice(0, 2).map((cat) => (
                                <span
                                  key={cat}
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: CATEGORY_META[cat].color + "15",
                                    color: CATEGORY_META[cat].color,
                                  }}
                                >
                                  {CATEGORY_META[cat].label}
                                </span>
                              ))}
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                            <p className="text-xs text-zinc-400">{event.summary}</p>
                            <div className="flex gap-3 mt-2">
                              {figure && (
                                <Link
                                  href={`/figures/${figure.slug}`}
                                  className="text-xs text-emerald-400 hover:text-emerald-300"
                                >
                                  {figure.name}
                                </Link>
                              )}
                              {caseData && (
                                <Link
                                  href={`/cases/${caseData.slug}`}
                                  className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                  View case
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {events.length > 3 && !isExpanded && (
                      <button
                        onClick={() => toggleEra(era.id)}
                        className="mt-3 text-sm px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors"
                        style={{ color: era.color }}
                      >
                        Show {events.length - 3} more event{events.length - 3 !== 1 ? "s" : ""}
                      </button>
                    )}
                    {isExpanded && events.length > 3 && (
                      <button
                        onClick={() => toggleEra(era.id)}
                        className="mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        Show less
                      </button>
                    )}
                  </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
