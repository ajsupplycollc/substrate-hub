import Link from "next/link";
import { notFound } from "next/navigation";
import { cases } from "../../../data/cases";
import { figures } from "../../../data/figures";
import { evidence } from "../../../data/evidence";
import { CATEGORY_META, CREDIBILITY_META } from "../../../data/types";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = cases.find((c) => c.slug === slug);
  if (!caseData) return notFound();

  const linkedFigures = figures.filter((f) =>
    caseData.keyFigureIds.includes(f.id)
  );
  const linkedEvidence = evidence.filter((e) =>
    caseData.evidenceIds.includes(e.id)
  );
  const relatedCases = cases.filter((c) =>
    caseData.relatedCaseIds?.includes(c.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/cases"
        className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block"
      >
        Back to Cases
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            backgroundColor:
              CREDIBILITY_META[caseData.credibility].color + "20",
            color: CREDIBILITY_META[caseData.credibility].color,
          }}
        >
          {CREDIBILITY_META[caseData.credibility].label}
        </span>
        <span className="text-sm text-zinc-500">{caseData.date}</span>
        <span className="text-sm text-zinc-500">{caseData.location}</span>
      </div>

      <h1 className="text-3xl font-bold mb-4">{caseData.name}</h1>
      <p className="text-zinc-300 leading-relaxed mb-8">{caseData.summary}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {caseData.categories.map((cat) => (
          <span
            key={cat}
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              backgroundColor: CATEGORY_META[cat].color + "20",
              color: CATEGORY_META[cat].color,
            }}
          >
            {CATEGORY_META[cat].label}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {caseData.evidenceTypes.map((et) => (
          <span
            key={et}
            className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 uppercase font-medium"
          >
            {et}
          </span>
        ))}
      </div>

      {caseData.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {caseData.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {linkedFigures.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Key Figures</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {linkedFigures.map((f) => (
              <Link
                key={f.id}
                href={`/figures/${f.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors group"
              >
                <div className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                  {f.name}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{f.role}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {linkedEvidence.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Evidence</h2>
          <div className="space-y-4">
            {linkedEvidence.map((e) => (
              <div
                key={e.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >
                {e.embedUrl && (
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <iframe
                      src={e.embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}
                {e.imageUrl && !e.images && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img src={e.imageUrl} alt={e.title} className="w-full rounded-lg" />
                  </div>
                )}
                {e.images && e.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    {e.images.map((img, i) => (
                      <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                        <img src={img} alt={`${e.title} ${i + 1}`} className="w-full rounded-lg hover:opacity-80 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 uppercase font-medium">
                    {e.type}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor:
                        CREDIBILITY_META[e.credibility].color + "20",
                      color: CREDIBILITY_META[e.credibility].color,
                    }}
                  >
                    {CREDIBILITY_META[e.credibility].label}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{e.title}</h3>
                <p className="text-sm text-zinc-400">{e.description}</p>
                <div className="text-xs text-zinc-500 mt-3">
                  Source: {e.source}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedCases.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Related Cases</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {relatedCases.map((rc) => (
              <Link
                key={rc.id}
                href={`/cases/${rc.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors group"
              >
                <div className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                  {rc.name}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {rc.date} — {rc.location}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
