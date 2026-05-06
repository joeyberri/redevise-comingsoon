import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button.jsx";
import GlowOrb from "../components/GlowOrb.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MarqueeBanner from "../components/MarqueeBanner.jsx";
import GridSpotlight from "../components/GridSpotlight.jsx";
import BorderBeam from "../components/BorderBeam.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import MagneticWrapper from "../components/MagneticWrapper.jsx";
import ScrollParallax from "../components/ScrollParallax.jsx";
import { taglines } from "../constants/index.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";

// Animation Variants for a cleaner staggered entrance
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

const Hero = () => {
  const [showHeroMarquee, setShowHeroMarquee] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide Hero marquee exactly when Header marquee enters (800px)
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
          {/* Decorative Glows with parallax depth */}
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
              {/* Badge/Small Tag */}
              <Pill animated delay={0.2} className="mb-6">
                Innovation in Motion
              </Pill>

              {/* Refined Headline */}
              <Heading level={1} variant="hero-title" className="mb-8">
                We build the systems <br className="hidden md:block" />
                <span className="flex flex-wrap items-baseline gap-x-4">
                  that
                  <span className="text-gradient italic font-normal py-1">make things work</span>
                  better.
                </span>
              </Heading>

              {/* Subtext for Context */}
              <Text variant="hero-sub" className="mb-10">
                High-performance infrastructure and seamless digital experiences
                crafted for the next generation of industry leaders.
              </Text>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                <MagneticButton 
                  to="products" 
                  variant="primary" 
                  strength={0.2} 
                  withBeam 
                >
                  Explore Products
                </MagneticButton>

                <MagneticButton 
                  to="services" 
                  variant="secondary" 
                  strength={0.1}
                >
                  Work with us
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </GridSpotlight>
      </Element>

      {/* Marquee Section with seamless hand-off to header */}
      <div className="relative overflow-hidden">
        <AnimatePresence>
          {showHeroMarquee && (
            <MarqueeBanner 
              items={taglines} 
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

export default Hero;