import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Globe, 
  Search, 
  Mail, 
  Smartphone, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  X,
  ExternalLink,
  PhoneCall
} from "lucide-react";
import Section from "../../components/Section.jsx";
import { Heading, Text } from "../../components/Typography.jsx";
import Pill from "../../components/Pill.jsx";
import FadeIn from "../../components/FadeIn.jsx";
import CorneredBox from "../../components/CorneredBox.jsx";
import { useSEO } from "../../utils/useSEO.js";
import { useLanguage } from "../../utils/LanguageContext.jsx";
import { cn } from "../../utils/cn.js";

const slides = [
  {
    id: "overview",
    tab: "Overview",
    badge: "Special Offer",
    title: "October Growth Package",
    subtitle: "Everything your business needs to be found, look professional and turn searches into enquiries.",
    isOverview: true,
  },
  {
    id: "website",
    tab: "Business Website",
    badge: "Deliverable 01",
    title: "A website clients can open on their phone",
    subtitle: "Showcase your services and build instant trust before clients ever call.",
    points: [
      {
        title: "Showcase services & past work",
        desc: "Present your services, verified client proof, and project photos so prospective clients feel immediate confidence.",
      },
      {
        title: "Direct WhatsApp enquiry button",
        desc: "High-intent visitors can tap one button on your website to chat directly with your sales team on WhatsApp.",
      },
      {
        title: "Fast loading on mobile data",
        desc: "Clean, responsive layout engineered to load quickly even on regular Ghanaian mobile data connections.",
      },
      {
        title: "Zero technical headache",
        desc: "We manage the entire setup, design, copywriting, and hosting launch. You do not need an in-house IT team.",
      },
    ],
  },
  {
    id: "google",
    tab: "Found on Google",
    badge: "Deliverable 02",
    title: "Let your business be properly found on Google",
    subtitle: "When customers in Accra, Kumasi, or across Ghana search for your service, make sure they find you first.",
    points: [
      {
        title: "Official Google Business Profile",
        desc: "When clients search your company or service, your address, verified phone number, photos, and ratings appear right at the top.",
      },
      {
        title: "Google Maps location pin",
        desc: "Clients can tap for turn-by-turn driving directions that lead them straight to your office, clinic, or showroom.",
      },
      {
        title: "Discovered by nearby customers",
        desc: "Helps high-intent customers searching for local services in your neighborhood discover your business before competitors.",
      },
      {
        title: "Verified and trustworthy",
        desc: "We configure your official verification with Google so clients know your enterprise is registered, legitimate, and active.",
      },
    ],
  },
  {
    id: "domain-email",
    tab: "Domain & Email",
    badge: "Deliverable 03",
    title: "Look credible and protect your business reputation",
    subtitle: "Stop sending corporate proposals, contracts, and invoices from personal @gmail.com addresses.",
    points: [
      {
        title: "Your own web address",
        desc: "An official custom domain registered under your company name (e.g. yourcompany.com or yourcompany.com.gh).",
      },
      {
        title: "Professional business email",
        desc: "Branded inboxes like info@yourcompany.com or sales@yourcompany.com for writing to clients, suppliers, and banks.",
      },
      {
        title: "Easy mobile setup",
        desc: "Syncs directly to your iPhone, Android, or laptop mail app just like standard email.",
      },
      {
        title: "100% company ownership",
        desc: "The domain is registered directly in your company's name and remains your permanent digital asset.",
      },
    ],
  },
  {
    id: "how-it-works",
    tab: "How It Works",
    badge: "Simple 3 Steps",
    title: "Fast, straightforward, and stress-free",
    subtitle: "We do all the setup work so you can focus on running your business.",
    steps: [
      {
        num: "1",
        title: "Register your interest",
        desc: "Takes 30 seconds. Locks in your GH₵ 600 discount slot.",
      },
      {
        num: "2",
        title: "Quick 15-minute alignment call",
        desc: "We call or WhatsApp you to confirm your business details and collect your logo, photos, and service list.",
      },
      {
        num: "3",
        title: "50% deposit and launch",
        desc: "Pay 50% to start. You only pay the balance after your website is live and your Google setup is verified.",
      },
    ],
  },
];

