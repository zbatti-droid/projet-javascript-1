import { z } from "zod";

export const productSchema = z.object({
  id: z.string().trim().min(1).max(40),
  title: z.string().trim().min(2).max(150),
  image: z.string().trim().min(1).max(255),
  category: z.string().trim().min(2).max(80),
  price: z.number().int().nonnegative(),
  popularity: z.number().int().min(0).default(0),
  stock: z.number().int().nonnegative(),
  active: z.boolean().default(true),
});

export const updateProductSchema = productSchema.omit({ id: true }).partial().refine(
  (data) => Object.keys(data).length > 0,
  "يجب إرسال حقل واحد على الأقل",
);
