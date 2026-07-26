from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/wishlists", tags=["Wishlists"])

@router.get("/user/{user_id}", response_model=List[schemas.WishlistResponse])
def get_user_wishlist(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Wishlist).options(
        joinedload(models.Wishlist.listing).joinedload(models.Listing.images),
        joinedload(models.Wishlist.listing).joinedload(models.Listing.host)
    ).filter(models.Wishlist.user_id == user_id).order_by(models.Wishlist.created_at.desc()).all()

@router.post("/toggle")
def toggle_wishlist(data: schemas.WishlistCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Wishlist).filter(
        models.Wishlist.user_id == data.user_id,
        models.Wishlist.listing_id == data.listing_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"saved": False, "message": "Removed from wishlist"}
    else:
        new_item = models.Wishlist(user_id=data.user_id, listing_id=data.listing_id)
        db.add(new_item)
        db.commit()
        return {"saved": True, "message": "Saved to wishlist"}
