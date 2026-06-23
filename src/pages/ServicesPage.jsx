import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import Grid from "../components/Grid.jsx";
import GlassCard from "../components/GlassCard.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import {
  Globe,
  AppWindow,
  Smartphone,
  ShoppingCart,
  Blocks,
  Cable,
  Zap,
  ClipboardCheck,
  BarChart3,
  RefreshCw,
  Gauge,
  Users,
  Church,
  GraduationCap,
  Headphones,
  ArrowRight,
} from "lucide-react";

/* ── Icon Mapping ── */
const devIcons = [Globe, AppWindow, Smartphone, ShoppingCart, Blocks, Cable];
const consultingIcons = [Zap, ClipboardCheck, BarChart3, RefreshCw, Gauge, Users];
const specializedIcons = [Church, GraduationCap, Headphones];

/* ── Category 1: Service Card (Keeps GlassCard) ── */
const ServiceCard = ({ icon: Icon, title, description, link, linkLabel, categoryLabel, onStartProject, delay = 0 }) => (
  <GlassCard delay={delay} className="flex flex-col justify-between h-full group">
    <div>
      {categoryLabel && (
        <span className="block font-mono text-[9px] text-lime/50 uppercase tracking-widest mb-3">
          // {categoryLabel}
        </span>
      )}
      
      <div className="flex items-center gap-3.5 mb-4">
        <Icon className="h-5 w-5 text-lime shrink-0" strokeWidth={1.5} />
        <Heading level={4} variant="small-title">
          {title}
        </Heading>
      </div>
      
      <Text variant="body" className="text-text-muted text-sm md:text-base leading-relaxed">
        {description}
      </Text>
    </div>

    {/* Hover-reveal link */}
    <div className="mt-6 overflow-hidden">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lime opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0"
        >
          {linkLabel || "Learn more"}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <button
          onClick={() => onStartProject?.(title)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lime opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 cursor-pointer outline-none"
        >
          Start a project
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  </GlassCard>
);

/* ── Category 2: Service Row (Hover-Expand Accordion) ── */
const ServiceRow = ({ icon: Icon, title, description, onStartProject }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-text/[0.08] last:border-0 py-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none group/row"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-lime/10 text-lime group-hover/row:bg-lime group-hover/row:text-dark transition-all duration-300">
            <Icon size={20} strokeWidth={1.5} />
          </div>
          <Heading level={4} variant="small-title" className="group-hover/row:text-lime transition-colors duration-300">
            {title}
          </Heading>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-text/10 text-text-subtle group-hover/row:border-lime group-hover/row:text-lime transition-colors duration-300 select-none text-lg"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <Text className="mt-4 pl-14 max-w-3xl text-text-muted leading-relaxed">
              {description}
            </Text>
            <div className="mt-4 pl-14">
              <button
                onClick={() => onStartProject?.(title)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime hover:text-lime-400 cursor-pointer outline-none"
              >
                Start a project
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Category 3: Feature Highlight Block (Wide, Single Column) ── */
const SpecializedBlock = ({ icon: Icon, title, description, link, linkLabel, onStartProject }) => (
  <div className="border-b border-text/[0.08] last:border-0 pb-12 mb-12 last:pb-0 last:mb-0 last:border-b-0">
    <div className="max-w-4xl">
      <div className="flex items-center justify-center w-14 h-14 rounded-sm border border-lime/20 bg-lime/10 text-lime mb-6">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      
      <Heading level={3} variant="card-title" className="mb-4 tracking-tight">
        {title}
      </Heading>
      
      <Text variant="body" className="text-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
        {description}
      </Text>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-lime hover:underline group"
        >
          {linkLabel || "Learn more"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      ) : (
        <button
          onClick={() => onStartProject?.(title)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-lime hover:text-lime-400 cursor-pointer group outline-none"
        >
          Start a project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  </div>
);

/* ── Category Navigation Dots ── */
const CategoryNav = ({ activeCategory, categories }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => {
          const el = document.getElementById(cat.id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="group relative flex items-center justify-end gap-3"
        aria-label={`Scroll to ${cat.label}`}
      >
        <span
          className={`text-xs font-medium tracking-wide transition-all duration-300 ${
            activeCategory === cat.id
              ? "text-lime opacity-100 translate-x-0"
              : "text-text-subtle opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
        >
          {cat.label}
        </span>
        <span
          className={`block rounded-full transition-all duration-300 ${
            activeCategory === cat.id
              ? "h-3 w-3 bg-lime shadow-lg shadow-lime/30"
              : "h-2 w-2 bg-text-subtle/40 group-hover:bg-text-subtle"
          }`}
        />
      </button>
    ))}
  </div>
);

/* ── Main Page ── */
const ServicesPage = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  useSEO({ key: "services" });
  const [activeCategory, setActiveCategory] = useState("what-we-build");

  const categories = [
    { id: "what-we-build", label: t('servicesPage.dev.pill') },
    { id: "what-we-fix", label: t('servicesPage.consulting.pill') },
    { id: "specialized", label: t('servicesPage.specialized.pill') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offsets = categories.map((cat) => {
        const el = document.getElementById(cat.id);
        if (!el) return { id: cat.id, top: Infinity };
        return { id: cat.id, top: Math.abs(el.getBoundingClientRect().top - 200) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveCategory(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-lime/[0.03] blur-[120px]" />

      <CategoryNav activeCategory={activeCategory} categories={categories} />

      {/* ── Hero ── */}
      <Section name="services-hero" className="pt-32 md:pt-40" spacing="tight">
        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <Heading level={1} variant="hero-title" className="mb-6">
              {t('servicesPage.hero.title')}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Text variant="hero-sub" className="max-w-2xl">
              {t('servicesPage.hero.sub')}
            </Text>
          </FadeIn>
        </div>
      </Section>

      {/* ── Category: What We Build (Grid Layout) ── */}
      <Section name="development" spacing="default">
        <div id="what-we-build" className="scroll-mt-32">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Pill className="mb-4">{t('servicesPage.dev.pill')}</Pill>
              <Heading level={2} variant="section-title" className="mb-3">
                {t('servicesPage.dev.title')}
              </Heading>
            </div>
          </FadeIn>

          <Grid cols={3} gap={6}>
            {t('servicesPage.dev.items').map((service, i) => (
              <ServiceCard
                key={service.title}
                icon={devIcons[i]}
                categoryLabel={t('servicesPage.dev.pill')}
                title={service.title}
                description={service.desc}
                onStartProject={onOpenInquiry}
                delay={i * 0.08}
              />
            ))}
          </Grid>
        </div>
      </Section>

      {/* ── Category: What We Fix & Improve (Hover-Expand Accordion Rows) ── */}
      <Section name="consulting" showDivider spacing="default">
        <div id="what-we-fix" className="scroll-mt-32">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Pill className="mb-4">{t('servicesPage.consulting.pill')}</Pill>
              <Heading level={2} variant="section-title" className="mb-3">
                {t('servicesPage.consulting.title')}
              </Heading>
            </div>
          </FadeIn>

          <div className="max-w-4xl divide-y divide-text/[0.06]">
            {t('servicesPage.consulting.items').map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.05} fullWidth>
                <ServiceRow
                  icon={consultingIcons[i]}
                  title={service.title}
                  description={service.desc}
                  onStartProject={onOpenInquiry}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Category: Specialized (Wide Feature Highlight Blocks) ── */}
      <Section name="specialized-section" showDivider spacing="default">
        <div id="specialized" className="scroll-mt-32">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Pill className="mb-4">{t('servicesPage.specialized.pill')}</Pill>
              <Heading level={2} variant="section-title" className="mb-3">
                {t('servicesPage.specialized.title')}
              </Heading>
            </div>
          </FadeIn>

          <div className="max-w-4xl">
            {t('servicesPage.specialized.items').map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1} fullWidth>
                <SpecializedBlock
                  icon={specializedIcons[i]}
                  title={service.title}
                  description={service.desc}
                  link={service.href}
                  linkLabel={service.linkLabel}
                  onStartProject={onOpenInquiry}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Bottom CTA ── */}
      <Section name="services-cta" showDivider spacing="generous">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <Heading level={2} variant="section-title" className="mb-4">
              {t('servicesPage.cta.title')}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Text variant="section-sub" className="mx-auto mb-10">
              {t('servicesPage.cta.sub')}
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton variant="primary" withBeam to="/estimate">
                {t('servicesPage.cta.estimate')}
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>

              <MagneticButton variant="secondary" onClick={onOpenInquiry}>
                {t('servicesPage.cta.talk')}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
};

export default ServicesPage;
