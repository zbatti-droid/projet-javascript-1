import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { ar } from "../translations/ar";
import { formatCurrency } from "../utils/formatCurrency";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { createOrderWhatsAppUrl } from "../utils/whatsapp";

const cities = ["الدار البيضاء", "الرباط", "مراكش", "أكادير", "طنجة", "فاس", "مكناس", "وجدة", "تطوان", "القنيطرة", "الجديدة", "آسفي"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", city: "", address: "", note: "" });
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    if (productsInCart.length === 0) return toast.error("السلة فارغة"), false;
    if (!formData.firstName.trim()) return toast.error("أدخل الاسم"), false;
    if (!formData.lastName.trim()) return toast.error("أدخل النسب"), false;
    if (!/^(\+212|0)[5-7][0-9]{8}$/.test(formData.phone.replace(/\s/g, ""))) return toast.error("رقم الهاتف غير صحيح"), false;
    if (!formData.city) return toast.error("اختر المدينة"), false;
    if (formData.address.trim().length < 5) return toast.error("أدخل العنوان كاملاً"), false;
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await customFetch.post<Order>("/orders", {
        customer: { ...formData, phone: formData.phone.replace(/\s/g, "") },
        products: productsInCart.map(({ productId, quantity, size, color }) => ({ productId, quantity, size, color })),
      });
      sessionStorage.setItem("lastOrderId", response.data.id);
      dispatch(clearCart());
      toast.success(ar.checkout.success);
      const whatsappUrl = createOrderWhatsAppUrl(response.data);

      if (response.data.whatsappNotification === "sent") {
        toast.success("تم إرسال نسخة من الطلب إلى واتساب المتجر");
      } else if (whatsappUrl) {
        const whatsappWindow = window.open(whatsappUrl, "_blank");
        if (whatsappWindow) whatsappWindow.opener = null;
        else window.location.assign(whatsappUrl);
      } else {
        toast.error("تم حفظ الطلب، لكن رقم واتساب المتجر غير مضبوط");
      }

      navigate("/order-confirmation");
    } catch (error) {
      toast.error(getApiErrorMessage(error, ar.checkout.error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <h1 className="text-4xl font-bold mt-12">{ar.checkout.title}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">{ar.checkout.customerInfo}</h2>
          <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder={ar.checkout.firstName} className="border p-3" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder={ar.checkout.lastName} className="border p-3" />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+212 6xxxxxxxx" className="border p-3" />
          <select name="city" value={formData.city} onChange={handleChange} required className="border p-3">
            <option value="">اختر المدينة</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <textarea name="address" value={formData.address} onChange={handleChange} required placeholder={ar.checkout.address} className="border p-3 h-32" />
          <textarea name="note" value={formData.note} onChange={handleChange} placeholder={ar.checkout.note} className="border p-3 h-24" />
        </div>
        <div className="bg-gray-50 p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">{ar.cart.orderSummary}</h2>
          <div className="space-y-4">
            {productsInCart.map((product) => (
              <div key={product.id} className="flex justify-between gap-4 border-b pb-3">
                <span>{product.title} × {product.quantity}</span>
                <span>{formatCurrency(product.price * product.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between"><span>{ar.cart.subtotal}</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>{ar.cart.shipping}</span><span>{formatCurrency(shipping)}</span></div>
            <div className="flex justify-between border-t pt-4 font-bold"><span>{ar.cart.total}</span><span>{formatCurrency(total)}</span></div>
            <p className="text-sm text-secondaryBrown">الدفع عند الاستلام</p>
            <Button type="submit" mode="brown" disabled={submitting || productsInCart.length === 0} text={submitting ? "جارٍ تأكيد الطلب..." : ar.checkout.confirmOrder} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
