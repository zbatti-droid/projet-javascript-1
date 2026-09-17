import { HiChevronUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

import { useAppSelector } from "../hooks";




interface ShowingSearchPaginationProps {

  page: number;

  setCurrentPage: (page: number) => void;

}






const ShowingSearchPagination = ({
  page,
  setCurrentPage,
}: ShowingSearchPaginationProps) => {



  const {
    totalProducts,
    showingProducts,
  } = useAppSelector(
    (state) => state.shop
  );



  const navigate =
    useNavigate();





  const hasMore =
    showingProducts < totalProducts;







  const handleNextPage = () => {


    if(!hasMore) return;



    const nextPage =
      page + 1;



    setCurrentPage(
      nextPage
    );



    navigate(
      `/search?page=${nextPage}`
    );


  };








  return (


    <div

      dir="rtl"

      className="
      px-5
      max-[400px]:px-3
      mt-12
      mb-24
      "

    >



      <div

        className="
        flex
        flex-col
        gap-6
        justify-center
        items-center
        w-1/2
        mx-auto
        max-sm:w-3/4
        max-sm:gap-5
        "

      >





        <p className="text-xl max-sm:text-lg">


          عرض {showingProducts} من أصل {totalProducts}


        </p>








        {
          hasMore && (


            <Button

              text="عرض المزيد"

              mode="white"

              onClick={handleNextPage}

            />


          )
        }








        <a

          href="#gridTop"

          className="
          flex
          justify-center
          items-center
          text-xl
          gap-2
          max-sm:text-lg
          "

        >

          العودة للأعلى


          <HiChevronUp />


        </a>






      </div>




    </div>


  );


};



export default ShowingSearchPagination;