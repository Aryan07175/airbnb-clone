import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import {
  Home, Map, Calendar, Star, Heart, Camera, Users,
  Zap, Shield, Smartphone, BarChart2, PlusCircle, Trash2, Edit,
  Search, Filter, BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Complete features list for the Airbnb Clone — search, booking, host dashboard, and more.",
};

const FEATURE_GROUPS = [
  {
    category: "Browse & Discovery",
    color: "rose",
    features: [
      { icon: Home, title: "Home Page Grid", description: "Photo carousel cards with title, city, price/night, star rating, host avatar, and animated heart wishlist toggle." },
      { icon: Search, title: "Floating Search Bar", description: "Pill-shaped search overlay with destination input, date-range picker, and guest capacity selector." },
      { icon: Filter, title: "Category Filter Bar", description: "Horizontally scrollable list of 8+ categories (Beachfront, Cabins, Mansions, Trending, OMG!) with active indicators." },
      { icon: Map, title: "Interactive Map", description: "Leaflet map with custom price-pin markers, listing preview popups, and \"Show map / Show list\" toggle." },
      { icon: Filter, title: "Filter Modal", description: "Price range slider, property type checkboxes (Villa, Cabin, Apartment, Tiny Home), and bedroom count filter." },
    ],
  },
  {
    category: "Listing Detail",
    color: "blue",
    features: [
      { icon: Camera, title: "Photo Gallery", description: "Airbnb-style 5-photo hero grid with full-screen lightbox gallery modal." },
      { icon: Users, title: "Host Information", description: "Host profile, superhost badge, capacity specs (bedrooms, beds, baths), and listing amenities grid." },
      { icon: Zap, title: "Amenities Grid", description: "Categorized amenity icons: WiFi, Heated Pool, Hot Tub, BBQ Grill, Workspace, and 20+ more." },
      { icon: Star, title: "Reviews & Ratings", description: "6-dimension rating breakdown (cleanliness, accuracy, communication, location, check-in, value) with guest review cards." },
    ],
  },
  {
    category: "Booking Engine",
    color: "emerald",
    features: [
      { icon: Calendar, title: "Booking Card", description: "Sticky date-range picker with disabled overlap blocking, guest count dropdown, and real-time total price." },
      { icon: Zap, title: "Checkout Modal", description: "Trip summary, full price breakdown (nights × rate + cleaning fee + service fee), and mocked payment input." },
      { icon: Shield, title: "Overlap Validation", description: "Server-side check prevents double-booking. Frontend blocks previously booked date ranges in the calendar." },
      { icon: BookOpen, title: "Trips Dashboard", description: "View all upcoming and past reservations with status badges, amount paid, and cancellation option." },
    ],
  },
  {
    category: "Host Dashboard",
    color: "amber",
    features: [
      { icon: BarChart2, title: "Revenue Metrics", description: "Total revenue, hosted property count, and guest reservation counters on dashboard overview." },
      { icon: PlusCircle, title: "Create Listing", description: "Multi-field modal form: title, category, price, location, description, photo URLs, and amenity selector." },
      { icon: Edit, title: "Edit Listing", description: "Inline edit form pre-populated with existing listing data for fast updates." },
      { icon: Trash2, title: "Delete Listing", description: "Soft-confirm deletion with cascade removal of bookings and reviews." },
      { icon: Calendar, title: "Reservations Feed", description: "Incoming guest reservations for all host-owned properties with guest info and dates." },
    ],
  },
  {
    category: "UX & Responsiveness",
    color: "purple",
    features: [
      { icon: Heart, title: "Wishlist", description: "Persistent heart toggle on listing cards. Wishlisted listings stored in the database." },
      { icon: Smartphone, title: "Responsive UI", description: "Fully mobile-responsive layout with hamburger navigation, stacked cards, and touch-friendly inputs." },
      { icon: Zap, title: "Toast Notifications", description: "React Hot Toast alerts for booking success, errors, and wishlist updates." },
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  rose:   { bg: "bg-rose-500/10",   border: "border-rose-500/20",   icon: "text-rose-400",   badge: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   icon: "text-blue-400",   badge: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
  emerald:{ bg: "bg-emerald-500/10",border: "border-emerald-500/20",icon: "text-emerald-400",badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  amber:  { bg: "bg-amber-500/10",  border: "border-amber-500/20",  icon: "text-amber-400",  badge: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", badge: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
};

export default function FeaturesPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Features" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-4">
          <Zap className="h-3.5 w-3.5" />
          Getting Started
        </div>
        <h1 className="!mb-3">Features</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          A comprehensive overview of every feature implemented in the Airbnb Clone — from listing
          discovery to host management.
        </p>
      </div>

      {FEATURE_GROUPS.map((group) => {
        const c = colorMap[group.color];
        return (
          <div key={group.category} className="mb-10 not-prose">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.badge}`}>
                {group.category}
              </span>
              <span className="text-xs text-zinc-600">{group.features.length} features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`h-4 w-4 ${c.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-200 mb-1">{feat.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
