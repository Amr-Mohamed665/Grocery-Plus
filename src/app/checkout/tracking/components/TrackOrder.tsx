import { Check, Box, LucideVan, MapPin, CircleCheck } from "lucide-react";

export default function TrackOrder() {
  return (
    <section className="max-w-[1150px] mx-auto my-10 px-4">
      <p className="font-medium text-xl mb-4">Track Your Order</p>

      <div className="shadow-xl border border-gray-200 p-4 md:p-6 rounded-xl">
        {/* ===== Header Info ===== */}
        <div className="flex  justify-between gap-4">
          <div>
            <p className="font-normal text-[14px] md:text-[16px]">
              Current Status
            </p>
            <p className="font-normal text-base md:text-lg text-[#014162]">
              Out for Delivery
            </p>
          </div>

          <div>
            <p className="font-normal text-[14px] md:text-[16px]">
              Estimated Delivery
            </p>
            <p className="font-normal text-base md:text-lg text-[#014162]">
              Today, Nov 4
            </p>
          </div>
        </div>

        {/* ===== Progress ===== */}
        <div className="w-full py-15 md:py-10 overflow-x-auto md:overflow-hidden">
          <div className="flex items-center min-w-[500px] md:min-w-full justify-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center relative">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#014162] text-white">
                <Check size={18} />
              </div>
              <p className="absolute top-11 text-[10px] md:text-xs font-medium text-[#014162]">
                Order Placed
              </p>
            </div>

            <div className="w-12 md:w-32.5 h-[3] bg-[#014162]" />

            {/* Step 2 */}
            <div className="flex flex-col items-center relative">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#014162] text-white">
                <Box size={18} />
              </div>
              <p className="absolute top-11 text-[10px] md:text-xs font-medium text-[#014162]">
                Processing
              </p>
            </div>

            <div className="w-12 md:w-32.5 h-[3] bg-[#014162]" />

            {/* Step 3 */}
            <div className="flex flex-col items-center relative">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#014162] text-white">
                <LucideVan size={18} />
              </div>
              <p className="absolute top-11 text-[10px] md:text-xs font-medium text-[#014162]">
                Shipped
              </p>
            </div>

            <div className="w-12 md:w-32.5 h-[3] bg-[#014162]" />

            {/* Step 4 */}
            <div className="flex flex-col items-center relative">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#014162] text-white">
                <MapPin size={18} />
              </div>
              <p className="absolute top-11 text-[10px] md:text-xs font-medium text-[#014162]">
                Out for Delivery
              </p>
            </div>

            <div className="w-12 md:w-32.5 h-[3] bg-[#BCB8B1]" />

            {/* Step 5 */}
            <div className="flex flex-col items-center relative">
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#BCB8B1] text-white">
                <CircleCheck size={18} />
              </div>
              <p className="absolute top-11 text-[10px] md:text-xs font-medium text-[#BCB8B1]">
                DriverInfo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
