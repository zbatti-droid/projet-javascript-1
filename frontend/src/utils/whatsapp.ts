import { formatCurrency } from "./formatCurrency";

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? "").replace(
  /\D/g,
  "",
);

const createWhatsAppUrl = (message: string) => {
  if (!whatsappNumber) return null;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const createGeneralWhatsAppUrl = () =>
  createWhatsAppUrl(
    "السلام عليكم، أريد الاستفسار عن أحد المنتجات الموجودة في المتجر.",
  );

export const createOrderWhatsAppUrl = (order: Order) => {
  const products = order.products
    .map(
      (product) =>
        [
          `• ${product.title} × ${product.quantity}`,
          `  المقاس: ${product.size || "غير محدد"} | اللون: ${product.color || "غير محدد"}`,
          `  السعر: ${formatCurrency(product.price * product.quantity)}`,
        ].join("\n"),
    )
    .join("\n\n");

  const note = order.customer.note?.trim()
    ? `\nملاحظات: ${order.customer.note.trim()}`
    : "";

  return createWhatsAppUrl(
    [
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
      `المجموع الفرعي: ${formatCurrency(order.subtotal)}`,
      `التوصيل: ${formatCurrency(order.shipping)}`,
      `المجموع النهائي: ${formatCurrency(order.total)}`,
      "طريقة الدفع: الدفع عند الاستلام",
    ].join("\n"),
  );
};
