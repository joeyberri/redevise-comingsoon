import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import FadeIn from "../components/FadeIn.jsx";
import GlassCard from "../components/GlassCard.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { cn } from "../utils/cn";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import {
  Globe,
  AppWindow,
  Smartphone,
  ShoppingCart,
  Blocks,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  LayoutDashboard,
  Plug,
  Radio,
  BarChart3,
  Languages,
  Search,
  Clock,
  CalendarClock,
  Zap,
} from "lucide-react";

/* ─── Step label component ─── */
const StepLabel = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lime/10 border border-lime/20 text-lime font-sans font-bold text-sm shrink-0">
      {number}
    </div>
    <Heading level={3} variant="card-title">
      {title}
    </Heading>
  </div>
);

import PlusIcon from "../components/PlusIcon.jsx";

/* ─── Feature Toggle ─── */
const FeatureToggle = ({ feature, isActive, onToggle }) => {
  const Icon = feature.icon;
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex items-center gap-4 w-full rounded-none border p-4 md:p-5 transition-all duration-300 text-left cursor-pointer outline-none overflow-visible",
        isActive
          ? "border-lime/40 bg-lime/[0.06]"
          : "border-text/[0.08] bg-text/[0.02] hover:border-text/[0.15] hover:bg-text/[0.04]"
      )}
    >
      {/* Corner indicators */}
      <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>

      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-none border transition-all duration-300 shrink-0",
          isActive 
            ? "bg-lime/15 border-lime/30 text-lime" 
            : "bg-text/5 border-text/10 text-text-subtle"
        )}
      >
        <Icon size={20} />
      </div>

      <span
        className={cn(
          "font-sans text-sm font-medium transition-colors duration-300 flex-1",
          isActive ? "text-text" : "text-text-muted"
        )}
      >
        {feature.label}
      </span>

      {/* Toggle pill */}
      <div
        className={cn(
          "relative w-12 h-7 rounded-full transition-all duration-300 shrink-0",
          isActive ? "bg-lime/30" : "bg-text/10"
        )}
      >
        <motion.div
          className={cn(
            "absolute top-1 w-5 h-5 rounded-full shadow-md transition-colors duration-300",
            isActive ? "bg-lime" : "bg-text-subtle"
          )}
          animate={{ left: isActive ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </motion.button>
  );
};

/* ─── Animated number ─── */
const AnimatedPrice = ({ value }) => {
  const { formatPrice } = useLanguage();
  const formatted = formatPrice(value);
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={formatted}
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -4, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        {formatted}
      </motion.span>
    </AnimatePresence>
  );
};

