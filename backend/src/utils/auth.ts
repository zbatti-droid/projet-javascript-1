import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { Role, User } from "@prisma/client";
import { env } from "../config/env.js";

type AuthPayload = {
  sub: string;
  role: Role;
};

export const publicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  lastname: user.lastname,
  email: user.email,
  role: user.role,
});

export const signToken = (user: Pick<User, "id" | "role">) =>
  jwt.sign({ role: user.role }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: "7d",
  });

export const verifyToken = (token: string): AuthPayload => {
  const payload = jwt.verify(token, env.JWT_SECRET);

  if (typeof payload === "string" || !payload.sub || !payload.role) {
    throw new Error("Invalid token payload");
  }

  return { sub: payload.sub, role: payload.role as Role };
};

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie("fashion_session", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("fashion_session", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
};
