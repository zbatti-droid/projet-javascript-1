import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components";
import customFetch from "../axios/custom";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const Register = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.name || !data.lastname || !data.email || !data.password) {
      toast.error("أدخل جميع البيانات المطلوبة");
      return;
    }
    if (String(data.password).length < 8) {
      toast.error("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    setSubmitting(true);
    try {
      const response = await customFetch.post<{ user: User }>("/auth/register", {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      store.dispatch(setLoginStatus(true));
      toast.success("تم إنشاء الحساب بنجاح");
      navigate("/user-profile");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "تعذر إنشاء الحساب"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "bg-white border border-black text-xl py-2 px-3 w-full outline-none";
  return (
    <div dir="rtl" className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form onSubmit={handleRegister} className="max-w-xl w-full mx-auto flex flex-col gap-5 items-center justify-center px-5">
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl">إنشاء حساب جديد</h2>
        <div className="flex flex-col gap-3 w-full">
          <input type="text" name="name" required autoComplete="given-name" placeholder="الاسم" className={inputClass} />
          <input type="text" name="lastname" required autoComplete="family-name" placeholder="الاسم العائلي" className={inputClass} />
          <input type="email" name="email" required autoComplete="email" placeholder="البريد الإلكتروني" className={inputClass} />
          <input type="password" name="password" required minLength={8} autoComplete="new-password" placeholder="كلمة المرور (8 أحرف على الأقل)" className={inputClass} />
          <input type="password" name="confirmPassword" required minLength={8} autoComplete="new-password" placeholder="تأكيد كلمة المرور" className={inputClass} />
        </div>
        <Button type="submit" text={submitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"} mode="brown" disabled={submitting} />
        <Link to="/login" className="text-xl max-md:text-lg">لديك حساب؟ <span className="text-secondaryBrown">تسجيل الدخول</span></Link>
      </form>
    </div>
  );
};

export default Register;
