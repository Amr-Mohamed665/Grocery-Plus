'use client';

import { Box, Check, CheckCircle2, MapPin, Truck } from 'lucide-react';

const STEP_LABELS = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const STEP_ICONS = [
  <Check key="1" size={18} />,
  <Box key="2" size={18} />,
  <Truck key="3" size={18} />,
  <MapPin key="4" size={18} />,
  <CheckCircle2 key="5" size={18} />,
];

interface TrackOrderProps {
  currentStatus?: string;
  estimatedDelivery?: string;
  steps?: { id: number; status: 'completed' | 'active' | 'pending' }[];
  isLoading?: boolean;
  error?: boolean;
}

export function TrackOrder({
  currentStatus = 'Out for Delivery',
  estimatedDelivery = 'Today, Nov 4',
  steps: customSteps,
  isLoading = false,
  error = false,
}: TrackOrderProps) {
  const steps = STEP_LABELS.map((label, i) => ({
    id: i + 1,
    label,
    icon: STEP_ICONS[i],
    status:
      customSteps?.[i]?.status ??
      (i < 3 ? 'completed' : i === 3 ? 'active' : 'pending'),
  }));

  return (
    <section>
      <h3 className="text-xl font-bold mb-4 text-[#1a1a1a]">
        Track Your Order
      </h3>
      <div className="border border-gray-100 rounded-2xl p-8 shadow-sm relative">
        {isLoading && (
          <p className="text-gray-400 text-sm">Loading order status...</p>
        )}
        {error && (
          <p className="text-amber-600 text-sm">
            Unable to load tracking. Check your connection.
          </p>
        )}
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-gray-400 text-sm">Current Status</p>
            <p className="text-[#004a61] font-bold text-lg">{currentStatus}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Estimated Delivery</p>
            <p className="text-[#004a61] font-bold text-lg">
              {estimatedDelivery}
            </p>
          </div>
        </div>
        <div className="relative flex justify-between items-center w-full px-4">
          <div className="absolute top-1/2 left-0 w-full h-0.75 bg-gray-200 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-[75%] h-0.75 bg-[#004a61] -translate-y-1/2 z-0" />

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step.status === 'completed' || step.status === 'active'
                    ? 'bg-[#004a61] text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 opacity-60'
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[11px] mt-3 font-semibold absolute -bottom-8 whitespace-nowrap ${
                  step.status === 'active' ? 'text-[#004a61]' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-10" />
      </div>
    </section>
  );
}
