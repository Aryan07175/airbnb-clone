"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { useApp } from "@/context/AppContext";
import { fetchUserBookings, cancelBooking } from "@/services/api";
import { Booking } from "@/types";
import { Calendar, MapPin, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function TripsPage() {
  const { currentUser } = useApp();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    setIsLoading(true);
    fetchUserBookings(currentUser.id)
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load your trips");
      })
      .finally(() => setIsLoading(false));
  }, [currentUser]);

  const handleCancel = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const updated = await cancelBooking(bookingId);
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
      toast.success("Reservation cancelled");
    } catch (err) {
      toast.error("Failed to cancel reservation");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <Navbar />

      <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-10 w-full flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Trips</h1>
        <p className="text-xs text-gray-500 mb-8">
          Manage your upcoming stays and past reservation receipts for {currentUser?.name}.
        </p>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-44 bg-gray-100 rounded-3xl w-full" />
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4 bg-white"
              >
                <div className="flex gap-4">
                  <img
                    src={b.listing.images[0]?.url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"}
                    alt={b.listing.title}
                    className="w-28 h-28 rounded-2xl object-cover"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#FF385C] uppercase tracking-wider">
                          {b.listing.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            b.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {b.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1 mt-1">
                        {b.listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{b.listing.city}, {b.listing.country}</span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      <span>{b.check_in} → {b.check_out} ({b.nights} nights)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500">Total Paid: </span>
                    <span className="font-bold text-sm text-gray-900">${b.total_price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === "confirmed" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        Cancel Stay
                      </button>
                    )}
                    <Link
                      href={`/listings/${b.listing.id}`}
                      className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-black transition"
                    >
                      View Stay <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-3xl p-12 text-center max-w-md mx-auto">
            <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-gray-900">No trips booked yet</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Time to dust off your bags and start planning your next getaway.
            </p>
            <Link
              href="/"
              className="bg-[#FF385C] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#E00B41] transition inline-block"
            >
              Start searching
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
