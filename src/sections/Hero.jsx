import { useState } from "react";
import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Components & Constants
import MarqueeBanner from "../components/MarqueeBanner";
import GridSpotlight from "../components/GridSpotlight";
import MagneticButton from "../components/MagneticButton";
import { Text } from "../components/Typography";
import robotWaving from "../assets/images/robot waving.svg";
import { useLanguage } from "../utils/LanguageContext.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Hero = ({ onOpenInquiry = () => {} }) => {
  const [showHeroMarquee, setShowHeroMarquee] = useState(true);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isBelowThreshold = latest <= 800;
    if (showHeroMarquee !== isBelowThreshold) {
      setShowHeroMarquee(isBelowThreshold);
    }
  });

  const titleTop = t("hero.titleTop") || "growth";
  const titleBottom = t("hero.titleBottom") || "enGineered";

  return (
    <>
      <Element name="hero">
        <GridSpotlight
          as="section"
          className="relative min-h-[85vh] flex items-center overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16"
          spotlightSize={900}
        >
          {/* Main Hero Content Area */}
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-12">

            {/* Left Column: Massive Headline, 3-Line Subtitle, and CTAs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full lg:w-auto flex-1"
            >
              {/* Massive 2-Line Display Title — Tightly Locked */}
              <h1 className="font-heading font-normal tracking-[-0.03em] leading-[0.82] text-[4rem] sm:text-[5.5rem] md:text-[6.75rem] lg:text-[7.5rem] xl:text-[8.75rem] 2xl:text-[12rem] mb-8 md:mb-10 select-none">
                <motion.span
                  variants={itemVariants}
                  className="block text-text"
                >
                  {titleTop}
                </motion.span>

                <motion.span
                  variants={itemVariants}
                  className="block"
                >
                  {titleBottom.toLowerCase().includes("engineered") ? (
                    <>
                      <span className="text-text">en</span>
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgb(var(--color-text)) 0%, rgb(var(--color-text)) 26%, rgb(var(--color-lime)) 56%, rgb(var(--color-lime)) 100%), linear-gradient(rgb(var(--color-text)), rgb(var(--color-text)))",
                          backgroundSize: "72% 58%, 100% 100%",
                          backgroundPosition: "right bottom, center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        G
                      </span>
                      <span className="text-lime">ineered</span>
                    </>
                  ) : (
                    <span className="text-lime">{titleBottom}</span>
                  )}
                </motion.span>
              </h1>

              {/* 3-Line Balanced Subtitle */}
              <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                <Text
                  variant="hero-sub"
                  className="text-text-muted max-w-[620px] text-base sm:text-lg md:text-[1.35rem] md:leading-[1.45] font-normal"
                >
                  {t("hero.sub")}
                </Text>
              </motion.div>

              {/* Call to Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
              >
                <MagneticButton
                  onClick={() => onOpenInquiry(t("modal.interests")[1])}
                  variant="primary"
                  strength={0.15}
                  className="rounded-xl px-8 py-4 text-sm sm:text-base font-bold"
                >
                  {t("hero.workWithUs")}
                </MagneticButton>

                <MagneticButton
                  to="products"
                  variant="secondary"
                  strength={0.1}
                  className="rounded-xl px-8 py-4 text-sm sm:text-base font-semibold"
                >
                  {t("hero.exploreProducts")}
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right Column: Mascot Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="hidden lg:flex items-center justify-end lg:w-[420px] xl:w-[490px] 2xl:w-[550px] shrink-0 select-none pointer-events-none"
            >
              <motion.img
                src={robotWaving}
                alt="Redevise Mascot"
                aria-hidden="true"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Mobile / Tablet Mascot Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="flex lg:hidden items-center justify-center w-full max-w-[280px] sm:max-w-[340px] mx-auto mt-4 select-none pointer-events-none"
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

          </div>
        </GridSpotlight>
      </Element>

      {/* Contextual Marquee Strip */}
      <div className="relative overflow-hidden">
        <AnimatePresence>
          {showHeroMarquee && (
            <MarqueeBanner
              items={t("aboutSection.taglines")}
              visible
              animate
              containerClassName="py-4 md:py-5"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hero;
