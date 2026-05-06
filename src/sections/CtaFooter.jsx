import { Element } from "react-scroll";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import GridSpotlight from "../components/GridSpotlight.jsx";
import MagneticWrapper from "../components/MagneticWrapper.jsx";
import BorderBeam from "../components/BorderBeam.jsx";

const CtaFooter = () => {
  return (
    <Element name="cta">
      <GridSpotlight 
        as="section" 
        className="relative overflow-hidden bg-dark-50/50 py-24 md:py-40"
        spotlightSize={800}
      >
        <div className="relative z-10 text-center container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-8 font-serif text-4xl font-normal leading-tight text-text md:text-5xl lg:text-7xl">
              The world runs on
              <br />
              <span className="italic text-text-subtle">broken processes.</span>
              <br />
              <span className="text-gradient">Let&apos;s fix yours.</span>
            </h2>

            <p className="mx-auto mb-12 max-w-xl text-base text-text-muted/70 md:text-xl leading-relaxed">
              Whether you need a product that already exists, one we&apos;ll build
              for you, or a team that will optimize what you already have -
              Redevise is the answer.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <MagneticWrapper strength={0.2}>
                <div className="relative group">
                  <Button href="#products" variant="primary" className="px-10 py-5 text-base">
                    Explore our products
                  </Button>
                  <BorderBeam size={100} duration={6} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </MagneticWrapper>
              
              <MagneticWrapper strength={0.15}>
                <Button href="#services" variant="secondary" className="px-10 py-5 text-base hover:bg-white/5 transition-colors">
                  Request consultation
                </Button>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      </GridSpotlight>
    </Element>
  );
};

export default CtaFooter;
