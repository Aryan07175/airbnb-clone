import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Mermaid } from "@/components/Mermaid";
import { Callout } from "@/components/Callout";
import { Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Database",
  description: "SQLite schema, ER diagrams, and table relationships for the Airbnb Clone.",
};

const ER_DIAGRAM = `erDiagram
    User {
        int id PK
        string name
        string email UK
        string avatar_url
        bool is_host
        bool is_superhost
        datetime created_at
    }
    Listing {
        int id PK
        int host_id FK
        string title
        string description
        string category
        string property_type
        float price_per_night
        float cleaning_fee
        float service_fee
        string city
        string country
        float latitude
        float longitude
        int max_guests
        int bedrooms
        int beds
        float baths
        float rating
        int review_count
    }
    Booking {
        int id PK
        int listing_id FK
        int user_id FK
        string check_in
        string check_out
        float total_price
        int nights
        int guests_count
        string status
        datetime created_at
    }
    Review {
        int id PK
        int listing_id FK
        int user_id FK
        float rating
        float cleanliness_rating
        float accuracy_rating
        float communication_rating
        float location_rating
        float checkin_rating
        float value_rating
        text comment
        datetime created_at
    }
    ListingImage {
        int id PK
        int listing_id FK
        string url
        bool is_primary
        string caption
    }
    Amenity {
        int id PK
        string name UK
        string icon
        string category
    }
    Wishlist {
        int id PK
        int user_id FK
        int listing_id FK
        datetime created_at
    }

    User ||--o{ Listing : "hosts"
    User ||--o{ Booking : "makes"
    User ||--o{ Review : "writes"
    User ||--o{ Wishlist : "saves"
    Listing ||--o{ Booking : "receives"
    Listing ||--o{ Review : "has"
    Listing ||--o{ ListingImage : "has"
    Listing }o--o{ Amenity : "listing_amenities"
    Listing ||--o{ Wishlist : "wishlisted_by"`;

export default function DatabasePage() {
  return (
    <div className="doc-prose">
      <PageBreadcrumb crumbs={[{ label: "Docs", href: "/docs" }, { label: "Core Modules" }, { label: "Database" }]} />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-4">
          <Database className="h-3.5 w-3.5" />
          Core Modules
        </div>
        <h1 className="!mb-3">Database</h1>
        <p className="text-zinc-400 text-lg leading-relaxed !mb-0">
          The application uses SQLite as its database, managed through SQLAlchemy ORM.
          7 tables handle all data relationships with proper foreign key constraints and cascade deletes.
        </p>
      </div>

      <Callout type="info" title="Database Location">
        The SQLite database file is located at <code>backend/airbnb.db</code>. It is created automatically
        when the FastAPI server starts. Run <code>python seed.py</code> to populate it with sample data.
      </Callout>

      <h2>Entity Relationship Diagram</h2>
      <Mermaid chart={ER_DIAGRAM} />

      <h2>Table Descriptions</h2>

      <h3>users</h3>
      <p>Stores all registered users. The <code>is_host</code> flag determines if a user can manage listings. <code>is_superhost</code> is a badge displayed on listing detail pages.</p>
      <table>
        <thead><tr><th>Column</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><code>id</code></td><td>INTEGER PK</td><td>Auto-increment</td></tr>
          <tr><td><code>name</code></td><td>STRING</td><td>Display name</td></tr>
          <tr><td><code>email</code></td><td>STRING UNIQUE</td><td>Indexed</td></tr>
          <tr><td><code>avatar_url</code></td><td>STRING</td><td>Optional profile image URL</td></tr>
          <tr><td><code>is_host</code></td><td>BOOLEAN</td><td>Default: false</td></tr>
          <tr><td><code>is_superhost</code></td><td>BOOLEAN</td><td>Default: false</td></tr>
        </tbody>
      </table>

      <h3>listings</h3>
      <p>Core table containing all property listings. Linked to a host user. Stores location coordinates for the map, pricing details (per night + fees), and property specs.</p>
      <table>
        <thead><tr><th>Column</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td><code>host_id</code></td><td>INTEGER FK</td><td>→ users.id (CASCADE DELETE)</td></tr>
          <tr><td><code>category</code></td><td>STRING</td><td>Indexed. e.g. "Beachfront", "Cabin"</td></tr>
          <tr><td><code>price_per_night</code></td><td>FLOAT</td><td>Nightly base rate</td></tr>
          <tr><td><code>cleaning_fee</code></td><td>FLOAT</td><td>Default: $30</td></tr>
          <tr><td><code>service_fee</code></td><td>FLOAT</td><td>Default: $15</td></tr>
          <tr><td><code>latitude / longitude</code></td><td>FLOAT</td><td>For Leaflet map pins</td></tr>
          <tr><td><code>rating</code></td><td>FLOAT</td><td>Aggregate avg, default: 5.0</td></tr>
        </tbody>
      </table>

      <h3>bookings</h3>
      <p>
        Records all reservations. <code>check_in</code> and <code>check_out</code> are stored as ISO date strings
        (YYYY-MM-DD). <code>total_price</code> is pre-calculated on creation: <code>nights × price_per_night + cleaning_fee + service_fee</code>.
        <code>status</code> is either <code>confirmed</code> or <code>cancelled</code>.
      </p>

      <h3>reviews</h3>
      <p>
        Stores per-listing guest reviews. Includes 6 separate float rating dimensions (cleanliness, accuracy,
        communication, location, check-in, value) plus an overall <code>rating</code> and <code>comment</code> text.
      </p>

      <h3>listing_images</h3>
      <p>
        One-to-many with listings. Each image has a <code>url</code>, optional <code>caption</code>,
        and an <code>is_primary</code> flag used to select the cover photo for listing cards.
      </p>

      <h3>amenities + listing_amenities</h3>
      <p>
        <code>amenities</code> is a lookup table (WiFi, Pool, Hot Tub, etc.) with a name, icon identifier,
        and category. The <code>listing_amenities</code> join table implements the many-to-many relationship
        between listings and amenities.
      </p>

      <h3>wishlists</h3>
      <p>
        Simple join table between users and listings, with a <code>created_at</code> timestamp.
        Used to power the heart-toggle on listing cards.
      </p>

      <h2>Key Relationships</h2>
      <ul>
        <li><strong>User → Listings</strong>: One host can have many listings (one-to-many)</li>
        <li><strong>Listing → Bookings</strong>: One listing can receive many bookings (one-to-many)</li>
        <li><strong>Listing → Reviews</strong>: One listing can have many reviews (one-to-many)</li>
        <li><strong>Listing ↔ Amenities</strong>: Many listings can have many amenities (many-to-many via <code>listing_amenities</code>)</li>
        <li><strong>Listing → Images</strong>: One listing can have multiple images (one-to-many)</li>
        <li><strong>User ↔ Listings (Wishlist)</strong>: Many-to-many via <code>wishlists</code></li>
      </ul>

      <Callout type="warning" title="Cascade Deletes">
        All foreign key relationships use <code>ondelete="CASCADE"</code>. Deleting a listing removes all
        its bookings, reviews, images, and wishlist entries automatically.
      </Callout>
    </div>
  );
}
