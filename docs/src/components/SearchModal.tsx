"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, Hash, BookOpen, Code, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

const SEARCH_INDEX = [
  { title: "Overview", href: "/docs", section: "Getting Started", description: "Project overview and quick start guide" },
  { title: "Features", href: "/docs/features", section: "Getting Started", description: "All features including search, booking, host dashboard" },
  { title: "Architecture", href: "/docs/architecture", section: "Getting Started", description: "System architecture, request lifecycle, components" },
  { title: "Tech Stack", href: "/docs/tech-stack", section: "Getting Started", description: "Next.js, FastAPI, SQLAlchemy, TailwindCSS, SQLite" },
  { title: "Frontend", href: "/docs/frontend", section: "Core Modules", description: "Next.js 14, TypeScript, TailwindCSS, React components" },
  { title: "Backend", href: "/docs/backend", section: "Core Modules", description: "FastAPI, Python, SQLAlchemy, Pydantic v2" },
  { title: "Database", href: "/docs/database", section: "Core Modules", description: "SQLite schema, ER diagrams, table relationships" },
  { title: "API Reference", href: "/docs/api", section: "Core Modules", description: "All REST endpoints: GET, POST, PUT, DELETE" },
  { title: "Booking Flow", href: "/docs/booking-flow", section: "Workflows", description: "Search → Listing → Book → Checkout → Trips" },
  { title: "Host Dashboard", href: "/docs/host-dashboard", section: "Workflows", description: "Revenue, reservations, listing CRUD management" },
  { title: "Local Setup", href: "/docs/local-setup", section: "Setup & Deployment", description: "Run backend and frontend locally" },
  { title: "Environment Variables", href: "/docs/environment-variables", section: "Setup & Deployment", description: "All required environment variables" },
  { title: "Folder Structure", href: "/docs/folder-structure", section: "Setup & Deployment", description: "Project directory tree explained" },
  { title: "Deployment", href: "/docs/deployment", section: "Setup & Deployment", description: "Vercel, Render, GitHub Pages deployment" },
  { title: "Troubleshooting", href: "/docs/troubleshooting", section: "Help", description: "Common errors, CORS issues, debug tips" },
  { title: "FAQ", href: "/docs/faq", section: "Help", description: "Frequently asked questions" },
  { title: "License", href: "/docs/license", section: "Help", description: "MIT License" },
  // Extra keyword entries
  { title: "npm install", href: "/docs/local-setup", section: "Setup", description: "Install frontend dependencies" },
  { title: "uvicorn", href: "/docs/local-setup", section: "Setup", description: "Run FastAPI backend server" },
  { title: "GET /api/listings", href: "/docs/api", section: "API", description: "Fetch all listings with filters" },
  { title: "POST /api/bookings", href: "/docs/api", section: "API", description: "Create a new booking" },
  { title: "SQLite", href: "/docs/database", section: "Database", description: "SQLite database setup and schema" },
  { title: "Vercel", href: "/docs/deployment", section: "Deployment", description: "Deploy frontend to Vercel" },
  { title: "Render", href: "/docs/deployment", section: "Deployment", description: "Deploy backend to Render" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 0
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.section.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : SEARCH_INDEX.slice(0, 6);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[560px] rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl shadow-black/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="py-2 max-h-[380px] overflow-y-auto">
          {query.trim() === "" && (
            <p className="px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
              Quick Links
            </p>
          )}
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm">
              No results for &quot;{query}&quot;
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.href + item.title}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <Hash className="h-3.5 w-3.5 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-500 shrink-0">
                      {item.section}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">{item.description}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.06] border border-white/[0.1]">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.06] border border-white/[0.1]">↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-white/[0.06] border border-white/[0.1]">esc</kbd> close</span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
