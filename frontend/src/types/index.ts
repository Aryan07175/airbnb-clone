export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  is_host: boolean;
  is_superhost: boolean;
  created_at: string;
}

export interface ListingImage {
  id: number;
  listing_id: number;
  url: string;
  is_primary: boolean;
  caption?: string;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  category: string;
}

export interface Listing {
  id: number;
  host_id: number;
  title: string;
  description: string;
  category: string;
  property_type: string;
  room_type: string;
  price_per_night: number;
  cleaning_fee: number;
  service_fee: number;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  max_guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  review_count: number;
  created_at: string;
  host: User;
  images: ListingImage[];
  amenities: Amenity[];
}

export interface Booking {
  id: number;
  listing_id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  total_price: number;
  nights: number;
  guests_count: number;
  status: string;
  created_at: string;
  listing: Listing;
  user: User;
}

export interface Review {
  id: number;
  listing_id: number;
  user_id: number;
  rating: number;
  cleanliness_rating: number;
  accuracy_rating: number;
  communication_rating: number;
  location_rating: number;
  checkin_rating: number;
  value_rating: number;
  comment: string;
  created_at: string;
  user: User;
}

export interface Wishlist {
  id: number;
  user_id: number;
  listing_id: number;
  created_at: string;
  listing: Listing;
}

export interface FilterState {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  guests: number;
  bedrooms: number;
  checkIn: string;
  checkOut: string;
}
