import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { X, Check } from "lucide-react";

import PlusIcon from "../components/PlusIcon.jsx";

const Difference = () => {
  const { t } = useLanguage();

  const items = t("difference.items") || [];

  return (
    <Section name="difference" showDivider spacing="default">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <FadeIn direction="down" delay={0}>
            <Pill animated className="mb-6">
              {t("difference.pill")}
            </Pill>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Heading level={2} variant="section-title" className="mb-6">
              {t("difference.title")}
            </Heading>
          </FadeIn>
        </div>

        {/* Comparison Header Labels (Desktop only) */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-6 px-6 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <div className="col-span-4">{t("difference.label")}</div>
          <div className="col-span-4">{t("difference.themLabel")}</div>
          <div className="col-span-4 text-lime">{t("difference.usLabel")}</div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} fullWidth>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 rounded-none border border-text/[0.04] bg-text/[0.01] hover:border-text/[0.08] hover:bg-text/[0.02] transition-all duration-300 relative group/row overflow-visible">
                {/* Plus Corner Markers */}
                <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/row:text-lime" /></div>
                <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/row:text-lime" /></div>
                <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/row:text-lime" /></div>
                <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/row:text-lime" /></div>

                {/* Accent glow on hover for Redevise column */}
                <div className="absolute right-0 top-0 bottom-0 w-[33%] bg-lime/[0.01] opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block" />

                {/* Title */}
                <div className="col-span-1 md:col-span-4 flex items-center">
                  <h4 className="font-sans text-base font-semibold text-text tracking-tight">
                    {item.title}
                  </h4>
                </div>

                {/* Them (Traditional Agencies) */}
                <div className="col-span-1 md:col-span-4 flex items-start gap-3">
                  <div className="flex items-center justify-center size-5 rounded-full bg-text/[0.04] border border-text/[0.08] text-text-subtle shrink-0 mt-0.5">
                    <X size={12} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="block md:hidden font-mono text-[9px] text-text-muted uppercase tracking-wider mb-1">
                      {t("difference.themLabel")}
                    </span>
                    <Text variant="small" className="text-text-muted leading-relaxed">
                      {item.them}
                    </Text>
                  </div>
                </div>

                {/* Us (Redevise Studio) */}
                <div className="col-span-1 md:col-span-4 flex items-start gap-3">
                  <div className="flex items-center justify-center size-5 rounded-full bg-lime/10 border border-lime/30 text-lime shrink-0 mt-0.5 shadow-[0_0_10px_rgba(163,230,53,0.15)]">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="block md:hidden font-mono text-[9px] text-lime/80 uppercase tracking-wider mb-1">
                      {t("difference.usLabel")}
                    </span>
                    <Text variant="small" className="text-text font-medium leading-relaxed">
                      {item.us}
                    </Text>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Difference;
