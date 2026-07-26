from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.get("/listing/{listing_id}", response_model=List[schemas.ReviewResponse])
def get_listing_reviews(listing_id: int, db: Session = Depends(get_db)):
    return db.query(models.Review).options(
        joinedload(models.Review.user)
    ).filter(models.Review.listing_id == listing_id).order_by(models.Review.created_at.desc()).all()

@router.post("", response_model=schemas.ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(review_data: schemas.ReviewCreate, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.id == review_data.listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    user = db.query(models.User).filter(models.User.id == review_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_review = models.Review(**review_data.model_dump())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # Recalculate rating & review count for the listing
    avg_rating = db.query(func.avg(models.Review.rating)).filter(models.Review.listing_id == review_data.listing_id).scalar()
    rev_count = db.query(func.count(models.Review.id)).filter(models.Review.listing_id == review_data.listing_id).scalar()

    if avg_rating:
        listing.rating = round(float(avg_rating), 2)
    listing.review_count = rev_count
    db.commit()

    return db.query(models.Review).options(
        joinedload(models.Review.user)
    ).filter(models.Review.id == new_review.id).first()
