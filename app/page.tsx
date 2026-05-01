import Link from "next/link";
import { cases } from "../data/cases";
import { figures } from "../data/figures";
import { evidence } from "../data/evidence";
import { documents } from "../data/documents";
import { CATEGORY_META, CREDIBILITY_META } from "../data/types";

const FEATURED_CASE_IDS = [
  "case-ancient-sites-piezoelectric",
  "case-giza-pyramid-decode",
  "case-cymatics-frequency",
  "case-the-receiver",
  "case-gateway-process",
  "case-emerald-tablet-hermetic-substrate",
  "case-suppression-architecture",
  "case-nimitz-tictac",
  "case-sacred-geometry-pattern",
  "case-grand-unified-layer-model",
  "case-110hz-unified-theory",
  "case-buga-sphere-origin-decode",
];

const EXPLORE_PATHS = [
  {
    title: "The Ancient Network",
    description:
      "Ancient sites worldwide share piezoelectric geology, acoustic resonance, and geometric alignment. Coincidence doesn't scale to 500+ sites.",
    color: "#b45309",
    href: "/start#ancient-network",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
  },
  {
    title: "Consciousness & The Receiver",
    description:
      "Ancient texts and modern research converge: human consciousness interfaces with an electromagnetic field through specific biological hardware.",
    color: "#06b6d4",
    href: "/start#consciousness",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Ancient Texts Decoded",
    description:
      "Every major religious text encodes the same framework. Not metaphor — engineering documentation preserved as mythology.",
    color: "#a855f7",
    href: "/start#texts",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Suppression Architecture",
    description:
      "The systematic removal of consciousness technology from public access. Who suppressed it, how, and why it matters now.",
    color: "#f43f5e",
    href: "/start#suppression",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    title: "Government & Military",
    description:
      "Official programs, confirmed encounters, and declassified documents the governments have already acknowledged.",
    color: "#1e40af",
    href: "/start#government",
    icon: "M3 21V7a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 01-2-2z",
  },
];

export default function Home() {
  const featuredCases = FEATURED_CASE_IDS
    .map((id) => cases.find((c) => c.id === id))
    .filter(Boolean) as typeof cases;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The Substrate
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-4">
          Mapping a planetary consciousness technology lifecycle. Construction, operation,
          degradation, suppression, rediscovery. {cases.length} cases. Every
          connection mapped. Every convergence tracked.
        </p>
        <p className="text-sm text-zinc-500 max-w-xl mx-auto mb-8">
          This hub maps a single thesis across geology, archaeology, physics,
          ancient texts, consciousness research, and government documents —
          building a web of connections no single discipline could reveal alone.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/start"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
          >
            Start Here
          </Link>
          <Link
            href="/cases"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
          >
            Explore All Cases
          </Link>
          <Link
            href="/graph"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
          >
            Connection Graph
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400">
            {cases.length}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Cases Tracked</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {figures.length}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Key Figures</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-amber-400">
            {evidence.length + documents.length}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Evidence & Documents</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {cases.reduce(
              (acc, c) => acc + (c.relatedCaseIds?.length ?? 0),
              0
            )}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Cross-References</div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Choose Your Entry Point</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Pick a thread based on what interests you. Each path walks you through
          curated cases that build on each other.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPLORE_PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: path.color + "20" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke={path.color}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={path.icon}
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold group-hover:opacity-80 transition-opacity"
                  style={{ color: path.color }}
                >
                  {path.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-400">{path.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Cases</h2>
          <Link
            href="/cases"
            className="text-sm text-emerald-400 hover:text-emerald-300"
          >
            View all {cases.length} cases
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor:
                      CREDIBILITY_META[c.credibility].color + "20",
                    color: CREDIBILITY_META[c.credibility].color,
                  }}
                >
                  {CREDIBILITY_META[c.credibility].label}
                </span>
                {c.relatedCaseIds && c.relatedCaseIds.length > 0 && (
                  <span className="text-xs text-zinc-500">
                    {c.relatedCaseIds.length} connections
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                {c.name}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-3">{c.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {c.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
                  >
                    {CATEGORY_META[cat].label}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Key Figures</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {figures.slice(0, 12).map((f) => (
            <Link
              key={f.id}
              href={`/figures/${f.slug}`}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 mb-3 flex items-center justify-center text-lg font-bold text-zinc-500">
                {f.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                {f.name}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">{f.role}</p>
            </Link>
          ))}
        </div>
        {figures.length > 12 && (
          <div className="text-center mt-6">
            <Link
              href="/figures"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              View all {figures.length} figures
            </Link>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const count = cases.filter((c) =>
              c.categories.includes(key as never)
            ).length;
            return (
              <Link
                key={key}
                href={`/cases?category=${key}`}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors"
              >
                <div
                  className="text-sm font-medium"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {count} case{count !== 1 ? "s" : ""}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
