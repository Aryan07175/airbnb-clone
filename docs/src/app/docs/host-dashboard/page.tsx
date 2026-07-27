import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";
import { BarChart2, PlusCircle, Edit, Trash2, Calendar, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Host Dashboard",
  description: "Host dashboard features — revenue metrics, listing CRUD, and reservation management.",
};

export default function HostDashboardPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Workflows" }, { label: "Host Dashboard" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-4">
          <BarChart2 className="h-3.5 w-3.5" />
          Workflows
        </div>
        <h1 className="!mb-3">Host Dashboard</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The host dashboard at <code>/host</code> gives property owners full control over their listings and reservations.
        </p>
      </div>

      <Callout type="info" title="Accessing the Host Dashboard">
        Log in as a user with <code>is_host: true</code> to unlock the Host Dashboard link in the navbar.
        The seeder creates several host accounts — Alice, John, Maria, etc.
      </Callout>

      <h2>Dashboard Overview</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {[
          { icon: DollarSign, label: "Total Revenue", desc: "Sum of all confirmed booking totals across host's listings", color: "emerald" },
          { icon: BarChart2, label: "Active Listings", desc: "Count of listings the host has published", color: "blue" },
          { icon: Calendar, label: "Total Reservations", desc: "Count of all confirmed + cancelled bookings received", color: "rose" },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <Icon className={`h-5 w-5 mb-3 ${m.color === "emerald" ? "text-emerald-400" : m.color === "blue" ? "text-blue-400" : "text-rose-400"}`} />
              <div className="text-sm font-semibold text-zinc-200 mb-1">{m.label}</div>
              <div className="text-xs text-zinc-500">{m.desc}</div>
            </div>
          );
        })}
      </div>

      <h2>Listing Management (CRUD)</h2>

      <h3>View All Listings</h3>
      <p>
        Fetches <code>GET /api/listings/host/{"{hostId}"}</code> to display a grid of all the host&apos;s
        own listings with their photo, title, price, rating, and action buttons.
      </p>

      <h3>Create a New Listing</h3>
      <p>Clicking &quot;Add New Listing&quot; opens a multi-field modal form with:</p>
      <ul>
        <li>Title, description, category, property type, room type</li>
        <li>Price per night, cleaning fee, service fee</li>
        <li>Address, city, country, latitude, longitude</li>
        <li>Max guests, bedrooms, beds, bathrooms</li>
        <li>Photo URLs (comma-separated or one per line)</li>
        <li>Amenity selector (multi-select from available amenities)</li>
      </ul>
      <p>Submitting calls <code>POST /api/listings</code> and the new listing appears immediately in the grid.</p>

      <h3>Edit a Listing</h3>
      <p>
        Clicking the Edit icon on a listing card opens the same form pre-populated with the existing
        listing&apos;s data. Submitting calls <code>PUT /api/listings/{"{id}"}</code> with only the changed fields.
      </p>

      <h3>Delete a Listing</h3>
      <p>
        Clicking the Delete icon triggers a confirmation prompt. On confirm, <code>DELETE /api/listings/{"{id}"}</code>
        is called. All related bookings, reviews, images, and wishlist entries are cascade-deleted automatically.
      </p>

      <Callout type="danger" title="Irreversible Action">
        Deleting a listing permanently removes it and all associated data. This action cannot be undone.
      </Callout>

      <h2>Reservations Feed</h2>
      <p>
        The &quot;Reservations&quot; tab fetches <code>GET /api/bookings/host/{"{hostId}"}</code> to display all
        incoming bookings across the host&apos;s properties, showing:
      </p>
      <ul>
        <li>Guest name and avatar</li>
        <li>Listing name and cover photo</li>
        <li>Check-in / check-out dates and number of nights</li>
        <li>Guest count</li>
        <li>Total booking amount</li>
        <li>Status badge (Confirmed / Cancelled)</li>
      </ul>
    </div>
  );
}
