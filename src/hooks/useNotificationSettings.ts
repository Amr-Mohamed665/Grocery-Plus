"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

// Fetch notification settings data from API
async function fetchNotificationSetting() {
  const res = await fetch("/api/notifications_settings");

  if (!res.ok) throw new Error("Failed fetch notification settings data");
  const data = await res.json();
  return data.data;
}

export function useNotificationSettings() {
  return useQuery({
    queryKey: ["notificationSettings"],
    queryFn: fetchNotificationSetting,
  });
}

// Update notification settings data to API
async function UpdateNotificationSettings(data: any) {
  const res = await fetch("/api/notifications_settings", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update notification settings data");
  const updatedData = await res.json();
  return updatedData;
}

export function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn: UpdateNotificationSettings,
  });
}
