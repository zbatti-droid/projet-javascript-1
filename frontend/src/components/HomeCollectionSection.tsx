import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

import { ar } from "../translations/ar";





const HomeCollectionSection = () => {



  return (


    <section

      dir="rtl"

    >





      <div


        className="
        max-w-screen-2xl
        flex
        items-center
        justify-between
        mx-auto
        mt-24
        px-5
        max-[400px]:px-3
        "


      >





        <h2


          className="
          text-black
          text-5xl
          font-normal
          tracking-[1.56px]
          max-sm:text-4xl
          text-right
          "


        >



          {ar.collection.title}



        </h2>






      </div>








      <ProductGridWrapper

        limit={6}

      >


        <ProductGrid />


      </ProductGridWrapper>






    </section>


  );


};





export default HomeCollectionSection;