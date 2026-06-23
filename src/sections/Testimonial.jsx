import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Testimonial = () => {
  const { t } = useLanguage();

  return (
    <Section name="testimonial" showDivider spacing="generous" className="overflow-hidden relative z-10">
      {/* Background ambient glow behind testimonial */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] bg-lime blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <FadeIn delay={0.05}>
          {/* Label */}
          <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-8">
            // CLIENT FEEDBACK
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          {/* Quote with accent highlight on key words via translation */}
          <blockquote className="font-sans text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.25] tracking-[-0.02em] text-text mb-8 md:mb-12">
            "{t("testimonial.quote")}"
          </blockquote>
        </FadeIn>
        
        <FadeIn delay={0.15}>
          {/* Author info (Notice no em dashes) */}
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-text/[0.04] border border-text/[0.08] flex items-center justify-center font-sans font-bold text-sm text-lime shrink-0">
              KB
            </div>
            <div>
              <span className="block font-sans text-sm font-semibold text-text">
                {t("testimonial.author")}
              </span>
              <span className="block font-mono text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
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
