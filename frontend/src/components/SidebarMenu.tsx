import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { HiXMark } from "react-icons/hi2";

import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks";

import { setLoginStatus } from "../features/auth/authSlice";

import { store } from "../store";

import { ar } from "../translations/ar";
import customFetch from "../axios/custom";



const SidebarMenu = ({

  isSidebarOpen,

  setIsSidebarOpen,

}: {

  isSidebarOpen: boolean;

  setIsSidebarOpen: (prev: boolean) => void;

}) => {



  const [isAnimating, setIsAnimating] = useState(false);


  const { loginStatus } =
    useAppSelector(
      (state) => state.auth
    );


  const navigate = useNavigate();





  const closeSidebar = () => {

    setIsSidebarOpen(false);

  };






  const logout = async () => {

    try {
      await customFetch.post("/auth/logout");
    } catch {
      // Clear the local session even if the API is temporarily unavailable.
    }


    toast.success(
      ar.navigation.logout
    );


    localStorage.removeItem("user");


    store.dispatch(
      setLoginStatus(false)
    );


    closeSidebar();


    navigate("/login");


  };






  useEffect(() => {


    if(isSidebarOpen){

      setIsAnimating(true);

    }

    else{


      const timer = setTimeout(

        ()=>setIsAnimating(false),

        300

      );


      return ()=>clearTimeout(timer);


    }


  },[isSidebarOpen]);







  return (

    <>


    {(isSidebarOpen || isAnimating) && (


      <div

      dir="rtl"

      className={

        isSidebarOpen

        ?

        `
        fixed
        top-0
        right-0
        w-64
        z-50
        h-full
        bg-white
        shadow-lg
        transition-transform
        duration-300
        ease-in-out
        border-l
        border-black
        translate-x-0
        `

        :

        `
        fixed
        top-0
        right-0
        w-64
        z-50
        h-full
        bg-white
        shadow-lg
        transition-transform
        duration-300
        ease-in-out
        border-l
        border-black
        translate-x-full
        `

      }


      >





      {/* اغلاق */}

      <div className="flex justify-start ml-1 mt-1">


        <HiXMark

          className="
          text-3xl
          cursor-pointer
          "

          onClick={closeSidebar}

        />


      </div>








      {/* الشعار */}


      <div className="flex justify-center mt-2">


        <Link

        to="/"

        onClick={closeSidebar}

        className="
        text-4xl
        font-light
        tracking-[1.08px]
        max-sm:text-3xl
        max-[400px]:text-2xl
        "

        >

          أناقة


        </Link>



      </div>









      {/* القائمة */}


      <div className="
      flex
      flex-col
      items-center
      gap-1
      mt-7
      ">




      <Link

      to="/"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.home}

      </Link>








      <Link

      to="/shop"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.shop}

      </Link>








      <Link

      to="/shop/evening-dresses"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.eveningDresses}

      </Link>








      <Link

      to="/shop/wedding-dresses"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.weddingDresses}

      </Link>








      <Link

      to="/search"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.search}

      </Link>







      {
      loginStatus

      ?

      <button

      onClick={logout}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.logout}


      </button>


      :

      <>


      <Link

      to="/login"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.login}


      </Link>





      <Link

      to="/register"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.register}


      </Link>


      </>

      }







      <Link

      to="/cart"

      onClick={closeSidebar}

      className="
      py-2
      border-y
      border-secondaryBrown
      w-full
      flex
      justify-center
      "

      >

      {ar.navigation.cart}


      </Link>





      </div>






      </div>


    )}



    </>

  );

};


export default SidebarMenu;
