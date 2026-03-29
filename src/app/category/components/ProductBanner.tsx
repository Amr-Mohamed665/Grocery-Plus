"use client";

import Image from "next/image";
import freshVigetables from "@/assets/freshVegetables.png";
import Link from "next/link";

export default function ProductBanner() {
  return (
    <div className="bg-white rounded-3xl mt-12 relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
      {/* Image Section (Left) */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        <div className="relative w-full max-w-[500px] aspect-[4/3]">
          <Image
            src={freshVigetables}
            alt="Organic Vegetables"
            fill
            className="object-contain"
          />
        </div>

        {/* Badge Overlay */}
        <div className="absolute top-0 right-10 md:right-0 bg-[#083C5A] text-white w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center shadow-xl z-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
            Up to
          </span>
          <span className="text-xl md:text-2xl font-black leading-none">
            30% off
          </span>
        </div>
      </div>

      {/* Text Section (Right) */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left">
        <h2 className="text-4xl md:text-5xl font-normal text-[#1a1a1a] mb-4 tracking-tight">
          Organic Vegetables Everyday
        </h2>
        <p className="text-lg md:text-xl text-[#2B5F75] mb-6 font-medium">
          Your online resource of healthy recipes.
        </p>
        <p className="text-slate-500 mb-8 leading-relaxed max-w-lg text-[15px]">
          Lorem ipsum dolor sit amet consectetur. Bibendum et volutpat vitae
          nullam aenean tortor dolor eget ipsum. Tincidunt sem sem convallis ut
          vestibulum sed. Nulla ultrices consectetur in sapien pellentesque
          aenean sagittis lectus quam. Sodales hac mauris eget phasellus tortor
          elit.
        </p>
        <Link href="/shop">
          <button className="cursor-pointer bg-[#083C5A] hover:bg-[#062d44] text-white px-10 py-3 rounded-md font-medium text-sm transition-all shadow-md">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
