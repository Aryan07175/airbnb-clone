import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment",
  description: "Deploy the Airbnb Clone frontend to Vercel, backend to Render, and docs to GitHub Pages.",
};

export default function DeploymentPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Setup" }, { label: "Deployment" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Globe className="h-3.5 w-3.5" />
          Setup & Deployment
        </div>
        <h1 className="!mb-3">Deployment</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The application is split across three platforms — Vercel for the frontend, Render for the backend API, and GitHub Pages for this documentation.
        </p>
      </div>

      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { name: "Frontend", platform: "Vercel", status: "Live", color: "blue", url: "airbnb-clone-one-coral.vercel.app" },
          { name: "Backend API", platform: "Render", status: "Live", color: "emerald", url: "airbnb-clone-backend-96hk.onrender.com" },
          { name: "Docs", platform: "GitHub Pages", status: "Live", color: "rose", url: "Aryan07175.github.io/airbnb-clone" },
        ].map((d) => (
          <div key={d.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-500">{d.name}</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {d.status}
              </span>
            </div>
            <div className="text-base font-bold text-zinc-100 mb-1">{d.platform}</div>
            <div className="text-xs text-zinc-600 font-mono truncate">{d.url}</div>
          </div>
        ))}
      </div>

      <h2>Frontend — Vercel</h2>
      <p>The Next.js frontend is deployed to Vercel with zero-config automatic deployments on every push to <code>main</code>.</p>

      <h3>Deploy Steps</h3>
      <ol>
        <li>Push your code to GitHub</li>
        <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a> and import your repository</li>
        <li>Set the <strong>Root Directory</strong> to <code>frontend</code></li>
        <li>Vercel auto-detects Next.js — no build configuration needed</li>
        <li>Add environment variables (see <a href="/docs/environment-variables">Environment Variables</a>)</li>
        <li>Click <strong>Deploy</strong></li>
      </ol>

      <Callout type="info" title="Automatic Deploys">
        Every push to the <code>main</code> branch triggers a Vercel redeploy automatically.
        Preview deployments are created for every pull request.
      </Callout>

      <h2>Backend — Render</h2>
      <p>The FastAPI backend is deployed as a Web Service on Render. Render detects Python applications automatically.</p>

      <h3>Deploy Steps</h3>
      <ol>
        <li>Go to <a href="https://render.com" target="_blank" rel="noreferrer">render.com</a> and create a new Web Service</li>
        <li>Connect your GitHub repository</li>
        <li>Set the <strong>Root Directory</strong> to <code>backend</code></li>
        <li>Set <strong>Build Command</strong>: <code>pip install -r requirements.txt && python seed.py</code></li>
        <li>Set <strong>Start Command</strong>: <code>python -m uvicorn main:app --host 0.0.0.0 --port $PORT</code></li>
        <li>Add environment variables if needed</li>
        <li>Click <strong>Create Web Service</strong></li>
      </ol>

      <Callout type="warning" title="Cold Start">
        Render free-tier services spin down after 15 minutes of inactivity. The first request after inactivity
        may take 30–60 seconds. This is a Render limitation, not a bug.
      </Callout>

      <h3>render.yaml (Infrastructure as Code)</h3>
      <p>The repository includes a <code>render.yaml</code> file at the root for one-click Blueprint deployment:</p>

      <h2>Documentation — GitHub Pages</h2>
      <p>This documentation site is automatically deployed to GitHub Pages via a GitHub Actions workflow on every push to <code>main</code>.</p>

      <h3>How it works</h3>
      <ol>
        <li>The <code>.github/workflows/deploy.yml</code> workflow triggers on push to <code>main</code></li>
        <li>It installs Node.js 20, runs <code>npm ci</code> and <code>next build</code></li>
        <li>Next.js outputs a static site to the <code>out/</code> directory (<code>output: "export"</code>)</li>
        <li>The <code>actions/deploy-pages</code> action uploads and deploys to GitHub Pages</li>
        <li>The site is live at <code>https://Aryan07175.github.io/airbnb-clone/</code></li>
      </ol>

      <h3>GitHub Pages Setup (one time)</h3>
      <ol>
        <li>Go to your repository Settings → Pages</li>
        <li>Set <strong>Source</strong> to <strong>GitHub Actions</strong></li>
        <li>Push to <code>main</code> — the workflow will deploy automatically</li>
      </ol>

      <Callout type="info" title="Base Path">
        The Next.js docs site uses <code>basePath: &quot;/airbnb-clone&quot;</code> in <code>next.config.ts</code> to correctly
        serve assets under the GitHub Pages subdirectory. This is already configured.
      </Callout>
    </div>
  );
}
