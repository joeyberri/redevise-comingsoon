import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import Pill from "../components/Pill.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Testimonial = () => {
  const { t } = useLanguage();

  return (
    <Section name="testimonial" spacing="generous" className="overflow-hidden relative z-10">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <FadeIn delay={0.05}>
          <Pill className="mb-8">
            {t("testimonial.label")}
          </Pill>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <blockquote className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed text-text mb-8 md:mb-12">
            "{t("testimonial.quote")}"
          </blockquote>
        </FadeIn>
        
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-lime/15 flex items-center justify-center font-sans font-bold text-sm text-lime shrink-0 border-0">
              KB
            </div>
            <div>
              <span className="block font-sans text-base font-semibold text-text">
                {t("testimonial.author")}
              </span>
              <span className="block font-sans text-xs text-text-muted mt-0.5">
                {t("testimonial.role")}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Testimonial;
