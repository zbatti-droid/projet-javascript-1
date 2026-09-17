import {
  formatCategoryName,
} from "../utils/formatCategoryName";





interface ShopBannerProps {

  category: string;

}







const ShopBanner = ({
  category,
}: ShopBannerProps) => {



  return (


    <div


      dir="rtl"


      className="
      bg-secondaryBrown
      text-white
      py-10
      flex
      justify-center
      items-center
      mx-5
      my-10
      "


    >



      <h2

        className="
        text-3xl
        max-sm:text-2xl
        text-center
        "

      >



        {
          category

          ?

          formatCategoryName(category)

          :

          "المتجر"

        }



      </h2>




    </div>


  );


};



export default ShopBanner;