/* ─── Main Page ─── */
const EstimatePage = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  useSEO({ key: "estimate" });
  const [selectedType, setSelectedType] = useState(null);
  const [scopeIndex, setScopeIndex] = useState(1);
  const [activeFeatures, setActiveFeatures] = useState(new Set());
  const [selectedTimeline, setSelectedTimeline] = useState("standard");

  /* ─── Static configurations merged with translations ─── */
  const projectTypes = useMemo(() => {
    const list = t('estimatePage.types') || [];
    const icons = [Globe, AppWindow, Smartphone, ShoppingCart, Blocks, HelpCircle];
    const bases = [2000, 5000, 8000, 4000, 10000, 3000];
    return list.map((item, idx) => ({
      id: item.id,
      icon: icons[idx] || HelpCircle,
      title: item.title,
      desc: item.desc,
      base: bases[idx] || 3000
    }));
  }, [t]);

  const scopeLevels = useMemo(() => {
    const list = t('estimatePage.scopes') || [];
    const multipliers = [1, 1.5, 2.5, 4];
    const weeksList = [[2, 3], [4, 6], [8, 12], [12, 20]];
    return list.map((item, idx) => ({
      id: idx,
      label: item.label,
      desc: item.desc,
      multiplier: multipliers[idx] || 1,
      weeks: weeksList[idx] || [2, 4]
    }));
  }, [t]);

  const features = useMemo(() => {
    const list = t('estimatePage.features') || [];
    const icons = [ShieldCheck, CreditCard, LayoutDashboard, Plug, Radio, BarChart3, Languages, Search];
    const percentages = [0.15, 0.20, 0.18, 0.12, 0.15, 0.10, 0.12, 0.10];
    return list.map((item, idx) => ({
      id: item.id,
      icon: icons[idx] || ShieldCheck,
      label: item.label,
      pct: percentages[idx] || 0.10
    }));
  }, [t]);

  const timelines = useMemo(() => {
    const list = t('estimatePage.timelines') || [];
    const icons = [Clock, CalendarClock, Zap];
    const multipliers = [0.9, 1, 1.4];
    const timeMultipliers = [1.3, 1, 0.7];
    return list.map((item, idx) => ({
      id: item.id,
      icon: icons[idx] || Clock,
      title: item.title,
      desc: item.desc,
      detail: item.detail,
      discount: item.discount,
      multiplier: multipliers[idx] || 1,
      timeMultiplier: timeMultipliers[idx] || 1
    }));
  }, [t]);

  const toggleFeature = useCallback((id) => {
    setActiveFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const estimate = useMemo(() => {
    const type = projectTypes.find((t) => t.id === selectedType);
    if (!type) return null;

    const scope = scopeLevels[scopeIndex];
    const timeline = timelines.find((t) => t.id === selectedTimeline);

    let base = type.base * scope.multiplier;

    // Add feature percentages
    let featurePct = 0;
    activeFeatures.forEach((fId) => {
      const feat = features.find((f) => f.id === fId);
      if (feat) featurePct += feat.pct;
    });
    base = base * (1 + featurePct);

    // Apply timeline multiplier
    base = base * timeline.multiplier;

    const low = Math.round(base * 0.8 / 100) * 100;
    const high = Math.round(base * 1.3 / 100) * 100;

    // Timeline in weeks
    const baseWeeksLow = scope.weeks[0];
    const baseWeeksHigh = scope.weeks[1];
    const weeksLow = Math.max(1, Math.round(baseWeeksLow * timeline.timeMultiplier));
    const weeksHigh = Math.max(2, Math.round(baseWeeksHigh * timeline.timeMultiplier));

    return {
      low,
      high,
      weeksLow,
      weeksHigh,
      featuresCount: activeFeatures.size,
    };
  }, [selectedType, scopeIndex, activeFeatures, selectedTimeline, projectTypes, scopeLevels, timelines, features]);

  return (
    <div className="min-h-screen bg-dark">
      {/* ─── Hero ─── */}
      <Section name="estimate-hero" className="pt-32 pb-0" spacing="tight">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <Heading
              level={1}
              variant="hero-title"
              className="mb-6"
            >
              {t('estimatePage.hero.title')}
            </Heading>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Text variant="hero-sub" className="mx-auto">
              {t('estimatePage.hero.sub')}
            </Text>
          </FadeIn>
        </div>
      </Section>

      {/* ─── Step 1: Project Type ─── */}
      <Section name="estimate-type" spacing="default">
        <FadeIn fullWidth>
          <StepLabel number={1} title={t('estimatePage.step1')} />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projectTypes.map((type, i) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <GlassCard
                key={type.id}
                delay={i * 0.05}
                className={cn(
                  "cursor-pointer transition-all duration-300 !p-6",
                  isSelected
                    ? "!border-lime/50 ring-1 ring-lime/20"
                    : "hover:!border-text/15"
                )}
              >
                <button
                  onClick={() => setSelectedType(type.id)}
                  className="w-full text-left outline-none"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-none border transition-all duration-300 shrink-0",
                        isSelected
                          ? "bg-lime/15 border-lime/30 text-lime"
                          : "bg-text/5 border-text/10 text-text-subtle"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={cn(
                          "font-sans text-base font-semibold transition-colors duration-300 mb-1",
                          isSelected ? "text-lime" : "text-text"
                        )}
                      >
                        {type.title}
                      </h4>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {type.desc}
                      </p>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-lime flex items-center justify-center"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      {/* ─── Step 2: Scope Slider ─── */}
      <Section name="estimate-scope" spacing="default" showDivider>
        <FadeIn fullWidth>
          <StepLabel number={2} title={t('estimatePage.step2')} />
        </FadeIn>

        <FadeIn delay={0.1} fullWidth>
          <div className="max-w-3xl">
            {/* Scope labels above slider */}
            <div className="flex justify-between mb-4 px-1">
              {scopeLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setScopeIndex(level.id)}
                  className={cn(
                    "font-sans text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer",
                    scopeIndex === level.id
                      ? "text-lime"
                      : "text-text-subtle hover:text-text-muted"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>

            {/* Custom slider track */}
            <div className="relative h-12 flex items-center">
              {/* Background track */}
              <div className="absolute inset-x-0 h-2 rounded-full bg-text/[0.06]" />

              {/* Active track */}
              <motion.div
                className="absolute left-0 h-2 rounded-full bg-gradient-to-r from-lime/60 to-lime"
                animate={{
                  width: `${(scopeIndex / (scopeLevels.length - 1)) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              />

              {/* Stop dots */}
              {scopeLevels.map((level) => {
                const pct = (level.id / (scopeLevels.length - 1)) * 100;
                return (
                  <button
                    key={level.id}
                    onClick={() => setScopeIndex(level.id)}
                    className="absolute -translate-x-1/2 z-10 cursor-pointer outline-none group/dot"
                    style={{ left: `${pct}%` }}
                  >
                    <motion.div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 transition-colors duration-300",
                        level.id <= scopeIndex
                          ? "bg-lime border-lime"
                          : "bg-dark-100 border-text/20 group-hover/dot:border-text/40"
                      )}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </button>
                );
              })}

              {/* Draggable thumb */}
              <motion.div
                className="absolute z-20 -translate-x-1/2"
                animate={{
                  left: `${(scopeIndex / (scopeLevels.length - 1)) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <div className="w-7 h-7 rounded-full bg-lime shadow-lg shadow-lime/30 border-2 border-lime-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-dark" />
                </div>
              </motion.div>

              {/* Invisible native range for keyboard + touch a11y */}
              <input
                type="range"
                min={0}
                max={scopeLevels.length - 1}
                step={1}
                value={scopeIndex}
                onChange={(e) => setScopeIndex(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                aria-label="Project scope"
              />
            </div>

            {/* Description of current level */}
            <AnimatePresence mode="wait">
              {scopeLevels[scopeIndex] && (
                <motion.div
                  key={scopeIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="mt-6 rounded-none border border-text/[0.08] bg-text/[0.02] p-5 relative overflow-visible"
                >
                  {/* Corner indicators */}
                  <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                  <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                  <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                  <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lime font-sans font-bold text-lg">
                      {scopeLevels[scopeIndex].label}
                    </span>
                    <span className="text-text-subtle text-xs font-sans">
                      {scopeLevels[scopeIndex].multiplier}x multiplier
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {scopeLevels[scopeIndex].desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </Section>

      {/* ─── Step 3: Feature Toggles ─── */}
      <Section name="estimate-features" spacing="default" showDivider>
        <FadeIn fullWidth>
          <StepLabel number={3} title={t('estimatePage.step3.title')} />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
          {features.map((feature, i) => (
            <FadeIn key={feature.id} delay={i * 0.04} fullWidth>
              <FeatureToggle
                feature={feature}
                isActive={activeFeatures.has(feature.id)}
                onToggle={() => toggleFeature(feature.id)}
              />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── Step 4: Timeline ─── */}
      <Section name="estimate-timeline" spacing="default" showDivider>
        <FadeIn fullWidth>
          <StepLabel number={4} title={t('estimatePage.step4')} />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {timelines.map((tl, i) => {
            const Icon = tl.icon;
            const isSelected = selectedTimeline === tl.id;
            return (
              <GlassCard
                key={tl.id}
                delay={i * 0.04}
                className={cn(
                  "cursor-pointer transition-all duration-200 !p-6",
                  isSelected
                    ? "!border-lime/50 ring-1 ring-lime/20"
                    : "hover:!border-text/15"
                )}
              >
                <button
                  onClick={() => setSelectedTimeline(tl.id)}
                  className="w-full text-left outline-none"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-none border transition-all duration-300 mb-4",
                      isSelected
                        ? "bg-lime/15 border-lime/30 text-lime"
                        : "bg-text/5 border-text/10 text-text-subtle"
                    )}
                  >
                    <Icon size={24} />
                  </div>

                  <h4
                    className={cn(
                      "font-sans text-lg font-semibold transition-colors duration-300 mb-1",
                      isSelected ? "text-lime" : "text-text"
                    )}
                  >
                    {tl.title}
                  </h4>

                  <p className="text-sm text-text-muted font-medium mb-3">
                    {tl.desc}
                  </p>

                  <p className="text-xs text-text-subtle leading-relaxed">
                    {tl.detail}
                  </p>

                  {/* Price hint */}
                  <div className="mt-4 pt-3 border-t border-text/[0.06]">
                    <span
                      className={cn(
                        "text-xs font-sans font-semibold tracking-wide uppercase",
                        tl.multiplier < 1
                          ? "text-green-400"
                          : tl.multiplier > 1
                          ? "text-amber-400"
                          : "text-text-subtle"
                      )}
                    >
                      {tl.discount}
                    </span>
                  </div>

                  {/* Selection indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-lime flex items-center justify-center"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      {/* ─── Estimate Summary Panel ─── */}
      <AnimatePresence>
        {estimate && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 26 }}
            className="fixed bottom-0 inset-x-0 z-40"
          >
            {/* Top glow line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-lime/30 to-transparent" />

            <div
              className="border-t border-text/[0.08] bg-dark/95 shadow-2xl"
            >
              <div className="container mx-auto max-w-container px-6 md:px-10 py-4 md:py-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                  {/* Left: price + details */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full md:w-auto">
                    {/* Price range */}
                    <div className="text-center sm:text-left">
                      <p className="text-text-subtle text-xs font-sans uppercase tracking-widest mb-1">
                        {t('estimatePage.summary.range')}
                      </p>
                      <div className="font-sans text-2xl md:text-3xl font-bold text-text tracking-tight flex items-baseline gap-1">
                        <AnimatedPrice value={estimate.low} />
                        <span className="text-text-subtle font-normal text-lg mx-1">
                          {t('estimatePage.summary.to')}
                        </span>
                        <AnimatedPrice value={estimate.high} />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-12 bg-text/[0.08]" />

                    {/* Timeline + features */}
                    <div className="flex items-center gap-6">
                      <div className="text-center sm:text-left">
                        <p className="text-text-subtle text-xs font-sans uppercase tracking-widest mb-0.5">
                          {t('estimatePage.summary.timeline')}
                        </p>
                        <p className="font-sans text-sm font-semibold text-text">
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={`${estimate.weeksLow}-${estimate.weeksHigh}`}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                            >
                              {estimate.weeksLow}-{estimate.weeksHigh}{t('estimatePage.summary.weeks')}
                            </motion.span>
                          </AnimatePresence>
                        </p>
                      </div>

                      <div className="text-center sm:text-left">
                        <p className="text-text-subtle text-xs font-sans uppercase tracking-widest mb-0.5">
                          {t('estimatePage.summary.features')}
                        </p>
                        <p className="font-sans text-sm font-semibold text-text">
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={estimate.featuresCount}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.15 }}
                            >
                              {estimate.featuresCount}{t('estimatePage.summary.selected')}
                            </motion.span>
                          </AnimatePresence>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="w-full sm:w-auto shrink-0">
                    <MagneticButton
                      variant="primary"
                      withBeam
                      className="!py-4 !px-8 !text-sm w-full sm:w-auto"
                      onClick={() => onOpenInquiry?.()}
                    >
                      {t('estimatePage.summary.cta')}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bottom CTA section (visible before estimate) ─── */}
      <Section name="estimate-cta" spacing="default" showDivider>
        <FadeIn fullWidth>
          <div className="max-w-2xl mx-auto text-center">
            <Heading level={2} variant="card-title" className="mb-4">
              {t('estimatePage.bottomCta.title')}
            </Heading>
            <Text variant="section-sub" className="mx-auto mb-8">
              {t('estimatePage.bottomCta.sub')}
            </Text>
            <MagneticButton variant="primary" withBeam onClick={() => onOpenInquiry?.()}>
              {t('estimatePage.bottomCta.cta')}
            </MagneticButton>
          </div>
        </FadeIn>

        {/* Spacer for sticky panel */}
        {estimate && <div className="h-28 md:h-24" />}
      </Section>
    </div>
  );
};

export default EstimatePage;
