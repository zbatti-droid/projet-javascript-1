import { useEffect, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components";
import customFetch from "../axios/custom";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/user-profile");
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!data.email || !data.password) {
      toast.error("أدخل البريد الإلكتروني وكلمة المرور");
      return;
    }

    setSubmitting(true);
    try {
      const response = await customFetch.post<{ user: User }>("/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      store.dispatch(setLoginStatus(true));
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/user-profile");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "تعذر تسجيل الدخول"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="max-w-screen-2xl mx-auto pt-24 flex justify-center items-center">
      <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-5 px-5">
        <h2 className="text-5xl text-center font-thin mb-5 max-md:text-4xl max-sm:text-3xl">مرحباً بعودتك</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input id="email" type="email" name="email" autoComplete="email" required placeholder="أدخل البريد الإلكتروني" className="bg-white border border-black text-lg py-2 px-3 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">كلمة المرور</label>
          <div className="relative">
            <input id="password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" required placeholder="أدخل كلمة المرور" className="bg-white border border-black text-lg py-2 px-3 pl-11 outline-none w-full" />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute left-3 top-1/2 -translate-y-1/2" aria-label="إظهار أو إخفاء كلمة المرور">
              {showPassword ? <HiEyeSlash className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button type="submit" text={submitting ? "جارٍ الدخول..." : "تسجيل الدخول"} mode="brown" disabled={submitting} />
        <Link to="/register" className="text-xl text-center max-md:text-lg">ليس لديك حساب؟ <span className="text-secondaryBrown">إنشاء حساب</span></Link>
      </form>
    </div>
  );
};

export default Login;
