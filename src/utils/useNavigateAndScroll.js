import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { DEFAULT_SCROLL_CONFIG } from "../constants/index.jsx";

export function useNavigateAndScroll() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const navigateAndScroll = (id) => {
    if (id === "blog") {
      navigate("/blog");
      return;
    }
    if (id === "careers") {
      navigate("/careers");
      return;
    }
    if (id === "about" || id === "services" || id === "process" || id === "estimate") {
      navigate(`/${id}`);
      return;
    }
    
    // Smooth scroll for homepage anchors
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scroller.scrollTo(id, DEFAULT_SCROLL_CONFIG);
    }
  };

  return navigateAndScroll;
}
