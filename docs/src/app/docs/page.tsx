import Link from "next/link";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import {
  ArrowRight, BookOpen, Layers, Server, Database,
  Zap, Home, Calendar, Star, Users, Code, Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Overview",
  description: "Overview of the Airbnb Clone full-stack application — Next.js, FastAPI, SQLAlchemy, SQLite.",
};

const QUICK_LINKS = [
  { href: "/docs/features", icon: Zap, label: "Features", desc: "All app features listed" },
  { href: "/docs/architecture", icon: Layers, label: "Architecture", desc: "System & request lifecycle" },
  { href: "/docs/api", icon: Server, label: "API Reference", desc: "All 25+ REST endpoints" },
  { href: "/docs/local-setup", icon: Code, label: "Local Setup", desc: "Run it in 5 minutes" },
  { href: "/docs/database", icon: Database, label: "Database", desc: "Schema & ER diagrams" },
  { href: "/docs/deployment", icon: Globe, label: "Deployment", desc: "Vercel + Render guide" },
];

export default function OverviewPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Overview" }]} />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <BookOpen className="h-3.5 w-3.5" />
          Getting Started
        </div>
        <h1 className="!mb-3">Overview</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The Airbnb Web App Clone is a full-stack assignment project that replicates Airbnb&apos;s
          core features — from listing discovery to end-to-end booking — built with modern production-grade tools.
        </p>
      </div>

      {/* Live links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 not-prose">
        <a
          href="https://airbnb-clone-one-coral.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-white/[0.1]">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-200">Frontend (Vercel)</div>
            <div className="text-xs text-zinc-500">airbnb-clone-one-coral.vercel.app</div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 ml-auto transition-colors" />
        </a>
        <a
          href="https://airbnb-clone-backend-96hk.onrender.com/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Server className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-200">Backend API (Render)</div>
            <div className="text-xs text-zinc-500">FastAPI auto-generated docs</div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 ml-auto transition-colors" />
        </a>
      </div>

      <h2>What is this project?</h2>
      <p>
        This is a pixel-perfect, full-stack clone of Airbnb built as an SDE Full Stack Engineering Assignment.
        It replicates Airbnb&apos;s modern UI, booking workflow, host dashboard, and listing management — not as
        a toy project, but as a production-quality codebase with real database operations, REST APIs, and
        deployment to cloud platforms.
      </p>

      <h2>Core Capabilities</h2>
      <ul>
        <li><strong>Listing Discovery</strong> — Browse 100+ seeded listings with category filters, full-text search, price range filtering, and an interactive Leaflet map.</li>
        <li><strong>Booking Engine</strong> — Date-range picker with overlap detection, guest count validation, real-time price calculation, and checkout modal.</li>
        <li><strong>Host Dashboard</strong> — Full CRUD for listings with create/edit/delete flows, revenue metrics, and incoming reservation management.</li>
        <li><strong>Reviews System</strong> — 6-dimension rating breakdown (cleanliness, accuracy, communication, location, check-in, value) with submission modals.</li>
        <li><strong>Wishlist</strong> — Heart-toggle wishlist per listing, persisted to the database.</li>
        <li><strong>Trips Dashboard</strong> — View all past and upcoming reservations, cancel bookings.</li>
      </ul>

      <h2>Technology Choices</h2>
      <div className="not-prose overflow-x-auto">
        <table className="doc-prose w-full">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Frontend Framework</td><td>Next.js 14 (App Router)</td><td>Server components, file-based routing, Vercel-optimized</td></tr>
            <tr><td>Language</td><td>TypeScript</td><td>Type safety across the full frontend codebase</td></tr>
            <tr><td>Styling</td><td>TailwindCSS</td><td>Utility-first, design system consistency</td></tr>
            <tr><td>Mapping</td><td>React-Leaflet</td><td>Open-source, highly customizable map tiles</td></tr>
            <tr><td>Backend</td><td>FastAPI (Python)</td><td>Auto OpenAPI docs, async support, Pydantic validation</td></tr>
            <tr><td>ORM</td><td>SQLAlchemy</td><td>Powerful relationship management, migrations support</td></tr>
            <tr><td>Database</td><td>SQLite</td><td>Zero-config, file-based, sufficient for assignment scale</td></tr>
            <tr><td>Validation</td><td>Pydantic v2</td><td>Fast, modern Python schema validation</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Quick Navigation</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-rose-500/30 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-rose-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{link.label}</div>
                <div className="text-xs text-zinc-600">{link.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
