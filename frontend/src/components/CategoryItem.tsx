import { Link } from "react-router-dom";



interface CategoryItemProps {

  categoryTitle: string;

  image: string;

  link: string;

}






const CategoryItem = ({
  categoryTitle,
  image,
  link,
}: CategoryItemProps) => {



  return (


    <div


      dir="rtl"


      className="
      w-[600px]
      relative
      overflow-hidden
      max-[1250px]:w-[400px]
      max-[1250px]:h-[400px]
      max-sm:w-[300px]
      max-sm:h-[300px]
      "


    >





      <Link


        to={`/shop/${link}`}


        className="
        block
        h-full
        w-full
        "


      >






        <img


          src={`/assets/${image}`}


          alt={categoryTitle}


          loading="lazy"


          className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          hover:scale-105
          "


        />









        <div


          className="
          bg-secondaryBrown
          text-white
          absolute
          bottom-0
          right-0
          w-full
          h-16
          flex
          justify-center
          items-center
          max-sm:h-12
          "


        >





          <h3


            className="
            text-2xl
            max-sm:text-xl
            text-center
            font-medium
            "


          >


            {categoryTitle}


          </h3>






        </div>








      </Link>






    </div>


  );


};





export default CategoryItem;