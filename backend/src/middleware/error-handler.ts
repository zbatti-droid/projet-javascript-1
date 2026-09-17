import type { ErrorRequestHandler, RequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/api-error.js";
import { env } from "../config/env.js";

export const notFound: RequestHandler = (_req, _res, next) => {
  next(new ApiError(404, "المسار المطلوب غير موجود"));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    res.status(409).json({ message: "هذه البيانات مستخدمة مسبقاً" });
    return;
  }

  console.error(error);
  res.status(500).json({
    message: "حدث خطأ داخلي في الخادم",
    ...(env.NODE_ENV === "development" ? { error: String(error) } : {}),
  });
};
