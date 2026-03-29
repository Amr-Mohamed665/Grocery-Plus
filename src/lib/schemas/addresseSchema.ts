import z from "zod";

export const editAddressSchema = z.object({
  apartment: z.string().optional(),
  building_number: z.string().optional(),
  city: z.string().min(5, "City is required at least 5 characters"),
  country: z.string().min(5, "Country is required at least 5 characters"),
  full_name: z.string().min(5, "Full name is required at least 5 characters"),
  landmark: z.string().optional(),
  notes: z.string().optional(),
  label: z.string().optional(),
  phone: z.string().regex(/^\+[\d\s-]{10,}$/, "Invalid phone number (e.g. +201012345678)"),
  street_address: z
    .string()
    .min(5, "Street address is required at least 5 characters"),
});
