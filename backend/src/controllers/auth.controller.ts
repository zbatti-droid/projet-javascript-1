import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/api-error.js";
import { clearAuthCookie, publicUser, setAuthCookie, signToken } from "../utils/auth.js";

export const register = async (req: Request, res: Response) => {
  const { name, lastname, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new ApiError(409, "هذا البريد الإلكتروني مسجل مسبقاً");

  const user = await prisma.user.create({
    data: { name, lastname, email, passwordHash: await bcrypt.hash(password, 12) },
  });
  setAuthCookie(res, signToken(user));
  res.status(201).json({ user: publicUser(user) });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(401, "البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
  setAuthCookie(res, signToken(user));
  res.json({ user: publicUser(user) });
};

export const me = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) throw new ApiError(404, "المستخدم غير موجود");
  res.json({ user: publicUser(user) });
};

export const logout = async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(204).send();
};
