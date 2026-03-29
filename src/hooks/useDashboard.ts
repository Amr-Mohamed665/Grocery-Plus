"use client";

import { useQuery } from "@tanstack/react-query";

// Fetch Dashboard data from API
async function fetchDashboard() {
  const res = await fetch("/api/dashboard");

  if (!res.ok) throw new Error("Failed fetch dashboard data");
  const data = await res.json();
  return data.data;
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
}
