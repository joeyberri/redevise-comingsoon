import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Pillars from "./sections/Pillars.jsx";
import Jarvis from "./sections/Jarvis.jsx";
import Products from "./sections/Products.jsx";
import Services from "./sections/Services.jsx";
import About from "./sections/About.jsx";
import CtaFooter from "./sections/CtaFooter.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <SmoothScroll>
      <PageLoader>
        <ScrollProgress />
        <ScrollToTop />
        <main className="overflow-hidden">
          <Header />
          <Hero />
          <Pillars />
          <Jarvis />
          <Products />
          <Services />
          <About />
          <CtaFooter />
          <Footer />
        </main>
      </PageLoader>
    </SmoothScroll>
  );
};
export default App;
