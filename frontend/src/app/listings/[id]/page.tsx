"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import CheckoutModal from "@/components/modals/CheckoutModal";
import ListingMap from "@/components/map/ListingMap";
import { useApp } from "@/context/AppContext";
import {
  fetchListingDetail,
  fetchListingBookings,
  fetchListingReviews,
  createReview
} from "@/services/api";
import { Listing, Booking, Review } from "@/types";
import {
  Star,
  Heart,
  Share2,
  Users,
  Bed,
  Bath,
  ShieldCheck,
  Award,
  Calendar,
  CheckCircle2,
  Grid,
  X,
  MessageSquare
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = Number(params?.id);
  const { currentUser, toggleFavorite, isFavorite } = useApp();

  const [listing, setListing] = useState<Listing | null>(null);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Gallery Lightbox Modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (!listingId) return;

    setIsLoading(true);
    Promise.all([
      fetchListingDetail(listingId),
      fetchListingBookings(listingId),
      fetchListingReviews(listingId),
    ])
      .then(([listingRes, bookingsRes, reviewsRes]) => {
        setListing(listingRes);
        setConfirmedBookings(bookingsRes);
        setReviews(reviewsRes);
      })
      .catch((err) => {
        console.error("Error loading listing:", err);
        toast.error("Failed to load listing details");
      })
      .finally(() => setIsLoading(false));
  }, [listingId]);

  if (isLoading || !listing) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="max-w-[1120px] mx-auto px-4 py-12 w-full animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-md w-2/3" />
          <div className="h-4 bg-gray-200 rounded-md w-1/3" />
          <div className="h-[400px] bg-gray-200 rounded-3xl w-full" />
        </div>
      </div>
    );
  }

  const favorited = isFavorite(listing.id);
  const images = listing.images.map((img) => img.url);

  // Calculate stay duration
  let nights = 0;
  let totalPrice = 0;
  if (checkIn && checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (nights > 0) {
      totalPrice = Math.round((nights * listing.price_per_night) + listing.cleaning_fee + listing.service_fee);
    }
  }

  const handleReserveClick = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }
    if (nights <= 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please select a user to leave a review");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setIsSubmittingReview(true);
      const rev = await createReview({
        listing_id: listing.id,
        user_id: currentUser.id,
        rating: newRating,
        comment: newComment,
      });

      setReviews((prev) => [rev, ...prev]);
      toast.success("Thank you for your review! ⭐");
      setShowReviewModal(false);
      setNewComment("");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <Navbar />

      <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-8 w-full flex-1">
        {/* Title Header */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {listing.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-gray-800">
              <Star className="h-4 w-4 fill-black text-black" />
              <span>{listing.rating.toFixed(2)}</span>
              <span>•</span>
              <span className="underline cursor-pointer">{reviews.length} reviews</span>
              <span>•</span>
              {listing.host?.is_superhost && (
                <>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-[#FF385C]" /> Superhost
                  </span>
                  <span>•</span>
                </>
              )}
              <span className="underline text-gray-600 cursor-pointer">
                {listing.address}, {listing.city}, {listing.country}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Listing link copied to clipboard!");
                }}
                className="flex items-center gap-1.5 underline hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button
                onClick={() => toggleFavorite(listing.id)}
                className="flex items-center gap-1.5 underline hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorited ? "fill-[#FF385C] text-[#FF385C]" : "text-gray-900"
                  }`}
                />
                {favorited ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Airbnb 5-Photo Gallery Grid */}
        <div className="relative rounded-3xl overflow-hidden mb-10 group">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-[16/9] max-h-[480px]">
            {/* Main Primary Image */}
            <div className="md:col-span-2 relative h-full">
              <img
                src={images[0]}
                alt={listing.title}
                className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
                onClick={() => setShowGalleryModal(true)}
              />
            </div>
            {/* 4 Side Images */}
            <div className="hidden md:grid grid-cols-2 col-span-2 gap-2 h-full">
              {images.slice(1, 5).map((imgUrl, idx) => (
                <div key={idx} className="relative h-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`${listing.title} photo ${idx + 2}`}
                    className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
                    onClick={() => setShowGalleryModal(true)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => setShowGalleryModal(true)}
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 border border-gray-900 text-gray-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Grid className="h-3.5 w-3.5" /> Show all photos
          </button>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (Listing Specs & Details) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Section */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {listing.room_type} hosted by {listing.host?.name || "Host"}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{listing.max_guests} guests</span>
                  <span>•</span>
                  <span>{listing.bedrooms} bedrooms</span>
                  <span>•</span>
                  <span>{listing.beds} beds</span>
                  <span>•</span>
                  <span>{listing.baths} baths</span>
                </div>
              </div>
              <img
                src={listing.host?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={listing.host?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
              />
            </div>

            {/* Highlights */}
            <div className="space-y-4 pb-6 border-b border-gray-200 text-xs">
              <div className="flex items-start gap-4">
                <Award className="h-6 w-6 text-[#FF385C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">
                    {listing.host?.name} is a Superhost
                  </h4>
                  <p className="text-gray-500">
                    Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-gray-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Great check-in experience</h4>
                  <p className="text-gray-500">
                    95% of recent guests gave the check-in process a 5-star rating.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-3">About this space</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((am) => (
                  <div key={am.id} className="flex items-center gap-3 text-xs font-semibold text-gray-800">
                    <CheckCircle2 className="h-4 w-4 text-[#FF385C]" />
                    <span>{am.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Where you'll be</h3>
              <p className="text-xs text-gray-500 mb-4">{listing.city}, {listing.country}</p>
              <div className="h-80 w-full">
                <ListingMap listings={[listing]} />
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-black text-black" />
                  <h3 className="font-bold text-xl text-gray-900">
                    {listing.rating.toFixed(2)} • {reviews.length} reviews
                  </h3>
                </div>

                <button
                  onClick={() => setShowReviewModal(true)}
                  className="border border-black text-black hover:bg-black hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" /> Leave a review
                </button>
              </div>

              {/* Individual Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={rev.user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-xs text-gray-900">{rev.user?.name}</div>
                        <div className="text-[10px] text-gray-400">
                          ★ {rev.rating.toFixed(1)} • {new Date(rev.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-gray-300 rounded-3xl p-6 shadow-xl space-y-6">
              {/* Header Price */}
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${listing.price_per_night}</span>
                  <span className="text-xs text-gray-500"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star className="h-3.5 w-3.5 fill-black text-black" />
                  <span>{listing.rating.toFixed(2)}</span>
                  <span className="text-gray-400 font-normal">({reviews.length})</span>
                </div>
              </div>

              {/* Date & Guest Input Box */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden divide-y divide-gray-300 bg-white">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-3 hover:bg-gray-50">
                    <label className="text-[9px] font-bold text-gray-800 uppercase block">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-xs font-medium bg-transparent outline-none cursor-pointer"
                    />
                  </div>
                  <div className="p-3 hover:bg-gray-50">
                    <label className="text-[9px] font-bold text-gray-800 uppercase block">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-xs font-medium bg-transparent outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-3 hover:bg-gray-50">
                  <label className="text-[9px] font-bold text-gray-800 uppercase block">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-transparent outline-none cursor-pointer"
                  >
                    {[...Array(listing.max_guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reserve Action Button */}
              <button
                onClick={handleReserveClick}
                className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition cursor-pointer hover:scale-[1.01]"
              >
                Reserve
              </button>

              <p className="text-center text-xs text-gray-500">You won't be charged yet</p>

              {/* Price Calculation Summary */}
              {nights > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>${listing.price_per_night} x {nights} nights</span>
                    <span>${listing.price_per_night * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${listing.cleaning_fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airbnb service fee</span>
                    <span>${listing.service_fee}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-bold text-sm text-gray-900">
                    <span>Total before taxes</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Photo Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-6 animate-in fade-in">
          <div className="flex items-center justify-between text-white mb-6">
            <h3 className="font-bold text-lg">{listing.title} Gallery</h3>
            <button
              onClick={() => setShowGalleryModal(false)}
              className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto max-w-4xl mx-auto space-y-6 w-full">
            {images.map((url, i) => (
              <img key={i} src={url} alt={`Gallery photo ${i + 1}`} className="w-full rounded-2xl object-cover" />
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-lg">Leave a Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs font-semibold outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5.0 - Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4.0 - Good)</option>
                  <option value={3}>⭐⭐⭐ (3.0 - Average)</option>
                  <option value={2}>⭐⭐ (2.0 - Below Average)</option>
                  <option value={1}>⭐ (1.0 - Poor)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Comment</label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your stay experience with future guests..."
                  className="w-full border border-gray-300 rounded-xl p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full bg-[#FF385C] text-white py-3 rounded-xl font-bold text-xs transition cursor-pointer hover:bg-[#E00B41]"
              >
                {isSubmittingReview ? "Submitting..." : "Post Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        listing={listing}
        checkIn={checkIn}
        checkOut={checkOut}
        guestsCount={guestsCount}
        nights={nights}
        totalPrice={totalPrice}
      />
    </div>
  );
}
