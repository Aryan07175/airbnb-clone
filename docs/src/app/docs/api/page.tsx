import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { ApiEndpoint } from "@/components/ApiEndpoint";
import { Callout } from "@/components/Callout";
import { Server } from "lucide-react";

export const metadata: Metadata = {
  title: "API Reference",
  description: "Complete REST API reference for the Airbnb Clone — all 25+ endpoints documented.",
};

export default function ApiPage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Core Modules" }, { label: "API Reference" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
          <Server className="h-3.5 w-3.5" />
          Core Modules
        </div>
        <h1 className="!mb-3">API Reference</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          Complete documentation for all REST API endpoints. The backend is a FastAPI application
          deployed on Render. Click any endpoint to expand the full details.
        </p>
      </div>

      <Callout type="info" title="Base URL">
        Production: <code>https://airbnb-clone-backend-96hk.onrender.com</code>
        <br />
        Local Dev: <code>http://localhost:8000</code>
        <br />
        Auto-generated interactive docs: <code>/docs</code> (Swagger) and <code>/redoc</code>
      </Callout>

      <h2>Health & Root</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="GET"
          path="/"
          description="Root endpoint — returns service status"
          response={`{\n  "status": "online",\n  "service": "Airbnb Clone API",\n  "docs_url": "/docs"\n}`}
          statusCodes={[{ code: 200, description: "Service is online" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/health"
          description="Health check for uptime monitoring"
          response={`{ "status": "healthy" }`}
          statusCodes={[{ code: 200, description: "Healthy" }]}
        />
      </div>

      <h2>Users</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="GET"
          path="/api/users"
          description="Get all users (for mock login selector)"
          response={`[\n  {\n    "id": 1,\n    "name": "Alice Johnson",\n    "email": "alice@example.com",\n    "avatar_url": "https://...",\n    "is_host": true,\n    "is_superhost": true\n  }\n]`}
          statusCodes={[{ code: 200, description: "List of users" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/users/{user_id}"
          description="Get a specific user by ID"
          params={[{ name: "user_id", type: "integer", required: true, description: "User ID" }]}
          response={`{\n  "id": 1,\n  "name": "Alice Johnson",\n  "email": "alice@example.com",\n  "is_host": true\n}`}
          statusCodes={[{ code: 200, description: "User found" }, { code: 404, description: "User not found" }]}
        />
        <ApiEndpoint
          method="POST"
          path="/api/users"
          description="Create a new user account"
          requestBody={`{\n  "name": "Bob Smith",\n  "email": "bob@example.com",\n  "avatar_url": "https://example.com/avatar.jpg",\n  "is_host": false\n}`}
          response={`{\n  "id": 42,\n  "name": "Bob Smith",\n  "email": "bob@example.com",\n  "is_host": false,\n  "is_superhost": false,\n  "created_at": "2024-01-15T10:30:00"\n}`}
          statusCodes={[{ code: 201, description: "User created" }, { code: 400, description: "Email already exists" }]}
        />
      </div>

      <h2>Listings</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="GET"
          path="/api/listings"
          description="Get all listings with optional filters"
          params={[
            { name: "category", type: "string", required: false, description: "Filter by category (e.g. Beachfront)" },
            { name: "search", type: "string", required: false, description: "Full-text search on title, city, country" },
            { name: "min_price", type: "float", required: false, description: "Minimum price per night" },
            { name: "max_price", type: "float", required: false, description: "Maximum price per night" },
            { name: "property_type", type: "string", required: false, description: "Filter by type (Villa, Cabin...)" },
            { name: "guests", type: "integer", required: false, description: "Minimum guest capacity" },
            { name: "bedrooms", type: "integer", required: false, description: "Minimum bedroom count" },
            { name: "check_in", type: "string", required: false, description: "ISO date YYYY-MM-DD — filter available listings" },
            { name: "check_out", type: "string", required: false, description: "ISO date YYYY-MM-DD — filter available listings" },
          ]}
          response={`[\n  {\n    "id": 1,\n    "title": "Oceanfront Villa",\n    "category": "Beachfront",\n    "city": "Malibu",\n    "country": "United States",\n    "price_per_night": 450.0,\n    "rating": 4.9,\n    "host": { "id": 1, "name": "Alice", "is_superhost": true },\n    "images": [ { "url": "https://...", "is_primary": true } ],\n    "amenities": [ { "name": "WiFi", "icon": "wifi" } ]\n  }\n]`}
          statusCodes={[{ code: 200, description: "Listings array" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/listings/{listing_id}"
          description="Get a single listing by ID with full details"
          params={[{ name: "listing_id", type: "integer", required: true, description: "Listing ID" }]}
          response={`{\n  "id": 1,\n  "title": "Oceanfront Villa",\n  "description": "...",\n  "price_per_night": 450.0,\n  "cleaning_fee": 75.0,\n  "service_fee": 55.0,\n  "max_guests": 8,\n  "bedrooms": 4,\n  "beds": 5,\n  "baths": 3.5,\n  "rating": 4.9,\n  "review_count": 124\n}`}
          statusCodes={[{ code: 200, description: "Listing details" }, { code: 404, description: "Not found" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/listings/host/{host_id}"
          description="Get all listings for a specific host"
          params={[{ name: "host_id", type: "integer", required: true, description: "Host user ID" }]}
          response={`[ ...array of listings owned by host... ]`}
          statusCodes={[{ code: 200, description: "Host's listings" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/listings/amenities"
          description="Get all available amenities for listing creation"
          response={`[\n  { "id": 1, "name": "WiFi", "icon": "wifi", "category": "General" },\n  { "id": 2, "name": "Heated Pool", "icon": "pool", "category": "Outdoor" }\n]`}
          statusCodes={[{ code: 200, description: "Amenities list" }]}
        />
        <ApiEndpoint
          method="POST"
          path="/api/listings"
          description="Create a new listing (host only)"
          requestBody={`{\n  "host_id": 1,\n  "title": "Cozy Mountain Cabin",\n  "description": "Peaceful retreat...",\n  "category": "Cabin",\n  "property_type": "Cabin",\n  "room_type": "Entire place",\n  "price_per_night": 180.0,\n  "cleaning_fee": 40.0,\n  "service_fee": 25.0,\n  "address": "123 Pine Rd",\n  "city": "Aspen",\n  "country": "United States",\n  "latitude": 39.1911,\n  "longitude": -106.8175,\n  "max_guests": 4,\n  "bedrooms": 2,\n  "beds": 3,\n  "baths": 2.0,\n  "image_urls": ["https://...", "https://..."],\n  "amenity_ids": [1, 3, 5]\n}`}
          statusCodes={[{ code: 201, description: "Listing created" }, { code: 404, description: "Host not found" }]}
        />
        <ApiEndpoint
          method="PUT"
          path="/api/listings/{listing_id}"
          description="Update an existing listing (partial update supported)"
          params={[{ name: "listing_id", type: "integer", required: true, description: "Listing ID to update" }]}
          requestBody={`{\n  "price_per_night": 200.0,\n  "description": "Updated description..."\n}`}
          statusCodes={[{ code: 200, description: "Updated listing" }, { code: 404, description: "Not found" }]}
        />
        <ApiEndpoint
          method="DELETE"
          path="/api/listings/{listing_id}"
          description="Delete a listing and all its related records (cascade)"
          params={[{ name: "listing_id", type: "integer", required: true, description: "Listing ID to delete" }]}
          statusCodes={[{ code: 204, description: "Deleted (no content)" }, { code: 404, description: "Not found" }]}
        />
      </div>

      <h2>Bookings</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="POST"
          path="/api/bookings"
          description="Create a new booking — validates dates, overlap, guest count, and calculates total price"
          requestBody={`{\n  "listing_id": 1,\n  "user_id": 2,\n  "check_in": "2024-08-10",\n  "check_out": "2024-08-15",\n  "guests_count": 2\n}`}
          response={`{\n  "id": 99,\n  "listing_id": 1,\n  "user_id": 2,\n  "check_in": "2024-08-10",\n  "check_out": "2024-08-15",\n  "nights": 5,\n  "total_price": 2350.0,\n  "guests_count": 2,\n  "status": "confirmed",\n  "created_at": "2024-07-01T12:00:00"\n}`}
          statusCodes={[{ code: 201, description: "Booking confirmed" }, { code: 400, description: "Date overlap / invalid dates / guests exceeded" }, { code: 404, description: "Listing or user not found" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/bookings/user/{user_id}"
          description="Get all bookings made by a specific user (Trips Dashboard)"
          params={[{ name: "user_id", type: "integer", required: true, description: "User ID" }]}
          statusCodes={[{ code: 200, description: "User's bookings" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/bookings/listing/{listing_id}"
          description="Get all confirmed bookings for a listing (used to disable booked dates in calendar)"
          params={[{ name: "listing_id", type: "integer", required: true, description: "Listing ID" }]}
          statusCodes={[{ code: 200, description: "Listing's confirmed bookings" }]}
        />
        <ApiEndpoint
          method="GET"
          path="/api/bookings/host/{host_id}"
          description="Get all bookings received by a host across all their listings (Host Dashboard)"
          params={[{ name: "host_id", type: "integer", required: true, description: "Host user ID" }]}
          statusCodes={[{ code: 200, description: "Host's received bookings" }]}
        />
        <ApiEndpoint
          method="PUT"
          path="/api/bookings/{booking_id}/cancel"
          description="Cancel a specific booking (sets status to 'cancelled')"
          params={[{ name: "booking_id", type: "integer", required: true, description: "Booking ID" }]}
          statusCodes={[{ code: 200, description: "Cancelled booking" }, { code: 404, description: "Not found" }]}
        />
      </div>

      <h2>Reviews</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="GET"
          path="/api/reviews/listing/{listing_id}"
          description="Get all reviews for a specific listing"
          params={[{ name: "listing_id", type: "integer", required: true, description: "Listing ID" }]}
          response={`[\n  {\n    "id": 1,\n    "rating": 4.8,\n    "cleanliness_rating": 5.0,\n    "accuracy_rating": 4.5,\n    "communication_rating": 5.0,\n    "comment": "Amazing place!",\n    "user": { "name": "Bob", "avatar_url": "..." }\n  }\n]`}
          statusCodes={[{ code: 200, description: "Reviews array" }]}
        />
        <ApiEndpoint
          method="POST"
          path="/api/reviews"
          description="Submit a new review for a listing"
          requestBody={`{\n  "listing_id": 1,\n  "user_id": 3,\n  "rating": 4.8,\n  "cleanliness_rating": 5.0,\n  "accuracy_rating": 4.5,\n  "communication_rating": 5.0,\n  "location_rating": 5.0,\n  "checkin_rating": 4.5,\n  "value_rating": 4.8,\n  "comment": "Absolutely stunning property!"\n}`}
          statusCodes={[{ code: 201, description: "Review created" }, { code: 404, description: "Listing/user not found" }]}
        />
      </div>

      <h2>Wishlists</h2>
      <div className="not-prose">
        <ApiEndpoint
          method="GET"
          path="/api/wishlists/{user_id}"
          description="Get all wishlisted listings for a user"
          params={[{ name: "user_id", type: "integer", required: true, description: "User ID" }]}
          statusCodes={[{ code: 200, description: "Wishlist items" }]}
        />
        <ApiEndpoint
          method="POST"
          path="/api/wishlists"
          description="Add a listing to a user's wishlist"
          requestBody={`{ "user_id": 1, "listing_id": 5 }`}
          statusCodes={[{ code: 201, description: "Added to wishlist" }, { code: 400, description: "Already wishlisted" }]}
        />
        <ApiEndpoint
          method="DELETE"
          path="/api/wishlists/{user_id}/{listing_id}"
          description="Remove a listing from a user's wishlist"
          params={[
            { name: "user_id", type: "integer", required: true, description: "User ID" },
            { name: "listing_id", type: "integer", required: true, description: "Listing ID" },
          ]}
          statusCodes={[{ code: 204, description: "Removed" }, { code: 404, description: "Not found" }]}
        />
      </div>
    </div>
  );
}
