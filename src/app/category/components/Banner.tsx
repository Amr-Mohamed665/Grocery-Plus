"use client";

import Image from "next/image";
import noImage from "@/assets/no-image.jpg";
import Link from "next/link";
import { useCategories } from "@/hooks/categories/useCategories";

export const Banner = () => {
  const { data: categories } = useCategories();

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide ">
      <div className="flex gap-4 min-w-max justify-center">
        {categories?.categories.map((cat: any) =>
          cat.name === "Test_Cate" ? null : (
            <Link
              href={`shop?category_id=${cat.id}`}
              key={cat.id}
              className="flex flex-col items-center justify-center bg-white rounded-3xl p-4 w-[140px] h-[140px] shadow-sm border border-slate-50 hover:border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative w-16 h-16 mb-3 group-hover:scale-110 rounded-xl overflow-hidden transition-transform duration-300">
                <Image
                  src={cat.image_url || noImage}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-slate-700 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};
