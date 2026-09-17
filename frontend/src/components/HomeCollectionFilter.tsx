import { useState } from "react";



const HomeCollectionFilter = () => {


  const [active,setActive] =
    useState("all");



  const categories = [

    {
      id:"all",
      name:"الكل",
    },

    {
      id:"tops",
      name:"القمصان",
    },

    {
      id:"dresses",
      name:"الفساتين",
    },

    {
      id:"shorts",
      name:"السراويل القصيرة",
    },

    {
      id:"jeans",
      name:"جينز",
    },

  ];







  return (


    <div

      dir="rtl"

      className="
      max-w-screen-2xl
      flex
      items-center
      justify-between
      mx-auto
      mt-24
      max-lg:flex-col
      max-lg:gap-y-5
      px-5
      max-[400px]:px-3
      "

    >





      <ul

        className="
        flex
        gap-8
        items-center
        text-black
        text-2xl
        tracking-[0.72px]
        max-sm:text-xl
        max-[450px]:text-lg
        max-[450px]:gap-2
        max-[350px]:text-base
        "

      >




        {
          categories.map((category)=>(


            <li


              key={category.id}


              onClick={()=>
                setActive(category.id)
              }


              className={

                active === category.id

                ?

                "text-black cursor-pointer"

                :

                "text-secondaryBrown cursor-pointer"

              }


            >


              {category.name}


            </li>


          ))
        }




      </ul>





    </div>


  );


};



export default HomeCollectionFilter;