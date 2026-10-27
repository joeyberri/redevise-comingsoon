import FeatureItem from "../components/FeatureItem.jsx";
import FadeIn from "../components/FadeIn.jsx";
import Section from "../components/Section.jsx";
import CoreOrb from "../components/CoreOrb.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import Grid from "../components/Grid.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Core = () => {
  const { t } = useLanguage();

  return (
    <Section name="core" className="relative" spacing="generous">
      {/* Background Core Aura */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden pointer-events-none">
        <CoreOrb className="opacity-30" />
      </div>

      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-dark-100/80 p-8 md:p-12 lg:p-16 border-0 shadow-2xl shadow-black/40">
          <Grid cols={2} gap={12} className="relative z-10 md:gap-16">
            {/* Left: Copy */}
            <div>
              <Pill className="mb-8">
                {t("core.pill")}
              </Pill>
              <Heading level={2} className="mb-6 md:text-5xl lg:text-6xl text-text">
                {t("core.title")}
              </Heading>
              <div className="space-y-6">
                {t("core.paragraphs").map((para, i) => (
                  <Text key={i} className="text-lg text-text-muted leading-relaxed">
                    {para}
                  </Text>
                ))}
              </div>
            </div>

            {/* Right: Capabilities */}
            <div className="flex items-center">
              <ul className="space-y-4 w-full">
                {t("core.capabilities").map((cap, i) => (
                  <FadeIn key={i} delay={0.2 + i * 0.1} direction="left">
                    <FeatureItem className="text-base py-2.5">
                      {cap}
                    </FeatureItem>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </Grid>
        </div>
      </FadeIn>
    </Section>
  );
};

export default Core;
