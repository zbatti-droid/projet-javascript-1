import { Link, useLoaderData } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";
import { ar } from "../translations/ar";

const OrderHistory = () => {
  const orders = useLoaderData() as Order[];
  return (
    <div dir="rtl" className="max-w-screen-2xl mx-auto pt-20 px-5 max-[400px]:px-3">
      <h1 className="text-4xl font-bold mb-8">{ar.account.orders}</h1>
      {orders.length === 0 ? (
        <p className="text-lg">لا توجد طلبات حاليا</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="p-3 border">رقم الطلب</th>
                <th className="p-3 border">التاريخ</th>
                <th className="p-3 border">{ar.cart.total}</th>
                <th className="p-3 border">الحالة</th>
                <th className="p-3 border">التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-3 border text-center">#{order.id.slice(-8)}</td>
                  <td className="p-3 border text-center">{formatDate(order.createdAt)}</td>
                  <td className="p-3 border text-center">{formatCurrency(order.total)}</td>
                  <td className="p-3 border text-center">{order.orderStatus || "قيد المعالجة"}</td>
                  <td className="p-3 border text-center"><Link to={`/order-history/${order.id}`} className="text-secondaryBrown hover:underline">مشاهدة</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
