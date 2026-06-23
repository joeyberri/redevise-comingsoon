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
        {/* Stat Grid Container using gap-px with container background for clean lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-text/[0.06] border-y border-text/[0.06]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-dark p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden transition-colors duration-300 hover:bg-text/[0.01]"
            >
              {/* Soft glow highlight on hover */}
              <div className="absolute inset-0 bg-lime/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <FadeIn delay={idx * 0.05} fullWidth>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Big metric text */}
                    <div className="font-sans text-[2.75rem] md:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-none text-text mb-4">
                      {item.metric}
                    </div>
                    {/* Tiny uppercase label */}
                    <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-lime uppercase mb-2">
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
