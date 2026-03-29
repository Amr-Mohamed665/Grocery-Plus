"use client";

import { Slider } from "@/components/ui/slider";
import {
  Salad,
  Beef,
  Citrus,
  Croissant,
  Milk,
  BottleWine,
  ChevronDown,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  useCategories,
  useSearchMeals,
} from "@/hooks/categories/useCategories";

// Section Heading with decorative line
const SectionHeading = ({ title }: { title: string }) => (
  <div className="relative w-full mb-6">
    <div className="pl-[45px]">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[4px] bg-[#014162] rounded-[25px]" />
      <div className="absolute left-[22px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-[#014162] rounded-[4px]" />
      <h3 className="text-[20px] font-medium text-[#071c1f] leading-[26px] capitalize">
        {title}
      </h3>
    </div>
  </div>
);

export default function SideFilter() {
  const { data } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentCategory = searchParams.get("category_id") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentMinPrice = searchParams.get("min_price") || "0";
  const currentMaxPrice = searchParams.get("max_price") || "1000";

  const { data: brands } = useSearchMeals(searchParams.toString());

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (category_id: string) => {
    updateFilters({
      category_id: currentCategory == category_id ? null : category_id,
    });
  };

  return (
    <div className="w-full md:w-[267px] shrink-0">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between bg-white border border-[#e4ecf2] p-4 rounded-lg mb-4 text-[#014162] font-semibold"
      >
        <div className="flex items-center gap-2">
          <Search size={20} />
          <span>Filter & Search</span>
        </div>
        {isOpen ? <X size={20} /> : <ChevronDown size={20} />}
      </button>

      <div
        className={`${isOpen ? "block" : "hidden"} md:block bg-[#f7fcff] w-full rounded-[8px] p-4 md:p-6 space-y-8`}
      >
        {/* Search Objects */}
        <SearchObjects
          initialValue={currentSearch}
          onSearch={(val) => updateFilters({ search: val })}
        />

        {/* Categories */}
        <div>
          <SectionHeading title="Categories" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
            {data?.categories.map((cat: any) =>
              cat.name === "Test_Cate" ? null : (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full h-[48px] rounded-[4px] px-4 py-1 flex items-center justify-between transition-colors ${
                    currentCategory == cat.id
                      ? "bg-[#014162] text-white"
                      : "bg-white text-[#0e1112] hover:bg-slate-50 border border-[#e4ecf2] md:border-0"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cat.id === 1 && <Salad size={18} />}
                    {cat.id === 2 && <Citrus size={18} />}
                    {cat.id === 3 && <Milk size={18} />}
                    {cat.id === 4 && <Beef size={18} />}
                    {cat.id === 5 && <Croissant size={18} />}
                    {cat.id === 6 && <BottleWine size={18} />}
                    <span className="text-[16px]">{cat.name}</span>
                  </div>
                </button>
              ),
            )}
          </div>
        </div>

        {/* Filter by Price */}
        <SliderBar
          min={Number(currentMinPrice)}
          max={Number(currentMaxPrice)}
          onChange={(min, max) =>
            updateFilters({ min_price: String(min), max_price: String(max) })
          }
        />

        {/* Availability Filter */}
        <div className="space-y-4">
          <SectionHeading title="Availability" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
            <Checkbox
              label="In stock"
              checked={searchParams.get("in_stock") === "1"}
              onChange={() =>
                updateFilters({
                  in_stock: searchParams.get("in_stock") === "1" ? null : "1",
                })
              }
            />
            <Checkbox
              label="Out of stock"
              checked={searchParams.get("in_stock") === "0"}
              onChange={() =>
                updateFilters({
                  in_stock: searchParams.get("in_stock") === "0" ? null : "0",
                })
              }
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="space-y-4">
          <SectionHeading title="Brand" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
            {brands?.data.map((cat: any) => (
              <Checkbox
                key={cat.id}
                label={cat.brand}
                checked={searchParams.get("brand") === cat.brand}
                onChange={() =>
                  updateFilters({
                    brand:
                      searchParams.get("brand") === cat.brand
                        ? null
                        : cat.brand,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchObjects = ({
  initialValue,
  onSearch,
}: {
  initialValue: string;
  onSearch: (val: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div className="space-y-4">
      <SectionHeading title="Search Products" />
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search your keyword..."
          className="w-full h-[50px] rounded-[8px] bg-white border-2 border-[#e4ecf2] px-[22px] text-[14px] font-semibold text-[#071c1f] placeholder:text-slate-400 focus:border-[#014162] outline-none transition-colors"
        />
        <button
          type="submit"
          className="cursor-pointer absolute right-0 top-0 bottom-0 w-[50px] bg-[#014162] rounded-tr-[8px] rounded-br-[8px] flex items-center justify-center border border-[#014162]"
        >
          <Search className="text-white w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

const SliderBar = ({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) => {
  const [value, setValue] = useState([min, max]);

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  return (
    <div className="space-y-4">
      <SectionHeading title="Filter by price" />
      <div className="grid w-full gap-4">
        <div className="flex items-center justify-between">
          <Label className="text-[14px] text-slate-500 uppercase font-bold tracking-wider">
            Range
          </Label>
          <span className="text-[16px] font-bold text-[#071c1f]">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          onValueCommit={(val) => onChange(val[0], val[1])}
          min={0}
          max={1000}
          step={1}
        />
      </div>
    </div>
  );
};

const Checkbox = ({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) => (
  <button onClick={onChange} className="flex items-center gap-3 w-full group">
    <div
      className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center transition-all ${
        checked
          ? "bg-[#014162] border-[#014162]"
          : "border-2 border-[#d9e3e9] group-hover:border-[#014162]"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 8.4 6.8">
          <path
            d="M7.4 1L2.627 5.8L1 4.164"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
    <span
      className={`text-[15px] transition-colors ${checked ? "text-[#014162] font-semibold" : "text-[#4a4a4a]"}`}
    >
      {label}
    </span>
  </button>
);
