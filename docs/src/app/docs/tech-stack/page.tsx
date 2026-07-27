import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "All technologies used in the Airbnb Clone — versions, rationale, and links.",
};

const TECHS = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js 14", version: "14.x", logo: "⚡", description: "React framework with App Router, server components, and file-based routing. Deployed to Vercel for zero-config CI/CD.", link: "https://nextjs.org", color: "zinc" },
      { name: "TypeScript", version: "5.x", logo: "TS", description: "Strongly-typed JavaScript. Provides compile-time safety for all component props, API response types, and utility functions.", link: "https://typescriptlang.org", color: "blue" },
      { name: "TailwindCSS", version: "3.x", logo: "🎨", description: "Utility-first CSS framework. Enables rapid styling with consistent design tokens and responsive breakpoints.", link: "https://tailwindcss.com", color: "cyan" },
      { name: "React-Leaflet", version: "4.x", logo: "🗺", description: "React wrapper for Leaflet.js. Powers the interactive property map with custom price-pin markers and listing popups.", link: "https://react-leaflet.js.org", color: "emerald" },
      { name: "React Hot Toast", version: "2.x", logo: "🔥", description: "Lightweight toast notification library. Used for booking confirmations, errors, and wishlist feedback.", link: "https://react-hot-toast.com", color: "amber" },
      { name: "Lucide React", version: "latest", logo: "✦", description: "Consistent, high-quality SVG icon library. Used for all icons across the application.", link: "https://lucide.dev", color: "purple" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI", version: "latest", logo: "🚀", description: "Modern Python web framework built on Starlette and Pydantic. Provides automatic OpenAPI/Swagger documentation and async support.", link: "https://fastapi.tiangolo.com", color: "emerald" },
      { name: "SQLAlchemy", version: "2.x", logo: "🗄", description: "Python ORM for database modeling and querying. Handles relationships, eager loading, and cascade operations.", link: "https://sqlalchemy.org", color: "red" },
      { name: "Pydantic v2", version: "v2", logo: "✅", description: "Data validation and serialization library. Validates all request bodies and serializes all API responses.", link: "https://docs.pydantic.dev", color: "rose" },
      { name: "Uvicorn", version: "latest", logo: "⚙️", description: "Lightning-fast ASGI server for running FastAPI. Supports hot reload in development.", link: "https://uvicorn.org", color: "zinc" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "SQLite", version: "built-in", logo: "💾", description: "Lightweight, file-based relational database. Zero configuration — the database is a single file (airbnb.db). Perfect for assignment-scale applications.", link: "https://sqlite.org", color: "amber" },
    ],
  },
  {
    category: "Deployment",
    items: [
      { name: "Vercel", version: "—", logo: "▲", description: "Frontend hosting platform optimized for Next.js. Provides automatic builds, preview deployments, and edge CDN.", link: "https://vercel.com", color: "zinc" },
      { name: "Render", version: "—", logo: "🟣", description: "Backend hosting platform for Python web services. Auto-detects FastAPI and provides automatic deployments from GitHub.", link: "https://render.com", color: "purple" },
      { name: "GitHub Pages", version: "—", logo: "🐙", description: "Static site hosting for the documentation website. Deployed via GitHub Actions on every push to main.", link: "https://pages.github.com", color: "zinc" },
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  zinc:   { bg: "bg-zinc-500/10",   border: "border-zinc-500/20",   text: "text-zinc-400" },
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   text: "text-blue-400" },
  cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   text: "text-cyan-400" },
  emerald:{ bg: "bg-emerald-500/10",border: "border-emerald-500/20",text: "text-emerald-400" },
  amber:  { bg: "bg-amber-500/10",  border: "border-amber-500/20",  text: "text-amber-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  red:    { bg: "bg-red-500/10",    border: "border-red-500/20",    text: "text-red-400" },
  rose:   { bg: "bg-rose-500/10",   border: "border-rose-500/20",   text: "text-rose-400" },
};

export default function TechStackPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Getting Started" }, { label: "Tech Stack" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Layers className="h-3.5 w-3.5" />
          Getting Started
        </div>
        <h1 className="!mb-3">Tech Stack</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          A full breakdown of every technology used in the Airbnb Clone, with version information and rationale for each choice.
        </p>
      </div>

      {TECHS.map((group) => (
        <div key={group.category}>
          <h2>{group.category}</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {group.items.map((tech) => {
              const c = colorMap[tech.color] || colorMap.zinc;
              return (
                <a
                  key={tech.name}
                  href={tech.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center text-lg shrink-0 font-bold ${c.text}`}>
                    {tech.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{tech.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${c.bg} ${c.text} border ${c.border}`}>{tech.version}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{tech.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
