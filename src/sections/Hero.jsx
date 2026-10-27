import { useState } from "react";
import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Components & Constants
import MarqueeBanner from "../components/MarqueeBanner";
import GridSpotlight from "../components/GridSpotlight";
import MagneticButton from "../components/MagneticButton";
import { Heading, Text } from "../components/Typography";
import Pill from "../components/Pill";
import TextReveal from "../components/TextReveal";
import robotWaving from "../assets/images/robot waving.svg";
import { useLanguage } from "../utils/LanguageContext.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const Hero = ({ onOpenInquiry = () => {} }) => {
  const [showHeroMarquee, setShowHeroMarquee] = useState(true);
  const { scrollY } = useScroll();
  const { t, locale } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isBelowThreshold = latest <= 800;
    if (showHeroMarquee !== isBelowThreshold) {
      setShowHeroMarquee(isBelowThreshold);
    }
  });

  return (
    <>
      <Element name="hero">
        <GridSpotlight
          as="section"
          className="relative min-h-[85vh] flex items-center overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20"
          spotlightSize={900}
        >
          {/* Mascot Illustration — Retained cleanly without heavy blur filters */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="hidden lg:block absolute right-0 xl:right-6 2xl:right-16 bottom-0 z-[1] pointer-events-none select-none
                       lg:w-[400px] xl:w-[460px] 2xl:w-[540px]
                       lg:opacity-30 xl:opacity-40"
          >
            <motion.img
              src={robotWaving}
              alt="Redevise Mascot"
              aria-hidden="true"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Main Hero Content Area */}
          <div className="container relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl"
            >
              {/* Badge Element */}
              <Pill animated delay={0.1} className="mb-6">
                {t('hero.pill')}
              </Pill>

              {/* Title */}
              <Heading level={1} variant="hero-title" className="mb-6">
                <span className="block">
                  <TextReveal text={t('hero.buildSystems')} delay={0.1} />
                </span>
                <span className="block">
                  <TextReveal text={t('hero.that')} delay={0.22} />
                  <TextReveal
                    text={t('hero.makeThingsWork')}
                    delay={0.32}
                    keepTogether={locale === "en"}
                    className="text-lime italic font-serif"
                  />
                </span>
                <span className="block">
                  <TextReveal text={t('hero.better')} delay={0.42} />
                </span>
              </Heading>

              {/* Clear, approachable business subtitle */}
              <motion.div variants={itemVariants} className="mb-8">
                <Text variant="hero-sub" className="text-text-muted">
                  {t('hero.sub')}
                </Text>
              </motion.div>

              {/* Interactive Call to Action Elements */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <MagneticButton 
                  onClick={() => onOpenInquiry(t('modal.interests')[1])} 
                  variant="primary" 
                  strength={0.15} 
                >
                  {t('hero.workWithUs')}
                </MagneticButton>

                <MagneticButton to="products" variant="secondary" strength={0.1}>
                  {t('hero.exploreProducts')}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </GridSpotlight>
      </Element>

      {/* Contextual Marquee Strip */}
      <div className="relative overflow-hidden">
        <AnimatePresence>
          {showHeroMarquee && (
            <MarqueeBanner
              items={t('aboutSection.taglines')}
              visible
              animate
              containerClassName="py-6"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hero;