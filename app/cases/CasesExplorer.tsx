"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Case, Category } from "../../data/types";
import { CATEGORY_META, CREDIBILITY_META } from "../../data/types";

const CATEGORY_INTROS: Record<Category, string> = {
  geological: "Piezoelectric geology, acoustic resonance, and site alignment patterns across ancient construction sites worldwide.",
  historical: "Documented phenomena across centuries of recorded history — mass sightings, artifacts, and persistent patterns.",
  scientific: "Peer-reviewed research, laboratory findings, and measured anomalies that challenge conventional models.",
  consciousness: "Consciousness research, remote viewing, the mind-matter interface, and the biological hardware that enables it.",
  religious: "Ancient texts, religious institutions, and theological traditions encoding the same technical framework.",
  government: "Official programs, policies, and institutional responses to the phenomenon.",
  military: "Military encounters, intelligence programs, and classified defense initiatives.",
  whistleblower: "Insiders who came forward with testimony about programs hidden from public oversight.",
  crash_retrieval: "Alleged craft recoveries, material analysis, and reverse-engineering programs.",
  nuclear: "The persistent connection between nuclear facilities and anomalous phenomena.",
  testimony: "Sworn testimony before Congress and formal oversight proceedings.",
  legislation: "Laws, amendments, and legal frameworks created to address disclosure.",
  international: "Programs, encounters, and investigations documented by governments worldwide.",
  suppression: "Systematic suppression of research, seized patents, and suspicious deaths of investigators.",
};

export default function CasesExplorer({ cases }: { cases: Case[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set());

  const casesByCategory = useMemo(() => {
    const map = new Map<Category, Case[]>();
    for (const cat of Object.keys(CATEGORY_META) as Category[]) {
      map.set(cat, []);
    }
    for (const c of cases) {
      const primary = c.categories[0];
      if (primary && map.has(primary)) {
        map.get(primary)!.push(c);
      }
    }
    return map;
  }, [cases]);

  const q = searchQuery.toLowerCase();
  const isSearching = q.length > 0;

  const filteredCases = useMemo(() => {
    if (!isSearching) return null;
    return cases.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.location.toLowerCase().includes(q)
    );
  }, [cases, q, isSearching]);

  function toggleCategory(cat: Category) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <div>
      <div className="sticky top-16 z-20 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 -mx-4 px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by name, topic, tag, or location..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
          {isSearching && (
            <span className="text-sm text-zinc-400 shrink-0">
              {filteredCases!.length} result{filteredCases!.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {isSearching ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases!.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
          {filteredCases!.length === 0 && (
            <p className="text-zinc-500 col-span-full text-center py-12">
              No cases match your search.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
            const catCases = casesByCategory.get(cat) ?? [];
            if (catCases.length === 0) return null;
            const meta = CATEGORY_META[cat];
            const isExpanded = expandedCategories.has(cat);

            return (
              <section key={cat}>
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center gap-3 py-3 group text-left"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: meta.color }}
                  />
                  <h2 className="text-lg font-bold flex-1" style={{ color: meta.color }}>
                    {meta.label}
                  </h2>
                  <span className="text-sm text-zinc-500">
                    {catCases.length} case{catCases.length !== 1 ? "s" : ""}
                  </span>
                  <svg
                    className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p className="text-sm text-zinc-500 mb-4 pl-6">
                  {CATEGORY_INTROS[cat]}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(isExpanded ? catCases : catCases.slice(0, 3)).map((c) => (
                    <CaseCard key={c.id} c={c} />
                  ))}
                </div>
                {catCases.length > 3 && !isExpanded && (
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="mt-3 text-sm px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors"
                    style={{ color: meta.color }}
                  >
                    Show {catCases.length - 3} more case{catCases.length - 3 !== 1 ? "s" : ""}
                  </button>
                )}
                {isExpanded && catCases.length > 3 && (
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="mt-3 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Show less
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <Link
      href={`/cases/${c.slug}`}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: CREDIBILITY_META[c.credibility].color + "20",
            color: CREDIBILITY_META[c.credibility].color,
          }}
        >
          {CREDIBILITY_META[c.credibility].label}
        </span>
        <span className="text-xs text-zinc-500">{c.date}</span>
        {c.relatedCaseIds && c.relatedCaseIds.length > 0 && (
          <span className="text-xs text-zinc-600 ml-auto">
            {c.relatedCaseIds.length} links
          </span>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-1.5 group-hover:text-emerald-400 transition-colors">
        {c.name}
      </h3>
      <p className="text-xs text-zinc-400 line-clamp-2">{c.summary}</p>
    </Link>
  );
}
