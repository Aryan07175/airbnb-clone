import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Mermaid } from "@/components/Mermaid";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Flow",
  description: "End-to-end booking flow walkthrough for the Airbnb Clone.",
};

const FLOW_DIAGRAM = `flowchart TD
    A["🔍 Search\nDestination + Dates + Guests"] --> B["🏠 Browse Listings\nFiltered grid with map"]
    B --> C["📋 Listing Detail\nPhotos + Amenities + Reviews"]
    C --> D["📅 Select Dates\nDate-range picker + guest count"]
    D --> E{"Dates Available?"}
    E -->|"❌ Overlap detected"| D
    E -->|"✅ Clear"| F["💳 Checkout Modal\nPrice breakdown + payment"]
    F --> G{"Confirm Booking?"}
    G -->|"Cancel"| C
    G -->|"Confirm"| H["🚀 POST /api/bookings"]
    H --> I{"Server Validation"}
    I -->|"❌ Error"| J["⚠️ Error Toast"]
    I -->|"✅ Success"| K["🎉 Booking Confirmed\nSuccess Toast"]
    K --> L["✈️ Trips Dashboard\n/trips"]

    style A fill:#1a0a0f,stroke:#f43f5e,color:#fda4af
    style K fill:#0a1a0a,stroke:#22c55e,color:#86efac
    style J fill:#1a0f00,stroke:#f59e0b,color:#fcd34d`;

const STEPS = [
  {
    step: 1,
    title: "Search & Filter",
    description: "User enters a destination, date range, and guest count in the floating search bar. The frontend calls GET /api/listings with the provided filters.",
    detail: "The backend filters out listings with overlapping confirmed bookings when check_in and check_out are provided via a subquery.",
    color: "rose",
  },
  {
    step: 2,
    title: "Browse Listings",
    description: "Filtered listings are displayed as cards in a responsive grid. An interactive Leaflet map shows price-pin markers. Users can toggle between map and list view.",
    detail: "Category filters, price range slider, property type, and bedroom count can refine results further.",
    color: "blue",
  },
  {
    step: 3,
    title: "Listing Detail",
    description: "Clicking a listing opens the detail page with a 5-photo gallery, amenities grid, host info, reviews with star ratings, and a sticky booking card on the right.",
    detail: "Booked dates are fetched from GET /api/bookings/listing/{id} and rendered as disabled dates in the calendar.",
    color: "purple",
  },
  {
    step: 4,
    title: "Date Selection",
    description: "The booking card allows users to pick check-in and check-out dates. The calendar visually disables already-booked date ranges. Guest count is set via a dropdown.",
    detail: "Real-time price calculation: (nights × price_per_night) + cleaning_fee + service_fee.",
    color: "amber",
  },
  {
    step: 5,
    title: "Checkout Modal",
    description: "Clicking 'Reserve' opens a checkout modal with the full trip summary: listing name, dates, guest count, and itemized price breakdown. A mocked credit card input completes the UI.",
    detail: "The actual payment is mocked — no real payment processor is integrated.",
    color: "emerald",
  },
  {
    step: 6,
    title: "Server Validation",
    description: "On confirmation, POST /api/bookings is called. The backend validates: date format, check_out > check_in, guest count ≤ max_guests, no overlapping confirmed bookings.",
    detail: "The total price is recalculated server-side to prevent client-side tampering.",
    color: "rose",
  },
  {
    step: 7,
    title: "Reservation Confirmed",
    description: "On 201 Created response, a success toast notification fires. The booking is stored in the database with status 'confirmed'.",
    detail: "The user can view their reservation in the Trips Dashboard at /trips.",
    color: "emerald",
  },
];

const colorMap: Record<string, string> = {
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

export default function BookingFlowPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Workflows" }, { label: "Booking Flow" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Calendar className="h-3.5 w-3.5" />
          Workflows
        </div>
        <h1 className="!mb-3">Booking Flow</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          A complete walkthrough of the end-to-end booking journey — from search to confirmed reservation.
        </p>
      </div>

      <h2>Flow Diagram</h2>
      <Mermaid chart={FLOW_DIAGRAM} />

      <h2>Step-by-Step Breakdown</h2>
      <div className="not-prose space-y-3 mt-4">
        {STEPS.map((s) => (
          <div key={s.step} className="flex gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold shrink-0 ${colorMap[s.color]}`}>
              {s.step}
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-zinc-100 mb-1">{s.title}</h3>
              <p className="text-sm text-zinc-400 mb-2">{s.description}</p>
              <p className="text-xs text-zinc-600 italic">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Cancellation Flow</h2>
      <p>
        Users can cancel any confirmed booking from their Trips Dashboard at <code>/trips</code>.
        Clicking &quot;Cancel Reservation&quot; calls <code>PUT /api/bookings/{"{id}"}/cancel</code>, which
        sets the booking status to <code>cancelled</code>. Cancelled bookings remain in the database for
        record-keeping but are excluded from availability checks.
      </p>
    </div>
  );
}
