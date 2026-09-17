import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { publicUser } from "../utils/auth.js";

export const updateMe = async (req: Request, res: Response) => {
  const { name, lastname, email, password } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      name,
      lastname,
      email,
      ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
    },
  });
  res.json({ user: publicUser(user) });
};
