import {
  useLoaderData,
} from "react-router-dom";

import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";



const SingleOrderHistory = () => {


  const singleOrder = useLoaderData() as Order;





  if (!singleOrder) {

    return (

      <div
        className="text-center mt-20"
        dir="rtl"
      >

        لا يوجد طلب

      </div>

    );

  }





  return (

    <div
      dir="rtl"
      className="
      max-w-screen-2xl
      mx-auto
      pt-20
      px-5
      max-[400px]:px-3
      "
    >



      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >

        تفاصيل الطلب

      </h1>




      <div
        className="
        bg-white
        border
        p-6
        "
      >



        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >

          رقم الطلب : #{singleOrder.id}

        </h2>




        <p className="mb-3">

          التاريخ :
          {" "}
          {formatDate(singleOrder.createdAt)}

        </p>




        <p className="mb-3">

          المجموع الفرعي :
          {" "}
          {formatCurrency(singleOrder.subtotal)}

        </p>




        <p className="mb-3">

          التوصيل :
          {" "}
          {formatCurrency(singleOrder.shipping)}

        </p>




        <p className="mb-3 font-bold">

          المجموع النهائي :
          {" "}
          {formatCurrency(singleOrder.total)}

        </p>




        <p className="mb-5">

          الحالة :
          {" "}
          {singleOrder.orderStatus || "قيد المعالجة"}

        </p>





        <h3
          className="
          text-xl
          font-bold
          mb-4
          "
        >

          المنتجات

        </h3>





        <div className="overflow-x-auto">


          <table
            className="
            min-w-full
            border
            "
          >

            <thead>

              <tr>

                <th className="border p-3">
                  المنتج
                </th>


                <th className="border p-3">
                  الكمية
                </th>


                <th className="border p-3">
                  السعر
                </th>


              </tr>

            </thead>



            <tbody>

              {singleOrder.products.map((product) => (

                <tr key={product.id}>


                  <td className="border p-3">

                    {product.title}

                  </td>



                  <td className="
                  border
                  p-3
                  text-center
                  "
                  >

                    {product.quantity}

                  </td>




                  <td className="border p-3">

                    {formatCurrency(product.price)}

                  </td>



                </tr>

              ))}


            </tbody>


          </table>


        </div>



      </div>



    </div>

  );

};



export default SingleOrderHistory;
