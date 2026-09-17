import { z } from "zod";

const email = z.string().trim().email().transform((value) => value.toLowerCase());
const password = z.string().min(8).max(72);

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  lastname: z.string().trim().min(2).max(50),
  email,
  password,
});

export const loginSchema = z.object({ email, password });

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(50),
  lastname: z.string().trim().min(2).max(50),
  email,
  password: z.union([password, z.literal("")]).optional(),
});
