import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Callout } from "@/components/Callout";
import { Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Frontend",
  description: "Frontend architecture, pages, and components for the Airbnb Clone Next.js app.",
};

export default function FrontendPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Core Modules" }, { label: "Frontend" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
          <Code className="h-3.5 w-3.5" />
          Core Modules
        </div>
        <h1 className="!mb-3">Frontend</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          Built with Next.js 14 App Router, TypeScript, and TailwindCSS. Deployed to Vercel with automatic deployments.
        </p>
      </div>

      <h2>Technology Stack</h2>
      <table>
        <thead><tr><th>Package</th><th>Version</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>next</code></td><td>14.x</td><td>React framework with App Router, SSR, file-based routing</td></tr>
          <tr><td><code>typescript</code></td><td>5.x</td><td>Static type safety across all components</td></tr>
          <tr><td><code>tailwindcss</code></td><td>3.x</td><td>Utility-first CSS, responsive design</td></tr>
          <tr><td><code>react-leaflet</code></td><td>4.x</td><td>Interactive listing map with price-pin markers</td></tr>
          <tr><td><code>react-hot-toast</code></td><td>2.x</td><td>Success/error toast notifications</td></tr>
          <tr><td><code>lucide-react</code></td><td>latest</td><td>Icon library used throughout the UI</td></tr>
        </tbody>
      </table>

      <h2>Pages (App Router)</h2>
      <table>
        <thead><tr><th>Route</th><th>File</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>/</code></td><td><code>app/page.tsx</code></td><td>Home page with listing grid, search, category filter, map</td></tr>
          <tr><td><code>/listings/[id]</code></td><td><code>app/listings/[id]/page.tsx</code></td><td>Listing detail: gallery, amenities, booking card, reviews</td></tr>
          <tr><td><code>/trips</code></td><td><code>app/trips/page.tsx</code></td><td>User trips dashboard with booking history and cancellation</td></tr>
          <tr><td><code>/host</code></td><td><code>app/host/page.tsx</code></td><td>Host dashboard: revenue, listings CRUD, reservations</td></tr>
        </tbody>
      </table>

      <h2>Key Components</h2>
      <table>
        <thead><tr><th>Component</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>Navbar</code></td><td>Sticky top nav with user picker, search, wishlist icon</td></tr>
          <tr><td><code>ListingCard</code></td><td>Photo carousel, price, rating, wishlist heart toggle</td></tr>
          <tr><td><code>CategoryFilter</code></td><td>Horizontally scrollable category pills</td></tr>
          <tr><td><code>SearchBar</code></td><td>Floating pill with location, dates, guests</td></tr>
          <tr><td><code>MapView</code></td><td>Leaflet map with price markers + listing popups</td></tr>
          <tr><td><code>FilterModal</code></td><td>Price slider, property type, bedrooms</td></tr>
          <tr><td><code>BookingCard</code></td><td>Sticky date picker, price calc, Reserve button</td></tr>
          <tr><td><code>CheckoutModal</code></td><td>Trip summary + mocked payment form</td></tr>
          <tr><td><code>PhotoGallery</code></td><td>5-photo Airbnb grid + full-screen lightbox</td></tr>
          <tr><td><code>ReviewCard</code></td><td>Star rating, 6-dimension breakdown, comment</td></tr>
          <tr><td><code>CreateListingModal</code></td><td>Host listing creation multi-field form</td></tr>
        </tbody>
      </table>

      <h2>State Management</h2>
      <p>
        The app uses React&apos;s built-in <code>useState</code> and <code>useEffect</code> hooks for local component state.
        No global state library (Redux, Zustand) is used.
      </p>
      <ul>
        <li><strong>Current User</strong> — stored in <code>localStorage</code> as <code>currentUserId</code> (mock auth)</li>
        <li><strong>Wishlist state</strong> — fetched from <code>GET /api/wishlists/{"{userId}"}</code> on mount</li>
        <li><strong>Listings</strong> — fetched per-page via <code>useEffect</code> with filter params</li>
        <li><strong>Booking dates</strong> — local state in <code>BookingCard</code> with validation</li>
      </ul>

      <h2>API Communication</h2>
      <p>
        All backend calls go through a centralized <code>src/lib/api.ts</code> utility module that wraps
        <code>fetch</code> with the base URL and default headers. The backend URL is set via the
        <code>NEXT_PUBLIC_API_URL</code> environment variable.
      </p>

      <Callout type="info" title="No Authentication">
        The app implements a simplified mock authentication — users select their identity from a dropdown.
        There is no JWT, session cookie, or OAuth flow. This is intentional for the assignment scope.
      </Callout>

      <h2>Responsive Design</h2>
      <p>
        TailwindCSS breakpoints are used throughout for mobile-first responsive design:
      </p>
      <ul>
        <li><strong>Mobile (&lt;768px)</strong>: Stacked single-column layout, bottom sheet modals, hamburger nav</li>
        <li><strong>Tablet (768px–1024px)</strong>: Two-column listing grid, condensed sidebar</li>
        <li><strong>Desktop (1024px+)</strong>: Four-column grid, sticky booking card, full map sidebar</li>
      </ul>
    </div>
  );
}
