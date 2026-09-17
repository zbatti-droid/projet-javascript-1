import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";



const SocialMediaFooter = () => {

  return (

    <div
      dir="rtl"
      className="
      mx-auto
      max-w-screen-2xl
      "
    >



      <div

        className="
        bg-secondaryBrown
        flex
        justify-center
        items-center
        flex-col
        py-9
        gap-4
        mt-24
        mx-5
        max-[400px]:mx-3
        "

      >




        <p

          className="
          text-base
          text-white
          font-light
          "

        >

          تابعونا على مواقع التواصل الاجتماعي

        </p>







        <div

          className="
          flex
          gap-4
          text-white
          "

        >




          <a
            href="#"
            aria-label="Facebook"
          >

            <FaFacebookF className="w-4 h-4" />

          </a>





          <a
            href="#"
            aria-label="Instagram"
          >

            <FaInstagram className="w-4 h-4" />

          </a>





          <a
            href="#"
            aria-label="TikTok"
          >

            <FaTiktok className="w-4 h-4" />

          </a>





          <a
            href="#"
            aria-label="LinkedIn"
          >

            <FaLinkedinIn className="w-4 h-4" />

          </a>





          <a
            href="#"
            aria-label="Pinterest"
          >

            <FaPinterestP className="w-4 h-4" />

          </a>





          <a
            href="#"
            aria-label="Youtube"
          >

            <FaYoutube className="w-4 h-4" />

          </a>





        </div>




      </div>




    </div>


  );

};


export default SocialMediaFooter;