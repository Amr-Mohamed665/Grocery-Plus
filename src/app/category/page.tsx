"use client";

import SearchBar from "./components/SearchBar";
import { Banner } from "./components/Banner";
import ProductBanner from "./components/ProductBanner";
import SlideProduct from "../../components/common/SlideProduct";
import Container from "@/components/common/Container";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useMeals } from "@/hooks/meals/useMeals";

// dynamic data
const categories = [
  { strCategory: "All" },
  { strCategory: "Vegetables" },
  { strCategory: "Fruits" },
  { strCategory: "Meat & Poultry" },
  { strCategory: "Dairy Products" },
  { strCategory: "Bakery" },
  { strCategory: "Drinks" },
];

function CategoryContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";

  const filteredCategories = categories.filter((cat) =>
    cat.strCategory.toLowerCase().includes(q),
  );

  const { data: meals } = useMeals();
  
  // Get unique categories from meals data for filtering
  const availableCategories = meals?.meals
    ? [...new Set(meals.meals.map((meal: any) => meal.category.name))] as string[]
    : [];
  
  return (
    <div className="space-y-4">
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => {
          // Filter meals for this category, or show all if "All" is selected
          const categoryMeals = cat.strCategory === "All" 
            ? meals 
            : { meals: meals?.meals?.filter((meal: any) => meal.category.name === cat.strCategory) };
          
          // Skip if no meals for this category (except for "All")
          if (cat.strCategory !== "All" && (!categoryMeals?.meals || categoryMeals.meals.length === 0)) {
            return null;
          }
          
          return (
            <div key={cat.strCategory}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                  {cat.strCategory}
                </h2>
              </div>
              <SlideProduct key={cat.strCategory} meals={categoryMeals} />
            </div>
          );
        })
      ) : (
        <div className="py-20 text-center text-slate-400">
          <p className="text-xl">No categories found matching &quot;{q}&quot;</p>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Container>
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <SearchBar />
        </div>

        <div className="mb-12">
          <Banner />
        </div>

        <Suspense
          fallback={
            <div className="text-center py-20">Loading categories...</div>
          }
        >
          <CategoryContent />
        </Suspense>

        <ProductBanner />
      </main>
    </Container>
  );
}
