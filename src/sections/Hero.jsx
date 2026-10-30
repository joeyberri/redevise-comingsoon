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
          <div className="mx-auto w-full max-w-[1520px] px-6 md:px-12 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-16">

            {/* Left Column: Headline, Subtitle, and CTAs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full lg:w-auto flex-1"
            >
              {/* Responsive headline with safe mobile sizing to prevent text clipping */}
              <h1 className="font-heading font-normal tracking-[-0.03em] leading-[0.84] text-[3.25rem] min-[400px]:text-[4rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.25rem] xl:text-[8.25rem] 2xl:text-[10.25rem] mb-7 md:mb-9 select-none">
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
                  className="text-text-muted max-w-[600px] text-base sm:text-lg md:text-[1.3rem] md:leading-[1.5] font-normal"
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

            {/* Right Column: Mascot Illustration with Centered, Balanced Anchor */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="relative hidden lg:flex flex-col items-center justify-center lg:w-[400px] xl:w-[460px] 2xl:w-[510px] lg:-mt-4 shrink-0 select-none pointer-events-none"
            >
              {/* Soft centered backlight behind the robot torso (replaces the lopsided right-0 blob) */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xl:w-[360px] h-[320px] xl:h-[360px] rounded-full bg-lime/[0.06] blur-[90px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Robot (clipPath trims the bottom 9% to hide the baked-in grey SVG shadow) */}
              <motion.img
                src={robotWaving}
                alt="Redevise Mascot"
                aria-hidden="true"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ clipPath: "inset(0 0 9% 0)" }}
                className="w-full h-auto object-contain relative z-10"
              />

              {/* Stationary, Centered Floor Shadow + Subtle Lime Rim Anchor */}
              <div className="relative w-full flex justify-center -mt-6 z-0">
                {/* Crisp dark-lime floor ellipse that pulses subtly in sync with the float */}
                <motion.div
                  animate={{ scaleX: [1, 0.88, 1], opacity: [0.55, 0.35, 0.55] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[180px] xl:w-[210px] h-[24px] rounded-[100%] bg-lime/[0.18] blur-[10px]"
                  aria-hidden="true"
                />
                {/* Soft wider ambient ground bleed */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] xl:w-[300px] h-[40px] rounded-[100%] bg-lime/[0.10] blur-[28px]"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Mobile / Tablet Mascot Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="relative flex lg:hidden flex-col items-center justify-center w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] mx-auto mt-6 md:mt-8 select-none pointer-events-none"
            >
              <motion.img
                src={robotWaving}
                alt="Redevise Mascot"
                aria-hidden="true"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ clipPath: "inset(0 0 9% 0)" }}
                className="w-full h-auto object-contain relative z-10"
              />
              <div
                className="-mt-4 w-[150px] h-[20px] rounded-[100%] bg-lime/[0.16] blur-[12px] pointer-events-none"
                aria-hidden="true"
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
