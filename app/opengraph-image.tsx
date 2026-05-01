import { ImageResponse } from "next/og";
import { cases } from "../data/cases";
import { evidence } from "../data/evidence";
import { documents } from "../data/documents";
import { figures } from "../data/figures";

export const runtime = "nodejs";
export const alt = "The Substrate — Mapping a Planetary Technology Lifecycle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const stats = [
    { n: String(cases.length), l: "Cases" },
    { n: String(evidence.length), l: "Evidence" },
    { n: String(documents.length), l: "Documents" },
    { n: String(figures.length), l: "Figures" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              border: "2px solid rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-2px",
            }}
          >
            The Substrate
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Mapping a planetary consciousness technology lifecycle through convergent evidence
          </div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.l}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "36px", fontWeight: 700, color: "#34d399" }}>
                  {s.n}
                </div>
                <div style={{ fontSize: "14px", color: "#71717a", textTransform: "uppercase", letterSpacing: "2px" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
