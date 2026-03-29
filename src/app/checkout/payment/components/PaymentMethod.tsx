"use client";

import Image from "next/image";
import { FileCheck, Lock, Plus, BadgeCheck } from "lucide-react";

export default function PaymentMethod() {
  return (
    <section className="max-w-full sm:max-w-[1150px] mx-auto my-10 shadow-md border border-gray-200 p-4 sm:p-6 rounded-xl">
      <p className="font-medium text-lg sm:text-xl mb-4">Payment Method</p>

      {/* ===== Secure Box ===== */}
      <div className="mt-4 sm:mt-6 bg-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 shadow-xl rounded-lg">
        <FileCheck className="w-5 h-5 sm:w-6 sm:h-6" />
        <div className="flex items-center gap-2 sm:px-5">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-[16px] font-normal">Secure Checkout</p>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 ml-6 sm:ml-8">
          Your information is encrypted and secure. We never store your full
          card details.
        </p>
      </div>

      {/* ===== Content ===== */}
      <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12 flex-wrap">
        {/* ================= Saved Cards ================= */}
        <div className="w-full lg:w-[320px]">
          <p className="font-medium text-lg sm:text-xl mb-4">Saved Cards</p>

          {/* Card */}
          {[
            { img: "/images/visa.png", title: "Visa •••• 4242", exp: "12/25" },
            {
              img: "/images/master.png",
              title: "Mastercard •••• 8888",
              exp: "08/26",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-3 rounded-xl mb-4 cursor-pointer border-gray-200/80 hover:border-[#014162] transition"
            >
              <Image
                src={card.img}
                alt={card.title}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div>
                <p className="text-[14px] sm:text-[16px] font-normal">
                  {card.title}
                </p>
                <p className="text-xs sm:text-sm text-[#6B6F75]">
                  Expires {card.exp}
                </p>
              </div>
            </div>
          ))}

          {/* Add Card */}
          <button className="w-full flex items-center gap-2 mb-6 border-2 rounded-md p-3.5 cursor-pointer border-gray-200/80 hover:border-[#014162]">
            <Plus className="w-4 h-4" />
            Add New Card
          </button>

          {/* Promo Code */}
          <div>
            <p className="text-[14px] sm:text-[16px] font-normal mb-2 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              Promo Code
            </p>

            <div className="border border-gray-200 p-4 rounded-xl space-y-3 bg-white">
              {/* Promo Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <button className="px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-md border-2 cursor-pointer border-gray-200/80 hover:border-[#014162]">
                  SAVE10
                </button>

                <p className="text-[10px] sm:text-xs text-gray-500">
                  Try: <span className="font-medium">SAVE10</span> or{" "}
                  <span className="font-medium">WELCOME20</span>
                </p>
              </div>

              {/* Apply Button */}
              <button className=" w-1/2 h-[42px] rounded-lg  text-[#014162] bg-[#BCB8B1] text-sm font-semibold  hover:bg-[#8f8d8a] cursor-pointer transition-colors shadow-sm ">
                Apply Code
              </button>
            </div>
          </div>
        </div>

        {/* ================= Other Payment Methods ================= */}
        <div className="w-full lg:w-[320px]">
          <p className="font-medium text-lg sm:text-xl mb-4">
            Other Payment Methods
          </p>

          {/* Method */}
          {[
            {
              title: "Cash on Delivery",
              desc: "Pay when you receive your order",
              link: "/images/cash.png",
            },
            {
              title: "Apple Pay",
              desc: "Quick checkout with Apple Pay",
              link: "/images/A-pay.png",
            },
            {
              title: "Google Pay",
              desc: "Quick checkout with Google Pay",
              link: "/images/G-pay.png",
            },
            {
              title: "Wallet Pay",
              desc: "Digital wallet payment",
              link: "/images/wallet.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4  p-3 rounded-xl mb-4 cursor-pointer  border-2 border-gray-200/80 hover:border-[#014162] transition"
            >
              <Image
                src={item.link}
                alt={item.title}
                width={30}
                height={30}
                className="rounded-md object-cover"
              />
              <div>
                <p className="text-[14px] sm:text-[16px] font-normal">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-[#6B6F75]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
