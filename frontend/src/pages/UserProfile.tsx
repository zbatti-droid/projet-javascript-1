import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/Button";
import customFetch from "../axios/custom";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { ar } from "../translations/ar";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
  };

  const logout = async () => {
    try {
      await customFetch.post("/auth/logout");
    } finally {
      clearSession();
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await customFetch.get<{ user: User }>("/auth/me");
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch {
        clearSession();
        toast.error("انتهت الجلسة، يرجى تسجيل الدخول");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.lastname || !data.email) {
      toast.error("الاسم والبريد الإلكتروني مطلوبة");
      return;
    }
    if (data.password && String(data.password).length < 8) {
      toast.error("كلمة المرور الجديدة يجب أن تحتوي على 8 أحرف على الأقل");
      return;
    }

    try {
      const response = await customFetch.put<{ user: User }>("/users/me", data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("تم تحديث البيانات بنجاح");
      form.reset();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "فشل تحديث البيانات"));
    }
  };

  if (loading) return <p dir="rtl" className="mt-24 text-center">جاري تحميل الحساب...</p>;
  if (!user) return null;

  const inputClass = "bg-white border border-black text-xl py-2 px-3 w-full outline-none";
  return (
    <div dir="rtl" className="max-w-screen-lg mx-auto mt-24 px-5">
      <h1 className="text-4xl font-bold mb-8">{ar.account.profile}</h1>
      <form key={`${user.id}-${user.email}`} className="flex flex-col gap-6" onSubmit={updateUser}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">الاسم الأول</label>
          <input id="name" type="text" name="name" defaultValue={user.name} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastname">الاسم العائلي</label>
          <input id="lastname" type="text" name="lastname" defaultValue={user.lastname} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input id="email" type="email" name="email" defaultValue={user.email} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">كلمة مرور جديدة (اختياري)</label>
          <input id="password" type="password" name="password" minLength={8} autoComplete="new-password" placeholder="اتركها فارغة للاحتفاظ بكلمة المرور" className={inputClass} />
        </div>
        <Button type="submit" text="تحديث البيانات" mode="brown" />
        <Link to="/order-history" className="bg-white text-black text-center text-xl border border-gray-400 w-full h-12 flex items-center justify-center">طلباتي</Link>
        <Button type="button" onClick={logout} text="تسجيل الخروج" mode="white" />
      </form>
    </div>
  );
};

export default UserProfile;
