import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Pillars = () => {
  const { t } = useLanguage();

  return (
    <Section name="pillars" spacing="tight">
      <Heading 
        level={2} 
        variant="section-title" 
        className="mb-12 text-left"
      >
        {t('pillars.title')}
      </Heading>

      {/* Editorial stacked rows — NOT a card grid */}
      <div className="space-y-0">
        {t('pillars.list').map((pillar, i) => (
          <FadeIn key={pillar.id} delay={0.1 * i}>
            <div 
              className={`grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 py-10 md:py-12 ${
                i < t('pillars.list').length - 1 ? 'border-b border-text/[0.06]' : ''
              }`}
            >
              {/* Large number + label */}
              <div className="md:w-48 flex-shrink-0">
                <span className="block font-sans text-xs font-medium uppercase tracking-widest text-lime mb-2">
                  {pillar.num}
                </span>
              </div>

              {/* Title + Description */}
              <div>
                <Heading level={3} variant="card-title" className="mb-3">
                  {pillar.title}
                </Heading>
                <Text variant="small" className="max-w-2xl mb-4">
                  {pillar.text}
                </Text>
                <Text variant="tiny" className="text-text-subtle">
                  {pillar.tag}
                </Text>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

export default Pillars;
