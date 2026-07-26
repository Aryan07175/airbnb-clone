"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import ListingCard from "@/components/home/ListingCard";
import { useApp } from "@/context/AppContext";
import { fetchUserWishlist } from "@/services/api";
import { Listing } from "@/types";
import { Heart, HeartOff } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { currentUser, wishlistIds } = useApp();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    setIsLoading(true);
    fetchUserWishlist(currentUser.id)
      .then((items) => setSavedListings(items.map((i) => i.listing)))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [currentUser, wishlistIds]);

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-900">
      <Navbar />

      <main className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-10 w-full flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-7 w-7 fill-[#FF385C] text-[#FF385C]" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wishlists</h1>
        </div>
        <p className="text-xs text-gray-500 mb-8">
          Saved stays for {currentUser?.name}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-2xl w-full" />
            ))}
          </div>
        ) : savedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {savedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-3xl p-12 text-center max-w-md mx-auto">
            <HeartOff className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-gray-900">Your wishlist is empty</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              As you search, tap the heart icon on any stay to save your favorite places here.
            </p>
            <Link
              href="/"
              className="bg-black text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition inline-block"
            >
              Explore places
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
