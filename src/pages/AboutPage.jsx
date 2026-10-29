import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import { getAboutSchema } from "../utils/schemas.js";

const AboutPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "about", schema: getAboutSchema() });

  return (
    <Section name="about-page" spacing="generous">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-16">
            <Pill className="mb-4">{t('aboutPage.pill')}</Pill>
            <Heading level={1} variant="section-title">
              {t('aboutPage.title')}
            </Heading>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="space-y-6">
              {t('aboutPage.paragraphs').map((p, i) => (
                <Text key={i} className="text-lg leading-relaxed text-text-muted">
                  {p}
                </Text>
              ))}
            </div>
            
            <div className="rounded-3xl bg-dark-100/80 p-12 aspect-square flex items-center justify-center overflow-hidden border-0 shadow-2xl shadow-black/40">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-extrabold text-lime mb-4 font-sans tracking-tight">
                  {t('aboutPage.stats.num')}
                </div>
                <Text className="uppercase tracking-widest font-semibold text-xs text-text-muted">
                  {t('aboutPage.stats.caption')}
                </Text>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8 border-0">
            {t('aboutPage.pillars').map((item, i) => (
              <div key={i} className="rounded-2xl bg-dark-100/75 p-8 border-0">
                <Heading level={4} className="mb-2 text-lime font-heading font-normal text-lg">
                  {item.title}
                </Heading>
                <Text className="text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </Text>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutPage;
