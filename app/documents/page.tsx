import { documents } from "../../data/documents";
import type { Category } from "../../data/types";
import { CATEGORY_META } from "../../data/types";

export default function DocumentsPage() {
  const docsByCategory = new Map<Category, typeof documents>();
  for (const cat of Object.keys(CATEGORY_META) as Category[]) {
    docsByCategory.set(cat, []);
  }
  for (const doc of documents) {
    const primary = doc.categories[0];
    if (primary && docsByCategory.has(primary)) {
      docsByCategory.get(primary)!.push(doc);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Documents & Archives</h1>
      <p className="text-zinc-400 mb-8">
        {documents.length} declassified documents, Vatican archives, and
        government reports organized by domain.
      </p>

      <div className="space-y-10">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
          const catDocs = docsByCategory.get(cat) ?? [];
          if (catDocs.length === 0) return null;
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
                  ({catDocs.length})
                </span>
              </div>
              <div className="space-y-3">
                {catDocs.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-zinc-500 font-mono">
                        {doc.date}
                      </span>
                      {doc.classification && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium">
                          {doc.classification}
                        </span>
                      )}
                      {doc.categories.slice(1, 3).map((subCat) => (
                        <span
                          key={subCat}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: CATEGORY_META[subCat].color + "15",
                            color: CATEGORY_META[subCat].color,
                          }}
                        >
                          {CATEGORY_META[subCat].label}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-2">{doc.summary}</p>
                    <div className="text-xs text-zinc-500">
                      Source: {doc.source}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
