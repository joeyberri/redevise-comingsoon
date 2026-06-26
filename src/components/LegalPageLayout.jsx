import Section from "./Section.jsx";
import { Heading, Text } from "./Typography.jsx";
import { motion } from "framer-motion";
import { useSEO } from "../utils/useSEO.js";

const LegalPageLayout = ({ seoKey, title, updated, sections }) => {
  useSEO({ key: seoKey });

  return (
    <Section name={seoKey} className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Heading level={1} className="mb-8 text-gradient">
            {title}
          </Heading>
          <Text className="mb-12 text-lg text-text-muted">
            {updated}
          </Text>

          <div className="space-y-12">
            {sections && sections.map((section) => (
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

export default LegalPageLayout;
