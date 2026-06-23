import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Statement = () => {
  const { t } = useLanguage();

  return (
    <Section name="statement" spacing="generous" className="overflow-hidden border-y border-text/[0.04] bg-text/[0.005]">
      <div className="max-w-5xl mx-auto text-center px-4 py-8 md:py-12">
        <FadeIn delay={0.1}>
          <Heading
            level={2}
            className="font-sans text-[1.75rem] sm:text-[2.25rem] md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-[-0.03em] text-text max-w-4xl mx-auto"
          >
            {t("statement.title")}
          </Heading>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Statement;
