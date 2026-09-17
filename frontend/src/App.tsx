import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Login,
  OrderConfirmation,
  OrderHistory,
  Register,
  Search,
  Shop,
  SingleOrderHistory,
  SingleProduct,
  UserProfile,
} from "./pages";

import { searchAction } from "./actions";

import { shopCategoryLoader } from "./loaders/shopCategoryLoader";
import { orderHistoryLoader } from "./loaders/orderHistoryLoader";

import {
  loader as singleOrderLoader,
} from "./loaders/singleOrderLoader";



const router = createBrowserRouter([

  {
    path: "/",

    element: <HomeLayout />,


    children: [

      {
        index: true,
        element: <Landing />,
      },


      {
        path: "shop",
        element: <Shop />,
      },


      {
        path: "shop/:category",
        element: <Shop />,
        loader: shopCategoryLoader,
      },


      {
        path: "product/:id",
        element: <SingleProduct />,
      },


      {
        path: "cart",
        element: <Cart />,
      },


      {
        path: "checkout",
        element: <Checkout />,
      },


      {
        path: "search",
        element: <Search />,
        action: searchAction,
      },


      {
        path: "login",
        element: <Login />,
      },


      {
        path: "register",
        element: <Register />,
      },


      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },


      {
        path: "user-profile",
        element: <UserProfile />,
      },


      {
        path: "order-history",

        element: <OrderHistory />,

        loader: orderHistoryLoader,

      },


      {
        path: "order-history/:id",

        element: <SingleOrderHistory />,

        loader: singleOrderLoader,

      },


    ],

  },

]);



function App() {

  return (

    <RouterProvider router={router} />

  );

}



export default App;
