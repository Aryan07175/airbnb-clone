from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str
    avatar_url: Optional[str] = None
    is_host: bool = False
    is_superhost: bool = False

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ListingImageBase(BaseModel):
    url: str
    is_primary: bool = False
    caption: Optional[str] = None

class ListingImageResponse(ListingImageBase):
    id: int
    listing_id: int
    model_config = ConfigDict(from_attributes=True)

class AmenityBase(BaseModel):
    name: str
    icon: str
    category: str = "General"

class AmenityResponse(AmenityBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class ListingBase(BaseModel):
    title: str
    description: str
    category: str
    property_type: str
    room_type: str = "Entire place"
    price_per_night: float
    cleaning_fee: float = 30.0
    service_fee: float = 15.0
    address: str
    city: str
    country: str
    latitude: float
    longitude: float
    max_guests: int = 2
    bedrooms: int = 1
    beds: int = 1
    baths: float = 1.0

class ListingCreate(ListingBase):
    host_id: int
    image_urls: List[str]
    amenity_ids: List[int] = []

class ListingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    property_type: Optional[str] = None
    price_per_night: Optional[float] = None
    max_guests: Optional[int] = None
    bedrooms: Optional[int] = None
    beds: Optional[int] = None
    baths: Optional[float] = None

class ListingResponse(ListingBase):
    id: int
    host_id: int
    rating: float
    review_count: int
    created_at: datetime
    host: UserResponse
    images: List[ListingImageResponse]
    amenities: List[AmenityResponse]
    model_config = ConfigDict(from_attributes=True)

class BookingBase(BaseModel):
    listing_id: int
    user_id: int
    check_in: str
    check_out: str
    guests_count: int = 1

class BookingCreate(BookingBase):
    pass

class BookingResponse(BaseModel):
    id: int
    listing_id: int
    user_id: int
    check_in: str
    check_out: str
    total_price: float
    nights: int
    guests_count: int
    status: str
    created_at: datetime
    listing: ListingResponse
    user: UserResponse
    model_config = ConfigDict(from_attributes=True)

class ReviewCreate(BaseModel):
    listing_id: int
    user_id: int
    rating: float
    cleanliness_rating: float = 5.0
    accuracy_rating: float = 5.0
    communication_rating: float = 5.0
    location_rating: float = 5.0
    checkin_rating: float = 5.0
    value_rating: float = 5.0
    comment: str

class ReviewResponse(BaseModel):
    id: int
    listing_id: int
    user_id: int
    rating: float
    cleanliness_rating: float
    accuracy_rating: float
    communication_rating: float
    location_rating: float
    checkin_rating: float
    value_rating: float
    comment: str
    created_at: datetime
    user: UserResponse
    model_config = ConfigDict(from_attributes=True)

class WishlistCreate(BaseModel):
    user_id: int
    listing_id: int

class WishlistResponse(BaseModel):
    id: int
    user_id: int
    listing_id: int
    created_at: datetime
    listing: ListingResponse
    model_config = ConfigDict(from_attributes=True)
