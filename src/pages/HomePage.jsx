import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Hero from "../sections/Hero.jsx";
import Pillars from "../sections/Pillars.jsx";
import Jarvis from "../sections/Jarvis.jsx";
import Products from "../sections/Products.jsx";
import Services from "../sections/Services.jsx";
import About from "../sections/About.jsx";
import CtaFooter from "../sections/CtaFooter.jsx";

const HomePage = () => {
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
      <Hero />
      <Pillars />
      <Jarvis />
      <Products />
      <Services />
      <About />
      <CtaFooter />
    </>
  );
};

export default HomePage;
