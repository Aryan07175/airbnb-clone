"use client";

import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROPERTY_TYPES = ["All", "Villa", "Cabin", "Mansion", "Apartment", "Tiny Home", "Lodge"];

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { filters, setFilters, resetFilters } = useApp();
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [selectedPropType, setSelectedPropType] = useState(filters.propertyType);
  const [bedrooms, setBedrooms] = useState(filters.bedrooms);

  if (!isOpen) return null;

  const handleApply = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
      propertyType: selectedPropType,
      bedrooms,
    }));
    onClose();
  };

  const handleClear = () => {
    resetFilters();
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedPropType("All");
    setBedrooms(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="font-bold text-base text-gray-900">Filters</div>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Price Range Section */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Price range</h3>
            <p className="text-xs text-gray-500 mb-4">Nightly prices before fees and taxes</p>

            <div className="flex items-center gap-4">
              <div className="flex-1 border border-gray-300 rounded-2xl p-3 focus-within:border-black">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Minimum</label>
                <div className="flex items-center text-sm font-semibold text-gray-900">
                  <span>$</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full outline-none bg-transparent ml-1 font-bold"
                  />
                </div>
              </div>
              <span className="text-gray-400 font-bold">-</span>
              <div className="flex-1 border border-gray-300 rounded-2xl p-3 focus-within:border-black">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Maximum</label>
                <div className="flex items-center text-sm font-semibold text-gray-900">
                  <span>$</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full outline-none bg-transparent ml-1 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Property Type Section */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Property type</h3>
            <div className="grid grid-cols-3 gap-3">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedPropType(type)}
                  className={`py-3 px-4 rounded-2xl border text-xs font-semibold transition cursor-pointer text-center ${
                    selectedPropType === type
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-800 hover:border-black"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Bedrooms Selector */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Minimum Bedrooms</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setBedrooms(num)}
                  className={`h-10 px-6 rounded-full border text-xs font-semibold transition cursor-pointer ${
                    bedrooms === num
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-800 hover:border-black"
                  }`}
                >
                  {num === 0 ? "Any" : `${num}+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <button
            onClick={handleClear}
            className="text-xs font-bold underline text-gray-900 hover:text-black cursor-pointer"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="bg-[#FF385C] hover:bg-[#E00B41] text-white px-8 py-3 rounded-xl text-sm font-semibold transition cursor-pointer"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
