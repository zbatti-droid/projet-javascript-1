import SocialMediaFooter from "./SocialMediaFooter";

import { HiChevronDown } from "react-icons/hi2";

import { ar } from "../translations/ar";



const Footer = () => {


  return (

    <>


      <SocialMediaFooter />



      <footer

        dir="rtl"

        className="
        max-w-screen-2xl
        mx-auto
        border-b-8
        border-secondaryBrown
        px-5
        max-[400px]:px-3
        "

      >





        <div

          className="
          flex
          justify-center
          gap-24
          text-center
          mt-12
          max-[800px]:flex-col
          max-[800px]:gap-10
          "

        >






          {/* خدمة العملاء */}

          <div className="flex flex-col gap-1">


            <h3 className="
            text-2xl
            font-bold
            max-sm:text-xl
            ">

              {ar.footer.clientService}

            </h3>


            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.afterSale}

            </p>


            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.freeInsurance}

            </p>


          </div>









          {/* العلامة التجارية */}

          <div className="flex flex-col gap-1">


            <h3 className="
            text-2xl
            font-bold
            max-sm:text-xl
            ">

              {ar.footer.ourBrand}

            </h3>




            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.company}

            </p>



            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.excellence}

            </p>




            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.awards}

            </p>





            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.story}

            </p>



          </div>









          {/* الملابس الفاخرة */}

          <div className="flex flex-col gap-1">


            <h3 className="
            text-2xl
            font-bold
            max-sm:text-xl
            ">

              {ar.footer.luxuryClothing}

            </h3>



            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.specialEdition}

            </p>




            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.summerEdition}

            </p>





            <p className="
            text-lg
            max-sm:text-base
            ">

              {ar.footer.uniqueCollection}

            </p>



          </div>






        </div>








        <div

          className="
          flex
          flex-col
          gap-8
          my-20
          "

        >






          <p

            className="
            flex
            justify-center
            items-center
            text-2xl
            gap-2
            max-sm:text-xl
            "

          >

            {ar.footer.language}

            <HiChevronDown />


          </p>







          <h2

            className="
            text-6xl
            font-light
            text-center
            max-sm:text-5xl
            "

          >

            أناقة


          </h2>







          <p

            className="
            text-base
            text-center
            max-sm:text-sm
            "

          >

            {ar.footer.rights}


          </p>







          <ul

            className="
            flex
            justify-center
            items-center
            gap-7
            text-base
            max-sm:text-sm
            max-[350px]:flex-col
            max-[350px]:gap-5
            "

          >


            <li>
              {ar.footer.cookie}
            </li>



            <li>
              {ar.footer.privacy}
            </li>



            <li>
              {ar.footer.legal}
            </li>



          </ul>






        </div>





      </footer>


    </>

  );

};


export default Footer;