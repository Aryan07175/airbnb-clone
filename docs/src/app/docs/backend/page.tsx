import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";
import { Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Backend",
  description: "FastAPI backend architecture, routers, schemas, and CORS configuration.",
};

export default function BackendPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Core Modules" }, { label: "Backend" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-4">
          <Server className="h-3.5 w-3.5" />
          Core Modules
        </div>
        <h1 className="!mb-3">Backend</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          A Python FastAPI application providing REST endpoints for the frontend. Deployed to Render with automatic deployments.
        </p>
      </div>

      <h2>Technology Stack</h2>
      <table>
        <thead><tr><th>Package</th><th>Version</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>fastapi</code></td><td>latest</td><td>ASGI web framework with auto OpenAPI docs</td></tr>
          <tr><td><code>uvicorn</code></td><td>latest</td><td>ASGI server for running FastAPI</td></tr>
          <tr><td><code>sqlalchemy</code></td><td>2.x</td><td>ORM for database models and queries</td></tr>
          <tr><td><code>pydantic</code></td><td>v2</td><td>Request/response validation and serialization</td></tr>
          <tr><td><code>python-multipart</code></td><td>latest</td><td>Form data support</td></tr>
        </tbody>
      </table>

      <h2>Application Entry Point</h2>
      <p>
        <code>main.py</code> creates the FastAPI app, adds CORS middleware, and includes all resource routers:
      </p>
      <ul>
        <li><code>users.router</code> — <code>/api/users</code></li>
        <li><code>listings.router</code> — <code>/api/listings</code></li>
        <li><code>bookings.router</code> — <code>/api/bookings</code></li>
        <li><code>reviews.router</code> — <code>/api/reviews</code></li>
        <li><code>wishlists.router</code> — <code>/api/wishlists</code></li>
      </ul>

      <h2>Router Architecture</h2>
      <table>
        <thead><tr><th>Router File</th><th>Prefix</th><th>Key Endpoints</th></tr></thead>
        <tbody>
          <tr><td><code>routers/users.py</code></td><td><code>/api/users</code></td><td>GET all, GET by ID, POST create</td></tr>
          <tr><td><code>routers/listings.py</code></td><td><code>/api/listings</code></td><td>GET all (with filters), GET by ID, GET by host, POST, PUT, DELETE</td></tr>
          <tr><td><code>routers/bookings.py</code></td><td><code>/api/bookings</code></td><td>POST create, GET by user, GET by listing, GET by host, PUT cancel</td></tr>
          <tr><td><code>routers/reviews.py</code></td><td><code>/api/reviews</code></td><td>GET by listing, POST create</td></tr>
          <tr><td><code>routers/wishlists.py</code></td><td><code>/api/wishlists</code></td><td>GET by user, POST add, DELETE remove</td></tr>
        </tbody>
      </table>

      <h2>Pydantic Schemas</h2>
      <p>
        All request bodies and response models are defined in <code>schemas.py</code> using Pydantic v2.
        This provides automatic validation, serialization, and OpenAPI schema generation.
      </p>
      <ul>
        <li><code>UserCreate</code> / <code>UserResponse</code></li>
        <li><code>ListingCreate</code> / <code>ListingUpdate</code> / <code>ListingResponse</code></li>
        <li><code>BookingCreate</code> / <code>BookingResponse</code></li>
        <li><code>ReviewCreate</code> / <code>ReviewResponse</code></li>
        <li><code>AmenityResponse</code></li>
      </ul>

      <h2>Database Session Management</h2>
      <p>
        <code>database.py</code> creates the SQLAlchemy engine pointing to <code>airbnb.db</code> and provides
        a <code>get_db()</code> dependency that yields a database session per request, then closes it automatically.
      </p>

      <h2>CORS Configuration</h2>
      <p>
        CORS is configured in <code>main.py</code> to allow all origins (<code>*</code>), all methods, and all headers.
        This allows the frontend (on a different domain) to make API requests.
      </p>

      <Callout type="warning" title="Production CORS">
        For a real production application, replace <code>allow_origins=["*"]</code> with your specific
        frontend domain (e.g., <code>allow_origins=["https://your-app.vercel.app"]</code>).
      </Callout>

      <h2>Auto-Generated API Documentation</h2>
      <p>FastAPI automatically generates interactive API documentation at two URLs:</p>
      <ul>
        <li><strong>Swagger UI</strong>: <code>/docs</code> — try any endpoint directly in the browser</li>
        <li><strong>ReDoc</strong>: <code>/redoc</code> — clean, readable API documentation</li>
      </ul>

      <h2>Seeder Script</h2>
      <p>
        <code>seed.py</code> populates the database with:
      </p>
      <ul>
        <li>10+ users (mix of hosts and guests, some superhosts)</li>
        <li>100+ listings across categories: Beachfront, Cabin, Mansion, Trending, OMG!, Lakefront, Tiny Homes, Farms</li>
        <li>Multiple images per listing</li>
        <li>20+ amenities assigned to listings</li>
        <li>Realistic reviews with 6-dimension ratings</li>
        <li>Sample bookings for demo purposes</li>
      </ul>
    </div>
  );
}
