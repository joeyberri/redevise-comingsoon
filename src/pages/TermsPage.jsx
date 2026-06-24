import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";

const TermsPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "terms" });

  return (
    <Section name="terms" className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Heading level={1} className="mb-8 text-gradient">{t('terms.title')}</Heading>
          <Text className="mb-12 text-lg text-text-muted">
            {t('terms.updated')}
          </Text>

          <div className="space-y-12">
            {t('terms.sections').map((section) => (
              <section key={section.id}>
                <Heading level={2} variant="card-title" className="mb-4">
                  {section.title}
                </Heading>
                <Text>
                  {section.text}
                  {section.bullets && (
                    <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.id === 8 && (
                    <a href="mailto:team@redevise.com" className="text-lime hover:underline ml-1">
                      team@redevise.com
                    </a>
                  )}
                </Text>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default TermsPage;
