import { Element } from "react-scroll";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import GridSpotlight from "../components/GridSpotlight.jsx";

const CtaFooter = ({ onOpenInquiry = () => {} }) => {
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
              <MagneticButton 
                onClick={() => onOpenInquiry("Just exploring my options")} 
                variant="primary" 
                strength={0.2} 
                withBeam
              >
                Request consultation
              </MagneticButton>
              
              <MagneticButton 
                to="products" 
                variant="secondary" 
                strength={0.15}
              >
                Explore our products
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </GridSpotlight>
    </Element>
  );
};

export default CtaFooter;
