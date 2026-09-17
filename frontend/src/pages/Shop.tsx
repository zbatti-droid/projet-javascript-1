import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  ShopBanner,
  ShopPageContent,
} from "../components";





const Shop = () => {



  const category =
    (useLoaderData() as string) || "";



  const [searchParams] =
    useSearchParams();




  const page =
    Number(
      searchParams.get("page")
    ) || 1;







  return (


    <div

      dir="rtl"

      className="
      max-w-screen-2xl
      mx-auto
      pt-10
      "

    >



      <ShopBanner

        category={category}

      />





      <ShopPageContent


        category={category}


        page={page}


      />




    </div>


  );


};




export default Shop;
