"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Search, Compass, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function HeroBanner() {
  const { setFilters } = useApp();

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 rounded-3xl my-4 mx-4 md:mx-10 shadow-2xl">
      {/* Background Animated Gradient Spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF385C]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Floating Sparkle Icon */}
      <div className="absolute top-8 right-12 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
        <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
        <span>Curated Luxury Stays 2026</span>
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-rose-200"
        >
          <Heart className="h-3.5 w-3.5 fill-[#FF385C] text-[#FF385C]" />
          <span>Places that steal your heart</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white"
        >
          Stays so breathtaking, <br />
          <span className="bg-gradient-to-r from-[#FF385C] via-rose-300 to-amber-200 bg-clip-text text-transparent">
            you'll never want to leave.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Discover cliffside Pacific villas with infinity pools, glass-roofed stargazing cabins, and private Tuscan vineyards designed for unforgettable moments.
        </motion.p>

        {/* Quick Location Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 pt-2 text-xs font-medium"
        >
          <span className="text-gray-400 font-semibold self-center mr-2">Popular:</span>
          {["Malibu", "Aspen", "Santorini", "Paris", "Bali", "Siena"].map((loc) => (
            <button
              key={loc}
              onClick={() => setFilters((prev) => ({ ...prev, search: loc }))}
              className="bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-1.5 rounded-full text-gray-200 transition cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="h-3 w-3 text-[#FF385C]" /> {loc}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
