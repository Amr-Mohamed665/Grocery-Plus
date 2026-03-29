"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Wallet } from "lucide-react";
import { formatCard } from "@/lib/utils/helperFn";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

//MOCK DATA FOR PRESENTATIONAL PURPOSES
const cardLogos: Record<string, string> = {
  visa: "/visa.svg",
  mastercard: "/mastercard.svg",
};
//MOCK DATA FOR PRESENTATIONAL PURPOSES
const paymentCards = [
  {
    id: "1",
    type: "visa",
    number: "1524365478544242",
    expiry: "12/25",
  },
  {
    id: "2",
    type: "mastercard",
    number: "5214652385478888",
    expiry: "08/26",
  },
];
//MOCK DATA FOR PRESENTATIONAL PURPOSES
const otherMethods = [
  {
    id: "cash",
    label: "Cash On Delivery",
    sub: "Pay when you receive your order",
    icon: <BsCashCoin size={30} />,
  },
  {
    id: "google",
    label: "Google Pay",
    sub: "Quick checkout with Google Pay",
    icon: <FaGooglePay size={30} />,
  },
  {
    id: "apple",
    label: "Apple Pay",
    sub: "Quick checkout with Apple Pay",
    icon: <FaApplePay size={30} />,
  },
  {
    id: "wallet",
    label: "Wallet Pay",
    sub: "Digital wallet payment",
    icon: <FaWallet size={30} />,
  },
];

function PaymentSelector() {
  const [selectedId, setSelectedId] = useState("1"); // Default to the Mastercard

  return (
    <div className="flex gap-8 shadow p-6 mt-4">
      {/* Left Column: Saved Cards */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Saved Cards</h3>
        <div className="space-y-3">
          {paymentCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedId(card.id)}
              className={`w-full flex items-center p-4 cursor-pointer rounded-xl transition-all 
                ${selectedId === card.id ? "border-[#014262ad] border-2 bg-white" : "bg-white/50 border border-slate-200 hover:border-slate-200 "}`}
            >
              <div className="w-12 h-8 bg-slate-100 rounded mr-4 flex items-center justify-center">
                {/* Replace with actual SVGs for Visa/Mastercard */}
                {card.type === "visa" ? (
                  <FaCcVisa
                    size={40}
                    color={`${selectedId === card.id ? "#014162" : "#01416280"}`}
                  />
                ) : (
                  <FaCcMastercard
                    size={40}
                    color={`${selectedId === card.id ? "#014162" : "#01416280"}`}
                  />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium">{formatCard(card)}</p>
                <p className="text-xs text-slate-500">Expires {card.expiry}</p>
              </div>
            </button>
          ))}

          {/* Add New Card Action */}
          <button className="w-full cursor-pointer flex items-center p-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
            <Plus size={20} className="mr-4" />
            <span className="font-medium">Add New Card</span>
          </button>
        </div>
      </div>

      {/* Right Column: Other Methods */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Other Payment Methods</h3>
        <div className="space-y-3">
          {otherMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedId(method.id)}
              className={`w-full flex gap-4 items-center border border-slate-200 p-4 cursor-pointer rounded-xl transition-all
                ${
                  selectedId === method.id
                    ? "border-[#01416280] border-2 bg-white"
                    : " bg-white/50 hover:border-slate-200"
                }`}
            >
              {method.icon}
              <div className="text-left">
                <p className="font-medium">{method.label}</p>
                <p className="text-xs text-slate-500">{method.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentSelector;
