import sys
import os
from datetime import datetime, timedelta

# Ensure backend directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, SessionLocal, Base
import models

def seed_database():
    print("Resetting database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        print("Seeding amenities...")
        amenity_data = [
            ("Fast Wifi", "Wifi", "Essentials"),
            ("Fully Equipped Kitchen", "Utensils", "Essentials"),
            ("Free Parking on Premises", "Car", "Facilities"),
            ("Air Conditioning", "Wind", "Essentials"),
            ("Dedicated Workspace", "Briefcase", "Essentials"),
            ("Private Heated Pool", "Waves", "Features"),
            ("Luxury Hot Tub", "Bath", "Features"),
            ("Private Patio / Deck", "Sun", "Outdoor"),
            ("BBQ Grill", "Flame", "Outdoor"),
            ("Fire Pit", "Fire", "Outdoor"),
            ("Direct Lake Access", "Anchor", "Location"),
            ("Beachfront View", "Compass", "Location"),
            ("HD Smart TV", "Tv", "Entertainment"),
            ("Washer & Dryer", "Shirt", "Facilities"),
            ("EV Charger", "Zap", "Facilities"),
            ("Mountain Panoramic View", "Mountain", "Location"),
        ]

        amenities_map = {}
        for name, icon, cat in amenity_data:
            am = models.Amenity(name=name, icon=icon, category=cat)
            db.add(am)
            db.flush()
            amenities_map[name] = am

        print("Seeding users...")
        users = [
            models.User(
                name="Alex Morgan",
                email="alex@example.com",
                avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                is_host=False,
                is_superhost=False
            ),
            models.User(
                name="Sarah Jenkins",
                email="sarah@host.com",
                avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
                is_host=True,
                is_superhost=True
            ),
            models.User(
                name="Marcus Vance",
                email="marcus@host.com",
                avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                is_host=True,
                is_superhost=True
            ),
            models.User(
                name="Elena Rostova",
                email="elena@host.com",
                avatar_url="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
                is_host=True,
                is_superhost=False
            ),
        ]
        db.add_all(users)
        db.flush()

        alex = users[0]
        sarah = users[1]
        marcus = users[2]
        elena = users[3]

        print("Seeding listings...")
        listings_data = [
            {
                "host_id": sarah.id,
                "title": "Modern Oceanfront Villa with Infinity Pool",
                "description": "Perched dramatically above the Pacific Ocean, this architectural masterpiece offers floor-to-ceiling glass walls, a private heated infinity pool, and seamless indoor-outdoor living. Wake up to ocean breezes and spend your evenings watching sunset over the horizon.",
                "category": "Beachfront",
                "property_type": "Villa",
                "room_type": "Entire place",
                "price_per_night": 480.0,
                "cleaning_fee": 85.0,
                "service_fee": 42.0,
                "address": "1200 Pacific Coast Highway",
                "city": "Malibu",
                "country": "United States",
                "latitude": 34.0259,
                "longitude": -118.7798,
                "max_guests": 6,
                "bedrooms": 3,
                "beds": 4,
                "baths": 3.5,
                "rating": 4.95,
                "review_count": 38,
                "images": [
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Fast Wifi", "Private Heated Pool", "Beachfront View", "Air Conditioning", "Dedicated Workspace", "Free Parking on Premises", "BBQ Grill"]
            },
            {
                "host_id": marcus.id,
                "title": "A-Frame Luxury Cabin in Pine Forest",
                "description": "Escape to this secluded alpine haven surrounded by towering pines and crisp mountain air. Features a custom stone fireplace, outdoor hot tub, panoramic deck, and cozy Scandinavian interior design.",
                "category": "Cabins",
                "property_type": "Cabin",
                "room_type": "Entire place",
                "price_per_night": 295.0,
                "cleaning_fee": 60.0,
                "service_fee": 25.0,
                "address": "450 Aspen Way",
                "city": "Aspen",
                "country": "United States",
                "latitude": 39.1911,
                "longitude": -106.8175,
                "max_guests": 4,
                "bedrooms": 2,
                "beds": 3,
                "baths": 2.0,
                "rating": 4.98,
                "review_count": 64,
                "images": [
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Fast Wifi", "Luxury Hot Tub", "Fire Pit", "Mountain Panoramic View", "Fully Equipped Kitchen", "Free Parking on Premises"]
            },
            {
                "host_id": elena.id,
                "title": "Chic Tuscan Estate with Private Vineyard",
                "description": "Experience classical Mediterranean elegance in the heart of Chianti. This sprawling stone estate features private wine tasting cellars, olive groves, a stone sun terrace, and sweeping views of rolling Italian hills.",
                "category": "Mansions",
                "property_type": "Mansion",
                "room_type": "Entire place",
                "price_per_night": 750.0,
                "cleaning_fee": 120.0,
                "service_fee": 65.0,
                "address": "Via del Chianti 42",
                "city": "Siena",
                "country": "Italy",
                "latitude": 43.3188,
                "longitude": 11.3308,
                "max_guests": 10,
                "bedrooms": 5,
                "beds": 6,
                "baths": 5.0,
                "rating": 4.92,
                "review_count": 27,
                "images": [
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Private Heated Pool", "Fast Wifi", "Fully Equipped Kitchen", "Private Patio / Deck", "Free Parking on Premises", "Air Conditioning"]
            },
            {
                "host_id": sarah.id,
                "title": "Eco Glass Tiny Home with Stargazing Roof",
                "description": "Minimalist eco-luxury designed for couple reset. Completely glass-roofed bedroom for unobstructed views of the night sky, powered by solar energy with high-end designer amenities.",
                "category": "Tiny Homes",
                "property_type": "Tiny Home",
                "room_type": "Entire place",
                "price_per_night": 185.0,
                "cleaning_fee": 40.0,
                "service_fee": 18.0,
                "address": "88 Desert Ridge Road",
                "city": "Joshua Tree",
                "country": "United States",
                "latitude": 34.1347,
                "longitude": -116.3131,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "baths": 1.0,
                "rating": 4.89,
                "review_count": 52,
                "images": [
                    "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Fast Wifi", "Fire Pit", "Air Conditioning", "EV Charger", "Dedicated Workspace"]
            },
            {
                "host_id": marcus.id,
                "title": "Serene Lakefront Lodge with Kayaks & Dock",
                "description": "Step right onto your private wooden dock on Lake Tahoe. Comes equipped with complimentary kayaks, stand-up paddleboards, a wrap-around porch with hot tub, and stone fireplace.",
                "category": "Lakefront",
                "property_type": "Lodge",
                "room_type": "Entire place",
                "price_per_night": 410.0,
                "cleaning_fee": 75.0,
                "service_fee": 38.0,
                "address": "710 Shoreline Drive",
                "city": "Lake Tahoe",
                "country": "United States",
                "latitude": 39.0968,
                "longitude": -120.0324,
                "max_guests": 8,
                "bedrooms": 4,
                "beds": 5,
                "baths": 3.0,
                "rating": 4.96,
                "review_count": 45,
                "images": [
                    "https://images.unsplash.com/photo-1476514525535-ce74f45814d1?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Direct Lake Access", "Luxury Hot Tub", "Fast Wifi", "BBQ Grill", "Free Parking on Premises", "Fire Pit"]
            },
            {
                "host_id": elena.id,
                "title": "Architectural Loft in Central Paris",
                "description": "Located in Le Marais, this light-filled penthouse combines exposed 17th-century wooden beams with sleek modern Italian furnishings, high-end kitchen appliances, and balcony views of Notre-Dame.",
                "category": "Trending",
                "property_type": "Apartment",
                "room_type": "Entire place",
                "price_per_night": 340.0,
                "cleaning_fee": 55.0,
                "service_fee": 30.0,
                "address": "15 Rue des Rosiers",
                "city": "Paris",
                "country": "France",
                "latitude": 48.8566,
                "longitude": 2.3522,
                "max_guests": 3,
                "bedrooms": 1,
                "beds": 2,
                "baths": 1.5,
                "rating": 4.91,
                "review_count": 89,
                "images": [
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Fast Wifi", "Dedicated Workspace", "Air Conditioning", "Washer & Dryer", "HD Smart TV"]
            },
            {
                "host_id": sarah.id,
                "title": "Santorini White Cliffside Cave House",
                "description": "Authentic restored Greek cave residence carved directly into the Oia caldera cliffs. Private outdoor plunge pool looking directly at the Aegean Sea.",
                "category": "Omgs",
                "property_type": "Cave House",
                "room_type": "Entire place",
                "price_per_night": 520.0,
                "cleaning_fee": 70.0,
                "service_fee": 45.0,
                "address": "Caldera Walkway 12",
                "city": "Santorini",
                "country": "Greece",
                "latitude": 36.4618,
                "longitude": 25.3753,
                "max_guests": 4,
                "bedrooms": 2,
                "beds": 2,
                "baths": 2.0,
                "rating": 4.99,
                "review_count": 112,
                "images": [
                    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Private Heated Pool", "Beachfront View", "Fast Wifi", "Air Conditioning", "Private Patio / Deck"]
            },
            {
                "host_id": marcus.id,
                "title": "Modern Tropical Bamboo Treehouse",
                "description": "Immerse yourself in Bali jungle canopy. Open-air living room, natural stone bathroom, organic breakfast delivered daily, and private waterfall plunge pool.",
                "category": "Trending",
                "property_type": "Treehouse",
                "room_type": "Entire place",
                "price_per_night": 230.0,
                "cleaning_fee": 35.0,
                "service_fee": 20.0,
                "address": "Jalan Raya Ubud 88",
                "city": "Bali",
                "country": "Indonesia",
                "latitude": -8.5069,
                "longitude": 115.2625,
                "max_guests": 2,
                "bedrooms": 1,
                "beds": 1,
                "baths": 1.0,
                "rating": 4.97,
                "review_count": 78,
                "images": [
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                ],
                "amenities": ["Fast Wifi", "Private Heated Pool", "Private Patio / Deck", "Free Parking on Premises"]
            }
        ]

        for item in listings_data:
            imgs = item.pop("images")
            ams = item.pop("amenities")
            listing = models.Listing(**item)
            db.add(listing)
            db.flush()

            for idx, url in enumerate(imgs):
                db.add(models.ListingImage(listing_id=listing.id, url=url, is_primary=(idx == 0)))

            for am_name in ams:
                if am_name in amenities_map:
                    listing.amenities.append(amenities_map[am_name])

        print("Seeding reviews...")
        first_listing = db.query(models.Listing).first()
        if first_listing:
            reviews = [
                models.Review(
                    listing_id=first_listing.id,
                    user_id=alex.id,
                    rating=5.0,
                    cleanliness_rating=5.0,
                    accuracy_rating=5.0,
                    communication_rating=5.0,
                    location_rating=5.0,
                    checkin_rating=5.0,
                    value_rating=5.0,
                    comment="Absolutely breathtaking property! The infinity pool looking over the ocean made our trip unforgettable. Sarah was a super communicative host."
                ),
                models.Review(
                    listing_id=first_listing.id,
                    user_id=marcus.id,
                    rating=4.9,
                    cleanliness_rating=5.0,
                    accuracy_rating=4.9,
                    communication_rating=5.0,
                    location_rating=5.0,
                    checkin_rating=5.0,
                    value_rating=4.8,
                    comment="Worth every penny. The architectural details and sunset views are second to none. Will definitely stay here again!"
                )
            ]
            db.add_all(reviews)

        print("Seeding sample booking...")
        if first_listing:
            sample_booking = models.Booking(
                listing_id=first_listing.id,
                user_id=alex.id,
                check_in=(datetime.now() + timedelta(days=10)).strftime("%Y-%m-%d"),
                check_out=(datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d"),
                total_price=first_listing.price_per_night * 4 + first_listing.cleaning_fee + first_listing.service_fee,
                nights=4,
                guests_count=2,
                status="confirmed"
            )
            db.add(sample_booking)

        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
