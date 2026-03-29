import { Star, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function DriverInfo() {
  return (
    <section className="max-w-[1150px] mx-auto my-10 px-4 sm:px-0">
      <p className="font-medium text-xl mb-4">Driver Information</p>

      <div className="shadow-xl border border-gray-200 px-4 sm:px-6 pt-6 pb-4 rounded-xl">
        {/* ===== Driver Info Row ===== */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left: Driver Details */}
          <div className="flex gap-4">
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src="/images/driver.jpg"
                alt="Driver"
                fill
                className="rounded object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 sm:gap-5">
              <p className="text-lg font-normal">Ahmed Badr</p>

              {/* Rating */}
              <div className="flex gap-1">
                <Star className="text-yellow-400" />
                <Star className="text-yellow-400" />
                <Star className="text-yellow-400" />
                <Star className="text-yellow-400" />
                <Star className="text-yellow-400" />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-lg font-normal text-[#014162]">
                  Phone Number
                </p>
                <div className="border-2 p-2 rounded-lg border-gray-300">
                  +20109 874 2231
                </div>
              </div>
            </div>
          </div>

          {/* Right: Call / Chat buttons */}
          <div className="flex flex-row gap-3 sm:gap-5 mt-4 md:mt-0">
            {/* Call */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-[42px] px-4 sm:px-5 rounded-md bg-[#014162] text-white text-sm sm:text-base font-medium hover:bg-[#01324a] transition-all shadow-sm active:scale-[0.97] cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Call</span>
            </button>
            {/* Chat */}
            <button
              type="button"
              className=" flex items-center justify-center gap-2 h-[42px] px-4 sm:px-5 rounded-md  bg-[#014162]  text-white text-sm sm:text-base  font-medium hover:bg-[#01324a] transition-all shadow-sm active:scale-[0.97] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Chat</span>
            </button>
          </div>
        </div>

        {/* ===== Safety Policy ===== */}
        <div className="mt-6 bg-gray-200 px-4 sm:px-6 py-4 flex flex-col gap-3 shadow-xl rounded-lg">
          <p className="text-[#014162] font-normal sm:font-medium">
            Our Safety Policy...
          </p>

          <p className="text-[#014162] font-normal">
            Drivers must adhere to road safety rules and operate vehicles with
            caution to ensure safe and timely deliveries.
          </p>
        </div>
      </div>
    </section>
  );
}
