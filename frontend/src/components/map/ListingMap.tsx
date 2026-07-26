"use client";

import React, { useEffect, useState } from "react";
import { Listing } from "@/types";
import Link from "next/link";
import { Star } from "lucide-react";

interface ListingMapProps {
  listings: Listing[];
}

export default function ListingMap({ listings }: ListingMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [LeafletMap, setLeafletMap] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically load leaflet on client side only
    import("react-leaflet").then((LComp) => {
      import("leaflet").then((L) => {
        setLeafletMap({
          MapContainer: LComp.MapContainer,
          TileLayer: LComp.TileLayer,
          Marker: LComp.Marker,
          Popup: LComp.Popup,
          L,
        });
      });
    });
  }, []);

  if (!isClient || !LeafletMap) {
    return (
      <div className="w-full h-full min-h-[500px] bg-gray-100 rounded-3xl flex items-center justify-center text-sm font-semibold text-gray-500">
        Loading Interactive Map...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = LeafletMap;

  // Calculate center coordinate
  const centerLat = listings.length > 0 ? listings[0].latitude : 34.0259;
  const centerLng = listings.length > 0 ? listings[0].longitude : -118.7798;

  const createPriceIcon = (price: number) => {
    return L.divIcon({
      className: "custom-price-pin",
      html: `<div class="price-marker-pin">$${price}</div>`,
      iconSize: [60, 30],
      iconAnchor: [30, 15],
    });
  };

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-md border border-gray-200 z-10 relative">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[500px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitude, listing.longitude]}
            icon={createPriceIcon(listing.price_per_night)}
          >
            <Popup>
              <div className="w-56 overflow-hidden rounded-xl">
                <img
                  src={listing.images[0]?.url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"}
                  alt={listing.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 bg-white">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                    <span className="truncate">{listing.city}, {listing.country}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-black text-black" />
                      <span>{listing.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 truncate mt-0.5">{listing.title}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">${listing.price_per_night} / night</span>
                    <Link
                      href={`/listings/${listing.id}`}
                      className="bg-[#FF385C] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
