import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/api-error.js";

export const listProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ popularity: "desc" }, { id: "asc" }],
  });
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) throw new ApiError(400, "معرف المنتج غير صالح");
  const product = await prisma.product.findFirst({ where: { id, active: true } });
  if (!product) throw new ApiError(404, "المنتج غير موجود");
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) throw new ApiError(400, "معرف المنتج غير صالح");
  const product = await prisma.product.update({ where: { id }, data: req.body });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) throw new ApiError(400, "معرف المنتج غير صالح");
  await prisma.product.update({ where: { id }, data: { active: false } });
  res.status(204).send();
};
