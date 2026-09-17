import {
  ProductGrid,
  ProductGridWrapper,
  ShopFilterAndSort,
  ShowingPagination,
} from "../components";

import { useState } from "react";



interface ShopPageContentProps {

  category: string;

  page: number;

}






const ShopPageContent = ({
  category,
  page,
}: ShopPageContentProps) => {



  const [sortCriteria,setSortCriteria] =
    useState<string>("");




  const [currentPage,setCurrentPage] =
    useState<number>(
      page || 1
    );







  return (


    <div
      dir="rtl"
    >



      <ShopFilterAndSort

        sortCriteria={sortCriteria}

        setSortCriteria={setSortCriteria}

      />







      <ProductGridWrapper


        sortCriteria={sortCriteria}


        category={category}


        page={currentPage}


      >


        <ProductGrid />


      </ProductGridWrapper>







      <ShowingPagination


        page={currentPage}


        category={category}


        setCurrentPage={setCurrentPage}


      />





    </div>


  );


};



export default ShopPageContent;