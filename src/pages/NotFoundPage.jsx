import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Wrench, BookOpen, Calculator } from "lucide-react";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { useSEO } from "../utils/useSEO.js";

const NotFoundPage = ({ onOpenInquiry = () => {} }) => {
  useSEO({
    title: "Page Not Found (404) | Redevise",
    description: "The page you are looking for does not exist or has moved. Explore our custom software services, project estimator, or blog articles."
  });

  const helpfulLinks = [
    {
      to: "/services",
      icon: <Wrench className="size-5 text-lime" />,
      title: "Services & Capabilities",
      desc: "Custom web applications, mobile apps, and workflow automation."
    },
    {
      to: "/estimate",
      icon: <Calculator className="size-5 text-lime" />,
      title: "Project Estimator",
      desc: "Get an interactive ballpark cost for your software build."
    },
    {
      to: "/blog",
      icon: <BookOpen className="size-5 text-lime" />,
      title: "Engineering Blog",
      desc: "Read practical guides on automation, APIs, and systems design."
    },
    {
      to: "/gh",
      icon: <Compass className="size-5 text-lime" />,
      title: "Ghana & West Africa",
      desc: "Mobile Money integrations and local software engineering."
    }
  ];

  return (
    <Section name="not-found-page" spacing="generous" className="min-h-[75vh] flex items-center">
      <div className="container max-w-3xl text-center">
        <FadeIn>
          <Pill className="mb-6">Error 404</Pill>
          <Heading level={1} className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-4 text-text">
            We could not find that page
          </Heading>
          <Text className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The link you clicked may be broken, or the page may have been moved to a new home. Here are a few places to get back on track:
          </Text>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
            {helpfulLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="p-5 rounded-2xl bg-dark-100/60 border border-dark-400/20 hover:border-lime/30 transition-all duration-300 group block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-dark-200">
                    {item.icon}
                  </div>
                  <span className="font-sans font-semibold text-text group-hover:text-lime transition-colors">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-text-subtle leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-200 text-xs font-mono uppercase tracking-wider text-text hover:text-lime border border-dark-400/30 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Homepage
            </Link>
            <MagneticButton
              onClick={() => onOpenInquiry("General Inquiry")}
              variant="primary"
            >
              Contact Support
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default NotFoundPage;
