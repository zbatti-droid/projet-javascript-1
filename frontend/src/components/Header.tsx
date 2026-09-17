import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { Link } from "react-router-dom";
import { useState } from "react";

import SidebarMenu from "./SidebarMenu";
import { ar } from "../translations/ar";


const Header = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (

    <>

      <header
        dir="rtl"
        className="
        max-w-screen-2xl 
        flex 
        justify-between 
        items-center 
        py-4 
        px-5 
        text-black 
        mx-auto 
        max-sm:px-5 
        max-[400px]:px-3
        "
      >


        {/* القائمة */}

        <HiBars3

          className="
          text-2xl 
          max-sm:text-xl 
          ml-20 
          max-lg:ml-0 
          cursor-pointer
          "

          onClick={() => setIsSidebarOpen(true)}

          aria-label="فتح القائمة"

        />




        {/* الشعار */}

        <Link

          to="/"

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





        {/* الأيقونات */}

        <div
          className="
          flex 
          gap-4 
          items-center 
          max-sm:gap-2
          "
        >



          <Link

            to="/search"

            aria-label={ar.navigation.search}

          >

            <HiOutlineMagnifyingGlass
              className="
              text-2xl 
              max-sm:text-xl
              "
            />

          </Link>





          <Link

            to="/login"

            aria-label={ar.navigation.account}

          >

            <HiOutlineUser

              className="
              text-2xl 
              max-sm:text-xl
              "

            />

          </Link>





          <Link

            to="/cart"

            aria-label={ar.navigation.cart}

          >

            <HiOutlineShoppingBag

              className="
              text-2xl 
              max-sm:text-xl
              "

            />

          </Link>



        </div>



      </header>





      <SidebarMenu

        isSidebarOpen={isSidebarOpen}

        setIsSidebarOpen={setIsSidebarOpen}

      />



    </>

  );

};


export default Header;