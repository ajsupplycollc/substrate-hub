import Link from "next/link";
import { cases } from "../../data/cases";
import { CATEGORY_META, CREDIBILITY_META } from "../../data/types";

const PATHS = [
  {
    title: "The Ancient Network",
    description:
      "Ancient civilizations built a planetary acoustic-electromagnetic network. The evidence is in the geology, the architecture, and the artifacts.",
    color: "#b45309",
    cases: [
      "case-ancient-sites-piezoelectric",
      "case-giza-pyramid-decode",
      "case-sacred-geometry-pattern",
      "case-gothic-cathedrals",
      "case-buga-sphere-origin-decode",
      "case-cymatics-frequency",
      "case-110hz-unified-theory",
      "case-megalithic-pattern",
      "case-ancient-convergence-matrix",
      "case-grand-unified-layer-model",
    ],
  },
  {
    title: "Consciousness & The Receiver",
    description:
      "Human consciousness interfaces with an electromagnetic field. Ancient texts, modern research, and first-person experience converge on the same operating principles.",
    color: "#06b6d4",
    cases: [
      "case-the-receiver",
      "case-consciousness-interface-decoded",
      "case-gateway-process",
      "case-stargate-program",
      "case-human-anatomy-network",
      "case-sensitive-receivers",
      "case-consciousness-frequency-map",
      "case-activation-protocols",
      "case-miramar-pineland-field-observation",
      "case-entheogenic-interface-map",
    ],
  },
  {
    title: "Ancient Texts Decoded",
    description:
      "Every major religious and philosophical text encodes the same framework. Not metaphor — engineering documentation preserved as mythology.",
    color: "#a855f7",
    cases: [
      "case-emerald-tablet-hermetic-substrate",
      "case-hermetic-suppression-convergent-rediscovery",
      "case-bible-substrate-decode",
      "case-upanishads-substrate",
      "case-quran-substrate-decode",
      "case-torah-substrate-decode",
      "case-egyptian-book-of-dead-substrate",
      "case-popol-vuh-substrate-decode",
      "case-anunnaki-substrate-decode",
      "case-bashar-substrate-decode",
    ],
  },
  {
    title: "Suppression Architecture",
    description:
      "The systematic removal of consciousness technology knowledge from public access. Who suppressed it, how, and why it matters now.",
    color: "#f43f5e",
    cases: [
      "case-suppression-architecture",
      "case-hermetic-suppression-convergent-rediscovery",
      "case-dual-suppression-consciousness",
      "case-temple-banking-suppression-pattern",
      "case-wilson-davis-memo",
      "case-financial-architecture",
      "case-congressional-finance-map",
      "case-mallove-murder",
      "case-energy-patent-seizure",
      "case-aatip-2017-disclosure",
    ],
  },
  {
    title: "Government & Military Evidence",
    description:
      "Official programs, confirmed encounters, and declassified documents. The evidence the governments have already acknowledged.",
    color: "#1e40af",
    cases: [
      "case-nimitz-tictac",
      "case-aatip-2017-disclosure",
      "case-2023-hearing",
      "case-rendlesham",
      "case-washington-dc-1952",
      "case-ariel-school",
      "case-blue-book-701-unknowns",
      "case-condign-report",
      "case-area51-s4",
      "case-pais-navy-patents",
    ],
  },
  {
    title: "The Full Connection Map",
    description:
      "See how all cases connect to each other. The bird's eye view of the entire network.",
    color: "#34d399",
    href: "/graph",
  },
];

export default function StartHerePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Start Here</h1>
      <div className="text-lg text-zinc-300 leading-relaxed space-y-4 mb-12">
        <p>
          This hub maps a single thesis across {cases.length} interconnected
          cases: that a planetary acoustic-electromagnetic network was
          constructed in antiquity, operated for millennia, degraded or was
          deliberately suppressed, and is now being independently rediscovered.
        </p>
        <p>
          The evidence comes from geology, archaeology, physics, ancient texts,
          consciousness research, government documents, and first-person field
          observations. Every case links to related cases, creating a web of
          connections that no single discipline could reveal alone.
        </p>
        <p className="text-zinc-400">
          Choose an entry point below based on what interests you. Each path
          walks you through a curated sequence of cases that build on each other.
          Or explore the full{" "}
          <Link href="/graph" className="text-emerald-400 hover:text-emerald-300 underline">
            connection graph
          </Link>{" "}
          to see the whole picture at once.
        </p>
      </div>

      <div className="space-y-6">
        {PATHS.map((path) => (
          <div
            key={path.title}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: path.color }}
              />
              <h2 className="text-xl font-bold">{path.title}</h2>
            </div>
            <p className="text-zinc-400 mb-4">{path.description}</p>
            {"href" in path && path.href ? (
              <Link
                href={path.href as string}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: path.color + "15",
                  color: path.color,
                  border: `1px solid ${path.color}40`,
                }}
              >
                Open Connection Graph
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            ) : (
              <div className="space-y-1.5">
                {(path.cases ?? []).map((caseId, i) => {
                  const c = cases.find((x) => x.id === caseId);
                  if (!c) return null;
                  return (
                    <Link
                      key={caseId}
                      href={`/cases/${c.slug}`}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-zinc-800/60 transition-colors group"
                    >
                      <span
                        className="text-xs font-mono w-6 text-center shrink-0"
                        style={{ color: path.color }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm group-hover:text-emerald-400 transition-colors flex-1">
                        {c.name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            CREDIBILITY_META[c.credibility].color + "20",
                          color: CREDIBILITY_META[c.credibility].color,
                        }}
                      >
                        {CREDIBILITY_META[c.credibility].label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-zinc-500">
        <p>
          Or browse all{" "}
          <Link
            href="/cases"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            {cases.length} cases
          </Link>{" "}
          with search and filters, explore the{" "}
          <Link
            href="/timeline"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            timeline
          </Link>
          , or view them on the{" "}
          <Link
            href="/map"
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            world map
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
