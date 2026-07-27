import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Mermaid } from "@/components/Mermaid";
import { Callout } from "@/components/Callout";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Architecture",
  description: "System architecture, request lifecycle, and sequence diagrams for the Airbnb Clone.",
};

const ARCH_DIAGRAM = `graph TD
    User["👤 Browser / User"]
    Next["⚡ Next.js Frontend<br/>(Vercel)"]
    API["🚀 FastAPI Backend<br/>(Render)"]
    DB["🗄️ SQLite Database<br/>(airbnb.db)"]

    User -->|"HTTP Request"| Next
    Next -->|"REST API calls<br/>GET /api/listings"| API
    API -->|"SQLAlchemy ORM<br/>queries"| DB
    DB -->|"Query Results"| API
    API -->|"JSON Response"| Next
    Next -->|"Rendered HTML"| User

    style User fill:#18181b,stroke:#52525b,color:#e4e4e7
    style Next fill:#111827,stroke:#3b82f6,color:#93c5fd
    style API fill:#0d1f0d,stroke:#22c55e,color:#86efac
    style DB fill:#1c0f00,stroke:#f59e0b,color:#fcd34d`;

const SEQ_DIAGRAM = `sequenceDiagram
    actor User
    participant FE as Next.js (Vercel)
    participant BE as FastAPI (Render)
    participant DB as SQLite

    User->>FE: Visit /
    FE->>BE: GET /api/listings
    BE->>DB: SELECT * FROM listings
    DB-->>BE: Listing records
    BE-->>FE: JSON array
    FE-->>User: Render listing grid

    User->>FE: Click "Book"
    FE->>BE: POST /api/bookings
    BE->>DB: Check overlap
    DB-->>BE: No conflict
    BE->>DB: INSERT booking
    DB-->>BE: Booking record
    BE-->>FE: 201 Created
    FE-->>User: Show confirmation`;

const BOOKING_FLOW = `sequenceDiagram
    actor Guest
    participant UI as Frontend
    participant API as FastAPI
    participant DB as SQLite

    Guest->>UI: Select dates + guests
    UI->>API: GET /api/bookings/listing/{id}
    API-->>UI: Existing booked dates
    UI-->>Guest: Disable booked dates in calendar

    Guest->>UI: Confirm booking
    UI->>API: POST /api/bookings
    API->>DB: Validate date overlap
    DB-->>API: No conflict
    API->>DB: Calculate total price
    API->>DB: INSERT booking {status: confirmed}
    DB-->>API: New booking record
    API-->>UI: 201 Created + booking data
    UI-->>Guest: Toast: "Booking confirmed!"`;

export default function ArchitecturePage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Architecture" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Layers className="h-3.5 w-3.5" />
          Getting Started
        </div>
        <h1 className="!mb-3">Architecture</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The application follows a clean three-tier architecture: a Next.js frontend, a FastAPI backend,
          and an SQLite database. All layers communicate via RESTful HTTP JSON APIs.
        </p>
      </div>

      <h2>System Architecture</h2>
      <p>
        The architecture separates concerns clearly: the frontend handles rendering and UX, the backend
        handles business logic and data persistence, and SQLite stores all relational data.
      </p>
      <Mermaid chart={ARCH_DIAGRAM} />

      <h2>Component Breakdown</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {[
          {
            title: "Next.js Frontend",
            host: "Vercel",
            color: "blue",
            items: ["App Router pages", "TailwindCSS styling", "React-Leaflet maps", "Framer Motion animations", "React Hot Toast alerts", "Fetches from FastAPI"],
          },
          {
            title: "FastAPI Backend",
            host: "Render",
            color: "emerald",
            items: ["5 resource routers", "Pydantic v2 validation", "SQLAlchemy ORM", "CORS middleware", "Auto OpenAPI /docs", "Uvicorn ASGI server"],
          },
          {
            title: "SQLite Database",
            host: "Local file",
            color: "amber",
            items: ["7 tables", "Cascading deletes", "Many-to-many: listings↔amenities", "Rich seeder data (seed.py)", "Zero config setup", "File: airbnb.db"],
          },
        ].map((comp) => (
          <div key={comp.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${comp.color === "blue" ? "text-blue-400" : comp.color === "emerald" ? "text-emerald-400" : "text-amber-400"}`}>
              {comp.host}
            </div>
            <h3 className="text-base font-bold text-zinc-100 mb-3">{comp.title}</h3>
            <ul className="space-y-1">
              {comp.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className={`w-1 h-1 rounded-full shrink-0 ${comp.color === "blue" ? "bg-blue-500" : comp.color === "emerald" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Request Lifecycle</h2>
      <p>
        Every page load triggers a series of REST API calls from the Next.js frontend to the FastAPI backend,
        which then queries the SQLite database via SQLAlchemy ORM.
      </p>
      <Mermaid chart={SEQ_DIAGRAM} />

      <Callout type="info" title="CORS Configuration">
        The FastAPI backend allows requests from all origins (<code>allow_origins=["*"]</code>).
        In a production app, restrict this to your specific frontend domain.
      </Callout>

      <h2>Booking Lifecycle</h2>
      <p>
        The booking flow involves date validation, overlap detection, and price calculation on the server side,
        before creating the final booking record.
      </p>
      <Mermaid chart={BOOKING_FLOW} />

      <h2>Deployment Topology</h2>
      <div className="not-prose">
        <table className="doc-prose w-full">
          <thead>
            <tr>
              <th>Service</th>
              <th>Platform</th>
              <th>URL</th>
              <th>Auto-deploy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frontend</td>
              <td>Vercel</td>
              <td><code>airbnb-clone-one-coral.vercel.app</code></td>
              <td>✅ Push to main</td>
            </tr>
            <tr>
              <td>Backend API</td>
              <td>Render</td>
              <td><code>airbnb-clone-backend-96hk.onrender.com</code></td>
              <td>✅ Push to main</td>
            </tr>
            <tr>
              <td>Documentation</td>
              <td>GitHub Pages</td>
              <td><code>Aryan07175.github.io/airbnb-clone</code></td>
              <td>✅ Push to main</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
