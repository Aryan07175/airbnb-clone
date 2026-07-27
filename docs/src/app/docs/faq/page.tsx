"use client";

import { useState } from "react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { ChevronDown, ChevronRight } from "lucide-react";

const FAQS = [
  {
    q: "Is this a real Airbnb clone with actual payments?",
    a: "No. The checkout modal includes a mocked credit card input for UI completeness, but no actual payment processing is integrated. This is an assignment project demonstrating full-stack architecture, not a production payment system.",
  },
  {
    q: "How does user authentication work?",
    a: "The app uses a simplified mock authentication system. Users select their identity from a dropdown in the navbar. The selected user ID is stored in localStorage. There is no JWT, session management, or OAuth flow — this was intentionally simplified for the assignment scope.",
  },
  {
    q: "Why SQLite instead of PostgreSQL or MySQL?",
    a: "SQLite is perfect for assignment-scale projects: zero configuration, no server needed, self-contained in a single file (airbnb.db). The SQLAlchemy ORM abstraction means migrating to PostgreSQL in production is a one-line connection string change.",
  },
  {
    q: "Can I deploy this to production?",
    a: "Yes, with some modifications. You'd need to replace the mock auth with real JWT authentication, switch SQLite to PostgreSQL (especially on Render, where the filesystem is ephemeral), add input sanitization, and implement real payment processing via Stripe or similar.",
  },
  {
    q: "Why does the Render backend take 30-60 seconds on first load?",
    a: "Render free-tier services spin down after 15 minutes of inactivity (cold start). The first request wakes the service up. This is a Render infrastructure limitation. Upgrading to Render Starter ($7/month) eliminates cold starts.",
  },
  {
    q: "How many listings are seeded?",
    a: "The seed.py script populates the database with 100+ listings across 8 categories (Beachfront, Cabin, Mansion, Trending, OMG!, Lakefront, Tiny Homes, Farms), along with 10+ users, 20+ amenities, and hundreds of reviews and images.",
  },
  {
    q: "Can I add my own listings without being a host?",
    a: "Only users with is_host: true can access the Host Dashboard and create listings. Log in as one of the seeded host users (Alice, John, Maria, etc.) to test listing creation. In a real app, any user could apply to become a host.",
  },
  {
    q: "Does the map work offline?",
    a: "No. The Leaflet map uses OpenStreetMap tiles which require an internet connection. The listing grid still works without the map if you're offline.",
  },
  {
    q: "How are prices calculated for bookings?",
    a: "Total price = (nights × price_per_night) + cleaning_fee + service_fee. This calculation is performed server-side in the booking creation endpoint to prevent client-side tampering.",
  },
  {
    q: "Can I use a different database?",
    a: "Yes. Change the DATABASE_URL in database.py from sqlite:///./airbnb.db to your desired database connection string (e.g., postgresql://user:pass@host/dbname). SQLAlchemy handles the abstraction — no other code changes needed.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/[0.12] transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-medium text-zinc-200">{q}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 border-t border-white/[0.06]">
          <p className="text-sm text-zinc-400 leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Help" }, { label: "FAQ" }]} />
      <h1>Frequently Asked Questions</h1>
      <p>Common questions about the Airbnb Clone project, its design decisions, and limitations.</p>

      <div className="not-prose space-y-2 mt-6">
        {FAQS.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
}
