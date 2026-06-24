import { Element } from "react-scroll";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton.jsx";
import { Heading } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const CtaFooter = ({ onOpenInquiry = () => {} }) => {
  const { t } = useLanguage();

  return (
    <Element name="cta">
      <section className="relative overflow-hidden bg-dark-50/50 py-24 md:py-40 border-t border-text/[0.06]">
        <div className="relative z-10 text-center container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Heading level={2} variant="hero-title" className="mb-8">
              {t('ctaFooter.heading')}
            </Heading>

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
                to="/process" 
                variant="secondary" 
                strength={0.15}
              >
                {t('ctaFooter.howWeWork')}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default CtaFooter;
