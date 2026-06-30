import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Terminal, Database, Code, Shield } from "lucide-react";
import Section from "../../components/Section.jsx";
import { Heading, Text } from "../../components/Typography.jsx";
import Pill from "../../components/Pill.jsx";
import FadeIn from "../../components/FadeIn.jsx";
import CorneredBox from "../../components/CorneredBox.jsx";
import FaqAccordion from "../../components/FaqAccordion.jsx";
import CtaFooter from "../../sections/CtaFooter.jsx";
import { useLanguage } from "../../utils/LanguageContext.jsx";
import { useSEO } from "../../utils/useSEO.js";

const CustomSoftwarePage = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  useSEO({ key: "customSoftware" });

  const capabilityIcons = [
    <Code key="0" className="size-5 text-lime" />,
    <Terminal key="1" className="size-5 text-lime" />,
    <Shield key="2" className="size-5 text-lime" />,
    <Database key="3" className="size-5 text-lime" />
  ];

  return (
    <>
      <div className="relative min-h-screen pt-32 pb-12 overflow-hidden">
        {/* Background elements */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-lime/[0.02] blur-[120px]" />
        <div className="absolute inset-0 bg-dots pointer-events-none" />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <FadeIn delay={0.05}>
            <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-dark-400/20 pb-6 mb-12">
              <ol className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-text-subtle/70">
                <li>
                  <Link to="/" className="hover:text-lime transition-colors duration-300">
                    {t('footer.home')}
                  </Link>
                </li>
                <li className="text-text-subtle/30">/</li>
                <li>
                  <Link to="/services" className="hover:text-lime transition-colors duration-300">
                    {t('nav.services')}
                  </Link>
                </li>
                <li className="text-text-subtle/30">/</li>
                <li className="text-text normal-case font-sans font-medium" aria-current="page">
                  {t('nav.services') === "Servicios" ? "Desarrollo de Software" : "Custom Software"}
                </li>
              </ol>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-text-subtle hover:text-lime transition-colors duration-300 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                {t('common.back')}
              </Link>
            </nav>
          </FadeIn>

          {/* Hero Header */}
          <div className="max-w-3xl mb-20">
            <FadeIn delay={0.1}>
              <Pill className="mb-4">{t('nav.services') === "Servicios" ? "Ingeniería a Medida" : "Custom Engineering"}</Pill>
              <Heading level={1} variant="hero-title" className="mb-6">
                {t('customSoftwarePage.hero.title')}
              </Heading>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Text variant="hero-sub" className="max-w-2xl text-text-muted">
                {t('customSoftwarePage.hero.sub')}
              </Text>
            </FadeIn>
          </div>

          {/* Capabilities Grid */}
          <Section name="custom-software-capabilities" spacing="tight" className="py-0 mb-24">
            <Heading level={2} className="text-2xl font-bold font-sans mb-10 tracking-tight text-text">
              {t('customSoftwarePage.capabilities.title')}
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t('customSoftwarePage.capabilities.list').map((item, i) => (
                <CorneredBox 
                  key={i} 
                  className="p-8 bg-dark-100/50 border border-text/10 rounded-2xl relative overflow-hidden group hover:border-lime/30 transition-all duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-text/5 rounded-lg border border-text/10">
                      {capabilityIcons[i] || <Code className="size-5 text-lime" />}
                    </div>
                    <div>
                      <Heading level={3} className="text-lg font-bold mb-2 font-sans tracking-tight text-text">
                        {item.title}
                      </Heading>
                      <Text className="text-sm text-text-muted leading-relaxed">
                        {item.desc}
                      </Text>
                    </div>
                  </div>
                </CorneredBox>
              ))}
            </div>
          </Section>

          {/* Tech Stack Section */}
          <Section name="tech-stack" spacing="tight" className="py-16 border-y border-dark-400/20 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
              <div>
                <Heading level={2} className="text-2xl font-bold font-sans mb-4 tracking-tight text-text">
                  {t('customSoftwarePage.techStack.title')}
                </Heading>
                <Text className="text-sm text-text-muted leading-relaxed max-w-sm">
                  {t('customSoftwarePage.techStack.desc')}
                </Text>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t('customSoftwarePage.techStack.items').map((item, i) => (
                  <div key={i} className="p-6 bg-dark-100/20 border border-text/5 rounded-xl">
                    <div className="text-[10px] font-bold tracking-widest text-lime uppercase mb-2">
                      {item.name}
                    </div>
                    <div className="font-sans text-sm font-semibold text-text">
                      {item.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* FAQs Accordion */}
          <Section name="custom-software-faqs" spacing="tight" className="py-0 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
              <div>
                <Pill className="mb-4">FAQ</Pill>
                <Heading level={2} className="text-3xl font-bold font-sans tracking-tight text-text mb-4">
                  {t('nav.services') === "Servicios" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
                </Heading>
                <Text className="text-sm text-text-muted leading-relaxed max-w-sm">
                  {t('nav.services') === "Servicios"
                    ? "Respuestas rápidas sobre cómo trabajamos, los plazos de entrega y la propiedad intelectual."
                    : "Quick answers about how we build code, delivery schedules, and intellectual property ownership."}
                </Text>
              </div>

              <div>
                <FaqAccordion items={t('customSoftwarePage.faqs')} variant="boxed" />
              </div>
            </div>
          </Section>
        </div>
      </div>
      <CtaFooter onOpenInquiry={onOpenInquiry} />
    </>
  );
};

export default CustomSoftwarePage;
