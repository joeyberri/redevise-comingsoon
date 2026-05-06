import { Element } from "react-scroll";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button.jsx";
import GlowOrb from "../components/GlowOrb.jsx";
import FadeIn from "../components/FadeIn.jsx";
import AnimatedMarquee from "../components/AnimatedMarquee.jsx";
import GridSpotlight from "../components/GridSpotlight.jsx";
import BorderBeam from "../components/BorderBeam.jsx";
import MagneticWrapper from "../components/MagneticWrapper.jsx";
import { taglines } from "../constants/index.jsx";

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
          {/* Decorative Glows */}
          <GlowOrb position="top" className="size-glow-md lg:size-glow-lg opacity-30 mix-blend-soft-light" />
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10" />

          <div className="container relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-5xl"
            >
              {/* Badge/Small Tag */}
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase border rounded-full border-white/10 bg-white/5 backdrop-blur-md"
              >
                Innovation in Motion
              </motion.span>

              {/* Refined Headline */}
              <motion.h1
                variants={itemVariants}
                className="mb-8 font-serif text-5xl leading-[1.1] text-text md:text-7xl lg:text-8xl"
              >
                We build the systems <br className="hidden md:block" />
                <span className="flex flex-wrap items-baseline gap-x-4">
                  that
                  <span className="text-gradient italic font-normal">make things work</span>
                  better.
                </span>
              </motion.h1>

              {/* Subtext for Context */}
              <motion.p
                variants={itemVariants}
                className="max-w-xl mb-10 text-lg leading-relaxed text-text/60 md:text-xl"
              >
                High-performance infrastructure and seamless digital experiences
                crafted for the next generation of industry leaders.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                <MagneticWrapper strength={0.2}>
                  <div className="relative group">
                    <Button to="products" variant="primary" className="px-10 py-5 text-base">
                      Explore Products
                    </Button>
                    <BorderBeam size={120} duration={6} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </MagneticWrapper>

                <MagneticWrapper strength={0.1}>
                  <Button to="services" variant="secondary" className="px-10 py-5 text-base hover:bg-white/5 transition-colors">
                    Work with us
                  </Button>
                </MagneticWrapper>
              </motion.div>
            </motion.div>
          </div>
        </GridSpotlight>
      </Element>

      {/* Marquee Section with seamless hand-off to header */}
      <div className="relative overflow-hidden">
        <AnimatePresence>
          {showHeroMarquee && (
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative border-y border-white/5 bg-black/20 backdrop-blur-sm py-8"
            >
              <AnimatedMarquee items={taglines} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hero;