import { Listing, Booking, Review, Wishlist, User, Amenity, FilterState } from "@/types";

const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchListings(filters: Partial<FilterState> = {}): Promise<Listing[]> {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== "All") params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice) params.append("min_price", filters.minPrice.toString());
  if (filters.maxPrice) params.append("max_price", filters.maxPrice.toString());
  if (filters.propertyType && filters.propertyType !== "All") params.append("property_type", filters.propertyType);
  if (filters.guests) params.append("guests", filters.guests.toString());
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms.toString());
  if (filters.checkIn) params.append("check_in", filters.checkIn);
  if (filters.checkOut) params.append("check_out", filters.checkOut);

  const res = await fetch(`${API_BASE}/listings?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
}

export async function fetchListingDetail(id: number): Promise<Listing> {
  const res = await fetch(`${API_BASE}/listings/${id}`);
  if (!res.ok) throw new Error("Failed to fetch listing details");
  return res.json();
}

export async function fetchHostListings(hostId: number): Promise<Listing[]> {
  const res = await fetch(`${API_BASE}/listings/host/${hostId}`);
  if (!res.ok) throw new Error("Failed to fetch host listings");
  return res.json();
}

export async function createListing(data: {
  host_id: number;
  title: string;
  description: string;
  category: string;
  property_type: string;
  room_type?: string;
  price_per_night: number;
  cleaning_fee?: number;
  service_fee?: number;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  max_guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  image_urls: string[];
  amenity_ids?: number[];
}): Promise<Listing> {
  const res = await fetch(`${API_BASE}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create listing");
  }
  return res.json();
}

export async function updateListing(id: number, data: Partial<Listing>): Promise<Listing> {
  const res = await fetch(`${API_BASE}/listings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update listing");
  return res.json();
}

export async function deleteListing(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/listings/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete listing");
}

export async function fetchAmenities(): Promise<Amenity[]> {
  const res = await fetch(`${API_BASE}/listings/amenities`);
  if (!res.ok) throw new Error("Failed to fetch amenities");
  return res.json();
}

export async function createBooking(data: {
  listing_id: number;
  user_id: number;
  check_in: string;
  check_out: string;
  guests_count: number;
}): Promise<Booking> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create booking");
  }
  return res.json();
}

export async function fetchUserBookings(userId: number): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/bookings/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user bookings");
  return res.json();
}

export async function fetchListingBookings(listingId: number): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/bookings/listing/${listingId}`);
  if (!res.ok) throw new Error("Failed to fetch listing bookings");
  return res.json();
}

export async function fetchHostBookings(hostId: number): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/bookings/host/${hostId}`);
  if (!res.ok) throw new Error("Failed to fetch host reservations");
  return res.json();
}

export async function cancelBooking(bookingId: number): Promise<Booking> {
  const res = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to cancel booking");
  return res.json();
}

export async function fetchListingReviews(listingId: number): Promise<Review[]> {
  const res = await fetch(`${API_BASE}/reviews/listing/${listingId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function createReview(data: {
  listing_id: number;
  user_id: number;
  rating: number;
  cleanliness_rating?: number;
  accuracy_rating?: number;
  communication_rating?: number;
  location_rating?: number;
  checkin_rating?: number;
  value_rating?: number;
  comment: string;
}): Promise<Review> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}

export async function fetchUserWishlist(userId: number): Promise<Wishlist[]> {
  const res = await fetch(`${API_BASE}/wishlists/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function toggleWishlist(userId: number, listingId: number): Promise<{ saved: boolean }> {
  const res = await fetch(`${API_BASE}/wishlists/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, listing_id: listingId }),
  });
  if (!res.ok) throw new Error("Failed to toggle wishlist");
  return res.json();
}
