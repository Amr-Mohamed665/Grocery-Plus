import { useQuery } from "@tanstack/react-query";

// all categories api
async function getAllCategories() {
  const res = await fetch("/api/categories");

  if (!res.ok) throw new Error("Failed to get categories");
  const categories = await res.json();
  return categories;
}

// single category api
async function getSingleCategory(id: string) {
  const res = await fetch(`/api/categories/${id}`);

  if (!res.ok) throw new Error("Failed to get category");
  const category = await res.json();
  return category;
}

// meals api
async function getMeals(id: string) {
  const res = await fetch(`/api/categories/${id}/meals`);

  if (!res.ok) throw new Error("Failed to get meals");
  const meals = await res.json();
  return meals;
}

// search meals api
async function searchMeals(query: string) {
  const res = await fetch(`/api/categories/meals?${query}`);

  if (!res.ok) throw new Error("Failed to search meals");
  const meals = await res.json();
  return meals;
}

// new products api
async function getNewProducts() {
  const res = await fetch("/api/categories/newProduct");

  if (!res.ok) throw new Error("Failed to get new products");
  const newProducts = await res.json();
  return newProducts;
}

// best sells api
async function getBestSells() {
  const res = await fetch("/api/categories/bestSells");

  if (!res.ok) throw new Error("Failed to get best sells");
  const bestSells = await res.json();
  return bestSells;
}

//////////////////////////////////
// hooks for categories //////////
//////////////////////////////////

// all categories hook
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}

// single category hook
export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getSingleCategory(id),
  });
}

// meals hook
export function useMeals(id: string) {
  return useQuery({
    queryKey: ["meals", id],
    queryFn: () => getMeals(id),
  });
}

// search meals hook
export function useSearchMeals(query: string) {
  return useQuery({
    queryKey: ["search-meals", query],
    queryFn: () => searchMeals(query),
  });
}

// new products hook
export function useNewProducts() {
  return useQuery({
    queryKey: ["new-products"],
    queryFn: getNewProducts,
  });
}

// best sells hook
export function useBestSells() {
  return useQuery({
    queryKey: ["best-sells"],
    queryFn: getBestSells,
  });
}
