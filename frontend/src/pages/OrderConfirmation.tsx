import { Link } from "react-router-dom";
import { ar } from "../translations/ar";


const OrderConfirmation = () => {

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

      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        gap-5
        "
      >


        <h1
          className="
          text-5xl
          font-light
          text-center
          max-sm:text-3xl
          "
        >

          {ar.orderConfirmation.title}

        </h1>



        <p
          className="
          text-center
          text-lg
          max-sm:text-base
          "
        >

          {ar.orderConfirmation.message}

        </p>




        <Link
          to="/shop"
          className="
          text-white
          bg-secondaryBrown
          text-center
          text-xl
          w-[400px]
          max-w-full
          h-12
          flex
          items-center
          justify-center
          mt-5
          max-md:text-base
          "
        >

          {ar.orderConfirmation.continueShopping}

        </Link>





        <Link
          to="/order-history"
          className="
          text-white
          bg-secondaryBrown
          text-center
          text-xl
          w-[400px]
          max-w-full
          h-12
          flex
          items-center
          justify-center
          max-md:text-base
          "
        >

          {ar.orderConfirmation.orderHistory}

        </Link>


      </div>


    </div>

  );
};


export default OrderConfirmation;