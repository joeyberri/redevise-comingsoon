import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { motion } from "framer-motion";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";

const PrivacyPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "privacy" });

  return (
    <Section name="privacy" className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading level={1} className="mb-8 text-gradient">{t('privacy.title')}</Heading>
          <Text className="mb-12 text-lg text-text-muted">
            {t('privacy.updated')}
          </Text>

          <div className="space-y-12">
            {t('privacy.sections').map((section) => (
              <section key={section.id}>
                <Heading level={2} variant="card-title" className="mb-4">
                  {section.title}
                </Heading>
                <Text>
                  {section.text}
                  {section.bullets && (
                    <ul className="list-disc list-inside mt-4 space-y-2 opacity-80">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          {typeof bullet === "string" ? (
                            bullet
                          ) : (
                            <>
                              <strong>{bullet.label}</strong>
                              {bullet.text}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.extraText && (
                    <span className="block mt-4 opacity-80">
                      {section.extraText}
                    </span>
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

export default PrivacyPage;
