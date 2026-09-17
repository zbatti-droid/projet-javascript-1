import { env } from "../config/env.js";

export type WhatsAppNotificationStatus = "sent" | "skipped" | "failed";

type OrderForWhatsApp = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
    note?: string;
  };
  products: Array<{
    title: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
};

const money = (value: number) => `${value.toLocaleString("ar-MA")} درهم`;

const createOrderMessage = (order: OrderForWhatsApp) => {
  const products = order.products
    .map(
      (product) =>
        [
          `• ${product.title} × ${product.quantity}`,
          `  المقاس: ${product.size || "غير محدد"} | اللون: ${product.color || "غير محدد"}`,
          `  السعر: ${money(product.price * product.quantity)}`,
        ].join("\n"),
    )
    .join("\n\n");

  const note = order.customer.note?.trim()
    ? `\nملاحظات: ${order.customer.note.trim()}`
    : "";

  return [
    "🛍️ طلب جديد من متجر أناقة",
    `رقم الطلب: ${order.id}`,
    "",
    `الزبون: ${order.customer.firstName} ${order.customer.lastName}`,
    `الهاتف: ${order.customer.phone}`,
    `المدينة: ${order.customer.city}`,
    `العنوان: ${order.customer.address}${note}`,
    "",
    "المنتجات:",
    products,
    "",
    `المجموع الفرعي: ${money(order.subtotal)}`,
    `التوصيل: ${money(order.shipping)}`,
    `المجموع النهائي: ${money(order.total)}`,
    "طريقة الدفع: الدفع عند الاستلام",
  ]
    .join("\n")
    .slice(0, 4000);
};

export const sendOrderWhatsAppNotification = async (
  order: OrderForWhatsApp,
): Promise<WhatsAppNotificationStatus> => {
  if (!env.WHATSAPP_ENABLED) return "skipped";

  const url = `https://graph.facebook.com/${env.WHATSAPP_GRAPH_API_VERSION}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: env.WHATSAPP_RECIPIENT_NUMBER,
      type: "text",
      text: {
        preview_url: false,
        body: createOrderMessage(order),
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: { message?: string; code?: number };
    } | null;
    const message = payload?.error?.message ?? "Unknown WhatsApp Cloud API error";
    const code = payload?.error?.code ? ` (${payload.error.code})` : "";
    throw new Error(`WhatsApp Cloud API ${response.status}${code}: ${message}`);
  }

  return "sent";
};
