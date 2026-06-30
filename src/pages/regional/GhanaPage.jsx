import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { scroller } from "react-scroll";
import { ArrowRight } from "lucide-react";
import { DEFAULT_SCROLL_CONFIG } from "../../constants/index.jsx";
import Hero from "../../sections/Hero.jsx";
import Pillars from "../../sections/Pillars.jsx";
import Statement from "../../sections/Statement.jsx";
import Products from "../../sections/Products.jsx";
import Results from "../../sections/Results.jsx";
import Services from "../../sections/Services.jsx";
import Testimonial from "../../sections/Testimonial.jsx";
import Difference from "../../sections/Difference.jsx";
import About from "../../sections/About.jsx";
import CtaFooter from "../../sections/CtaFooter.jsx";
import Section from "../../components/Section.jsx";
import { Heading } from "../../components/Typography.jsx";
import Pill from "../../components/Pill.jsx";
import FadeIn from "../../components/FadeIn.jsx";
import { useSEO } from "../../utils/useSEO.js";
import { useLanguage } from "../../utils/LanguageContext.jsx";

const blogPosts = [
  {
    slug: "mobile-money-integration-ghana",
    title: "How to Build a Mobile Money Integration for Your Business in Ghana",
    tag: "Mobile Money"
  },
  {
    slug: "custom-software-development-accra",
    title: "Custom Software Development in Accra: What to Expect in 2025",
    tag: "Software Dev"
  },
  {
    slug: "business-automation-west-africa",
    title: "Automating Business Operations for West African SMEs",
    tag: "Automation"
  },
  {
    slug: "paystack-flutterwave-integration-guide",
    title: "Paystack vs Flutterwave: Which Payment Gateway for Your Ghanaian Business?",
    tag: "Payments"
  },
  {
    slug: "whatsapp-business-api-ghana",
    title: "WhatsApp Business API for Ghanaian Companies: A Practical Guide",
    tag: "WhatsApp"
  }
];

const GhanaPage = ({ onOpenInquiry }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setCurrency } = useLanguage();

  useSEO({
    title: "Software Development in Ghana & West Africa | Redevise Accra",
    description: "Custom software development, Mobile Money integrations, Paystack & Flutterwave setup, and workflow automation for businesses in Ghana and West Africa. Based in Accra.",
    canonicalPath: "/gh"
  });

  // Default to local currency (GHS) when visiting the regional page
  useEffect(() => {
    setCurrency("GHS");
  }, [setCurrency]);

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(state.scrollTo, DEFAULT_SCROLL_CONFIG);
        // Clear scroll state from history so subsequent refreshes start at the top
        navigate("/gh", { replace: true, state: {} });
      }, 100);
    }
  }, [state, navigate]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://redevise.com/gh#business",
    "name": "Redevise — Software Studio, Accra",
    "image": "https://redevise.com/redevise.png",
    "url": "https://redevise.com/gh",
    "telephone": "+233207932004",
    "priceRange": "GH₵₵",
    "description": "Custom software development, Mobile Money integrations, and workflow automation for businesses in Ghana and West Africa.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra",
      "addressCountry": "GH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.6037,
      "longitude": -0.1870
    },
    "areaServed": [
      { "@type": "Country", "name": "Ghana" },
      { "@type": "Country", "name": "Nigeria" },
      { "@type": "Place", "name": "West Africa" }
    ],
    "paymentAccepted": "Mobile Money, Bank Transfer, Credit Card",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": ["https://wa.me/233207932004"]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <Hero onOpenInquiry={onOpenInquiry} />
      <Pillars />
      <Statement />
      <Products />
      <Results />
      <Services onOpenInquiry={onOpenInquiry} />
      <Testimonial />
      <Difference />
      <About />
      
      {/* ════════════ REGIONAL INSIGHTS (Only on /gh) ════════════ */}
      <Section name="gh-insights" spacing="generous" className="border-t border-text/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <FadeIn>
              <Pill animated className="mb-6">Insights</Pill>
              <Heading level={2} variant="section-title">
                Resources for Ghanaian businesses
              </Heading>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post, idx) => (
              <FadeIn key={idx} delay={idx * 0.05} fullWidth>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-6 border border-text/[0.04] bg-text/[0.01] hover:border-text/[0.08] hover:bg-text/[0.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="hidden sm:block font-mono text-[9px] font-bold tracking-[0.15em] text-lime uppercase whitespace-nowrap bg-lime/10 px-3 py-1.5 border border-lime/20 rounded-sm">
                      {post.tag}
                    </span>
                    <h3 className="font-sans text-sm md:text-base font-medium text-text group-hover:text-lime transition-colors duration-300 truncate">
                      {post.title}
                    </h3>
                  </div>
                  <ArrowRight className="size-4 text-text-subtle group-hover:text-lime group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <CtaFooter onOpenInquiry={onOpenInquiry} />
    </>
  );
};

export default GhanaPage;
