from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import datetime
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.post("", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking_data: schemas.BookingCreate, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.id == booking_data.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    user = db.query(models.User).filter(models.User.id == booking_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Validate dates format and range
    try:
        dt_in = datetime.strptime(booking_data.check_in, "%Y-%m-%d")
        dt_out = datetime.strptime(booking_data.check_out, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD")

    if dt_in >= dt_out:
        raise HTTPException(status_code=400, detail="Check-out date must be after check-in date")

    nights = (dt_out - dt_in).days
    if nights <= 0:
        raise HTTPException(status_code=400, detail="Booking must be at least 1 night")

    if booking_data.guests_count > listing.max_guests:
        raise HTTPException(status_code=400, detail=f"Maximum allowed guests for this stay is {listing.max_guests}")

    # Check for overlapping confirmed bookings
    overlapping = db.query(models.Booking).filter(
        models.Booking.listing_id == booking_data.listing_id,
        models.Booking.status == "confirmed",
        models.Booking.check_in < booking_data.check_out,
        models.Booking.check_out > booking_data.check_in
    ).first()

    if overlapping:
        raise HTTPException(status_code=400, detail="Selected dates are unavailable for this property")

    total_price = round((nights * listing.price_per_night) + listing.cleaning_fee + listing.service_fee, 2)

    new_booking = models.Booking(
        listing_id=booking_data.listing_id,
        user_id=booking_data.user_id,
        check_in=booking_data.check_in,
        check_out=booking_data.check_out,
        total_price=total_price,
        nights=nights,
        guests_count=booking_data.guests_count,
        status="confirmed"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    # Return full object with relationships
    return db.query(models.Booking).options(
        joinedload(models.Booking.listing).joinedload(models.Listing.images),
        joinedload(models.Booking.listing).joinedload(models.Listing.host),
        joinedload(models.Booking.user)
    ).filter(models.Booking.id == new_booking.id).first()

@router.get("/user/{user_id}", response_model=List[schemas.BookingResponse])
def get_user_bookings(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Booking).options(
        joinedload(models.Booking.listing).joinedload(models.Listing.images),
        joinedload(models.Booking.listing).joinedload(models.Listing.host),
        joinedload(models.Booking.user)
    ).filter(models.Booking.user_id == user_id).order_by(models.Booking.created_at.desc()).all()

@router.get("/listing/{listing_id}", response_model=List[schemas.BookingResponse])
def get_listing_bookings(listing_id: int, db: Session = Depends(get_db)):
    return db.query(models.Booking).options(
        joinedload(models.Booking.listing),
        joinedload(models.Booking.user)
    ).filter(
        models.Booking.listing_id == listing_id,
        models.Booking.status == "confirmed"
    ).all()

@router.get("/host/{host_id}", response_model=List[schemas.BookingResponse])
def get_host_received_bookings(host_id: int, db: Session = Depends(get_db)):
    return db.query(models.Booking).join(models.Listing).options(
        joinedload(models.Booking.listing).joinedload(models.Listing.images),
        joinedload(models.Booking.user)
    ).filter(models.Listing.host_id == host_id).order_by(models.Booking.created_at.desc()).all()

@router.put("/{booking_id}/cancel", response_model=schemas.BookingResponse)
def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "cancelled"
    db.commit()

    return db.query(models.Booking).options(
        joinedload(models.Booking.listing).joinedload(models.Listing.images),
        joinedload(models.Booking.listing).joinedload(models.Listing.host),
        joinedload(models.Booking.user)
    ).filter(models.Booking.id == booking_id).first()
