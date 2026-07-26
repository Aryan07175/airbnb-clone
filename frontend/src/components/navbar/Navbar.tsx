"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Globe, Menu, User as UserIcon, Heart, Calendar, Home as HomeIcon, LogOut, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface NavbarProps {
  onOpenFilter?: () => void;
}

export default function Navbar({ onOpenFilter }: NavbarProps) {
  const router = useRouter();
  const { currentUser, users, setCurrentUser, filters, setFilters } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchExpanded(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 transition-all duration-200">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-4">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <svg
              className="h-8 w-auto text-[#FF385C]"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.308-3.3 7.806-7.5 7.806-3.178 0-6.002-1.99-7.1-4.996-1.098 3.006-3.922 4.996-7.1 4.996-4.2 0-7.5-3.498-7.5-7.806 0-.897.228-1.782.802-3.189l.169-.398c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C9.037 1.963 10.492 1 12.5 1h3.5zm0 3h-3.5c-1.077 0-1.892.483-2.73 1.994l-.396.764c-1.884 3.693-5.918 12.164-6.84 14.316l-.119.281c-.482 1.182-.665 1.834-.698 2.453l-.007.202c0 2.766 2.022 5.01 4.6 5.01 2.454 0 4.654-1.848 5.297-4.407l.081-.365h1.23l.081.365c.643 2.559 2.843 4.407 5.297 4.407 2.578 0 4.6-2.244 4.6-5.01 0-.616-.179-1.258-.646-2.383l-.133-.306c-.922-2.152-4.956-10.623-6.84-14.316l-.396-.764C18.392 4.483 17.577 4 16.5 4zm0 15c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm0 2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
            </svg>
            <span className="font-bold text-xl text-[#FF385C] hidden sm:block tracking-tight">
              airbnb
            </span>
          </Link>

          {/* Search Pill */}
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3 divide-x divide-gray-200 text-sm font-medium"
          >
            <div className="px-2 text-gray-900 font-semibold truncate max-w-[120px] sm:max-w-none">
              {filters.search ? filters.search : "Anywhere"}
            </div>
            <div className="hidden sm:block px-3 text-gray-600">
              {filters.checkIn ? `${filters.checkIn} - ${filters.checkOut}` : "Any week"}
            </div>
            <div className="px-2 text-gray-500 font-normal flex items-center gap-3">
              <span className="hidden md:inline">
                {filters.guests > 1 ? `${filters.guests} guests` : "Add guests"}
              </span>
              <div className="p-2 bg-[#FF385C] text-white rounded-full">
                <Search className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Right Action Menu & User Switcher */}
          <div className="flex items-center gap-3">
            <Link
              href="/host"
              className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              Airbnb your home
            </Link>

            <div className="relative">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 border border-gray-300 rounded-full flex items-center gap-3 hover:shadow-md transition cursor-pointer bg-white"
              >
                <Menu className="h-4 w-4 text-gray-600 ml-1" />
                <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center overflow-hidden font-bold text-xs">
                  {currentUser?.avatar_url ? (
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    currentUser?.name.charAt(0) || <UserIcon className="h-4 w-4" />
                  )}
                </div>
              </div>

              {/* Menu Dropdown Modal */}
              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-sm font-medium">
                  {/* Active Profile Info */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <div className="font-semibold text-gray-900">{currentUser?.name}</div>
                    <div className="text-xs text-gray-500 truncate">{currentUser?.email}</div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#FF385C] font-semibold">
                      {currentUser?.is_host ? "Host Mode Active" : "Guest Mode Active"}
                      {currentUser?.is_superhost && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full">
                          Superhost
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role / User Switcher */}
                  <div className="py-2 border-b border-gray-100">
                    <div className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Switch Active User / Role
                    </div>
                    {users.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setCurrentUser(u);
                          setIsMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={u.avatar_url}
                            alt={u.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-medium text-gray-800">{u.name}</div>
                            <div className="text-[10px] text-gray-400">
                              {u.is_host ? "Host" : "Guest"}
                            </div>
                          </div>
                        </div>
                        {currentUser?.id === u.id && (
                          <Check className="h-4 w-4 text-[#FF385C]" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link
                      href="/trips"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                    >
                      <Calendar className="h-4 w-4 text-gray-500" />
                      My Trips & Bookings
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                    >
                      <Heart className="h-4 w-4 text-gray-500" />
                      Wishlist & Favorites
                    </Link>
                    <Link
                      href="/host"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
                    >
                      <HomeIcon className="h-4 w-4 text-gray-500" />
                      Host Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Search Bar Drawer */}
        {isSearchExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-gray-100 p-2 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-inner border border-gray-200"
            >
              {/* Location Input */}
              <div className="flex-1 w-full px-6 py-2 hover:bg-white rounded-full transition cursor-pointer">
                <div className="text-[10px] font-bold text-gray-800 uppercase">Where</div>
                <input
                  type="text"
                  placeholder="Search destinations (e.g. Malibu, Paris, Aspen)"
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="bg-transparent text-sm w-full outline-none text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>

              {/* Check In */}
              <div className="w-full md:w-44 px-4 py-2 hover:bg-white rounded-full transition cursor-pointer">
                <div className="text-[10px] font-bold text-gray-800 uppercase">Check in</div>
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => setFilters((prev) => ({ ...prev, checkIn: e.target.value }))}
                  className="bg-transparent text-xs w-full outline-none text-gray-800 font-medium"
                />
              </div>

              {/* Check Out */}
              <div className="w-full md:w-44 px-4 py-2 hover:bg-white rounded-full transition cursor-pointer">
                <div className="text-[10px] font-bold text-gray-800 uppercase">Check out</div>
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => setFilters((prev) => ({ ...prev, checkOut: e.target.value }))}
                  className="bg-transparent text-xs w-full outline-none text-gray-800 font-medium"
                />
              </div>

              {/* Guests */}
              <div className="w-full md:w-36 px-4 py-2 hover:bg-white rounded-full transition cursor-pointer">
                <div className="text-[10px] font-bold text-gray-800 uppercase">Guests</div>
                <select
                  value={filters.guests}
                  onChange={(e) => setFilters((prev) => ({ ...prev, guests: Number(e.target.value) }))}
                  className="bg-transparent text-xs w-full outline-none text-gray-800 font-medium cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#FF385C] hover:bg-[#E00B41] text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
