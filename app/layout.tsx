import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cases } from "../data/cases";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Substrate — Mapping a Planetary Technology Lifecycle",
  description: `${cases.length} interconnected cases mapping the construction, operation, degradation, suppression, and rediscovery of a planetary acoustic-electromagnetic network. Cross-reference ancient sites, consciousness research, piezoelectric geology, suppression architecture, and convergent evidence across every domain.`,
  metadataBase: new URL("https://substrate-hub.vercel.app"),
  openGraph: {
    title: "The Substrate",
    description: `${cases.length} cases mapping a planetary consciousness technology lifecycle — ancient sites, suppression architecture, crash retrievals, consciousness research, and convergent evidence across every domain.`,
    siteName: "The Substrate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Substrate",
    description: `${cases.length} cases mapping a planetary consciousness technology lifecycle through convergent evidence.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold tracking-tight leading-tight">
                    The Substrate
                  </span>
                  <span className="text-[10px] text-zinc-500 leading-tight hidden sm:block">
                    Mapping a planetary consciousness technology lifecycle
                  </span>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <NavLink href="/start" highlight>Start Here</NavLink>
                <NavLink href="/cases">Cases</NavLink>
                <NavLink href="/graph">Graph</NavLink>
                <NavLink href="/figures">Key Figures</NavLink>
                <NavLink href="/evidence">Evidence</NavLink>
                <NavLink href="/documents">Documents</NavLink>
                <NavLink href="/timeline">Timeline</NavLink>
                <NavLink href="/map">Map</NavLink>
                <NavLink href="/grid">Grid</NavLink>
              </nav>
              <MobileNav />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500">
            The Substrate — Mapping a planetary consciousness technology lifecycle through
            convergent evidence. {cases.length} cases across archaeology, physics,
            consciousness, geology, ancient texts, and suppression architecture.
          </div>
        </footer>
      </body>
    </html>
  );
}
