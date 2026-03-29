"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer absolute top-[64px] left-[64px] bg-[#B5B5B5] rounded-full w-[50px] h-[50px] flex items-center justify-center"
    >
      <ChevronLeft color="#5C6163" className="w-[20px] h-[20px]" />
    </button>
  );
}
