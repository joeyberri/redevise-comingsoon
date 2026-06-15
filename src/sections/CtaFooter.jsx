import { Element } from "react-scroll";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton.jsx";
import GridSpotlight from "../components/GridSpotlight.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const CtaFooter = ({ onOpenInquiry = () => {} }) => {
  const { t } = useLanguage();

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
              {t('ctaFooter.heading')}
            </h2>

            <p className="mx-auto mb-12 max-w-xl text-base text-text-muted/70 md:text-xl leading-relaxed">
              {t('ctaFooter.desc')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <MagneticButton 
                onClick={() => onOpenInquiry(t('modal.interests')[5])} 
                variant="primary" 
                strength={0.2} 
                withBeam
              >
                {t('ctaFooter.requestConsultation')}
              </MagneticButton>
              
              <MagneticButton 
                to="products" 
                variant="secondary" 
                strength={0.15}
              >
                {t('ctaFooter.exploreProducts')}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </GridSpotlight>
    </Element>
  );
};

export default CtaFooter;
