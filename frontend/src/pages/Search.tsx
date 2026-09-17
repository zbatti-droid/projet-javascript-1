import { useState } from "react";
import {
  Button,
  ProductGrid,
  ProductGridWrapper,
  ShowingSearchPagination,
} from "../components";

import {
  Form,
  useSearchParams,
} from "react-router-dom";

import { ar } from "../translations/ar";



const Search = () => {



  const [searchParams] =
    useSearchParams();




  const initialPage =
    Number(
      searchParams.get("page")
    ) || 1;




  const [currentPage,setCurrentPage] =
    useState<number>(
      initialPage
    );





  const searchQuery =
    searchParams.get("query") || "";







  return (


    <div

      dir="rtl"

      className="
      max-w-screen-2xl
      mx-auto
      "

    >





      <Form

        method="post"

        className="
        flex
        items-center
        mt-24
        px-5
        max-[400px]:px-3
        "

      >





        <input

          type="text"

          placeholder="ابحث عن منتج"

          className="
          border
          border-gray-300
          focus:border-gray-400
          h-12
          text-xl
          px-3
          w-full
          outline-none
          max-sm:text-lg
          "

          name="searchInput"

        />







        <div className="
        w-52
        max-sm:w-40
        ">



          <Button

            mode="brown"

            text={ar.navigation.search}

            type="submit"

          />


        </div>





      </Form>







      <ProductGridWrapper

        searchQuery={searchQuery}

        page={currentPage}

      >

        <ProductGrid />

      </ProductGridWrapper>







      <ShowingSearchPagination

        page={currentPage}

        setCurrentPage={setCurrentPage}

      />





    </div>


  );


};



export default Search;