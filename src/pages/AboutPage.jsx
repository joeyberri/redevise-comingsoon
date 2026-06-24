import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import { motion } from "framer-motion";
import GridSpotlight from "../components/GridSpotlight.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";

const AboutPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "about" });

  return (
    <Section name="about-page" className="pt-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Heading level={1} className="mb-12 text-5xl md:text-7xl">
            {t('aboutPage.title')}
          </Heading>

          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="space-y-8">
              {t('aboutPage.paragraphs').map((p, i) => (
                <Text key={i} className="text-xl leading-relaxed text-text-muted">
                  {p}
                </Text>
              ))}
            </div>
            
            <div className="relative group">
              {/* Corner indicators */}
              <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-text-subtle/30 group-hover:text-lime transition-colors duration-300">
                  <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-text-subtle/30 group-hover:text-lime transition-colors duration-300">
                  <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-text-subtle/30 group-hover:text-lime transition-colors duration-300">
                  <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-text-subtle/30 group-hover:text-lime transition-colors duration-300">
                  <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <GridSpotlight className="rounded-none border border-dark-400/30 aspect-square flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-lime mb-4">{t('aboutPage.stats.num')}</div>
                  <Text className="uppercase tracking-widest font-semibold text-xs">{t('aboutPage.stats.caption')}</Text>
                </div>
              </GridSpotlight>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 py-16 border-t border-dark-400/20">
            {t('aboutPage.pillars').map((item, i) => (
              <div key={i}>
                <Heading level={4} className="mb-2 text-lime">{item.title}</Heading>
                <Text className="text-sm text-text-muted">{item.desc}</Text>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutPage;
