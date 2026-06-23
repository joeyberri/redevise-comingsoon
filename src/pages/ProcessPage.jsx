import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { cn } from "../utils/cn";
import { useSEO } from "../utils/useSEO.js";

/* ─── Process Step Item (Right Column / Mobile Scrolling) ─── */
const ProcessStepItem = ({ step, index, whatYouGetLabel, innerRef }) => {
  return (
    <div
      ref={innerRef}
      data-step-index={index}
      className="scroll-mt-32 border-t border-text/[0.06] pt-12 lg:pt-0 lg:border-t-0 first:border-t-0 first:pt-0"
    >
      <FadeIn delay={0.05} direction="up" fullWidth>
        {/* Mobile/Tablet Header (hidden on desktop) */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-sans text-3xl font-extrabold text-lime">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Heading level={3} variant="small-title">
              {step.title}
            </Heading>
          </div>
          <Pill className="text-[10px] bg-lime/10 border-lime/20 text-lime">{step.duration}</Pill>
        </div>

        {/* Step description */}
        <Text className="text-text-muted leading-relaxed text-base md:text-lg">
          {step.desc}
        </Text>

        {/* Outcome Callout */}
        {step.outcome && (
          <div className="border-l-2 border-lime/40 pl-5 py-1 mt-6 bg-lime/[0.01]">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-lime mb-1.5">
              // {whatYouGetLabel}
            </p>
            <Text variant="small" className="text-text-muted/90">
              {step.outcome}
            </Text>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

/* ─── FAQ Item ─── */
const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-dark-400/30 last:border-0">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200 hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/30 rounded"
      >
        <Heading level={4} variant="small-title" className="flex-1 pointer-events-none">
          {faq.q}
        </Heading>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dark-400/50 text-text-subtle text-xl leading-none select-none"
        >
          +
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <Text className="pb-6 pl-0 md:pl-2 max-w-2xl text-text-muted">
              {faq.a}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Page Component ─── */
const ProcessPage = ({ onOpenInquiry = () => {} }) => {
  const { t, formatPrice } = useLanguage();
  useSEO({ key: "process" });
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
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

  const whatYouGetLabel = t('processPage.steps.whatYouGetLabel') || t('processPage.steps.whatYouGet') || "What you get";

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
                  // Step {String(activeStep + 1).padStart(2, "0")} of {String(stepsList.length).padStart(2, "0")}
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
                        "flex items-center gap-4 text-left outline-none cursor-pointer group transition-all duration-300",
                        idx === activeStep ? "text-text" : "text-text-muted hover:text-text-subtle"
                      )}
                    >
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full -ml-[31px] relative z-10 transition-all duration-300 border border-dark bg-dark",
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
            {faqList.map((faq, i) => (
              <FadeIn key={faq.id || `faq-${i}`} delay={i * 0.05}>
                <FaqItem
                  faq={faq}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => toggleFaq(i)}
                />
              </FadeIn>
            ))}
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