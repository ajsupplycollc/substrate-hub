import Link from "next/link";
import { notFound } from "next/navigation";
import { figures } from "../../../data/figures";
import { cases } from "../../../data/cases";
import { evidence } from "../../../data/evidence";
import { CATEGORY_META, CREDIBILITY_META } from "../../../data/types";

export function generateStaticParams() {
  return figures.map((f) => ({ slug: f.slug }));
}

export default async function FigureDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const figure = figures.find((f) => f.slug === slug);
  if (!figure) return notFound();

  const linkedCases = cases.filter((c) =>
    c.keyFigureIds.includes(figure.id)
  );
  const linkedEvidence = evidence.filter((e) =>
    e.keyFigureIds.includes(figure.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/figures"
        className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block"
      >
        Back to Figures
      </Link>

      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-zinc-500">
          {figure.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{figure.name}</h1>
          <p className="text-zinc-400 mt-1">{figure.role}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {figure.categories.map((cat) => (
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
        </div>
      </div>

      <p className="text-zinc-300 leading-relaxed mb-8">{figure.bio}</p>

      {figure.credentials.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Credentials</h2>
          <ul className="space-y-2">
            {figure.credentials.map((cred, i) => (
              <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">-</span>
                {cred}
              </li>
            ))}
          </ul>
        </section>
      )}

      {Object.entries(figure.links).filter(([, v]) => v).length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Links</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(figure.links)
              .filter(([, v]) => v)
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors capitalize text-emerald-400"
                >
                  {platform}
                </a>
              ))}
          </div>
        </section>
      )}

      {linkedCases.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Connected Cases</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {linkedCases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-1">
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
                </div>
                <div className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                  {c.name}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {c.date} — {c.location}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {linkedEvidence.length > 0 && (
        <section>
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
                <h3 className="font-semibold mb-2">{e.title}</h3>
                <p className="text-sm text-zinc-400">{e.description}</p>
                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 mt-2 inline-block"
                  >
                    View source
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
