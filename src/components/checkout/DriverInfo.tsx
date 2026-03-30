'use client';

import { MessageSquare, Phone, Star } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_DRIVER_IMAGE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

interface Driver {
  name?: string;
  phone?: string;
  image?: string;
  rating?: number;
}

interface DriverInfoProps {
  driver?: Driver;
  isLoading?: boolean;
  error?: boolean;
  onCall?: () => void;
  onChat?: () => void;
}

export function DriverInfo({
  driver,
  isLoading = false,
  error = false,
  onCall,
  onChat,
}: DriverInfoProps) {
  const driverName = driver?.name ?? 'Yousef Sheha';
  const driverPhone = driver?.phone ?? '+20109 263 2833';
  const driverImage = driver?.image ?? DEFAULT_DRIVER_IMAGE;
  const rating = driver?.rating ?? 5;

  return (
    <section>
      <h3 className="text-xl font-bold mb-4 text-[#1a1a1a]">
        Driver Information
      </h3>
      {isLoading && (
        <p className="text-gray-400 text-sm">Loading driver info...</p>
      )}
      {error && (
        <p className="text-amber-600 text-sm">Unable to load driver data.</p>
      )}
      <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden bg-white">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
              <Image
                src={driverImage}
                alt="Driver"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800">{driverName}</h4>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-300 text-gray-300'
                    }
                  />
                ))}
                <span className="text-gray-400 text-xs ml-2">
                  Rating ({rating}/5)
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-gray-400 text-sm">Phone Number</span>
                <div className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                  {driverPhone}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onCall}
                className="flex items-center gap-2 bg-[#004a61] text-white px-6 py-2.5 rounded-xl hover:bg-[#003649] transition-all font-semibold"
              >
                <Phone size={18} />
                Call
              </button>
              <button
                onClick={onChat}
                className="flex items-center gap-2 bg-[#004a61] text-white px-6 py-2.5 rounded-xl hover:bg-[#003649] transition-all font-semibold"
              >
                <MessageSquare size={18} />
                Chat
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-gray-100/80 p-6 rounded-2xl relative overflow-hidden group">
            <h5 className="text-[#004a61] font-bold text-sm mb-2">
              Our Safety Policy...
            </h5>
            <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
              Drivers must adhere to road safety rules and operate vehicles with
              caution to ensure safe and timely deliveries.
            </p>

            <div className="absolute bottom-0 right-0 w-10 h-10 bg-gray-300 translate-x-5 translate-y-5 rotate-45 transition-transform group-hover:scale-110" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-linear-to-br from-transparent to-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
