import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Pillars = () => {
  const { t } = useLanguage();
  const list = t("pillars.list") || [];

  return (
    <Section name="pillars" spacing="default">
      <FadeIn delay={0}>
        <Heading 
          level={2} 
          variant="section-title" 
          className="mb-12 text-left"
        >
          {t("pillars.title")}
        </Heading>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((pillar, i) => (
          <FadeIn key={pillar.id} delay={0.1 * i} fullWidth>
            <div className="h-full rounded-2xl bg-dark-100/75 hover:bg-dark-200/90 p-8 transition-colors duration-200 flex flex-col border-0">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-dark-200 text-lime text-xs font-semibold tracking-wider uppercase">
                  {pillar.num}
                </span>
              </div>

              {/* Title & Body */}
              <Heading level={3} variant="card-title" className="mb-3 text-text">
                {pillar.title}
              </Heading>
              <Text variant="small" className="text-text-muted leading-relaxed mb-6 flex-1">
                {pillar.text}
              </Text>

              {/* Footer Tags */}
              <div className="mt-auto pt-4 text-xs font-medium text-text-subtle">
                {pillar.tag}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

export default Pillars;
