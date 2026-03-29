"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [data, setData] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop?search=${data}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 max-w-4xl w-full"
    >
      <div className="flex-1 flex items-center gap-3 px-2">
        <Search className="text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search on Category..."
          className="w-full text-slate-600 placeholder:text-slate-400 focus:outline-none text-sm py-2"
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div className="w-px h-8 bg-slate-200" />

      <div className="flex items-center gap-3 pr-1">
        <button
          type="submit"
          className="bg-[#083C5A] hover:bg-[#062d44] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          Find Category
        </button>
      </div>
    </form>
  );
}
