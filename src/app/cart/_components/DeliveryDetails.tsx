"use client";
import { useState } from "react";
import { MapPin, Ticket, Edit2 } from "lucide-react";

export default function DeliveryDetails() {
  const [address, setAddress] = useState(
    "Villa 14, Street 23, District 5, New Cairo...",
  );

  return (
    <div className="border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Delivery */}
      <div>
        <h3 className="text-base font-semibold text-[#014162] flex items-center gap-2 mb-3">
          <MapPin size={18} className="text-[#014162]" />
          Delivery Address
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-shadow"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            title="Edit Address"
            className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 rounded-lg flex items-center justify-center transition-colors border border-transparent dark:border-zinc-700"
          >
            <Edit2 size={16} />
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />

      {/* Promo Code */}
      <div>
        <h3 className="text-base font-semibold text-[#014162] flex items-center gap-2 mb-3">
          <Ticket size={18} className="text-[#014162]" />
          Promo Code
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-shadow placeholder:text-zinc-400"
              placeholder="e.g. SUMMER10"
            />
          </div>
          <button className="cursor-pointer hover:text-[#014162] hover:bg-white text-white bg-[#014162] px-4 text-sm font-medium rounded-lg transition-colors shadow-sm">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
