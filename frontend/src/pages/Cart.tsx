import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
} from "react-icons/hi2";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../hooks";

import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";

import { ar } from "../translations/ar";
import { formatCurrency } from "../utils/formatCurrency";


const Cart = () => {

  const {
    productsInCart,
    subtotal,
  } = useAppSelector((state) => state.cart);


  const dispatch = useAppDispatch();


  const shipping = subtotal > 0 ? 50 : 0;

  const total = subtotal + shipping;



  return (

    <div
      dir="rtl"
      className="
      bg-white
      mx-auto
      max-w-screen-2xl
      px-5
      max-[400px]:px-3
      "
    >


      <div className="pb-24 pt-16">


        <h1 className="
        text-4xl
        font-bold
        text-gray-900
        "
        >
          {ar.cart.title}
        </h1>



        <div className="
        mt-12
        grid
        lg:grid-cols-12
        gap-12
        ">



          <section className="lg:col-span-7">


            {
              productsInCart.length === 0 ? (

                <p className="text-xl text-center py-20">
                  السلة فارغة
                </p>

              ) : (


                <ul className="
                divide-y
                divide-gray-200
                border-y
                ">


                {
                  productsInCart.map((product)=>(


                    <li
                      key={product.id}
                      className="
                      flex
                      py-6
                      gap-5
                      "
                    >


                      <img
                        src={`/assets/${product.image}`}
                        alt={product.title}
                        className="
                        w-32
                        h-40
                        object-cover
                        "
                      />



                      <div className="
                      flex-1
                      flex
                      flex-col
                      justify-between
                      "
                      >


                        <div>


                          <Link
                            to={`/product/${product.productId}`}
                            className="
                            text-lg
                            font-medium
                            "
                          >

                            {product.title}

                          </Link>



                          <div className="
                          flex
                          gap-4
                          mt-2
                          text-gray-500
                          "
                          >

                            <span>
                              {product.color}
                            </span>


                            {
                              product.size &&

                              <span>
                                {product.size}
                              </span>
                            }


                          </div>



                          <p className="
                          mt-2
                          font-bold
                          "
                          >
                            {formatCurrency(product.price)}
                          </p>



                        </div>





                        <div className="
                        flex
                        items-center
                        gap-3
                        "
                        >

                          <label>
                            {ar.cart.quantity}
                          </label>



                          <input
                            type="number"
                            min="1"
                            value={product.quantity}
                            className="
                            w-20
                            border
                            text-center
                            h-8
                            "
                            onChange={(e)=>{

                              const quantity =
                              Number(e.target.value);


                              if(quantity >= 1){

                                dispatch(
                                  updateProductQuantity({
                                    id: product.id,
                                    quantity,
                                  })
                                );

                              }

                            }}
                          />



                          <button

                            type="button"

                            aria-label="delete"

                            onClick={()=>{

                              dispatch(
                                removeProductFromTheCart({
                                  id: product.id,
                                })
                              );


                              toast.error(
                                ar.cart.removed
                              );

                            }}

                          >

                            <XMarkIcon
                              className="
                              h-6
                              w-6
                              text-red-600
                              "
                            />


                          </button>


                        </div>





                        <div className="
                        flex
                        gap-2
                        mt-3
                        text-sm
                        "
                        >

                          {
                            product.stock ? (

                              <>

                              <CheckIcon
                                className="
                                h-5
                                w-5
                                text-green-500
                                "
                              />

                              <span>
                                {ar.cart.inStock}
                              </span>

                              </>

                            ) : (

                              <>

                              <XMarkIcon
                                className="
                                h-5
                                w-5
                                text-red-600
                                "
                              />

                              <span>
                                {ar.cart.outStock}
                              </span>

                              </>

                            )
                          }


                        </div>



                      </div>



                    </li>


                  ))
                }


                </ul>


              )
            }


          </section>






          <section
            className="
            lg:col-span-5
            bg-gray-50
            p-6
            h-fit
            "
          >


            <h2 className="
            text-xl
            font-bold
            "
            >

              {ar.cart.orderSummary}

            </h2>



            <div className="
            mt-6
            space-y-4
            ">


              <div className="flex justify-between">

                <span>
                  {ar.cart.subtotal}
                </span>

                <span>
                  {formatCurrency(subtotal)}
                </span>

              </div>



              <div className="flex justify-between">

                <span>
                  {ar.cart.shipping}
                </span>

                <span>
                  {formatCurrency(shipping)}
                </span>

              </div>



              <div className="
              border-t
              pt-4
              flex
              justify-between
              font-bold
              ">

                <span>
                  {ar.cart.total}
                </span>

                <span>
                  {formatCurrency(total)}
                </span>


              </div>


            </div>




            {
              productsInCart.length > 0 &&

              <Link
                to="/checkout"
                className="
                mt-6
                bg-secondaryBrown
                text-white
                h-12
                flex
                items-center
                justify-center
                text-xl
                "
              >

                {ar.cart.checkout}

              </Link>
            }



          </section>



        </div>


      </div>


    </div>

  );
};


export default Cart;
