import { useState } from "react";
import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Components & Constants
import GlowOrb from "../components/GlowOrb";
import MarqueeBanner from "../components/MarqueeBanner";
import GridSpotlight from "../components/GridSpotlight";
import MagneticButton from "../components/MagneticButton";
import ScrollParallax from "../components/ScrollParallax";
import { Heading, Text } from "../components/Typography";
import Pill from "../components/Pill";
import TextReveal from "../components/TextReveal";
import { taglines } from "../constants";
import robotWaving from "../assets/images/robot waving.svg";

// Snappy stagger — fast cascade orchestrating the layout build sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const Hero = ({ onOpenInquiry = () => {} }) => {
  const [showHeroMarquee, setShowHeroMarquee] = useState(true);
  const { scrollY } = useScroll();

  // Performance Guard: Prevents heavy re-renders by updating state only at the threshold crossover
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
          {/* Subtle Parallax Background Texture */}
          <ScrollParallax speed={0.4}>
            <GlowOrb position="top" className="size-glow-md lg:size-glow-lg opacity-20 mix-blend-soft-light" />
          </ScrollParallax>

          {/* Mascot Illustration — Placed closer to content framework for a cohesive scene */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="hidden lg:block absolute right-0 xl:right-6 2xl:right-16 bottom-0 z-[1] pointer-events-none select-none
                       lg:w-[400px] xl:w-[460px] 2xl:w-[540px]
                       lg:opacity-25 xl:opacity-30"
          >
            {/* Ambient pulsing glow behind the mascot (retains high performance) */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-lime/10 blur-[80px] rounded-full"
            />
            
            {/* Softened ambient float amplitude to keep focus on copy text */}
            <motion.img
              src={robotWaving}
              alt=""
              aria-hidden="true"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-auto object-contain filter drop-shadow-[0_0_40px_rgba(190,255,80,0.08)]"
            />
          </motion.div>

          {/* Main Hero Content Area */}
          <div className="container relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl lg:max-w-5xl"
            >
              {/* Badge Element */}
              <Pill animated delay={0.1} className="mb-4">
                Innovation in Motion
              </Pill>

              {/* Title Architecture — Structural line splits on block containers */}
              <Heading level={1} variant="hero-title" className="mb-6">
                <span className="block">
                  <TextReveal text="We build the systems" delay={0.1} />
                </span>
                <span className="block">
                  <TextReveal text="that " delay={0.22} />
                  <TextReveal
                    text="make things work"
                    delay={0.32}
                    keepTogether
                    className="text-lime italic"
                  />
                </span>
                <span className="block">
                  <TextReveal text="better." delay={0.42} />
                </span>
              </Heading>

              {/* Subtext Body — Embedded inside motion loop to participate in the cascade order */}
              <motion.div variants={itemVariants}>
                <Text variant="hero-sub" className="mb-8">
                  High-performance infrastructure and seamless digital experiences
                  crafted for the next generation of industry leaders.
                </Text>
              </motion.div>

              {/* Interactive Call to Action Elements */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <MagneticButton 
                  onClick={() => onOpenInquiry("Build a new product or platform")} 
                  variant="primary" 
                  strength={0.2} 
                  withBeam
                >
                  Work with us
                </MagneticButton>

                <MagneticButton to="products" variant="secondary" strength={0.1}>
                  Explore Products
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
              items={taglines}
              visible
              animate
              containerClassName="py-8"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hero;