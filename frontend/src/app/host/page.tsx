"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useApp } from "@/context/AppContext";
import {
  fetchHostListings,
  fetchHostBookings,
  fetchAmenities,
  createListing,
  deleteListing
} from "@/services/api";
import { Listing, Booking, Amenity } from "@/types";
import {
  Plus,
  Home,
  Calendar,
  DollarSign,
  Trash2,
  Edit,
  X,
  Sparkles,
  Layers,
  MapPin,
  Users
} from "lucide-react";
import { toast } from "react-hot-toast";

const CATEGORIES = ["Beachfront", "Cabins", "Mansions", "Tiny Homes", "Lakefront", "Trending", "Omgs"];
const PROP_TYPES = ["Villa", "Cabin", "Mansion", "Apartment", "Tiny Home", "Lodge", "House"];

export default function HostDashboardPage() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<"listings" | "reservations">("listings");
  const [listings, setListings] = useState<Listing[]>([]);
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create Listing Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Beachfront",
    property_type: "Villa",
    price_per_night: 250,
    cleaning_fee: 50,
    service_fee: 25,
    address: "100 Ocean Drive",
    city: "Miami",
    country: "United States",
    latitude: 25.7617,
    longitude: -80.1918,
    max_guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    image_urls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    amenity_ids: [] as number[],
  });

  const loadData = () => {
    if (!currentUser) return;
    setIsLoading(true);
    Promise.all([
      fetchHostListings(currentUser.id),
      fetchHostBookings(currentUser.id),
      fetchAmenities(),
    ])
      .then(([listingsData, bookingsData, amenitiesData]) => {
        setListings(listingsData);
        setReservations(bookingsData);
        setAvailableAmenities(amenitiesData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast.success("Listing deleted");
    } catch (err) {
      toast.error("Failed to delete listing");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setIsSubmitting(true);
      await createListing({
        ...formData,
        host_id: currentUser.id,
      });

      toast.success("✨ New Airbnb listing published successfully!");
      setShowCreateModal(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stats
  const totalEarnings = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + r.total_price, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 w-full flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Host Dashboard</h1>
            <p className="text-xs text-gray-500 mt-1">
              Welcome back, {currentUser?.name}. Manage your property portfolio and guest bookings.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#FF385C] hover:bg-[#E00B41] text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="h-4 w-4" /> Create New Listing
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Total Revenue</div>
              <div className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-[#FF385C] rounded-2xl">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Hosted Listings</div>
              <div className="text-2xl font-bold text-gray-900">{listings.length}</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Guest Reservations</div>
              <div className="text-2xl font-bold text-gray-900">{reservations.length}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 gap-8">
          <button
            onClick={() => setActiveTab("listings")}
            className={`pb-3 font-bold text-sm border-b-2 cursor-pointer transition ${
              activeTab === "listings"
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            My Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`pb-3 font-bold text-sm border-b-2 cursor-pointer transition ${
              activeTab === "reservations"
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Reservations ({reservations.length})
          </button>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-white rounded-3xl w-full" />
            ))}
          </div>
        ) : activeTab === "listings" ? (
          /* Listings Grid */
          listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
                  <div className="relative h-48 w-full">
                    <img
                      src={item.images[0]?.url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h3>
                      <div className="text-xs text-gray-500 mt-1">{item.city}, {item.country}</div>
                      <div className="text-xs font-semibold text-gray-900 mt-2">${item.price_per_night} / night</div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500">★ {item.rating.toFixed(2)} ({item.review_count})</span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-12 text-center max-w-md mx-auto">
              <Layers className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-gray-900">No active listings</h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">Create your first Airbnb property listing to start hosting guests.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#FF385C] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#E00B41] transition"
              >
                Create Listing
              </button>
            </div>
          )
        ) : (
          /* Reservations List */
          reservations.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs divide-y divide-gray-200">
              {reservations.map((res) => (
                <div key={res.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={res.user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={res.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-sm text-gray-900">{res.user?.name}</div>
                      <div className="text-xs text-gray-500">{res.listing?.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {res.check_in} → {res.check_out} ({res.nights} nights, {res.guests_count} guests)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <div className="font-bold text-sm text-gray-900">${res.total_price}</div>
                      <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        {res.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-12 text-center max-w-md mx-auto">
              <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-gray-900">No incoming reservations</h3>
              <p className="text-xs text-gray-500 mt-1">When guests book your stays, their reservations will appear here.</p>
            </div>
          )
        )}
      </main>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-base text-gray-900">Airbnb your home</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Secluded Cliffside Villa"
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-black font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Property Type</label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-medium"
                  >
                    {PROP_TYPES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nightly Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price_per_night}
                    onChange={(e) => setFormData({ ...formData, price_per_night: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Cleaning Fee ($)</label>
                  <input
                    type="number"
                    value={formData.cleaning_fee}
                    onChange={(e) => setFormData({ ...formData, cleaning_fee: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Max Guests</label>
                  <input
                    type="number"
                    value={formData.max_guests}
                    onChange={(e) => setFormData({ ...formData, max_guests: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your space, views, and unique highlights..."
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Photos (Unsplash / Image URLs)</label>
                <input
                  type="text"
                  value={formData.image_urls.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image_urls: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Comma separated image URLs"
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-2">Amenities</label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto border border-gray-200 rounded-xl p-3">
                  {availableAmenities.map((am) => {
                    const isSelected = formData.amenity_ids.includes(am.id);
                    return (
                      <div
                        key={am.id}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            amenity_ids: isSelected
                              ? prev.amenity_ids.filter((id) => id !== am.id)
                              : [...prev.amenity_ids, am.id],
                          }));
                        }}
                        className={`p-2 rounded-lg border text-[11px] font-semibold cursor-pointer transition ${
                          isSelected ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {am.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF385C] hover:bg-[#E00B41] text-white py-3.5 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                {isSubmitting ? "Publishing Listing..." : "Publish Listing"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
