import { useAppSelector } from "../hooks";



interface ShopFilterAndSortProps {

  sortCriteria: string;

  setSortCriteria: (value: string) => void;

}





const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: ShopFilterAndSortProps) => {



  const {
    showingProducts,
    totalProducts,
  } = useAppSelector(
    (state) => state.shop
  );





  return (


    <div

      dir="rtl"

      className="
      flex
      justify-between
      items-center
      px-5
      max-sm:flex-col
      max-sm:gap-5
      "

    >




      <p className="text-lg">


        عرض {showingProducts} من أصل {totalProducts} منتج


      </p>








      <div

        className="
        flex
        gap-3
        items-center
        "

      >



        <p>

          ترتيب حسب:

        </p>






        <select


          value={sortCriteria || "default"}


          onChange={(e)=>{

            const value =
              e.target.value === "default"
              ? ""
              : e.target.value;


            setSortCriteria(value);

          }}



          className="
          border
          border-[rgba(0,0,0,0.40)]
          px-2
          py-1
          outline-none
          "


        >




          <option value="default">

            الافتراضي

          </option>





          <option value="popularity">

            الأكثر شعبية

          </option>





          <option value="price-asc">

            السعر: من الأقل إلى الأعلى

          </option>





          <option value="price-desc">

            السعر: من الأعلى إلى الأقل

          </option>





        </select>




      </div>






    </div>


  );


};



export default ShopFilterAndSort;