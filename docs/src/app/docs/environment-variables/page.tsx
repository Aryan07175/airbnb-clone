import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";

export const metadata: Metadata = {
  title: "Environment Variables",
  description: "All environment variables required for the Airbnb Clone frontend and backend.",
};

export default function EnvVarsPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Setup" }, { label: "Environment Variables" }]} />
      <h1>Environment Variables</h1>
      <p>
        The Airbnb Clone uses minimal environment variables. The frontend requires one variable to know
        where the backend API lives.
      </p>

      <h2>Frontend (<code>frontend/.env.local</code>)</h2>
      <table>
        <thead><tr><th>Variable</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr>
            <td><code>NEXT_PUBLIC_API_URL</code></td>
            <td>✅ Yes</td>
            <td><code>http://localhost:8000</code></td>
            <td>Base URL for all FastAPI backend API calls</td>
          </tr>
        </tbody>
      </table>

      <h3>Local Development</h3>
      <p>Create <code>frontend/.env.local</code>:</p>
      <pre>{`NEXT_PUBLIC_API_URL=http://localhost:8000`}</pre>

      <h3>Production (Vercel)</h3>
      <p>In the Vercel dashboard, add the environment variable:</p>
      <pre>{`NEXT_PUBLIC_API_URL=https://airbnb-clone-backend-96hk.onrender.com`}</pre>

      <Callout type="info" title="NEXT_PUBLIC_ Prefix">
        Variables prefixed with <code>NEXT_PUBLIC_</code> are exposed to the browser bundle.
        This is required for the frontend to access the API URL client-side.
        Never put secrets in <code>NEXT_PUBLIC_</code> variables.
      </Callout>

      <h2>Backend</h2>
      <p>
        The backend has no required environment variables for local development. SQLite uses a local
        file (<code>airbnb.db</code>) and needs no connection string.
      </p>
      <p>For production on Render, you may optionally set:</p>
      <table>
        <thead><tr><th>Variable</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>PORT</code></td><td>Auto-set by Render</td><td>Render injects the port automatically</td></tr>
          <tr><td><code>PYTHON_VERSION</code></td><td>Optional</td><td>Pin Python version (e.g. <code>3.11.0</code>)</td></tr>
        </tbody>
      </table>

      <Callout type="warning" title="No Secrets in This Project">
        This assignment project has no API keys, payment processor credentials, or JWT secrets.
        In a real production application, you would add <code>SECRET_KEY</code>, <code>DATABASE_URL</code>,
        and third-party service credentials here.
      </Callout>
    </div>
  );
}
