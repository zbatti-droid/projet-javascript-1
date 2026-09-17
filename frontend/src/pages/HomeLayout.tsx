import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollToTop, WhatsAppButton } from "../components";

const HomeLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  );
};
export default HomeLayout;
