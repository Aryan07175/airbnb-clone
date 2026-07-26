"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, CreditCard, Lock, Calendar, Users, ShieldCheck } from "lucide-react";
import { Listing } from "@/types";
import { useApp } from "@/context/AppContext";
import { createBooking } from "@/services/api";
import { toast } from "react-hot-toast";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  nights: number;
  totalPrice: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  listing,
  checkIn,
  checkOut,
  guestsCount,
  nights,
  totalPrice,
}: CheckoutModalProps) {
  const router = useRouter();
  const { currentUser } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExp, setCardExp] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("123");

  if (!isOpen) return null;

  const handleConfirmPay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please select a user to complete booking");
      return;
    }

    try {
      setIsSubmitting(true);
      await createBooking({
        listing_id: listing.id,
        user_id: currentUser.id,
        check_in: checkIn,
        check_out: checkOut,
        guests_count: guestsCount,
      });

      toast.success("🎉 Booking Confirmed! Your stay is reserved.");
      onClose();
      router.push("/trips");
    } catch (err: any) {
      toast.error(err.message || "Failed to confirm booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="font-bold text-base text-gray-900">Request to book</div>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Listing Summary Card */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <img
              src={listing.images[0]?.url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"}
              alt={listing.title}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-between py-1">
              <div>
                <span className="text-[10px] font-bold text-[#FF385C] uppercase tracking-wider">
                  {listing.category}
                </span>
                <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{listing.title}</h4>
                <p className="text-xs text-gray-500">{listing.city}, {listing.country}</p>
              </div>
              <div className="text-xs font-semibold text-gray-800">
                ★ {listing.rating.toFixed(2)} ({listing.review_count} reviews)
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div>
            <h3 className="font-bold text-base text-gray-900 mb-3">Your trip</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-[#FF385C]" />
                  <span className="font-medium">Dates: {checkIn} to {checkOut}</span>
                </div>
                <span className="font-bold text-gray-900">{nights} nights</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-4 w-4 text-[#FF385C]" />
                  <span className="font-medium">Guests: {guestsCount} guest(s)</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Price breakdown */}
          <div>
            <h3 className="font-bold text-base text-gray-900 mb-3">Price details</h3>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>${listing.price_per_night} x {nights} nights</span>
                <span className="font-medium">${listing.price_per_night * nights}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span className="font-medium">${listing.cleaning_fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Airbnb service fee</span>
                <span className="font-medium">${listing.service_fee}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t border-gray-200">
                <span>Total (USD)</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Payment Method (Mocked) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-gray-900">Pay with</h3>
              <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Mock Checkout
              </span>
            </div>

            <div className="border border-gray-300 rounded-2xl p-4 space-y-3 bg-gray-50/50">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-semibold text-gray-900">Credit or Debit Card</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Mocked</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none font-medium"
                  placeholder="Card number"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none font-medium"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-1/2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none font-medium"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleConfirmPay}
            disabled={isSubmitting}
            className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="h-4 w-4" />
            {isSubmitting ? "Processing Reservation..." : `Confirm and Pay • $${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
}
