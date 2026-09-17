import CategoryItem from "./CategoryItem";

import { ar } from "../translations/ar";





const categories = [

  {
    title: ar.categories.specialEdition,
    image: "luxury category 1.png",
    link: "special-edition",
  },


  {
    title: ar.categories.luxuryCollection,
    image: "luxury category 2.png",
    link: "luxury-collection",
  },


  {
    title: ar.categories.summerEdition,
    image: "luxury category 3.png",
    link: "summer-edition",
  },


  {
    title: ar.categories.uniqueCollection,
    image: "luxury category 4.png",
    link: "unique-collection",
  },

];








const CategoriesSection = () => {



  return (


    <section


      dir="rtl"


      className="
      max-w-screen-2xl
      px-5
      mx-auto
      mt-24
      "


    >





      <h2


        className="
        text-black
        text-5xl
        font-normal
        tracking-[1.56px]
        max-sm:text-4xl
        mb-12
        text-right
        "


      >



        {ar.categories.title}



      </h2>







      <div


        className="
        flex
        justify-between
        flex-wrap
        gap-y-10
        "


      >




        {
          categories.map((category)=>(


            <CategoryItem


              key={category.link}


              categoryTitle={category.title}


              image={category.image}


              link={category.link}


            />


          ))
        }




      </div>







    </section>


  );


};





export default CategoriesSection;