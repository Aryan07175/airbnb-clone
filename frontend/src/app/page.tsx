"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import CategoryBar from "@/components/home/CategoryBar";
import HeroBanner from "@/components/home/HeroBanner";
import ListingCard from "@/components/home/ListingCard";
import ListingMap from "@/components/map/ListingMap";
import FilterModal from "@/components/modals/FilterModal";
import { useApp } from "@/context/AppContext";
import { fetchListings } from "@/services/api";
import { Listing } from "@/types";
import { Map, List, SearchX } from "lucide-react";

export default function HomePage() {
  const { filters, resetFilters } = useApp();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchListings(filters)
      .then((data) => {
        setListings(data);
      })
      .catch((err) => console.error("Error fetching listings:", err))
      .finally(() => setIsLoading(false));
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Navbar */}
      <Navbar onOpenFilter={() => setIsFilterModalOpen(true)} />

      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Category Bar */}
      <CategoryBar onOpenFilter={() => setIsFilterModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-8 w-full">
        {isLoading ? (
          /* Skeleton Loader Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="aspect-square w-full rounded-3xl bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                <div className="h-4 bg-gray-200 rounded-md w-1/4" />
              </div>
            ))}
          </div>
        ) : showMap ? (
          /* Map View */
          <div className="w-full h-[calc(100vh-220px)]">
            <ListingMap listings={listings} />
          </div>
        ) : listings.length > 0 ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing, idx) => (
              <ListingCard key={listing.id} listing={listing} index={idx} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-full mb-4">
              <SearchX className="h-8 w-8 text-[#FF385C]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No exact matches found</h3>
            <p className="text-xs text-gray-500 max-w-sm mb-6">
              Try changing or clearing your filters to discover more stays.
            </p>
            <button
              onClick={resetFilters}
              className="bg-black text-white font-semibold text-xs px-6 py-3 rounded-2xl hover:bg-gray-800 transition cursor-pointer shadow-md"
            >
              Remove all filters
            </button>
          </div>
        )}
      </main>

      {/* Floating Map / List Toggle Switch */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-slate-900 hover:bg-black border border-white/20 text-white px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          {showMap ? (
            <>
              Show list <List className="h-4 w-4" />
            </>
          ) : (
            <>
              Show map <Map className="h-4 w-4 text-[#FF385C]" />
            </>
          )}
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
}
