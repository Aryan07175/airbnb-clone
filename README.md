# Airbnb Web App Clone (SDE Fullstack Assignment)

A functional, pixel-perfect clone of the **Airbnb Web Application** built with modern web technologies, replicating Airbnb's visual identity, user experience, and core booking workflows.

## 🚀 Live Demo
- **Frontend (Vercel)**: [https://airbnb-clone-one-coral.vercel.app](https://airbnb-clone-one-coral.vercel.app)
- **Backend API (Render)**: [https://airbnb-clone-backend-96hk.onrender.com/docs](https://airbnb-clone-backend-96hk.onrender.com/docs)

---

## 🚀 Features Overview

### 1. Home & Explore
- **Grid of Listing Cards**: Photo carousel, title, city/country, price per night, star rating, host avatar, and animated heart wishlist toggle.
- **Floating Pill Search Bar**: Search by destination location, date range picker, and guest capacity.
- **Category Filter Bar**: Scrollable list of categories (Beachfront, Cabins, Mansions, Tiny Homes, Lakefront, Trending, OMG!) with active state indicators.
- **Filter Modal**: Price range slider, property types (Villa, Cabin, Mansion, Apartment, Tiny Home), and bedroom count.
- **Interactive Leaflet Map**: Floating "Show map / Show list" toggle featuring custom price-pin markers and listing preview popups.

### 2. Listing Detail View (`/listings/[id]`)
- **Photo Lightbox Gallery**: 5-photo Airbnb hero grid layout + full-screen gallery modal.
- **Host Info & Superhost Badge**: Host profile details, capacity, bedrooms, beds, and baths specs.
- **Amenities Grid**: Categorized icons for Wifi, Heated Pool, Hot Tub, BBQ Grill, Workspace, etc.
- **Availability & Sticky Booking Card**: Dynamic date-range picker, disabled date overlap blocking, guest count dropdown, and real-time total price calculation (nights × rate + fees).
- **Reviews & Ratings**: Detailed breakdown across 6 rating dimensions, guest review cards, and an interactive "Leave a Review" submission modal.

### 3. End-to-End Booking Flow & Trips (`/trips`)
- **Checkout Modal**: Trip summary, date range, guest count, price breakdown, and mocked payment credit card input.
- **Overlap Validation**: Prevents double-booking or selecting unavailable date ranges.
- **My Trips Dashboard**: Active & upcoming reservations, total amount paid, status badges, and reservation cancellation.

### 4. Host Experience (CRUD) & Dashboard (`/host`)
- **Revenue & Reservation Metrics**: Total host revenue, hosted property count, and guest reservation counters.
- **Listing CRUD**: View owned listings, edit details, and delete listings.
- **Create New Listing Flow**: Modal form for publishing new stays with title, category, price, location, description, photo URLs, and amenities selector.
- **Reservations Feed**: Manage incoming guest reservations for host-owned properties.

---

## 🛠️ Technical Stack

- **Frontend**: Next.js 14+ (TypeScript, Tailwind CSS, Lucide React, Leaflet & React-Leaflet, React Hot Toast)
- **Backend**: Python 3.10+ with FastAPI, Pydantic v2, SQLAlchemy ORM
- **Database**: SQLite (`airbnb.db`) with automatic table initialization and rich seeder data

---

## 🗄️ Database Schema Design

```
+----------------+       +-------------------+       +--------------------+
|     User       |       |      Listing      |       |      Booking       |
+----------------+       +-------------------+       +--------------------+
| id (PK)        | 1---* | id (PK)           | 1---* | id (PK)            |
| name           |       | host_id (FK)      |       | listing_id (FK)    |
| email          |       | title             |       | user_id (FK)       |
| avatar_url     |       | category          |       | check_in           |
| is_host        |       | price_per_night   |       | check_out          |
| is_superhost   |       | city, country     |       | total_price        |
+----------------+       | rating            |       | status             |
                         +-------------------+       +--------------------+
                                   |
                         +---------+---------+
                         |                   |
               +-------------------+ +---------------+
               |   ListingImage    | |    Review     |
               +-------------------+ +---------------+
               | id (PK)           | | id (PK)       |
               | listing_id (FK)   | | listing_id    |
               | url               | | user_id (FK)  |
               +-------------------+ | rating        |
                                     | comment       |
                                     +---------------+
```

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- Node.js v18+ & npm
- Python 3.10+

### 1. Start the FastAPI Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
python -m pip install -r requirements.txt

# Seed SQLite database with sample listings, hosts, and reviews
python seed.py

# Run FastAPI dev server (listening at http://127.0.0.1:8000)
python -m uvicorn main:app --reload --port 8000
```

### 2. Start the Next.js Frontend
```bash
# Open a new terminal in the frontend directory
cd frontend

# Run Next.js dev server (listening at http://localhost:3000)
npm run dev
```

Open **http://localhost:3000** in your browser to explore the application!
