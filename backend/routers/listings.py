from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/listings", tags=["Listings"])

@router.get("", response_model=List[schemas.ListingResponse])
def get_listings(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    property_type: Optional[str] = None,
    guests: Optional[int] = None,
    bedrooms: Optional[int] = None,
    check_in: Optional[str] = None,
    check_out: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Listing).options(
        joinedload(models.Listing.host),
        joinedload(models.Listing.images),
        joinedload(models.Listing.amenities)
    )

    if category and category.lower() != "all":
        query = query.filter(models.Listing.category.ilike(f"%{category}%"))

    if search:
        search_fmt = f"%{search.strip()}%"
        query = query.filter(
            (models.Listing.title.ilike(search_fmt)) |
            (models.Listing.city.ilike(search_fmt)) |
            (models.Listing.country.ilike(search_fmt)) |
            (models.Listing.address.ilike(search_fmt))
        )

    if min_price is not None:
        query = query.filter(models.Listing.price_per_night >= min_price)

    if max_price is not None:
        query = query.filter(models.Listing.price_per_night <= max_price)

    if property_type and property_type.lower() != "all":
        query = query.filter(models.Listing.property_type.ilike(f"%{property_type}%"))

    if guests is not None and guests > 0:
        query = query.filter(models.Listing.max_guests >= guests)

    if bedrooms is not None and bedrooms > 0:
        query = query.filter(models.Listing.bedrooms >= bedrooms)

    # Filter out listings with overlapping bookings if check_in and check_out provided
    if check_in and check_out:
        overlapping_subquery = db.query(models.Booking.listing_id).filter(
            models.Booking.status == "confirmed",
            models.Booking.check_in < check_out,
            models.Booking.check_out > check_in
        ).subquery()

        query = query.filter(models.Listing.id.notin_(overlapping_subquery))

    listings = query.order_by(models.Listing.created_at.desc()).all()
    return listings

@router.get("/host/{host_id}", response_model=List[schemas.ListingResponse])
def get_host_listings(host_id: int, db: Session = Depends(get_db)):
    return db.query(models.Listing).options(
        joinedload(models.Listing.host),
        joinedload(models.Listing.images),
        joinedload(models.Listing.amenities)
    ).filter(models.Listing.host_id == host_id).all()

@router.get("/amenities", response_model=List[schemas.AmenityResponse])
def get_amenities(db: Session = Depends(get_db)):
    return db.query(models.Amenity).all()

@router.get("/{listing_id}", response_model=schemas.ListingResponse)
def get_listing_detail(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).options(
        joinedload(models.Listing.host),
        joinedload(models.Listing.images),
        joinedload(models.Listing.amenities)
    ).filter(models.Listing.id == listing_id).first()

    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.post("", response_model=schemas.ListingResponse, status_code=status.HTTP_201_CREATED)
def create_listing(listing_data: schemas.ListingCreate, db: Session = Depends(get_db)):
    host = db.query(models.User).filter(models.User.id == listing_data.host_id).first()
    if not host:
        raise HTTPException(status_code=404, detail="Host user not found")

    new_listing = models.Listing(
        host_id=listing_data.host_id,
        title=listing_data.title,
        description=listing_data.description,
        category=listing_data.category,
        property_type=listing_data.property_type,
        room_type=listing_data.room_type,
        price_per_night=listing_data.price_per_night,
        cleaning_fee=listing_data.cleaning_fee,
        service_fee=listing_data.service_fee,
        address=listing_data.address,
        city=listing_data.city,
        country=listing_data.country,
        latitude=listing_data.latitude,
        longitude=listing_data.longitude,
        max_guests=listing_data.max_guests,
        bedrooms=listing_data.bedrooms,
        beds=listing_data.beds,
        baths=listing_data.baths,
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    # Attach images
    for idx, url in enumerate(listing_data.image_urls):
        img = models.ListingImage(
            listing_id=new_listing.id,
            url=url,
            is_primary=(idx == 0)
        )
        db.add(img)

    # Attach amenities
    if listing_data.amenity_ids:
        amenities = db.query(models.Amenity).filter(models.Amenity.id.in_(listing_data.amenity_ids)).all()
        new_listing.amenities = amenities

    db.commit()
    db.refresh(new_listing)
    return get_listing_detail(new_listing.id, db)

@router.put("/{listing_id}", response_model=schemas.ListingResponse)
def update_listing(listing_id: int, listing_data: schemas.ListingUpdate, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    update_dict = listing_data.model_dump(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(listing, field, value)

    db.commit()
    return get_listing_detail(listing_id, db)

@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    db.delete(listing)
    db.commit()
    return None
