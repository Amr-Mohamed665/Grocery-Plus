"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

// Fetch User Data
// async function fetchUser() {
//   const res = await fetch("/api/profile");

//   if (!res.ok) throw new Error("Failed fetch user data");
//   const data = await res.json();
//   if (!data || !data.data) {
//     throw new Error("Invalid profile data structure");
//   }
//   return data.data;
// }

// export function useProfile() {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: fetchUser,
//   });
// }

// Update User Data
async function UpdateUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  preferred_languages: [string];
}) {
  const res = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user data");
  const updatedData = await res.json();
  return updatedData;
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: UpdateUser,
  });
}

// Update User Image
async function updateImage(imgFile: File) {
  const formData = new FormData();
  formData.set("image", imgFile);

  const res = await fetch("/api/profile", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}

export const useUpdateImage = () => {
  return useMutation({
    mutationFn: updateImage,
  });
};
