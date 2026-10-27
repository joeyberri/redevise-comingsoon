import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Text } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Results = () => {
  const { t } = useLanguage();

  const items = t("results.items") || [];

  return (
    <Section name="results" showDivider spacing="default" className="relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-400/20 border-y border-dark-400/20">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-dark p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden transition-colors duration-200 hover:bg-dark-50/40"
            >
              <FadeIn delay={idx * 0.05} fullWidth>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Big metric text */}
                    <div className="font-sans text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-none text-text mb-4">
                      {item.metric}
                    </div>
                    {/* Clear readable label */}
                    <span className="block font-sans text-xs font-bold tracking-wider text-lime uppercase mb-2">
                      {item.label}
                    </span>
                  </div>
                  {/* Business friendly description */}
                  <Text variant="small" className="text-text-muted leading-relaxed mt-2">
                    {item.description}
                  </Text>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Results;
