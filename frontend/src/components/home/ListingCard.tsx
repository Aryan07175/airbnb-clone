"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Listing } from "@/types";
import { useApp } from "@/context/AppContext";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const { toggleFavorite, isFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = listing.images && listing.images.length > 0
    ? listing.images.map((i) => i.url)
    : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"];

  const favorited = isFavorite(listing.id);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link href={`/listings/${listing.id}`} className="group cursor-pointer flex flex-col gap-2.5">
        {/* Image Container with Slider & Heart */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm border border-gray-200/60 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-rose-500/10 group-hover:-translate-y-1">
          <img
            src={images[currentImageIndex]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Glassmorphic Heart Button */}
          <button
            onClick={handleHeartClick}
            className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer hover:scale-115 active:scale-90"
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                favorited
                  ? "fill-[#FF385C] text-[#FF385C] drop-shadow-[0_2px_8px_rgba(255,56,92,0.8)]"
                  : "fill-black/20 text-white"
              }`}
            />
          </button>

          {/* Glassmorphic Category Tag */}
          <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
            {listing.category}
          </div>

          {/* Slider Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 shadow-lg hover:bg-white transition opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 px-1">
          <div className="flex justify-between items-start font-bold text-sm text-gray-900">
            <span className="truncate pr-2">
              {listing.city}, {listing.country}
            </span>
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-full text-xs border border-amber-200">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 truncate font-medium">
            Hosted by {listing.host?.name || "Host"} • {listing.property_type}
          </div>

          <div className="text-xs text-gray-400 font-normal">
            Up to {listing.max_guests} guests • {listing.bedrooms} bedrooms
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-extrabold text-base text-gray-900">${listing.price_per_night}</span>
            <span className="text-xs text-gray-500 font-medium">/ night</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
