import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import GlowOrb from "../../components/GlowOrb.jsx";
import MarqueeBanner from "../../components/MarqueeBanner.jsx";
import GridSpotlight from "../../components/GridSpotlight.jsx";
import MagneticButton from "../../components/MagneticButton.jsx";
import ScrollParallax from "../../components/ScrollParallax.jsx";
import { Heading, Text } from "../../components/Typography.jsx";
import Pill from "../../components/Pill.jsx";
import { useLanguage } from "../../utils/LanguageContext.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  },
};

const ChurchHero = () => {
  const [showHeroMarquee, setShowHeroMarquee] = useState(true);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowHeroMarquee(latest <= 800);
  });

  return (
    <>
      <Element name="hero">
        <GridSpotlight
          as="section"
          className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32"
          spotlightSize={900}
        >
          <ScrollParallax speed={0.4}>
            <GlowOrb position="top" className="size-glow-md lg:size-glow-lg opacity-30 mix-blend-soft-light" />
          </ScrollParallax>
          <ScrollParallax speed={-0.2}>
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10" />
          </ScrollParallax>

          <div className="container relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-5xl"
            >
              <Pill animated delay={0.2} className="mb-6">
                {t('church.hero.pill')}
              </Pill>

              <Heading level={1} variant="hero-title" className="mb-8" serif>
                {t('church.hero.title').split(" ").map((word, i) => {
                  const isExcellence = word.toLowerCase().includes("excelen");
                  return (
                    <span key={i}>
                      {isExcellence ? (
                        <span className="text-gradient italic font-normal">{word} </span>
                      ) : (
                        word + " "
                      )}
                    </span>
                  );
                })}
              </Heading>

              <Text variant="hero-sub" className="mb-10">
                {t('church.hero.subtitle')}
              </Text>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                <MagneticButton to="services" variant="primary" strength={0.2} withBeam>
                  {t('church.hero.ourServices')}
                </MagneticButton>
                <MagneticButton to="about" variant="secondary" strength={0.1}>
                  {t('church.hero.learnMore')}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </GridSpotlight>
      </Element>

      <div className="relative overflow-hidden">
        <AnimatePresence>
          {showHeroMarquee && (
            <MarqueeBanner 
              items={t('aboutSection.taglines')} 
              visible={true}
              animate={true}
              containerClassName="py-8"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChurchHero;
