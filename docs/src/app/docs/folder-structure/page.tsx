import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { FolderTree } from "@/components/FolderTree";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Folder Structure",
  description: "Project directory tree for the Airbnb Clone frontend and backend.",
};

const FRONTEND_TREE = [
  {
    name: "frontend/",
    type: "dir" as const,
    description: "Next.js 14 frontend application",
    children: [
      {
        name: "src/",
        type: "dir" as const,
        children: [
          {
            name: "app/",
            type: "dir" as const,
            description: "App Router pages",
            children: [
              { name: "page.tsx", type: "file" as const, description: "Home page — listing grid" },
              { name: "layout.tsx", type: "file" as const, description: "Root layout + navbar" },
              { name: "globals.css", type: "file" as const },
              {
                name: "listings/",
                type: "dir" as const,
                children: [
                  {
                    name: "[id]/",
                    type: "dir" as const,
                    description: "Dynamic listing detail page",
                    children: [{ name: "page.tsx", type: "file" as const }],
                  },
                ],
              },
              {
                name: "trips/",
                type: "dir" as const,
                children: [{ name: "page.tsx", type: "file" as const, description: "User trips dashboard" }],
              },
              {
                name: "host/",
                type: "dir" as const,
                children: [{ name: "page.tsx", type: "file" as const, description: "Host dashboard" }],
              },
            ],
          },
          {
            name: "components/",
            type: "dir" as const,
            description: "Reusable React components",
            children: [
              { name: "Navbar.tsx", type: "file" as const },
              { name: "ListingCard.tsx", type: "file" as const },
              { name: "CategoryFilter.tsx", type: "file" as const },
              { name: "SearchBar.tsx", type: "file" as const },
              { name: "MapView.tsx", type: "file" as const },
              { name: "BookingCard.tsx", type: "file" as const },
              { name: "CheckoutModal.tsx", type: "file" as const },
              { name: "ReviewCard.tsx", type: "file" as const },
              { name: "PhotoGallery.tsx", type: "file" as const },
              { name: "FilterModal.tsx", type: "file" as const },
              { name: "CreateListingModal.tsx", type: "file" as const, highlight: true },
            ],
          },
          {
            name: "lib/",
            type: "dir" as const,
            children: [
              { name: "api.ts", type: "file" as const, description: "API fetch helpers" },
              { name: "utils.ts", type: "file" as const },
            ],
          },
          {
            name: "types/",
            type: "dir" as const,
            children: [{ name: "index.ts", type: "file" as const, description: "TypeScript interfaces" }],
          },
        ],
      },
      { name: "package.json", type: "file" as const },
      { name: "next.config.ts", type: "file" as const },
      { name: "tailwind.config.ts", type: "file" as const },
      { name: "tsconfig.json", type: "file" as const },
    ],
  },
];

const BACKEND_TREE = [
  {
    name: "backend/",
    type: "dir" as const,
    description: "FastAPI Python backend",
    children: [
      { name: "main.py", type: "file" as const, description: "FastAPI app + router registration + CORS", highlight: true },
      { name: "database.py", type: "file" as const, description: "SQLAlchemy engine + session factory" },
      { name: "models.py", type: "file" as const, description: "SQLAlchemy ORM models", highlight: true },
      { name: "schemas.py", type: "file" as const, description: "Pydantic v2 request/response schemas" },
      { name: "seed.py", type: "file" as const, description: "Database seeder (100+ listings)" },
      { name: "requirements.txt", type: "file" as const },
      { name: "airbnb.db", type: "file" as const, description: "SQLite database file (auto-created)" },
      {
        name: "routers/",
        type: "dir" as const,
        description: "API route handlers by resource",
        children: [
          { name: "listings.py", type: "file" as const, description: "CRUD for listings" },
          { name: "bookings.py", type: "file" as const, description: "Booking creation + management" },
          { name: "users.py", type: "file" as const },
          { name: "reviews.py", type: "file" as const },
          { name: "wishlists.py", type: "file" as const },
        ],
      },
    ],
  },
];

const DOCS_TREE = [
  {
    name: "docs/",
    type: "dir" as const,
    description: "Documentation website (Next.js 15)",
    children: [
      {
        name: "src/app/",
        type: "dir" as const,
        children: [
          { name: "page.tsx", type: "file" as const, description: "Hero landing page" },
          {
            name: "docs/",
            type: "dir" as const,
            description: "All documentation pages",
            children: [
              { name: "layout.tsx", type: "file" as const },
              { name: "page.tsx", type: "file" as const, description: "Overview" },
              { name: "features/page.tsx", type: "file" as const },
              { name: "architecture/page.tsx", type: "file" as const },
              { name: "api/page.tsx", type: "file" as const },
              { name: "local-setup/page.tsx", type: "file" as const },
              { name: "deployment/page.tsx", type: "file" as const },
            ],
          },
        ],
      },
      {
        name: "src/components/",
        type: "dir" as const,
        children: [
          { name: "Navbar.tsx", type: "file" as const },
          { name: "Sidebar.tsx", type: "file" as const },
          { name: "ApiEndpoint.tsx", type: "file" as const },
          { name: "FolderTree.tsx", type: "file" as const },
          { name: "SearchModal.tsx", type: "file" as const },
        ],
      },
      { name: "next.config.ts", type: "file" as const, description: "Static export config for GitHub Pages" },
    ],
  },
  {
    name: ".github/workflows/",
    type: "dir" as const,
    children: [{ name: "deploy.yml", type: "file" as const, description: "GitHub Pages auto-deploy workflow" }],
  },
];

export default function FolderStructurePage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Setup" }, { label: "Folder Structure" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Layers className="h-3.5 w-3.5" />
          Setup & Deployment
        </div>
        <h1 className="!mb-3">Folder Structure</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The monorepo is organized into three main directories: <code>frontend/</code>, <code>backend/</code>, and <code>docs/</code>.
          Click any folder to expand or collapse it.
        </p>
      </div>

      <h2>Frontend (Next.js)</h2>
      <FolderTree tree={FRONTEND_TREE} title="frontend/" />

      <h2>Backend (FastAPI)</h2>
      <FolderTree tree={BACKEND_TREE} title="backend/" />

      <h2>Documentation Site</h2>
      <FolderTree tree={DOCS_TREE} title="docs/ + .github/" />
    </div>
  );
}
