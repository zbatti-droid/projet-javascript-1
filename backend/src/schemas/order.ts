import { z } from "zod";

export const createOrderSchema = z.object({
  customer: z.object({
    firstName: z.string().trim().min(2).max(50),
    lastName: z.string().trim().min(2).max(50),
    phone: z.string().regex(/^(\+212|0)[5-7][0-9]{8}$/),
    city: z.string().trim().min(2).max(80),
    address: z.string().trim().min(5).max(250),
    note: z.string().trim().max(500).optional().default(""),
  }),
  products: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(20),
    size: z.string().trim().min(1).max(20),
    color: z.string().trim().min(1).max(30),
  })).min(1).max(30),
});
