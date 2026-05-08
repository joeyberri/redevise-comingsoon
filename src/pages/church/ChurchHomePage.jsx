import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import ChurchHero from "../../sections/church/ChurchHero.jsx";
import Pillars from "../../sections/Pillars.jsx";
import Products from "../../sections/Products.jsx";
import ChurchServices from "../../sections/church/ChurchServices.jsx";
import About from "../../sections/About.jsx";
import CtaFooter from "../../sections/CtaFooter.jsx";

const ChurchHomePage = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(state.scrollTo, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -80,
        });
      }, 100);
    }
  }, [state]);

  return (
    <>
      <ChurchHero />
      <Pillars />
      <Products />
      <ChurchServices />
      <About />
      <CtaFooter />
    </>
  );
};

export default ChurchHomePage;
