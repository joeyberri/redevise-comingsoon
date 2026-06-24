import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Calendar,
  MessageSquare,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import MagneticButton from "./MagneticButton.jsx";
import HeadlessCalendar from "./HeadlessCalendar.jsx";
import { Heading, Text } from "./Typography.jsx";
import { cn } from "../utils/cn";
import secretaryImg from "../assets/images/secretary.webp";
import { useLanguage } from "../utils/LanguageContext.jsx";

import PlusIcon from "./PlusIcon.jsx";

// ── Component ────────────────────────────────────────────────────────────────
const InquiryModal = ({ isOpen, onClose, initialType = "" }) => {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState(null); // 'book' | 'message'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
    message: "",
  });

  const getFriendlyErrorMessage = (error, context = "general") => {
    const msg = error?.message || "";
    
    if (msg.includes("Failed to fetch") || msg.includes("network") || msg.includes("NetworkError")) {
      return t('modal.errors.network');
    }
    
    if (context === "email") {
      if (msg.includes("RESEND_API_KEY") || msg.includes("misconfiguration")) {
        return t('modal.errors.emailKey');
      }
      if (msg.includes("delivery failed") || msg.includes("Resend")) {
        return t('modal.errors.emailFail');
      }
      return t('modal.errors.emailGeneral');
    }
    
    if (context === "booking") {
      if (msg.includes("slots") || msg.includes("availability") || msg.includes("401") || msg.includes("failed")) {
        return t('modal.errors.bookingSlots');
      }
      return t('modal.errors.bookingConfirm');
    }
    
    return t('modal.errors.general');
  };

  // Helper to map incoming initialType to active locale equivalent
  const getLocalizedInitialType = (type) => {
    if (!type) return "";
    // If it's one of the options in English/Spanish, return translated version
    const enInterests = [
      "Improve my website or digital presence",
      "Build a new product or platform",
      "Automate repetitive workflows",
      "Get better analytics & insights",
      "Set up church or ministry tech",
      "Just exploring my options"
    ];
    const esInterests = [
      "Mejorar mi sitio web o presencia digital",
      "Crear un nuevo producto o plataforma",
      "Automatizar flujos de trabajo repetitivos",
      "Obtener mejores análisis e información",
      "Configurar tecnología para iglesias o ministerios",
      "Solo explorando mis opciones"
    ];

    const idx = enInterests.indexOf(type);
    if (idx !== -1) {
      return t('modal.interests')[idx];
    }
    const idxEs = esInterests.indexOf(type);
    if (idxEs !== -1) {
      return t('modal.interests')[idxEs];
    }

    // Custom fallback mappings
    if (type === "Custom Engineering" || type === "Ingeniería Personalizada") {
      return locale === "es" ? "Ingeniería Personalizada" : "Custom Engineering";
    }
    if (type === "Church Infrastructure" || type === "Infraestructura de Iglesia") {
      return locale === "es" ? "Infraestructura de Iglesia" : "Church Infrastructure";
    }

    return type;
  };

  // Reset state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setChoice(null);
      setIsSubmitted(false);
      setSubmitError(null);
      setSelectedSlot(null);
      setIsBooking(false);
      setIsSubmitting(false);

      if (initialType) {
        const mappedType = getLocalizedInitialType(initialType);
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.includes(mappedType)
            ? prev.interests
            : [...prev.interests, mappedType],
        }));
      }

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialType, locale]);

  const [validationErrors, setValidationErrors] = useState({ name: "", email: "" });

  // ── Validation & Navigation ─────────────────────────────────────────────
  const validateStep1 = () => {
    const errors = { name: "", email: "" };
    let isValid = true;

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = t('modal.errors.validateName');
      isValid = false;
    } else if (trimmedName.length < 2) {
      errors.name = t('modal.errors.validateNameLen');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errors.email = t('modal.errors.validateEmail');
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = t('modal.errors.validateEmailInvalid');
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handleNameChange = (val) => {
    setFormData((prev) => ({ ...prev, name: val }));
    if (validationErrors.name) {
      setValidationErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (val) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (validationErrors.email) {
      setValidationErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleChoice = (selectedChoice) => {
    setChoice(selectedChoice);
    setSelectedSlot(null);
    setStep(4);
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // ── Email Submission (via Cloudflare Function) ──────────────────────────
  const handleSubmitMessage = async () => {
    if (!formData.message.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          interests: formData.interests,
          problem: formData.message,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || `Server error ${response.status}`);
      }

      setIsSubmitted(true);
      setTimeout(() => onClose(), 4000);
    } catch (err) {
      console.error("Email send error:", err);
      setSubmitError(getFriendlyErrorMessage(err, "email"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Cal.com Booking (headless) ──────────────────────────────────────────
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;
    setIsBooking(true);
    setSubmitError(null);

    try {
      const eventTypeId = import.meta.env.VITE_CAL_EVENT_TYPE_ID;

      const res = await fetch(`/cal-api/v2/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cal-api-version": "2026-02-25",
        },
        body: JSON.stringify({
          eventTypeId: Number(eventTypeId),
          start: selectedSlot.isoTime,
          attendee: {
            name: formData.name,
            email: formData.email,
            timeZone: "Africa/Lagos",
            language: locale,
          },
          metadata: {
            interests: formData.interests.join(", "),
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Booking failed. Please try again.");
      }

      setIsSubmitted(true);
      setTimeout(() => onClose(), 4000);
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitError(getFriendlyErrorMessage(err, "booking"));
    } finally {
      setIsBooking(false);
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-dark-50/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Wrapper for absolute positioning of Secretary relative to Modal */}
          <div className="relative w-full max-w-5xl flex items-center justify-center">

            {/* ── THE SECRETARY (Floating Person) ── */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
              className="absolute -left-12 md:-left-32 bottom-0 z-[210] pointer-events-none hidden lg:block"
            >
              <div className="relative group/secretary">
                {/* Secretary Image with Floating/Breathing Animation */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, -1, 0, 1, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative transition-transform duration-700 group-hover/secretary:scale-[1.02]"
                >
                  <img
                    src={secretaryImg}
                    alt="Assistant"
                    className="w-[420px] h-auto object-contain brightness-[0.95] contrast-[1.05]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    }}
                  />
                </motion.div>

                {/* Person "Status" Indicator - Positioned near shoulder */}
                <motion.div
                  initial={{ scale: 0, x: 20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 350 }}
                  className="absolute top-[28%] right-[15%] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 z-20"
                >
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime shadow-[0_0_10px_rgba(190,255,80,0.8)]"></span>
                  </div>
                  <div className="flex flex-col">
                    <Text variant="tiny" className="text-white font-bold uppercase tracking-widest text-[10px] leading-none mb-1">{t('common.liveAssistant')}</Text>
                    <Text variant="tiny" className="text-slate-300 text-[9px] leading-none">{t('common.readyToHelp')}</Text>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Modal Shell */}
            <motion.div
              initial={{ scale: 0.98, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.5 }}
              className="group/modal relative w-full rounded-none border border-text/[0.08] bg-dark-100/60 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col overflow-visible"
              style={{ maxHeight: "90vh" }}
            >
              {/* Plus Corner Markers */}
              <div className="absolute -top-[4px] -left-[4px] z-[220] pointer-events-none"><PlusIcon className="group-hover/modal:text-lime" /></div>
              <div className="absolute -top-[4px] -right-[4px] z-[220] pointer-events-none"><PlusIcon className="group-hover/modal:text-lime" /></div>
              <div className="absolute -bottom-[4px] -left-[4px] z-[220] pointer-events-none"><PlusIcon className="group-hover/modal:text-lime" /></div>
              <div className="absolute -bottom-[4px] -right-[4px] z-[220] pointer-events-none"><PlusIcon className="group-hover/modal:text-lime" /></div>

              {/* Inner layout container */}
              <div className="flex flex-col md:flex-row flex-1 min-h-[650px] overflow-hidden rounded-none">

                {/* ── Left Panel Spacer (for Secretary Image on Desktop) ── */}
                <div className="hidden lg:flex w-full lg:w-[320px] shrink-0 border-r border-text/[0.05] relative" />

                {/* ── Right Panel ── */}
                <div className="flex-1 flex flex-col min-h-0 relative bg-gradient-to-br from-transparent to-text/[0.02]">
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 text-text/40 hover:text-text transition-colors p-2 rounded-full hover:bg-text/5 cursor-pointer"
                  >
                    <X size={22} />
                  </button>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center flex-1 p-8 md:p-16 text-center space-y-6"
                      >
                        <div className="size-20 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center text-lime mb-4">
                          <Check size={40} />
                        </div>
                        <Heading level={2} className="text-4xl">
                          {choice === "book" ? t('modal.success.booked') : t('modal.success.sent')}
                        </Heading>
                        <Text className="text-text-subtle max-w-sm mx-auto">
                          {choice === "book"
                            ? t('modal.success.bookedSub')
                            : t('modal.success.sentSub')}
                        </Text>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={step}
                        initial={{ x: 8, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex-1 flex flex-col min-h-0"
                      >
                        {/* ── STEP 1: Who are you ── */}
                        {step === 1 && (
                          <div className="p-8 md:p-14 flex-1 flex flex-col justify-center space-y-10">
                            <div>
                              <Text variant="tiny" className="text-lime mb-3">
                                {t('common.step', { current: 1, total: 4 })}
                              </Text>
                              <Heading
                                level={2}
                                className="text-3xl md:text-5xl leading-tight mb-3"
                              >
                                {t('modal.steps.step1Title')}
                              </Heading>
                              <Text className="text-text-subtle text-lg">
                                {t('modal.steps.step1Sub')}
                              </Text>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <input
                                  type="text"
                                  placeholder={t('modal.steps.placeholderName')}
                                  className={cn(
                                    "w-full bg-transparent border-b-2 py-5 text-xl md:text-2xl outline-none transition-colors placeholder:text-text/10",
                                    validationErrors.name 
                                      ? "border-red-500/50 focus:border-red-500" 
                                      : "border-text/10 focus:border-lime"
                                  )}
                                  autoFocus
                                  value={formData.name}
                                  onChange={(e) => handleNameChange(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                                />
                                {validationErrors.name && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 dark:text-red-400 text-xs mt-2 flex items-center gap-1.5"
                                  >
                                    <AlertCircle size={12} />
                                    {validationErrors.name}
                                  </motion.p>
                                )}
                              </div>

                              <div>
                                <input
                                  type="email"
                                  placeholder={t('modal.steps.placeholderEmail')}
                                  className={cn(
                                    "w-full bg-transparent border-b-2 py-5 text-xl md:text-2xl outline-none transition-colors placeholder:text-text/10",
                                    validationErrors.email 
                                      ? "border-red-500/50 focus:border-red-500" 
                                      : "border-text/10 focus:border-lime"
                                  )}
                                  value={formData.email}
                                  onChange={(e) => handleEmailChange(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleNext()}
                                />
                                {validationErrors.email && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 dark:text-red-400 text-xs mt-2 flex items-center gap-1.5"
                                  >
                                    <AlertCircle size={12} />
                                    {validationErrors.email}
                                  </motion.p>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-end items-center pt-8">
                              <div className="flex items-center gap-6">
                                <Text variant="tiny" className="hidden sm:block text-text/20">
                                  {t('common.pressEnter')}
                                </Text>
                                <MagneticButton
                                  onClick={handleNext}
                                  variant="primary"
                                  className="px-10 py-4"
                                  disabled={!formData.name.trim() || !formData.email.trim()}
                                >
                                  {t('common.continue')}
                                </MagneticButton>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 2: Interests ── */}
                        {step === 2 && (
                          <div
                            data-lenis-prevent
                            className="p-8 md:p-14 flex-1 flex flex-col overflow-y-auto custom-scrollbar overscroll-contain"
                          >
                            <div className="mb-8">
                              <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group cursor-pointer"
                              >
                                <ArrowLeft
                                  size={14}
                                  className="group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-xs uppercase tracking-widest font-bold">
                                  {t('common.back')}
                                </span>
                              </button>
                              <Text variant="tiny" className="text-lime mb-3">
                                {t('common.step', { current: 2, total: 4 })}
                              </Text>
                              <Heading
                                level={2}
                                className="text-3xl md:text-5xl leading-tight mb-3"
                              >
                                {t('modal.steps.step2Title')}
                              </Heading>
                            </div>

                            <div className="flex flex-col gap-3 mb-8">
                              {t('modal.interests').map((interest) => {
                                const isSelected = formData.interests.includes(interest);
                                return (
                                  <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={cn(
                                      "px-5 py-4 rounded-none border text-left transition-all duration-200 flex items-center gap-4 cursor-pointer",
                                      isSelected
                                        ? "border-lime/40 bg-lime/5"
                                        : "border-text/10 hover:border-text/20 bg-text/[0.02]"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "size-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                        isSelected ? "border-lime bg-lime" : "border-text/20"
                                      )}
                                    >
                                      {isSelected && (
                                        <Check
                                          size={12}
                                          className="text-dark-100"
                                          strokeWidth={3}
                                        />
                                      )}
                                    </div>
                                    <span
                                      className={cn(
                                        "font-medium transition-colors",
                                        isSelected ? "text-text" : "text-text/60"
                                      )}
                                    >
                                      {interest}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-text/[0.05] mt-auto">
                              <button
                                onClick={() => setStep(3)}
                                className="text-text/30 hover:text-text transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                              >
                                {t('common.skipStep')}
                              </button>
                              <MagneticButton
                                onClick={() => setStep(3)}
                                variant="primary"
                                className="px-10 py-4"
                              >
                                {t('common.continue')}
                              </MagneticButton>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 3: Choose Path ── */}
                        {step === 3 && (
                          <div className="p-8 md:p-14 flex-1 flex flex-col justify-center space-y-10">
                            <div className="text-center mb-2">
                              <button
                                onClick={() => setStep(2)}
                                className="inline-flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group cursor-pointer"
                              >
                                <ArrowLeft
                                  size={14}
                                  className="group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-xs uppercase tracking-widest font-bold">
                                  {t('common.back')}
                                </span>
                              </button>
                              <Text variant="tiny" className="text-lime mb-3">
                                {t('common.step', { current: 3, total: 4 })}
                              </Text>
                              <Heading
                                level={2}
                                className="text-3xl md:text-5xl leading-tight mb-3"
                              >
                                {t('modal.steps.step3Title')}
                              </Heading>
                            </div>

                            <div className="flex flex-col md:flex-row gap-5 justify-center">
                              <button
                                onClick={() => handleChoice("book")}
                                className="flex-1 group/btn p-8 rounded-none border border-lime/20 bg-lime/5 hover:bg-lime/10 transition-all text-center flex flex-col items-center gap-4 cursor-pointer relative overflow-visible"
                              >
                                {/* Corner indicators */}
                                <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>

                                <div className="size-16 rounded-2xl bg-lime text-dark-100 flex items-center justify-center shadow-[0_0_30px_rgba(190,255,80,0.2)] group-hover/btn:scale-110 transition-transform">
                                  <Calendar size={30} />
                                </div>
                                <div>
                                  <div className="font-bold text-xl mb-1 text-text">
                                    {t('modal.steps.bookCall')}
                                  </div>
                                  <div className="text-sm text-text-muted">
                                    {t('modal.steps.bookCallSub')}
                                  </div>
                                </div>
                              </button>

                              <button
                                onClick={() => handleChoice("message")}
                                className="flex-1 group/btn p-8 rounded-none border border-text/10 bg-text/[0.02] hover:bg-text/[0.05] transition-all text-center flex flex-col items-center gap-4 cursor-pointer relative overflow-visible"
                              >
                                {/* Corner indicators */}
                                <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>
                                <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon className="group-hover/btn:text-lime" /></div>

                                <div className="size-16 rounded-2xl bg-text/10 text-text flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                  <MessageSquare size={30} />
                                </div>
                                <div>
                                  <div className="font-bold text-xl mb-1 text-text">
                                    {t('modal.steps.sendMessage')}
                                  </div>
                                  <div className="text-sm text-text-muted">
                                    {t('modal.steps.sendMessageSub')}
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 4a: Message ── */}
                        {step === 4 && choice === "message" && (
                          <div className="p-8 md:p-14 flex-1 flex flex-col">
                            <div className="mb-6">
                              <button
                                onClick={() => {
                                  setStep(3);
                                  setSubmitError(null);
                                }}
                                className="flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group cursor-pointer"
                              >
                                <ArrowLeft
                                  size={14}
                                  className="group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-xs uppercase tracking-widest font-bold">
                                  {t('common.back')}
                                </span>
                              </button>
                              <Text variant="tiny" className="text-lime mb-3">
                                {t('common.step', { current: 4, total: 4 })}
                              </Text>
                              <Heading
                                level={2}
                                className="text-3xl md:text-5xl leading-tight mb-3"
                              >
                                {t('modal.steps.step4Title')}
                              </Heading>
                            </div>

                            <div className="flex-1 flex flex-col min-h-0">
                              <textarea
                                data-lenis-prevent
                                placeholder={t('modal.steps.placeholderMsg')}
                                className="w-full flex-1 bg-transparent border-b-2 border-text/10 py-4 text-lg outline-none focus:border-lime transition-colors resize-none placeholder:text-text/10 min-h-[140px]"
                                autoFocus
                                value={formData.message}
                                onChange={(e) =>
                                  setFormData({ ...formData, message: e.target.value })
                                }
                              />
                              {submitError && (
                                <div className="flex items-center gap-2 mt-4 text-red-500 dark:text-red-400 text-sm">
                                  <AlertCircle size={14} />
                                  <span>{submitError}</span>
                                </div>
                              )}
                              <div className="mt-auto pt-8 flex justify-end">
                                <MagneticButton
                                  onClick={handleSubmitMessage}
                                  variant="primary"
                                  className={cn(
                                    "px-10 py-4",
                                    (isSubmitting || !formData.message.trim()) &&
                                    "opacity-50 pointer-events-none"
                                  )}
                                  disabled={isSubmitting || !formData.message.trim()}
                                  withBeam
                                >
                                  {isSubmitting ? t('common.sending') : t('common.sendMessage')}
                                </MagneticButton>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 4b: Book (Calendar) ── */}
                        {step === 4 && choice === "book" && (
                          <div className="flex-1 flex flex-col min-h-0">
                            <div className="px-6 md:px-10 py-6 border-b border-text/10 flex items-center justify-start gap-8 bg-dark-100/30 backdrop-blur-md shrink-0">
                              <div className="flex items-center gap-6">
                                <button
                                  onClick={() => {
                                    setStep(3);
                                    setSelectedSlot(null);
                                    setSubmitError(null);
                                  }}
                                  className="flex items-center gap-2 text-text/40 hover:text-text transition-colors group cursor-pointer"
                                >
                                  <ArrowLeft
                                    size={14}
                                    className="group-hover:-translate-x-1 transition-transform"
                                  />
                                  <span className="text-[10px] uppercase tracking-widest font-bold">
                                    {t('common.back')}
                                  </span>
                                </button>
                                <div className="w-px h-3 bg-text/10" />
                                <Text variant="tiny" className="text-lime uppercase tracking-widest">
                                  {t('common.step', { current: 4, total: 4 })}
                                </Text>
                              </div>
                            </div>

                            <div className="flex-1 overflow-hidden p-6 md:p-10">
                              <HeadlessCalendar
                                onSelectSlot={handleSlotSelect}
                                isBooking={isBooking}
                              />
                            </div>

                            <AnimatePresence>
                              {selectedSlot && (
                                <motion.div
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 20, opacity: 0 }}
                                  className="shrink-0 px-6 py-4 border-t border-text/10 bg-dark-100/80 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                >
                                  <div className="min-w-0">
                                    <Text variant="tiny" className="text-lime mb-0.5">
                                      {t('common.selected')}
                                    </Text>
                                    <div className="font-bold text-sm text-text truncate">
                                      {selectedSlot.date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                                        weekday: "short",
                                        month: "long",
                                        day: "numeric",
                                      })}{" "}
                                      at {selectedSlot.time}
                                    </div>
                                    {submitError && (
                                      <div className="flex items-center gap-1.5 mt-1 text-red-500 dark:text-red-400 text-xs">
                                        <AlertCircle size={12} />
                                        <span>{submitError}</span>
                                      </div>
                                    )}
                                  </div>
                                  <MagneticButton
                                    onClick={handleConfirmBooking}
                                    variant="primary"
                                    className={cn(
                                      "px-8 py-3 text-sm shrink-0",
                                      isBooking && "opacity-50 pointer-events-none"
                                    )}
                                    disabled={isBooking}
                                    withBeam
                                  >
                                    {isBooking ? t('common.booking') : t('common.confirmBooking')}
                                  </MagneticButton>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;