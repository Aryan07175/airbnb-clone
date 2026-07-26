"use client";

import React from "react";
import {
  Compass,
  Palmtree,
  Trees,
  Castle,
  Home,
  Waves,
  Flame,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface CategoryBarProps {
  onOpenFilter?: () => void;
}

const CATEGORIES = [
  { id: "All", label: "All Listings", icon: LayoutGrid },
  { id: "Beachfront", label: "Beachfront", icon: Palmtree },
  { id: "Cabins", label: "Cabins", icon: Trees },
  { id: "Mansions", label: "Mansions", icon: Castle },
  { id: "Tiny Homes", label: "Tiny Homes", icon: Home },
  { id: "Lakefront", label: "Lakefront", icon: Waves },
  { id: "Trending", label: "Trending", icon: Flame },
  { id: "Omgs", label: "OMG!", icon: Sparkles },
];

export default function CategoryBar({ onOpenFilter }: CategoryBarProps) {
  const { filters, setFilters } = useApp();

  return (
    <div className="border-b border-gray-100 bg-white sticky top-[73px] z-30 shadow-xs">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-4 flex items-center justify-between gap-4">
        {/* Categories scroll list */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = (filters.category || "All") === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                className={`flex flex-col items-center gap-2 pb-2 border-b-2 cursor-pointer transition whitespace-nowrap group ${
                  isActive
                    ? "border-black text-black font-semibold"
                    : "border-transparent text-gray-500 hover:text-black hover:border-gray-300 font-medium"
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition group-hover:scale-110 ${
                    isActive ? "text-black" : "text-gray-500 group-hover:text-black"
                  }`}
                />
                <span className="text-xs">{cat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Filter Button */}
        {onOpenFilter && (
          <button
            onClick={onOpenFilter}
            className="border border-gray-300 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold hover:border-black transition cursor-pointer shrink-0 bg-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
