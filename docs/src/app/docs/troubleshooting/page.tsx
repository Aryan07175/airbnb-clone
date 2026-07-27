import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "Common errors and solutions for the Airbnb Clone local development setup.",
};

const ISSUES = [
  {
    id: "cors",
    category: "CORS",
    title: "CORS Error in Browser Console",
    error: "Access to fetch at 'http://localhost:8000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy",
    solution: "The FastAPI backend must be running. Start it with: python -m uvicorn main:app --reload --port 8000. Check that NEXT_PUBLIC_API_URL in your .env.local matches the backend URL exactly.",
    color: "rose",
  },
  {
    id: "port",
    category: "Network",
    title: "Backend Port Already in Use",
    error: "ERROR: [Errno 48] Address already in use — port 8000",
    solution: "Kill the process using port 8000: lsof -ti:8000 | xargs kill -9 (macOS/Linux) or use Task Manager on Windows. Alternatively, start uvicorn on a different port: python -m uvicorn main:app --reload --port 8001 and update NEXT_PUBLIC_API_URL.",
    color: "amber",
  },
  {
    id: "nodata",
    category: "Database",
    title: "No Listings Showing on Home Page",
    error: "Home page loads but shows empty listing grid",
    solution: "The database hasn't been seeded. Run: python seed.py from the backend directory. This creates airbnb.db and populates it with 100+ listings. Make sure the backend is running after seeding.",
    color: "amber",
  },
  {
    id: "map",
    category: "Frontend",
    title: "Leaflet Map Not Rendering",
    error: "Map shows as grey box or throws 'window is not defined'",
    solution: "Leaflet requires browser APIs. Ensure the MapView component uses dynamic import with ssr: false: import dynamic from 'next/dynamic'; const Map = dynamic(() => import('./MapView'), { ssr: false });",
    color: "blue",
  },
  {
    id: "modules",
    category: "Dependencies",
    title: "Cannot Find Module Error (Frontend)",
    error: "Module not found: Can't resolve '@/components/...'",
    solution: "Run npm install in the frontend directory. The path alias @/ maps to src/ — check tsconfig.json has paths configured correctly.",
    color: "blue",
  },
  {
    id: "python",
    category: "Backend",
    title: "ModuleNotFoundError (Backend)",
    error: "ModuleNotFoundError: No module named 'fastapi'",
    solution: "Install backend dependencies: python -m pip install -r requirements.txt. If using a virtual environment, make sure it's activated first: source venv/bin/activate (macOS/Linux).",
    color: "emerald",
  },
  {
    id: "render",
    category: "Deployment",
    title: "Render Backend Slow First Load",
    error: "API calls time out on first visit after inactivity",
    solution: "Render free-tier services spin down after 15 minutes of inactivity. The cold start takes 30-60 seconds. This is expected behavior on the free tier. Consider upgrading to Render Starter to avoid cold starts.",
    color: "zinc",
  },
  {
    id: "db-reset",
    category: "Database",
    title: "Reset the Database",
    error: "I want to start with a fresh database",
    solution: "Delete backend/airbnb.db, then run python seed.py. The FastAPI server will recreate the schema automatically on next startup.",
    color: "zinc",
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  rose:   { bg: "bg-rose-500/[0.05]", border: "border-rose-500/20", badge: "bg-rose-500/15 text-rose-400 border-rose-500/25" },
  amber:  { bg: "bg-amber-500/[0.05]", border: "border-amber-500/20", badge: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  blue:   { bg: "bg-blue-500/[0.05]", border: "border-blue-500/20", badge: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
  emerald:{ bg: "bg-emerald-500/[0.05]", border: "border-emerald-500/20", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  zinc:   { bg: "bg-white/[0.02]", border: "border-white/[0.07]", badge: "bg-zinc-800 text-zinc-400 border-zinc-700" },
};

export default function TroubleshootingPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Help" }, { label: "Troubleshooting" }]} />
      <h1>Troubleshooting</h1>
      <p>Common issues and their solutions when running the Airbnb Clone locally.</p>

      <Callout type="info" title="Quick Checklist">
        Before diving into specific issues, verify:
        <ol>
          <li>Backend is running on <code>http://localhost:8000</code></li>
          <li>Database is seeded: <code>python seed.py</code></li>
          <li><code>frontend/.env.local</code> has <code>NEXT_PUBLIC_API_URL=http://localhost:8000</code></li>
          <li>Frontend is running on <code>http://localhost:3000</code></li>
        </ol>
      </Callout>

      <div className="not-prose space-y-4 mt-6">
        {ISSUES.map((issue) => {
          const c = colorMap[issue.color];
          return (
            <div key={issue.id} className={`rounded-xl border ${c.border} ${c.bg} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${c.badge}`}>
                  {issue.category}
                </span>
                <h3 className="text-[15px] font-semibold text-zinc-100">{issue.title}</h3>
              </div>
              <div className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-1">Error</p>
                <code className="text-xs text-rose-300 bg-rose-500/10 rounded px-2 py-1 border border-rose-500/20 block">{issue.error}</code>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-1">Solution</p>
                <p className="text-sm text-zinc-400">{issue.solution}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
