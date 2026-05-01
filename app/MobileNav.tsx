"use client";

import { useState } from "react";
import NavLink from "./NavLink";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 z-50">
          <nav
            className="flex flex-col px-4 py-3 gap-1"
            onClick={() => setOpen(false)}
          >
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/start" highlight>Start Here</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/cases">Cases</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/graph">Graph</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/figures">Key Figures</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/evidence">Evidence</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/documents">Documents</NavLink>
            </div>
            <div className="py-2.5 border-b border-zinc-800/50">
              <NavLink href="/timeline">Timeline</NavLink>
            </div>
            <div className="py-2.5">
              <NavLink href="/map">Map</NavLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
