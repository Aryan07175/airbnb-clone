import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { CommandBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { Terminal, Globe, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Local Setup",
  description: "Run the Airbnb Clone locally — backend and frontend setup guide.",
};

export default function LocalSetupPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Setup" }, { label: "Local Setup" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
          <Terminal className="h-3.5 w-3.5" />
          Setup & Deployment
        </div>
        <h1 className="!mb-3">Local Setup</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          Get both the backend and frontend running locally in under 5 minutes.
        </p>
      </div>

      <h2>Prerequisites</h2>
      <table>
        <thead><tr><th>Requirement</th><th>Version</th><th>Check</th></tr></thead>
        <tbody>
          <tr><td>Node.js</td><td>v18+</td><td><code>node --version</code></td></tr>
          <tr><td>npm</td><td>v9+</td><td><code>npm --version</code></td></tr>
          <tr><td>Python</td><td>3.10+</td><td><code>python --version</code></td></tr>
          <tr><td>pip</td><td>latest</td><td><code>pip --version</code></td></tr>
        </tbody>
      </table>

      <h2>1 — Clone the Repository</h2>
      <CommandBlock command="git clone https://github.com/Aryan07175/airbnb-clone.git" description="Clone the repository" />
      <CommandBlock command="cd airbnb-clone" description="Navigate into the project" />

      <h2>2 — Backend (FastAPI)</h2>
      <p>The backend runs on port <code>8000</code> by default.</p>
      <CommandBlock command="cd backend" description="Navigate to the backend directory" />
      <CommandBlock command="python -m pip install -r requirements.txt" description="Install Python dependencies" />
      <CommandBlock command="python seed.py" description="Seed the SQLite database with sample data (100+ listings, users, reviews)" />
      <CommandBlock command="python -m uvicorn main:app --reload --port 8000" description="Start the FastAPI dev server with hot reload" />

      <Callout type="info" title="Backend Running">
        FastAPI server is now available at <code>http://localhost:8000</code>
        <br />
        Interactive API docs: <code>http://localhost:8000/docs</code>
        <br />
        ReDoc: <code>http://localhost:8000/redoc</code>
      </Callout>

      <Callout type="warning" title="Virtual Environment (Recommended)">
        Use a virtual environment to avoid polluting your global Python install:
        <br />
        <code>python -m venv venv</code>
        <br />
        macOS/Linux: <code>source venv/bin/activate</code>
        <br />
        Windows: <code>venv\Scripts\activate</code>
      </Callout>

      <h2>3 — Frontend (Next.js)</h2>
      <p>Open a new terminal. The frontend runs on port <code>3000</code> by default.</p>
      <CommandBlock command="cd frontend" description="Navigate to the frontend directory (new terminal)" />
      <CommandBlock command="npm install" description="Install all Node.js dependencies" />
      <CommandBlock command="npm run dev" description="Start the Next.js development server" />

      <Callout type="info" title="Frontend Running">
        Open <strong>http://localhost:3000</strong> in your browser to see the application.
      </Callout>

      <h2>4 — Verify Everything Works</h2>
      <div className="not-prose space-y-2">
        {[
          { url: "http://localhost:3000", label: "Frontend — Listing grid should load with seeded data" },
          { url: "http://localhost:8000/api/health", label: "Backend health — Should return {\"status\": \"healthy\"}" },
          { url: "http://localhost:8000/api/listings", label: "API listings — Should return array of 100+ listings" },
          { url: "http://localhost:8000/docs", label: "Swagger UI — Interactive API documentation" },
        ].map((check) => (
          <div key={check.url} className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <code className="text-xs text-rose-300">{check.url}</code>
              <p className="text-xs text-zinc-500 mt-0.5">{check.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>5 — Pick a User (Mock Login)</h2>
      <p>
        The app uses a mock authentication system. Select your user from the user picker in the top-right
        navbar. The seeder creates several users — some are hosts (<code>is_host: true</code>), some are guests.
        Logging in as a host unlocks the Host Dashboard.
      </p>

      <Callout type="default" title="Re-seeding the Database">
        To reset the database and re-seed: delete <code>backend/airbnb.db</code>, then re-run <code>python seed.py</code>.
        The FastAPI server will recreate the schema on next startup.
      </Callout>
    </div>
  );
}
