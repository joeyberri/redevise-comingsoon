import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { cn } from "../utils/cn";
import { useSEO } from "../utils/useSEO.js";
import { Link } from "react-router-dom";
import ProcessStepItem from "../components/process/ProcessStepItem.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";

/* ─── Main Page Component ─── */
const ProcessPage = ({ onOpenInquiry = () => {} }) => {
  const { t, formatPrice, locale } = useLanguage();
  useSEO({ key: "process" });
  const [activeStep, setActiveStep] = useState(0);
  
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  const renderAnswer = (text) => {
    const targetEstimatorEn = "project estimator";
    const targetEstimatorEs = "estimador de proyectos";
    const targetCallEn = "discovery call";
    const targetCallEs = "llamada de descubrimiento";

    const lowerText = text.toLowerCase();
    const estIndex = lowerText.indexOf(locale === "es" ? targetEstimatorEs : targetEstimatorEn);
    const callIndex = lowerText.indexOf(locale === "es" ? targetCallEs : targetCallEn);

    if (estIndex === -1 && callIndex === -1) {
      return text;
    }

    if (estIndex !== -1) {
      const targetLength = (locale === "es" ? targetEstimatorEs : targetEstimatorEn).length;
      const before = text.substring(0, estIndex);
      const match = text.substring(estIndex, estIndex + targetLength);
      const after = text.substring(estIndex + targetLength);
      return (
        <>
          {before}
          <Link to="/estimate" className="text-lime hover:underline font-semibold cursor-pointer">
            {match}
          </Link>
          {after}
        </>
      );
    }

    if (callIndex !== -1) {
      const targetLength = (locale === "es" ? targetCallEs : targetCallEn).length;
      const before = text.substring(0, callIndex);
      const match = text.substring(callIndex, callIndex + targetLength);
      const after = text.substring(callIndex + targetLength);
      return (
        <>
          {before}
          <button
            onClick={() => onOpenInquiry?.("Discovery Call")}
            className="text-lime hover:underline font-semibold cursor-pointer bg-transparent border-0 p-0 inline font-sans text-xs md:text-sm"
          >
            {match}
          </button>
          {after}
        </>
      );
    }

    return text;
  };

  const stepsList = useMemo(() => t('processPage.steps') || [], [t]);
  const rawFaqList = useMemo(() => t('processPage.faq.list') || [], [t]);

  // Interpolate dynamic pricing into FAQ questions/answers
  const faqList = useMemo(() => {
    const priceFloor = formatPrice(2000);
    const priceCeiling = formatPrice(25000);
    return rawFaqList.map((faq) => ({
      ...faq,
      a: typeof faq.a === "string"
        ? faq.a.replace("{{priceFloor}}", priceFloor).replace("{{priceCeiling}}", priceCeiling)
        : faq.a
    }));
  }, [rawFaqList, formatPrice]);

  const whatYouGetLabel = t('processPage.whatYouGet') || "What you get";

  // Intersection Observer to track active step
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [stepsList]);

  // Scroll Progress Line for left column
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* ─── Hero ─── */}
      <Section name="process-hero" className="pt-32 md:pt-40" spacing="tight">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <Heading level={1} variant="hero-title" className="mb-6">
              {t('processPage.hero.title')}
            </Heading>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Text variant="hero-sub" className="mx-auto max-w-2xl">
              {t('processPage.hero.sub')}
            </Text>
          </FadeIn>
        </div>
      </Section>

      {/* ─── Timeline Steps (Sticky Split Layout) ─── */}
      <Section name="process-steps" spacing="default">
        <div className="max-w-5xl mx-auto">
          <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column - Sticky Progress Panel (Visible only on Desktop) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-32 space-y-8 pr-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-lime">
                  {"// "}Step {String(activeStep + 1).padStart(2, "0")} of {String(stepsList.length).padStart(2, "0")}
                </div>
                
                <div className="space-y-4">
                  <div className="font-sans text-6xl font-extrabold text-lime tracking-tight">
                    {String(activeStep + 1).padStart(2, "0")}
                  </div>
                  <Heading level={2} variant="section-title" className="text-text tracking-tight !text-3xl">
                    {stepsList[activeStep]?.title}
                  </Heading>
                  <div>
                    <Pill className="text-xs bg-lime/10 border-lime/20 text-lime">{stepsList[activeStep]?.duration}</Pill>
                  </div>
                </div>

                {/* Vertical dot-line navigator */}
                <div className="relative pl-6 py-2 space-y-6">
                  {/* Track line (static background) */}
                  <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-text/[0.08]" />
                  {/* Active fill line (scroll-driven) */}
                  <motion.div 
                    className="absolute left-0 top-2 bottom-2 w-[1px] origin-top bg-gradient-to-b from-lime to-lime/40" 
                    style={{ scaleY }} 
                  />

                  {stepsList.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        stepRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={cn(
                        "flex items-center gap-4 text-left outline-none cursor-pointer group transition-all duration-200",
                        idx === activeStep ? "text-text" : "text-text-muted hover:text-text-subtle"
                      )}
                    >
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full -ml-[31px] relative z-10 transition-all duration-200 border border-dark bg-dark",
                        idx === activeStep 
                          ? "bg-lime scale-125 shadow-[0_0_12px_rgb(163,230,53)]" 
                          : idx < activeStep 
                          ? "bg-lime/75" 
                          : "bg-text/20 group-hover:bg-text/40"
                      )} />
                      <span className="font-sans text-sm font-semibold tracking-tight">
                        {step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Scrolling Content */}
            <div className="lg:col-span-7 space-y-20 lg:space-y-32 pb-16 lg:pb-32">
              {stepsList.map((step, idx) => (
                <ProcessStepItem
                  key={step.id || `step-${idx}`}
                  step={step}
                  index={idx}
                  whatYouGetLabel={whatYouGetLabel}
                  innerRef={(el) => (stepRefs.current[idx] = el)}
                />
              ))}
            </div>

          </div>
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section name="process-faq" showDivider spacing="default">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <Pill className="mb-6">
              {t('processPage.faq.pill')}
            </Pill>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Heading level={2} className="mb-12">
              {t('processPage.faq.title')}
            </Heading>
          </FadeIn>
          
          <div className="divide-y divide-dark-400/20">
            <FaqAccordion
              items={faqList}
              variant="bordered"
              renderAnswer={renderAnswer}
            />
          </div>
        </div>
      </Section>

      {/* ─── Bottom CTA ─── */}
      <Section name="process-cta" showDivider spacing="generous">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <Heading level={2} className="mb-4">
              {t('processPage.cta.title')}
            </Heading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Text variant="section-sub" className="mx-auto mb-10">
              {t('processPage.cta.sub')}
            </Text>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                variant="primary"
                withBeam
                onClick={() => onOpenInquiry("Discovery Call")}
              >
                {t('processPage.cta.call')}
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                to="/estimate"
              >
                {t('processPage.cta.estimate')}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
};

export default ProcessPage;