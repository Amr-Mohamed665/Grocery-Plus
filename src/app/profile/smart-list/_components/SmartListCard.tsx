"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BsCart2 } from "react-icons/bs";
import { PiTrashThin } from "react-icons/pi";

export default function SmartListCard({
  list,
  onDelete,
  onEdit,
  onAddToCart,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-md p-5 shadow-sm hover:shadow-md hover:border-[#014162]/20 transition-all duration-300 w-full animate-in fade-in slide-in-from-bottom-4">
      {/* Decorative gradient corner */}

      <div className="flex items-start justify-between relative z-10 mb-6">
        <div className="flex items-center gap-4">
          <div className="shrink-0 relative">
            {list.image_url ? (
              <div className="relative size-16 rounded-sm overflow-hidden ring-2 ring-gray-50 group-hover:ring-[#014162]/10 transition-all">
                <Image
                  src={list.image_url}
                  alt={list.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>
            ) : (
              <div className="size-16 rounded-md bg-[#014162]/5 flex items-center justify-center text-[#014162] text-4xl font-bold">
                {list.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0e1112] line-clamp-1 group-hover:text-[#014162] transition-colors">
              {list.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-[#014162]/5 text-[#014162] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {list.meals.length} {list.meals.length === 1 ? "Meal" : "Meals"}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
              Updated{" "}
              {new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(list.id)}
          className="cursor-pointer p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all active:scale-90"
        >
          <PiTrashThin className="size-5" />
        </button>
      </div>

      <div className="flex gap-2 relative z-10 mt-auto">
        <Button
          size="sm"
          className="cursor-pointer bg-[#014162] hover:bg-[#013550] flex-1 text-white rounded-sm h-10 font-bold text-xs shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          onClick={() => onAddToCart(list.meals)}
        >
          <BsCart2 className="size-4 mr-2" />
          Add All to Cart
        </Button>
        <button
          onClick={() => onEdit(list)}
          className="cursor-pointer px-4 py-1 text-[#014162] font-bold border border-[#014162] text-xs hover:bg-[#014162]/5 rounded-sm transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
