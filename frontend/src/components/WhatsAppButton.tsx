import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

const WhatsAppButton = () => {
  const handleClick = () => {
    const whatsappUrl = createGeneralWhatsAppUrl();

    if (!whatsappUrl) {
      toast.error("رقم واتساب المتجر غير مضبوط");
      return;
    }

    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="التواصل عبر واتساب"
      title="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-5 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-green-200"
    >
      <FaWhatsapp className="text-3xl" aria-hidden="true" />
      <span className="hidden font-bold sm:inline">واتساب</span>
    </button>
  );
};

export default WhatsAppButton;
