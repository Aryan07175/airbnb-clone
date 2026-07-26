"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, FilterState } from "@/types";
import { fetchUsers, fetchUserWishlist, toggleWishlist as apiToggleWishlist } from "@/services/api";
import { toast } from "react-hot-toast";

interface AppContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  wishlistIds: number[];
  toggleFavorite: (listingId: number) => Promise<void>;
  isFavorite: (listingId: number) => boolean;
}

const initialFilters: FilterState = {
  category: "All",
  search: "",
  minPrice: 0,
  maxPrice: 2000,
  propertyType: "All",
  guests: 1,
  bedrooms: 0,
  checkIn: "",
  checkOut: "",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setCurrentUser(data[0]); // Default to Alex (Guest)
        }
      })
      .catch((err) => console.error("Failed loading users:", err));
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserWishlist(currentUser.id)
        .then((items) => setWishlistIds(items.map((i) => i.listing_id)))
        .catch((err) => console.error("Failed loading wishlist:", err));
    }
  }, [currentUser]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const toggleFavorite = async (listingId: number) => {
    if (!currentUser) {
      toast.error("Please select a user to add favorites");
      return;
    }

    const isFav = wishlistIds.includes(listingId);
    setWishlistIds((prev) =>
      isFav ? prev.filter((id) => id !== listingId) : [...prev, listingId]
    );

    try {
      const res = await apiToggleWishlist(currentUser.id, listingId);
      if (res.saved) {
        toast.success("Saved to your wishlist ❤️");
      } else {
        toast.success("Removed from your wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
      setWishlistIds((prev) =>
        isFav ? [...prev, listingId] : prev.filter((id) => id !== listingId)
      );
    }
  };

  const isFavorite = (listingId: number) => wishlistIds.includes(listingId);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        filters,
        setFilters,
        resetFilters,
        wishlistIds,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
