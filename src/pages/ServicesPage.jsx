import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import GlassCard from "../components/GlassCard.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import { cn } from "../utils/cn";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CorneredBox from "../components/CorneredBox.jsx";
import CategoryNav from "../components/CategoryNav.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";

const CAPABILITIES = [
  {
    id: "infrastructure",
    name: "Domains & Infrastructure",
    desc: "Domain registration, DNS configurations, secure SSL setups, and scalable cloud hosting configurations to make sure your applications are fast, secure, and always online.",
    services: [
      "Domain Registration",
      "Domain Transfer",
      "Domain Management",
      "DNS Management",
      "SSL Certificate Setup",
      "Website Hosting",
      "Cloud Hosting",
      "Server Setup & Configuration",
      "Server Migration",
      "CDN Setup",
      "Backup & Recovery Solutions"
    ]
  },
  {
    id: "websites",
    name: "Website Services",
    desc: "From single-page landing pages and corporate sites to personal portfolios and high-traffic blogs. Modern layouts, fast load times, and responsive designs built for local conversion.",
    services: [
      "Website Design",
      "Website Development",
      "Website Redesign",
      "Landing Page Development",
      "E-commerce Website Development",
      "Membership Websites",
      "Portfolio Websites",
      "Corporate Websites",
      "Blog Development",
      "Website Maintenance",
      "Website Security Hardening",
      "Website Speed Optimization",
      "Website Accessibility Improvements",
      "Website Audits"
    ]
  },
  {
    id: "business",
    name: "Business Presence",
    desc: "Google Workspace setup, professional workspace emails, social profile alignment, brand identity, and digital asset development to build trust with local customers.",
    services: [
      "Business Profile Creation",
      "Business Workspace Email Setup",
      "Professional Email Migration",
      "Google Business Profile Setup",
      "Social Media Profile Setup",
      "Online Directory Listings",
      "Brand Identity Development",
      "Logo Design",
      "Business Card Design",
      "Digital Brand Assets"
    ]
  },
  {
    id: "seo",
    name: "SEO & Visibility",
    desc: "Technical SEO audits, search engine indexing configurations, local search mapping, keyword research, and Conversion Rate Optimization (CRO).",
    services: [
      "SEO Optimization",
      "Technical SEO",
      "On-Page SEO",
      "Local SEO",
      "Keyword Research",
      "Content Optimization",
      "SEO Audits",
      "Search Console Setup",
      "Analytics Setup",
      "Conversion Rate Optimization (CRO)"
    ]
  },
  {
    id: "automation",
    name: "Automation & AI",
    desc: "WhatsApp automation setups, custom AI customer service chatbots, automated appointment calendars, and background workflow integrations to save your team manual labor.",
    services: [
      "Business Process Automation",
      "Workflow Automation",
      "Email Automation",
      "CRM Automation",
      "Lead Capture Automation",
      "Appointment Booking Automation",
      "Customer Support Automation",
      "AI Chatbot Development",
      "AI Knowledge Base Creation",
      "AI Customer Service Agents",
      "AI Internal Assistants",
      "AI Document Processing",
      "AI-Powered Reporting",
      "WhatsApp Automation",
      "Social Media Automation"
    ]
  },
  {
    id: "software",
    name: "Software & Web Apps",
    desc: "Custom web applications, SaaS platform development, customer portal logins, administrative dashboards, ERP configurations, and custom API designs.",
    services: [
      "Custom Web Applications",
      "SaaS Development",
      "Internal Business Tools",
      "Customer Portals",
      "Admin Dashboards",
      "CRM Development",
      "ERP Solutions",
      "API Development",
      "API Integration",
      "Third-Party Integrations",
      "Database Design",
      "System Modernization"
    ]
  },
  {
    id: "ecommerce",
    name: "E-commerce Solutions",
    desc: "Payment gateway integrations (Paystack, Hubtel, Stripe, M-Pesa), inventory tracking databases, product catalog setups, and shopping cart flows.",
    services: [
      "Online Store Development",
      "Payment Gateway Integration",
      "Inventory Management Systems",
      "Product Catalog Management",
      "Subscription Systems",
      "Marketplace Development",
      "Order Management Solutions"
    ]
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    desc: "Google Ads account configuration, social media advertising setup, automated email newsletters, and tracking pixels to measure campaign ROI.",
    services: [
      "Search Engine Marketing (SEM)",
      "Google Ads Management",
      "Social Media Advertising",
      "Email Marketing",
      "Lead Generation Systems",
      "Funnel Design",
      "Marketing Automation",
      "Retargeting Campaigns",
      "Performance Tracking"
    ]
  },
  {
    id: "productivity",
    name: "Productivity Systems",
    desc: "Unified cloud collaboration setup, document repositories, company wiki documentation, and custom project management board integrations.",
    services: [
      "Google Workspace Setup",
      "Microsoft 365 Setup",
      "Team Collaboration Systems",
      "Knowledge Base Development",
      "Document Management Systems",
      "Project Management System Setup"
    ]
  },
  {
    id: "security",
    name: "Security & Compliance",
    desc: "Security vulnerability assessments, malware cleanups, regular backup vaults, user access controls, and business continuity systems.",
    services: [
      "Security Audits",
      "Vulnerability Assessments",
      "Website Malware Removal",
      "User Access Management",
      "Data Backup Solutions",
      "Business Continuity Planning"
    ]
  },
  {
    id: "analytics",
    name: "Business Intelligence",
    desc: "Real-time KPI reports, custom interactive dashboards, user behavioral tracking configurations, and multi-source data reporting integrations.",
    services: [
      "Business Intelligence Dashboards",
      "Data Visualization",
      "Customer Insights",
      "Reporting Automation",
      "KPI Tracking Systems",
      "Predictive Analytics",
      "Data Integration"
    ]
  },
  {
    id: "mobile",
    name: "Mobile Solutions",
    desc: "Native iOS & Android application development, Progressive Web Apps (PWAs) configuration, and App Store / Google Play deployments.",
    services: [
      "Mobile App Development",
      "Progressive Web Apps (PWAs)",
      "Mobile App Maintenance",
      "App Store Deployment"
    ]
  },
  {
    id: "consulting",
    name: "Support & Consulting",
    desc: "Strategic technical advisory, product discovery sprints, MVP scoping, hands-on user training, and ongoing technical support agreements.",
    services: [
      "Technical Consulting",
      "Digital Transformation Consulting",
      "Technology Strategy",
      "Product Discovery",
      "MVP Development",
      "IT Support",
      "Website Support",
      "Training & Onboarding",
      "Ongoing Technical Support"
    ]
  }
];



