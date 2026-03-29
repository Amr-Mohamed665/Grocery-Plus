// personal schema
import z from "zod";

export const personalSchema = z.object({
  firstname: z
    .string()
    .min(3, "The firstname field must be a string, at lest 3chr"),
  lastname: z
    .string()
    .min(3, "The lastname field must be a string at lest 3chr"),
  email: z.string().email("valid email"),
  phone: z.string().regex(/^\+[\d\s-]{10,}$/, "format invalid"),
});
