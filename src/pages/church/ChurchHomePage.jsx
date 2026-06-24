import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { DEFAULT_SCROLL_CONFIG } from "../../constants/index.jsx";
import ChurchHero from "../../sections/church/ChurchHero.jsx";
import Pillars from "../../sections/Pillars.jsx";
import Products from "../../sections/Products.jsx";
import ChurchServices from "../../sections/church/ChurchServices.jsx";
import About from "../../sections/About.jsx";
import CtaFooter from "../../sections/CtaFooter.jsx";
import { useSEO } from "../../utils/useSEO.js";

const ChurchHomePage = ({ onOpenInquiry }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useSEO({ key: "church" });

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
      <ChurchHero onOpenInquiry={onOpenInquiry} />
      <Pillars />
      <Products />
      <ChurchServices />
      <About />
      <CtaFooter onOpenInquiry={onOpenInquiry} />
    </>
  );
};

export default ChurchHomePage;
