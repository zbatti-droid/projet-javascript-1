import type { Request, Response } from "express";
import { Prisma, type OrderStatus } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/api-error.js";
import {
  sendOrderWhatsAppNotification,
  type WhatsAppNotificationStatus,
} from "../services/whatsapp.service.js";

const statusLabels: Record<OrderStatus, string> = {
  PROCESSING: "قيد المعالجة",
  CONFIRMED: "تم التأكيد",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
};
const orderInclude = {
  items: true,
  user: { select: { email: true } },
} satisfies Prisma.OrderInclude;
type FullOrder = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;

const serializeOrder = (order: FullOrder) => ({
  id: order.id,
  customer: {
    firstName: order.firstName,
    lastName: order.lastName,
    phone: order.phone,
    city: order.city,
    address: order.address,
    note: order.note ?? "",
    email: order.user?.email,
  },
  products: order.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    title: item.title,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  })),
  subtotal: order.subtotal,
  shipping: order.shipping,
  total: order.total,
  paymentMethod: "الدفع عند الاستلام",
  orderStatus: statusLabels[order.status],
  createdAt: order.createdAt.toISOString(),
});

type RequestedItem = { productId: string; quantity: number; size: string; color: string };
type CustomerInput = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
};

export const createOrder = async (req: Request, res: Response) => {
  const { customer, products: requestedItems } = req.body as { customer: CustomerInput; products: RequestedItem[] };
  const ids = [...new Set(requestedItems.map((item) => item.productId))];
  const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } });
  if (products.length !== ids.length) throw new ApiError(400, "أحد المنتجات غير متاح");

  const productMap = new Map(products.map((product) => [product.id, product]));
  const items = requestedItems.map((item) => {
    const product = productMap.get(item.productId)!;
    if (product.stock < item.quantity) {
      throw new ApiError(409, `الكمية المطلوبة غير متوفرة للمنتج: ${product.title}`);
    }
    return { ...item, title: product.title, image: product.image, price: product.price };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;

  const order = await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const updated = await tx.product.updateMany({
        where: { id: item.productId, active: true, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      if (updated.count !== 1) throw new ApiError(409, `نفدت كمية المنتج: ${item.title}`);
    }

    return tx.order.create({
      data: {
        ...(req.user ? { userId: req.user.id } : {}),
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        city: customer.city,
        address: customer.address,
        note: customer.note || null,
        subtotal,
        shipping,
        total: subtotal + shipping,
        items: { create: items },
      },
      include: orderInclude,
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

  const serializedOrder = serializeOrder(order);
  let whatsappNotification: WhatsAppNotificationStatus = "skipped";

  try {
    whatsappNotification = await sendOrderWhatsAppNotification(serializedOrder);
  } catch (error) {
    whatsappNotification = "failed";
    console.error(
      "WhatsApp order notification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  res.status(201).json({ ...serializedOrder, whatsappNotification });
};

export const myOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id }, include: orderInclude, orderBy: { createdAt: "desc" },
  });
  res.json(orders.map(serializeOrder));
};

export const getOrder = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) throw new ApiError(400, "معرف الطلب غير صالح");
  const order = await prisma.order.findFirst({
    where: { id, ...(req.user!.role === "ADMIN" ? {} : { userId: req.user!.id }) },
    include: orderInclude,
  });
  if (!order) throw new ApiError(404, "الطلب غير موجود");
  res.json(serializeOrder(order));
};

export const listOrders = async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany({ include: orderInclude, orderBy: { createdAt: "desc" } });
  res.json(orders.map(serializeOrder));
};
