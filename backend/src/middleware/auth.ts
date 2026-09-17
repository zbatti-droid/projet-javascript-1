import type { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { ApiError } from "../utils/api-error.js";
import { verifyToken } from "../utils/auth.js";

const readSession = (req: Request) => {
  const token = req.cookies?.fashion_session as string | undefined;
  if (!token) return undefined;

  try {
    const payload = verifyToken(token);
    return { id: payload.sub, role: payload.role };
  } catch {
    return undefined;
  }
};

export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  req.user = readSession(req);
  next();
};

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const user = readSession(req);
  if (!user) return next(new ApiError(401, "يرجى تسجيل الدخول أولا"));

  req.user = user;
  next();
};

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role !== Role.ADMIN) {
    return next(new ApiError(403, "غير مصرح لك بتنفيذ هذا الإجراء"));
  }

  next();
};
