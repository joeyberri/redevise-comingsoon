import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X 
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

    const payload = {
      fullName: formData.fullName.trim(),
      businessName: formData.businessName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim() || "",
      promoPackage: "Redevise October Growth Package",
      promoPrice: "GH₵ 3,000",
      channel: "#october-growth",
      notes: "50% deposit to begin | GH₵600 early bird savings | Balance upon launch",
    };

    try {
      const response = await fetch("/api/promo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (_err) {
      setErrorMessage("Unable to submit registration directly. Please email us at team@redevise.com or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen pt-28 pb-20 bg-dark">
        <div className="container relative z-10 max-w-5xl">
          {/* Breadcrumb Navigation */}
          <FadeIn delay={0.05}>
            <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-dark-300 pb-5 mb-8">
              <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-subtle">
                <li>
                  <Link to="/" className="hover:text-lime transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li className="text-text-subtle/50">/</li>
                <li>
                  <Link to="/services" className="hover:text-lime transition-colors duration-200">
                    Services
                  </Link>
                </li>
                <li className="text-text-subtle/50">/</li>
                <li className="text-text font-medium" aria-current="page">
                  October Growth Package
                </li>
              </ol>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-subtle hover:text-lime transition-colors duration-200 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back
              </Link>
            </nav>
          </FadeIn>

          {/* Top Headline & Core Pitch */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <FadeIn delay={0.1}>
              <Pill className="mb-4">Special Promotion • October 2026</Pill>
              <Heading level={1} variant="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-space uppercase">
                October Growth Package
              </Heading>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg sm:text-xl font-bold font-space text-lime mb-3">
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
                    "whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer border",
                    idx === currentSlide
                      ? "bg-lime text-dark border-lime font-bold"
                      : "bg-dark-100 text-text-subtle border-dark-300 hover:border-dark-400 hover:text-text"
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
            <CorneredBox className="relative min-h-[520px] flex flex-col justify-between bg-dark-100 border border-dark-300 p-6 sm:p-10">
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
                      <span className="inline-flex items-center bg-dark-200 border border-dark-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-lime">
                        {slides[currentSlide].badge}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-text-subtle">
                        Slide {currentSlide + 1} of {slides.length}
                      </span>
                    </div>

                    {/* Slide Title & Subtitle */}
                    <Heading level={2} className="mt-3 text-2xl sm:text-3xl font-bold font-space uppercase text-text">
                      {slides[currentSlide].title}
                    </Heading>
                    <p className="mt-2 text-sm sm:text-base text-text-muted leading-relaxed">
                      {slides[currentSlide].subtitle}
                    </p>

                    {/* SLIDE 0: Overview & Pricing */}
                    {slides[currentSlide].isOverview && (
                      <div className="mt-6">
                        {/* Pricing Highlight Card */}
                        <div className="bg-dark-200 border border-dark-300 p-6 mb-6">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                            <div className="flex items-baseline text-text">
                              <span className="font-space text-xl font-bold text-lime mr-1.5 select-none">
                                GH₵
                              </span>
                              <span className="font-space text-3xl sm:text-5xl font-extrabold tracking-tight text-text">
                                3,000
                              </span>
                            </div>

                            <div className="flex items-baseline text-text-subtle line-through">
                              <span className="font-space text-xs font-semibold mr-1 select-none">
                                GH₵
                              </span>
                              <span className="font-space text-base sm:text-lg font-semibold tabular-nums">
                                3,600
                              </span>
                            </div>

                            <span className="inline-flex items-center bg-dark-100 border border-dark-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-lime">
                              Save GH₵ 600 (First 50 Businesses)
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-2 border-t border-dark-300 pt-3 text-xs text-text-subtle">
                            <Check className="size-4 text-lime shrink-0" />
                            <span>50% deposit to begin • Remaining balance paid upon successful launch</span>
                          </div>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-muted">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p className="leading-relaxed">
                              <strong className="font-bold text-text">Modern Business Website:</strong> Prospective clients view your services, photos, and tap to message on WhatsApp.
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p className="leading-relaxed">
                              <strong className="font-bold text-text">Google Search & Maps Setup:</strong> Your business name, phone number, and location appear prominently on Google.
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p className="leading-relaxed">
                              <strong className="font-bold text-text">Custom Web Address:</strong> Official domain (.com or .com.gh) registered directly in your company name.
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                            <p className="leading-relaxed">
                              <strong className="font-bold text-text">Professional Email Inboxes:</strong> Branded address (e.g. info@yourbusiness.com) for client quotes and banking.
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
                            className="bg-dark-200 border border-dark-300 p-6 transition-colors duration-200 hover:border-dark-400"
                          >
                            <h3 className="font-space text-base font-bold uppercase text-text mb-2 flex items-center gap-2">
                              <span className="size-1.5 bg-lime" />
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
                            className="flex items-start gap-4 bg-dark-200 border border-dark-300 p-6 transition-colors duration-200 hover:border-dark-400"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center bg-dark-100 border border-dark-300 font-space text-sm font-bold text-lime">
                              {step.num}
                            </span>
                            <div>
                              <h3 className="font-space text-base font-bold uppercase text-text">
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
              <div className="mt-8 flex flex-col items-stretch gap-4 border-t border-dark-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Navigation Buttons & Indicators */}
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    aria-label="Previous slide"
                    className="flex size-10 shrink-0 items-center justify-center border border-dark-300 bg-dark-200 text-text transition-colors hover:border-lime hover:text-lime disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
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
                            "h-2 transition-all duration-300 cursor-pointer",
                            i === currentSlide ? "w-6 bg-lime" : "w-2 bg-dark-300 hover:bg-dark-400"
                          )}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs font-semibold tabular-nums text-text-subtle">
                      0{currentSlide + 1} / 0{slides.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="flex size-10 shrink-0 items-center justify-center border border-dark-300 bg-dark-200 text-text transition-colors hover:border-lime hover:text-lime cursor-pointer"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={openClaimModal}
                  className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-400 px-7 py-3 font-space text-sm font-bold uppercase tracking-wide text-dark transition-colors duration-200 cursor-pointer"
                >
                  <span>Register Interest (GH₵ 600 Off)</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </CorneredBox>
          </div>

          {/* Bottom Callout Section */}
          <FadeIn delay={0.25}>
            <div className="mt-14 bg-dark-100 border border-dark-300 p-8 sm:p-12 text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <Heading level={2} variant="section-title" className="text-2xl sm:text-3xl font-space uppercase">
                  Ready to establish a stronger online presence for your business?
                </Heading>
                <Text className="text-sm sm:text-base text-text-muted leading-relaxed">
                  Join the 50 businesses upgrading their digital foundation this October. Pay 50% to begin, and only pay the balance once your website is live and verified on Google.
                </Text>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={openClaimModal}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-lime hover:bg-lime-400 px-8 py-3.5 font-space text-sm font-bold uppercase tracking-wide text-dark transition-colors cursor-pointer"
                  >
                    <span>Register Interest Now</span>
                    <ArrowRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(1)}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-dark-300 hover:border-dark-400 bg-dark-200 px-6 py-3.5 font-space text-sm font-medium uppercase tracking-wide text-text hover:text-lime transition-colors cursor-pointer"
                  >
                    <span>Explore All 3 Deliverables</span>
                  </button>
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
              className="fixed inset-0 bg-black/75"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-dark-100 border border-dark-300 p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeClaimModal}
                className="absolute right-5 top-5 flex size-8 items-center justify-center text-text-subtle hover:text-text transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              {/* Modal Content */}
              {!isSubmitted ? (
                <div>
                  <div className="pr-6">
                    <span className="text-xs text-lime uppercase tracking-wider font-bold font-space">
                      October Offer
                    </span>
                    <h3 className="font-space text-2xl font-bold uppercase text-text mt-1">
                      Register your interest
                    </h3>
                    <p className="mt-1 font-sans text-xs text-text-muted leading-relaxed">
                      Lock in your GH₵ 600 discount for the October Growth Package.
                    </p>

                    <div className="mt-3 flex items-center gap-2 bg-dark-200 border border-dark-300 px-3.5 py-2 text-xs font-medium text-text">
                      <Check className="size-4 shrink-0 text-lime" />
                      <span>
                        Pay <strong className="text-lime">GH₵ 3,000</strong> (GH₵ 600 off) • 50% deposit to begin
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mt-3 bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  {/* Form Fields */}
                  <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label htmlFor="promo-fullName" className="block text-xs font-medium text-text-muted mb-1.5">
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
                        className="w-full border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-businessName" className="block text-xs font-medium text-text-muted mb-1.5">
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
                        className="w-full border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-phoneNumber" className="block text-xs font-medium text-text-muted mb-1.5">
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
                        className="w-full border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="promo-email" className="block text-xs font-medium text-text-muted mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        id="promo-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. kwame@gmail.com"
                        className="w-full border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-text placeholder-text-subtle/50 focus:border-lime focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-400 py-3 font-space text-sm font-bold uppercase tracking-wide text-dark transition-colors disabled:opacity-60 cursor-pointer"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Lock in Discount Slot"}</span>
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center bg-lime/15 text-lime mb-4 border border-lime/30">
                    <Check className="size-7 stroke-[2.5]" />
                  </div>
                  <h4 className="font-space text-2xl font-bold uppercase text-text">
                    We received your details
                  </h4>
                  <p className="mt-2 font-sans text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.fullName}! Your discount slot is reserved. Our team will contact you via phone or email within 24 hours to get started.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={closeClaimModal}
                      className="inline-flex w-full items-center justify-center bg-lime hover:bg-lime-400 py-3 font-space text-sm font-bold uppercase tracking-wide text-dark transition-colors cursor-pointer"
                    >
                      Done
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
