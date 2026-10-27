import { Element } from "react-scroll";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import { Heading } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const CtaFooter = ({ onOpenInquiry = () => {} }) => {
  const { t } = useLanguage();

  return (
    <Element name="cta">
      <section className="relative overflow-hidden bg-dark-50 py-24 md:py-36 border-0">
        <div className="relative z-10 text-center container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Heading level={2} variant="section-title" className="mb-6 max-w-3xl mx-auto !text-3xl sm:!text-4xl md:!text-5xl text-text">
              {t("ctaFooter.heading")}
            </Heading>

            <p className="mx-auto mb-10 max-w-2xl text-base text-text-muted md:text-lg leading-relaxed">
              {t("ctaFooter.desc")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button 
                onClick={() => onOpenInquiry(t("modal.interests")[5])} 
                variant="primary" 
                className="px-8 py-4 text-sm font-bold uppercase tracking-wider"
              >
                {t("ctaFooter.requestConsultation")}
              </Button>
              
              <Button 
                to="/process" 
                variant="secondary" 
                className="px-8 py-4 text-sm font-semibold tracking-wide"
              >
                {t("ctaFooter.howWeWork")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default CtaFooter;
