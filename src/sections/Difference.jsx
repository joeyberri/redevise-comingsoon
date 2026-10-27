import Section from "../components/Section.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { X, Check } from "lucide-react";
import CorneredBox from "../components/CorneredBox.jsx";

const Difference = () => {
  const { t } = useLanguage();

  const items = t("difference.items") || [];

  return (
    <Section name="difference" spacing="default" className="bg-dark-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <FadeIn direction="down" delay={0}>
            <Pill className="mb-4">
              {t("difference.pill")}
            </Pill>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Heading level={2} variant="section-title" className="mb-4">
              {t("difference.title")}
            </Heading>
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              {t("difference.subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Comparison Header Labels (Desktop only) */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-text-muted">
          <div className="col-span-4">{t("difference.label")}</div>
          <div className="col-span-4">{t("difference.themLabel")}</div>
          <div className="col-span-4 text-lime">{t("difference.usLabel")}</div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} fullWidth>
              <CorneredBox
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-dark-100/75 hover:bg-dark-200/90 transition-colors duration-200 border-0 relative group/row overflow-hidden"
              >
                {/* Title */}
                <div className="col-span-1 md:col-span-4 flex items-center">
                  <h4 className="font-heading text-lg font-normal text-text tracking-tight">
                    {item.title}
                  </h4>
                </div>

                {/* Them (Traditional Agencies) */}
                <div className="col-span-1 md:col-span-4 flex items-start gap-3">
                  <div className="flex items-center justify-center size-6 rounded-full bg-dark-200 text-text-muted shrink-0 mt-0.5">
                    <X size={12} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="block md:hidden font-sans text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                      {t("difference.themLabel")}
                    </span>
                    <Text variant="small" className="text-text-muted leading-relaxed">
                      {item.them}
                    </Text>
                  </div>
                </div>

                {/* Us (Redevise Studio) */}
                <div className="col-span-1 md:col-span-4 flex items-start gap-3">
                  <div className="flex items-center justify-center size-6 rounded-full bg-lime/15 text-lime shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="block md:hidden font-sans text-xs font-bold text-lime uppercase tracking-wider mb-1">
                      {t("difference.usLabel")}
                    </span>
                    <Text variant="small" className="text-text font-medium leading-relaxed">
                      {item.us}
                    </Text>
                  </div>
                </div>
              </CorneredBox>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Difference;
