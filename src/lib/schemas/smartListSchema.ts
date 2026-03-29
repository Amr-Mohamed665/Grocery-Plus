import z from "zod";

export const imageSchema = z
  .any()
  .refine(
    (file) => file && (file instanceof File || file instanceof FileList),
    "Image is required",
  )
  .transform((val) => {
    if (val instanceof FileList) return val[0];
    return val as File;
  })
  .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
    message: "Max file size is 5MB",
  })
  .refine((file) => !file || file.type.startsWith("image/"), {
    message: "File must be an image",
  });

export const addSmartListSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  dis: z.string().min(10, "Description must be at least 10 characters long"),
  image: imageSchema,
  meal_ids: z.array(z.string()).min(2, "Select at least two products"),
});
export const editSmartListSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  dis: z.string().min(10, "Description must be at least 10 characters long"),
  meal_ids: z.array(z.string()).min(2, "Select at least two products"),
});
