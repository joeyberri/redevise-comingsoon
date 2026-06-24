import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { DEFAULT_SCROLL_CONFIG } from "../constants/index.jsx";
import Hero from "../sections/Hero.jsx";
import Pillars from "../sections/Pillars.jsx";
import Statement from "../sections/Statement.jsx";
import Products from "../sections/Products.jsx";
import Results from "../sections/Results.jsx";
import Services from "../sections/Services.jsx";
import Testimonial from "../sections/Testimonial.jsx";
import Difference from "../sections/Difference.jsx";
import About from "../sections/About.jsx";
import CtaFooter from "../sections/CtaFooter.jsx";
import { useSEO } from "../utils/useSEO.js";

const HomePage = ({ onOpenInquiry }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useSEO({ key: "home" });

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(state.scrollTo, DEFAULT_SCROLL_CONFIG);
        // Clear scroll state from history so subsequent refreshes start at the top
        navigate("/", { replace: true, state: {} });
      }, 100);
    }
  }, [state, navigate]);

  return (
    <>
      <Hero onOpenInquiry={onOpenInquiry} />
      <Pillars />
      <Statement />
      <Products />
      <Results />
      <Services onOpenInquiry={onOpenInquiry} />
      <Testimonial />
      <Difference />
      <About />
      <CtaFooter onOpenInquiry={onOpenInquiry} />
    </>
  );
};

export default HomePage;
