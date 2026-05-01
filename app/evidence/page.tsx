import { evidence } from "../../data/evidence";
import { cases } from "../../data/cases";
import type { Category } from "../../data/types";
import { CATEGORY_META, CREDIBILITY_META } from "../../data/types";

export default function EvidencePage() {
  const evidenceWithCategories = evidence.map((e) => {
    const linkedCase = e.caseIds[0]
      ? cases.find((c) => c.id === e.caseIds[0])
      : null;
    const primaryCategory: Category = linkedCase?.categories[0] ?? "historical";
    return { ...e, primaryCategory };
  });

  const byCategory = new Map<Category, typeof evidenceWithCategories>();
  for (const cat of Object.keys(CATEGORY_META) as Category[]) {
    byCategory.set(cat, []);
  }
  for (const e of evidenceWithCategories) {
    if (byCategory.has(e.primaryCategory)) {
      byCategory.get(e.primaryCategory)!.push(e);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Evidence Vault</h1>
      <p className="text-zinc-400 mb-8">
        {evidence.length} evidence items — videos, documents, testimony, and
        sensor data organized by research domain.
      </p>

      <div className="space-y-10">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
          const catEvidence = byCategory.get(cat) ?? [];
          if (catEvidence.length === 0) return null;
          const meta = CATEGORY_META[cat];

          return (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <h2 className="text-lg font-bold" style={{ color: meta.color }}>
                  {meta.label}
                </h2>
                <span className="text-sm text-zinc-500">
                  ({catEvidence.length})
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {catEvidence.map((e) => (
                  <div
                    key={e.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                  >
                    {e.embedUrl && (
                      <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                        <iframe
                          src={e.embedUrl}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    )}
                    {e.imageUrl && !e.images && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img src={e.imageUrl} alt={e.title} className="w-full rounded-lg" />
                      </div>
                    )}
                    {e.images && e.images.length > 0 && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <img src={e.images[0]} alt={e.title} className="w-full rounded-lg" />
                        {e.images.length > 1 && (
                          <div className="text-[10px] text-zinc-500 mt-1">{e.images.length} images</div>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 uppercase font-medium">
                        {e.type}
                      </span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor:
                            CREDIBILITY_META[e.credibility].color + "20",
                          color: CREDIBILITY_META[e.credibility].color,
                        }}
                      >
                        {CREDIBILITY_META[e.credibility].label}
                      </span>
                      {e.date && (
                        <span className="text-[10px] text-zinc-500">{e.date}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{e.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {e.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-zinc-500">
                        {e.source}
                      </span>
                      {e.url && (
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 hover:text-emerald-300"
                        >
                          View source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
