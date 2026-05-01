import Link from "next/link";
import { figures } from "../../data/figures";
import type { Category } from "../../data/types";
import { CATEGORY_META } from "../../data/types";

export default function FiguresPage() {
  const figuresByCategory = new Map<Category, typeof figures>();
  for (const cat of Object.keys(CATEGORY_META) as Category[]) {
    figuresByCategory.set(cat, []);
  }
  for (const f of figures) {
    const primary = f.categories[0];
    if (primary && figuresByCategory.has(primary)) {
      figuresByCategory.get(primary)!.push(f);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Key Figures</h1>
      <p className="text-zinc-400 mb-8">
        {figures.length} key figures across the research landscape, organized by
        their primary domain.
      </p>

      <div className="space-y-10">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
          const catFigures = figuresByCategory.get(cat) ?? [];
          if (catFigures.length === 0) return null;
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
                  ({catFigures.length})
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catFigures.map((f) => (
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
