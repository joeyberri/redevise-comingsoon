import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Text } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Results = () => {
  const { t } = useLanguage();

  const items = t("results.items") || [];

  return (
    <Section name="results" spacing="default" className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} fullWidth>
              <div
                className="h-full rounded-2xl bg-dark-100/75 hover:bg-dark-200/90 p-8 flex flex-col justify-between transition-colors duration-200 border-0"
              >
                <div>
                  {/* Big metric text */}
                  <div className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-tight leading-none text-text mb-4">
                    {item.metric}
                  </div>
                  {/* Clear readable label */}
                  <span className="inline-block font-sans text-xs font-bold tracking-wider text-lime uppercase mb-2">
                    {item.label}
                  </span>
                </div>
                {/* Business friendly description */}
                <Text variant="small" className="text-text-muted leading-relaxed mt-2">
                  {item.description}
                </Text>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Results;