const ServicesPage = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  useSEO({ key: "services" });
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("core-offerings");
  const [activeDomainId, setActiveDomainId] = useState(CAPABILITIES[0].id);


  const faqs = [
    {
      question: "What is Optimization Infrastructure?",
      answer: "Optimization Infrastructure is the set of custom software tools, workflow automations, and system architectures built to streamline operations and multiply team capacity without scaling headcount linearly."
    },
    {
      question: "How does Redevise decide between building custom software vs subscribing to SaaS?",
      answer: "We help clients audit their tool stack. If off-the-shelf SaaS creates integration debt or becomes a process bottleneck, we design custom integration layers or custom web applications that adapt exactly to your workflows."
    },
    {
      question: "What payment gateways does Redevise integrate?",
      answer: "We integrate payment gateways tailored to local and international markets, including Paystack, Hubtel, Stripe, and M-Pesa, complete with built-in inventory tracking."
    },
    {
      question: "How long does a typical system design and automation project take?",
      answer: "We operate on sprint-based development cycles, providing weekly staging links. A typical workflow automation or dashboard setup is completed in 3 to 6 weeks."
    },
    {
      question: "Does Redevise build custom AI chatbots?",
      answer: "Yes. We build intelligent, context-aware AI chatbots and knowledge base agents that integrate directly into your WhatsApp channels, CRM, or support desks to automate manual labor safely."
    }
  ];

  const faqSchemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const sections = [
    { id: "core-offerings", label: t("servicesPage.core.pill") },
    { id: "capabilities-index", label: t("servicesPage.directory.pill") },
    { id: "services-faq", label: "FAQ" }
  ];

  const packages = t("servicesPage.core.packages") || [];
  const activeDomain = CAPABILITIES.find((d) => d.id === activeDomainId) || CAPABILITIES[0];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const offsets = sections.map((sec) => {
            const el = document.getElementById(sec.id);
            if (!el) return { id: sec.id, top: Infinity };
            return { id: sec.id, top: Math.abs(el.getBoundingClientRect().top - 200) };
          });
          const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
          setActiveSection(closest.id);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-lime/[0.03] blur-[120px]" />

      <CategoryNav activeSection={activeSection} sections={sections} />

      {/* ── Hero ── */}
      <Section name="services-hero" className="pt-32 md:pt-40 pb-0" spacing="tight">
        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <Heading level={1} variant="hero-title" className="mb-6">
              {t("servicesPage.hero.title")}
            </Heading>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Text variant="hero-sub" className="max-w-2xl">
              {t("servicesPage.hero.sub")}
            </Text>
          </FadeIn>
        </div>
      </Section>

      {/* ── Core Offerings (SME Essentials) ── */}
      <Section name="core-offerings" spacing="default">
        <div id="core-offerings" className="scroll-mt-32">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Pill className="mb-4">{t("servicesPage.core.pill")}</Pill>
              <Heading level={2} variant="section-title">
                {t("servicesPage.core.title")}
              </Heading>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <GlassCard
                key={pkg.id}
                delay={i * 0.04}
                className="flex flex-col justify-between h-full group !p-8"
              >
                <div>
                  <span className="block font-mono text-[9px] text-lime/50 uppercase tracking-widest mb-4">
                    {"// "}{pkg.id}
                  </span>

                  <Heading level={3} variant="card-title" className="mb-4 text-lime text-2xl font-space uppercase">
                    {pkg.title}
                  </Heading>

                  <Text variant="small" className="text-text-muted leading-relaxed mb-8">
                    {pkg.desc}
                  </Text>

                  {/* Bulleted list of core offerings */}
                  <ul className="space-y-3 mb-8">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-lime mt-1 shrink-0" strokeWidth={3} />
                        <span className="font-sans text-sm text-text-subtle font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-text/[0.06] overflow-hidden">
                  <button
                    onClick={() => onOpenInquiry?.(pkg.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-mono text-lime opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer outline-none bg-transparent border-0"
                  >
                    Start a project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      const typeMap = {
                        "Digital Launchpad": "website",
                        "AI & Automation": "custom",
                        "Growth & Scale": "ecommerce"
                      };
                      const mappedType = typeMap[pkg.title] || "website";
                      navigate("/estimate", { state: { projectType: mappedType } });
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider font-mono text-text-subtle hover:text-lime transition-all duration-300 cursor-pointer outline-none bg-transparent border-0"
                  >
                    Get Estimate
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Capabilities Index (Expandable Split List) ── */}
      <Section name="capabilities-index" showDivider spacing="default">
        <div id="capabilities-index" className="scroll-mt-32">
          <FadeIn delay={0}>
            <div className="mb-12">
              <Pill className="mb-4">{t("servicesPage.directory.pill")}</Pill>
              <Heading level={2} variant="section-title">
                {t("servicesPage.directory.title")}
              </Heading>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Nav (Tabs): Horizontal on Mobile, Vertical Sticky on Desktop */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 scrollbar-none lg:sticky lg:top-28">
              {CAPABILITIES.map((domain) => {
                const isActive = activeDomainId === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setActiveDomainId(domain.id)}
                    className={cn(
                      "px-5 py-4 text-left border rounded-none font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer outline-none whitespace-nowrap shrink-0",
                      isActive
                        ? "border-lime/40 bg-lime/[0.04] text-lime"
                        : "border-text/5 hover:border-text/10 bg-text/[0.01] text-text-subtle"
                    )}
                  >
                    {domain.name}
                  </button>
                );
              })}
            </div>

            {/* Right Side (Content Panel with corner plus blueprint style) */}
            <div className="lg:col-span-8">
              <CorneredBox
                className="group/panel"
                plusClassName="group-hover/panel:text-lime"
              >

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDomain.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Heading level={3} variant="card-title" className="mb-4 text-lime font-space uppercase text-2xl tracking-tight">
                      {activeDomain.name}
                    </Heading>

                    <Text variant="body" className="text-text-muted text-sm md:text-base leading-relaxed mb-8">
                      {activeDomain.desc}
                    </Text>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeDomain.services.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => onOpenInquiry?.(service)}
                          className="group/item flex items-center justify-between p-4 border border-text/5 hover:border-lime/30 bg-text/[0.01] hover:bg-lime/[0.02] transition-all rounded-none text-left cursor-pointer outline-none overflow-visible relative"
                        >
                          <span className="font-mono text-[11px] text-text-muted group-hover/item:text-text transition-colors leading-relaxed pr-4">
                            {service}
                          </span>
                          <span className="text-text-subtle/50 group-hover/item:text-lime text-[9px] transition-colors shrink-0 font-mono tracking-widest uppercase">
                            + APPLY
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CorneredBox>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FAQ Section ── */}
      <Section id="services-faq" name="services-faq" showDivider spacing="generous">
        {faqSchemaJson && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchemaJson)}
          </script>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <div className="pill mb-6">
              <span className="font-mono text-[9px] uppercase tracking-wider">FAQ</span>
            </div>
            <Heading level={2} className="text-3xl md:text-4xl font-bold font-sans tracking-tight mb-4 text-text">
              Frequently Asked <span className="text-gradient">Questions</span>
            </Heading>
            <Text className="text-text-muted text-sm md:text-base leading-relaxed">
              Find answers to common questions about our custom optimization services, development process, and business systems integrations.
            </Text>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-4">
            <FaqAccordion items={faqs} variant="boxed" />
          </div>
        </div>
      </Section>

      {/* ── Bottom CTA ── */}
      <Section name="services-cta" showDivider spacing="generous">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <Heading level={2} variant="section-title" className="mb-4">
              {t("servicesPage.cta.title")}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Text variant="section-sub" className="mx-auto mb-10">
              {t("servicesPage.cta.sub")}
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton variant="primary" withBeam to="/estimate">
                {t("servicesPage.cta.estimate")}
              </MagneticButton>

              <MagneticButton variant="secondary" onClick={() => onOpenInquiry?.("General Inquiry")}>
                {t("servicesPage.cta.talk")}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Section>
    </div>
  );
};

export default ServicesPage;