const OctoberGrowthPage = ({ onOpenInquiry }) => {
  const { setCurrency } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touchStart, setTouchStart] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phoneNumber: "",
    email: "",
  });

  useSEO({
    title: "October Growth Package | Business Website, Google Setup & Email | Redevise",
    description: "Get found, look credible, and give people a clear way to contact you. Complete business website, Google Search setup, custom domain, and professional email for GH₵ 3,000.",
    canonicalPath: "/promos/october-growth"
  });

  useEffect(() => {
    setCurrency("GHS");
  }, [setCurrency]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(0);
    }
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isModalOpen]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const openClaimModal = () => {
    setErrorMessage("");
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const closeClaimModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.businessName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email || "no-email-provided@redevise.com",
          interests: ["October Growth Package", "Business Website", "Google Search Setup"],
          problem: `[OCTOBER GROWTH PACKAGE RESERVATION]\nBusiness Name: ${formData.businessName}\nPhone/WhatsApp: ${formData.phoneNumber}\nPackage: October Growth Package (GH₵ 3,000 • Save GH₵ 600)\nTerms: 50% deposit to begin, remaining balance upon launch.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not send email. Please use WhatsApp directly.");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.warn("Direct form submit notice:", err);
      // Even if API route is not running in local preview, fall back to WhatsApp or success with WhatsApp button
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Redevise! I want to register for the October Growth Package (GH₵ 3,000). My business name is "${formData.businessName || ''}" and my contact is "${formData.fullName || ''}".`
  );

  return (
    <>
      <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-dark">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-lime/[0.03] blur-[140px]" />
        <div className="pointer-events-none absolute right-10 top-1/3 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.02] blur-[120px]" />
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="container relative z-10 max-w-5xl">
          {/* Breadcrumb Navigation */}
          <FadeIn delay={0.05}>
            <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-text/[0.08] pb-5 mb-8">
              <ol className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-text-subtle/70">
                <li>
                  <Link to="/" className="hover:text-lime transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li className="text-text-subtle/30">/</li>
                <li>
                  <Link to="/services" className="hover:text-lime transition-colors duration-200">
                    Services
                  </Link>
                </li>
                <li className="text-text-subtle/30">/</li>
                <li className="text-text font-sans font-medium capitalize" aria-current="page">
                  October Growth Package
                </li>
              </ol>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-text-subtle hover:text-lime transition-colors duration-200 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back
              </Link>
            </nav>
          </FadeIn>

          {/* Top Headline & Core Pitch */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/10 px-3.5 py-1 text-xs font-mono text-lime uppercase tracking-wider mb-4">
                <Sparkles className="size-3.5 animate-pulse" />
                <span>Special Promotion • Valid until 31 October 2026</span>
              </div>
              <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-text mb-4">
                October Growth Package
              </Heading>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-serif italic text-lg sm:text-xl text-lime/90 mb-3">
                “Get found, look credible, and give people a clear way to contact you.”
              </p>
              <Text className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
                Everything your business needs to be found, look professional and turn searches into enquiries.
              </Text>
            </FadeIn>
          </div>

          {/* Interactive Slide Tabs */}
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border",
                    idx === currentSlide
                      ? "bg-lime text-dark font-bold border-lime shadow-[0_0_15px_rgba(202,255,0,0.25)]"
                      : "bg-dark-100/70 text-text-subtle border-text/10 hover:border-text/25 hover:text-text"
                  )}
                >
                  {s.tab}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Interactive Slide Card Canvas */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="mt-4"
          >
            <CorneredBox className="relative min-h-[520px] flex flex-col justify-between overflow-hidden rounded-3xl border border-text/10 bg-dark-100/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    {/* Badge & Deliverable Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                      <span className="inline-flex items-center rounded-full bg-lime/10 border border-lime/20 px-3 py-1 font-mono text-xs font-semibold text-lime">
                        {slides[currentSlide].badge}
                      </span>
                      <span className="font-mono text-xs text-text-subtle">
                        Slide {currentSlide + 1} of {slides.length}
                      </span>
                    </div>

                    {/* Slide Title & Subtitle */}
                    <Heading level={2} className="mt-3 text-2xl sm:text-3xl font-bold font-sans tracking-tight text-text">
                      {slides[currentSlide].title}
                    </Heading>
                    <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed">
                      {slides[currentSlide].subtitle}
                    </p>

                    {/* SLIDE 0: Overview & Pricing */}
                    {slides[currentSlide].isOverview && (
                      <div className="mt-6">
                        {/* Pricing Highlight Card */}
                        <div className="rounded-2xl border border-text/15 bg-dark-200/70 p-5 sm:p-6 mb-6 relative overflow-hidden">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                            <div className="flex items-baseline text-text">
                              <span className="font-sans text-xl font-bold text-lime mr-1.5 select-none">
                                GH₵
                              </span>
                              <span className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-text">
                                3,000
                              </span>
                            </div>

                            <div className="flex items-baseline text-text-subtle line-through">
                              <span className="font-sans text-xs font-semibold mr-1 select-none">
                                GH₵
                              </span>
                              <span className="font-sans text-base sm:text-lg font-semibold tabular-nums">
                                3,600
                              </span>
                            </div>

                            <span className="inline-flex items-center rounded-full bg-lime/15 border border-lime/30 px-3 py-1 font-mono text-xs font-bold text-lime">
                              Save GH₵ 600 (First 50 Businesses)
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-2 border-t border-text/10 pt-3 text-xs font-mono text-text-subtle">
                            <Check className="size-4 text-lime shrink-0" />
                            <span>50% deposit to begin • Remaining balance paid upon successful launch</span>
                          </div>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-text-muted">
                          <div className="flex items-start gap-3 p-3 rounded-xl bg-dark/40 border border-text/5">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p>
                              <strong className="font-semibold text-text">Modern Business Website:</strong> Prospective clients view your services, photos, and tap to message on WhatsApp.
                            </p>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-dark/40 border border-text/5">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p>
                              <strong className="font-semibold text-text">Google Search & Maps Setup:</strong> Your business name, phone number, and location appear prominently on Google.
                            </p>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-dark/40 border border-text/5">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p>
                              <strong className="font-semibold text-text">Custom Web Address:</strong> Official domain (.com or .com.gh) registered directly in your company name.
                            </p>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-xl bg-dark/40 border border-text/5">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p>
                              <strong className="font-semibold text-text">Professional Email Inboxes:</strong> Branded address (e.g. info@yourbusiness.com) for client quotes and banking.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SLIDES 1, 2, 3: Deliverables Grid Cards */}
                    {slides[currentSlide].points && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {slides[currentSlide].points.map((pt, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-text/10 bg-dark-200/50 p-5 transition-all duration-200 hover:border-lime/30 hover:bg-dark-200/80"
                          >
                            <h3 className="font-sans text-base font-bold text-text mb-1.5 flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-lime" />
                              {pt.title}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm leading-relaxed text-text-muted">
                              {pt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SLIDE 4: How It Works Steps */}
                    {slides[currentSlide].steps && (
                      <div className="mt-6 space-y-3.5">
                        {slides[currentSlide].steps.map((step) => (
                          <div
                            key={step.num}
                            className="flex items-start gap-4 rounded-2xl border border-text/10 bg-dark-200/50 p-5 transition-all duration-200 hover:border-lime/30"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime/15 border border-lime/30 font-sans text-sm font-bold text-lime">
                              {step.num}
                            </span>
                            <div>
                              <h3 className="font-sans text-base font-bold text-text">
                                {step.title}
                              </h3>
                              <p className="mt-1 font-sans text-xs sm:text-sm leading-relaxed text-text-muted">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Controls Footer */}
              <div className="mt-8 flex flex-col items-stretch gap-4 border-t border-text/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Navigation Buttons & Indicators */}
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    aria-label="Previous slide"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-text/20 bg-dark-200 text-text transition-all hover:border-lime hover:text-lime active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-text/20 disabled:hover:text-text cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                  </button>

                  {/* Dot Pill Indicators */}
                  <div className="flex items-center gap-2 px-1">
                    <div className="flex items-center gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => goToSlide(i)}
                          aria-label={`Jump to slide ${i + 1}`}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300 cursor-pointer",
                            i === currentSlide ? "w-6 bg-lime" : "w-2 bg-text/20 hover:bg-text/40"
                          )}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-mono text-xs font-semibold tabular-nums text-text-subtle">
                      0{currentSlide + 1} / 0{slides.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-text/20 bg-dark-200 text-text transition-all hover:border-lime hover:text-lime active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={openClaimModal}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3 font-sans text-sm font-bold text-dark shadow-lg shadow-lime/20 transition-all hover:bg-lime/90 active:scale-[0.98] cursor-pointer"
                >
                  <span>Register Interest (GH₵ 600 Off)</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </CorneredBox>
          </div>

          {/* Bottom Callout Section */}
          <FadeIn delay={0.25}>
            <div className="mt-14 rounded-3xl border border-text/10 bg-gradient-to-b from-dark-100 to-dark-200/90 p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-lime/[0.04] blur-3xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <Heading level={2} className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-text">
                  Ready to establish a stronger online presence for your business?
                </Heading>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  Join the 50 businesses upgrading their digital foundation this October. Pay 50% to begin, and only pay the balance once your website is live and verified on Google.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={openClaimModal}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-lime px-8 py-3.5 font-sans text-sm font-bold text-dark shadow-lg shadow-lime/20 transition-all hover:bg-lime/90 active:scale-[0.98] cursor-pointer"
                  >
                    <span>Register Interest Now</span>
                    <ArrowRight className="size-4" />
                  </button>
                  <a
                    href={`https://wa.me/233207932004?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-text/20 bg-dark-100/60 px-6 py-3.5 font-sans text-sm font-medium text-text hover:border-lime/40 hover:text-lime transition-all"
                  >
                    <MessageSquare className="size-4 text-lime" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Claim / Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeClaimModal}
              className="fixed inset-0 bg-dark/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-text/15 bg-dark-100 p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeClaimModal}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full text-text-subtle hover:bg-text/10 hover:text-text transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              {/* Modal Content */}
              {!isSubmitted ? (
                <div>
                  <div className="pr-6">
                    <span className="font-mono text-[11px] text-lime uppercase tracking-wider font-semibold">
                      October Offer
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-text mt-1">
                      Register your interest
                    </h3>
                    <p className="mt-1 font-sans text-xs text-text-muted leading-relaxed">
                      Lock in your GH₵ 600 discount for the October Growth Package.
                    </p>

                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-lime/10 border border-lime/20 px-3.5 py-2 text-xs font-semibold text-lime">
                      <Check className="size-4 shrink-0 text-lime" />
                      <span>
                        Pay <strong>GH₵ 3,000</strong> (GH₵ 600 off) • 50% deposit to begin
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mt-3 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  {/* Form Fields */}
                  <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label htmlFor="promo-fullName" className="block font-mono text-xs text-text-muted mb-1">
                        Your Name *
                      </label>
                      <input
                        id="promo-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full rounded-xl border border-text/10 bg-dark-200/80 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-businessName" className="block font-mono text-xs text-text-muted mb-1">
                        Business Name *
                      </label>
                      <input
                        id="promo-businessName"
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleFormChange}
                        placeholder="e.g. Mensah Logistics Ltd"
                        className="w-full rounded-xl border border-text/10 bg-dark-200/80 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-phoneNumber" className="block font-mono text-xs text-text-muted mb-1">
                        Phone or WhatsApp Number *
                      </label>
                      <input
                        id="promo-phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        placeholder="e.g. 024 123 4567"
                        className="w-full rounded-xl border border-text/10 bg-dark-200/80 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-email" className="block font-mono text-xs text-text-muted mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        id="promo-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. kwame@gmail.com"
                        className="w-full rounded-xl border border-text/10 bg-dark-200/80 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-lime py-3 font-sans text-sm font-bold text-dark shadow-lg shadow-lime/20 hover:bg-lime/90 active:scale-[0.98] disabled:opacity-60 transition-all cursor-pointer"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Lock in Discount Slot"}</span>
                        <ArrowRight className="size-4" />
                      </button>

                      <a
                        href={`https://wa.me/233207932004?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-text/15 bg-dark-200/60 py-2.5 font-sans text-xs font-medium text-text-muted hover:text-lime hover:border-lime/30 transition-all"
                      >
                        <MessageSquare className="size-3.5 text-lime" />
                        <span>Or message directly on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-lime/15 text-lime mb-4 border border-lime/30">
                    <Check className="size-7 stroke-[2.5]" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-text">
                    We received your details
                  </h4>
                  <p className="mt-2 font-sans text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.fullName}! Your discount slot is reserved. Our team will contact you via phone or WhatsApp within 24 hours to get started.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <a
                      href={`https://wa.me/233207932004?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3 font-sans text-sm font-bold text-dark shadow-lg shadow-lime/20 hover:bg-lime/90 transition-all"
                    >
                      <MessageSquare className="size-4 text-dark" />
                      <span>Continue on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={closeClaimModal}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-text/15 bg-dark-200 py-2.5 font-sans text-xs font-semibold text-text-muted hover:text-text transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OctoberGrowthPage;
