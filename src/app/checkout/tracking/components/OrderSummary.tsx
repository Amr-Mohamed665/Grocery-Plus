"use client";
import { Input } from "@/components/ui/input";
import {
  ReceiptIndianRupee,
  ArrowUpWideNarrow,
  Star,
  ChevronRight,
} from "lucide-react";

import CartSummary from "../../components/CartSummary";

export default function OrderSummary() {
  return (
    <section className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-24 my-10 px-4 sm:px-0">
      {/* ================= Cart Summary ================= */}
      <CartSummary quantity={1} totalH={0} />

      {/* ================= Order Options ================= */}
      <div className="w-full lg:w-[420] flex flex-col">
        <p className="font-medium text-xl mb-2">Order Options</p>

        <div className="w-full border border-gray-200 shadow-sm rounded-xl px-4 sm:px-6 py-5 flex flex-col gap-5">
          {/* Delivery Address */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Delivery Address</label>
            <Input placeholder="Villa 14, Street 23, District 5, New Cairo" />
          </div>

          {/* Schedule Delivery / buttons */}
          <div className="flex gap-10 justify-start  mt-5">
            {/* Download Receipt */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-4  rounded-md  text-[#014162] bg-[#BCB8B1] text-sm sm:text-base font-medium sm:w-auto cursor-pointer"
            >
              <ReceiptIndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download Receipt</span>
            </button>

            {/* Reorder */}
            <button
              type="button"
              className=" flex items-center justify-center gap-2  py-2 px-6  rounded-md text-[#014162] bg-[#BCB8B1] text-sm sm:text-base font-medium sm:w-auto cursor-pointer"
            >
              <ArrowUpWideNarrow className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Reorder</span>
            </button>
          </div>

          {/* Rating / Experience */}
          <div className="flex flex-col mt-5">
            <p className="text-lg mb-2">How Was Your Experience</p>
            <div className="flex py-2 gap-1 cursor-pointer">
              <Star  />
              <Star  />
              <Star  />
              <Star  />
              <Star  />
            </div>
            <Input className="mt-3" />
          </div>

          {/* Special Offer Code */}
          <div className="pt-5 w-full sm:w-2/3 ">
            <p className="font-medium text-xl mb-4">Special Offer Code</p>

            <div className="border px-3 py-5 rounded-xl space-y-3 flex flex-col">
              <p className="text-[#014162] text-lg font-normal">Offer Code</p>
              <div className="flex gap-3">
                <Input placeholder="Enter code" className="flex-1" />
              </div>

              <button className=" w-full py-2 flex items-center justify-center gap-2 rounded-md bg-[#014162] text-[#F7FCFF] text-sm sm:text-base font-semibold cursor-pointer">
                <span>Shop Now</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
