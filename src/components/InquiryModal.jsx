import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Calendar,
  MessageSquare,
  ArrowLeft,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import MagneticButton from "./MagneticButton.jsx";
import HeadlessCalendar from "./HeadlessCalendar.jsx";
import { Heading, Text } from "./Typography.jsx";
import { cn } from "../utils/cn";

// ── Interest Options ─────────────────────────────────────────────────────────
const interestOptions = [
  "Improve my website or digital presence",
  "Build a new product or platform",
  "Automate repetitive workflows",
  "Get better analytics & insights",
  "Set up church or ministry tech",
  "Just exploring my options",
];

// ── Component ────────────────────────────────────────────────────────────────
const InquiryModal = ({ isOpen, onClose, initialType = "" }) => {
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

      // Pre-select the interest if an initialType was passed
      if (initialType) {
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.includes(initialType)
            ? prev.interests
            : [...prev.interests, initialType],
        }));
      }

      // Lock scroll on both body and html to ensure background stays fixed
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen, initialType]);

  // ── Navigation ──────────────────────────────────────────────────────────
  const handleNext = () => {
    if (step === 1 && formData.name && formData.email) setStep(2);
  };

  const handleChoice = (selectedChoice) => {
    setChoice(selectedChoice);
    setSelectedSlot(null);
    setStep(4);
  };

  // Toggle an interest on/off
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
      setSubmitError(err.message || "Something went wrong. Please try again.");
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
      const apiKey = import.meta.env.VITE_CAL_API_KEY;
      const eventTypeId = import.meta.env.VITE_CAL_EVENT_TYPE_ID;

      const res = await fetch(`/cal-api/v2/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "cal-api-version": "2026-02-25",
        },
        body: JSON.stringify({
          eventTypeId: Number(eventTypeId),
          start: selectedSlot.isoTime,
          attendee: {
            name: formData.name,
            email: formData.email,
            timeZone: "Africa/Lagos",
            language: "en",
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
      setSubmitError(err.message || "Couldn't complete the booking.");
    } finally {
      setIsBooking(false);
    }
  };

  // ── Left-panel copy per step ────────────────────────────────────────────
  const getLeftPanelCopy = () => {
    if (isSubmitted && choice === "book") {
      return {
        title: <>You're<br />Booked.</>,
        sub: "Check your inbox for the confirmation details.",
      };
    }
    if (isSubmitted) {
      return {
        title: <>Message<br />Sent.</>,
        sub: "We've received your note and will be in touch soon.",
      };
    }
    if (step === 4 && choice === "book") {
      return {
        title: <>Pick a<br />Time.</>,
        sub: "Choose a time that works for you — we'll handle the rest.",
      };
    }
    if (step === 4 && choice === "message") {
      return {
        title: <>Almost<br />There.</>,
        sub: "Share what's on your mind and we'll get back to you.",
      };
    }
    return {
      title: <>Get in<br />Touch.</>,
      sub: "We'd love to learn about your project and find the best way to help.",
    };
  };

  const panelCopy = getLeftPanelCopy();

  // ── Render ──────────────────────────────────────────────────────────────
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
            className="absolute inset-0 bg-dark-50/40 backdrop-blur-3xl"
            onClick={onClose}
          />

          {/* Modal Shell */}
          <motion.div
            initial={{ scale: 0.98, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.5 }}
            className="relative w-full max-w-5xl rounded-[2.5rem] border border-text/[0.08] bg-dark-100/60 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col overflow-hidden"
            style={{ maxHeight: "90vh" }}
          >
            {/* Inner layout */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden" style={{ minHeight: "580px" }}>
              {/* ── Left Panel ── */}
              <div className="hidden md:flex w-full md:w-[300px] shrink-0 bg-text/[0.03] p-10 flex-col justify-between border-r border-text/[0.05] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="size-14 rounded-2xl bg-lime flex items-center justify-center mb-10 text-dark-100 shadow-[0_0_30px_rgba(190,255,80,0.3)]">
                    {isSubmitted ? (
                      <Check size={28} strokeWidth={3} />
                    ) : (
                      <Sparkles size={26} />
                    )}
                  </div>
                  <Heading level={3} className="mb-4 text-3xl">
                    {panelCopy.title}
                  </Heading>
                  <Text variant="small" className="text-text-subtle">
                    {panelCopy.sub}
                  </Text>
                </div>

                {/* Step dots */}
                <div className="relative z-10 flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={cn(
                        "h-1 rounded-full transition-all duration-700 ease-out",
                        step >= s
                          ? "w-10 bg-lime shadow-[0_0_10px_rgba(190,255,80,0.5)]"
                          : "w-4 bg-text/10"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* ── Right Panel ── */}
              <div className="flex-1 flex flex-col min-h-0 relative bg-gradient-to-br from-transparent to-text/[0.02]">
                {/* Close Button - Moved inside Right Panel for better integration */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-50 text-text/40 hover:text-text transition-colors p-2 rounded-full hover:bg-text/5"
                >
                  <X size={22} />
                </button>
                <AnimatePresence mode="wait">
                  {/* ── SUCCESS STATE ── */}
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
                        {choice === "book" ? (
                          <>You're Booked!</>
                        ) : (
                          <>Message Sent!</>
                        )}
                      </Heading>
                      <Text className="text-text-subtle max-w-sm mx-auto">
                        {choice === "book"
                          ? "You'll receive a confirmation email shortly. Looking forward to speaking with you!"
                          : "We've got your message and will get back to you as soon as possible."}
                      </Text>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      initial={{ x: 20, opacity: 0, filter: "blur(10px)" }}
                      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ x: -20, opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="flex-1 flex flex-col min-h-0"
                    >
                      {/* ── STEP 1: Who are you ── */}
                      {step === 1 && (
                        <div className="p-8 md:p-14 flex-1 flex flex-col justify-center space-y-10">
                          <div>
                            <Text variant="tiny" className="text-lime mb-3">
                              Step 1 of 4
                            </Text>
                            <Heading
                              level={2}
                              className="text-3xl md:text-5xl leading-tight mb-3"
                            >
                              Let's start with you.
                            </Heading>
                            <Text className="text-text-subtle text-lg">
                              Who should we be reaching out to?
                            </Text>
                          </div>

                          <div className="space-y-6">
                            <input
                              type="text"
                              placeholder="Your name or organization"
                              className="w-full bg-transparent border-b-2 border-text/10 py-5 text-xl md:text-2xl outline-none focus:border-lime transition-colors placeholder:text-text/10"
                              autoFocus
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                            <input
                              type="email"
                              placeholder="Your email address"
                              className="w-full bg-transparent border-b-2 border-text/10 py-5 text-xl md:text-2xl outline-none focus:border-lime transition-colors placeholder:text-text/10"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                          </div>

                          <div className="flex justify-end items-center pt-8 border-t border-text/[0.05]">
                            <div className="flex items-center gap-6">
                              <Text variant="tiny" className="hidden sm:block text-text/20">
                                Press Enter ↵
                              </Text>
                              <MagneticButton
                                onClick={handleNext}
                                variant="primary"
                                className="px-10 py-4"
                                disabled={!formData.name || !formData.email}
                              >
                                Continue
                              </MagneticButton>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── STEP 2: Interests (multi-select + skip) ── */}
                      {step === 2 && (
                        <div 
                          data-lenis-prevent
                          className="p-8 md:p-14 flex-1 flex flex-col overflow-y-auto custom-scrollbar overscroll-contain"
                        >
                          <div className="mb-8">
                            <button
                              onClick={() => setStep(1)}
                              className="flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group"
                            >
                              <ArrowLeft
                                size={14}
                                className="group-hover:-translate-x-1 transition-transform"
                              />
                              <span className="text-xs uppercase tracking-widest font-bold">
                                Back
                              </span>
                            </button>
                            <Text variant="tiny" className="text-lime mb-3">
                              Step 2 of 4
                            </Text>
                            <Heading
                              level={2}
                              className="text-3xl md:text-5xl leading-tight mb-3"
                            >
                              What brings you here?
                            </Heading>
                            <Text className="text-text-subtle text-lg">
                              Select everything that applies — or skip if you're not sure yet.
                            </Text>
                          </div>

                          <div className="flex flex-col gap-3 mb-8">
                            {interestOptions.map((interest) => {
                              const isSelected = formData.interests.includes(interest);
                              return (
                                <button
                                  key={interest}
                                  onClick={() => toggleInterest(interest)}
                                  className={cn(
                                    "px-5 py-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-4",
                                    isSelected
                                      ? "border-lime/40 bg-lime/5"
                                      : "border-text/10 hover:border-text/20 bg-text/[0.02]"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "size-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                      isSelected
                                        ? "border-lime bg-lime"
                                        : "border-text/20"
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
                              className="text-text/30 hover:text-text transition-colors text-xs font-bold uppercase tracking-widest"
                            >
                              Skip this step →
                            </button>
                            <MagneticButton
                              onClick={() => setStep(3)}
                              variant="primary"
                              className="px-10 py-4"
                            >
                              Continue
                            </MagneticButton>
                          </div>
                        </div>
                      )}

                      {/* ── STEP 3: Choose path ── */}
                      {step === 3 && (
                        <div className="p-8 md:p-14 flex-1 flex flex-col justify-center space-y-10">
                          <div className="text-center mb-2">
                            <button
                              onClick={() => setStep(2)}
                              className="inline-flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group"
                            >
                              <ArrowLeft
                                size={14}
                                className="group-hover:-translate-x-1 transition-transform"
                              />
                              <span className="text-xs uppercase tracking-widest font-bold">
                                Back
                              </span>
                            </button>
                            <Text variant="tiny" className="text-lime mb-3">
                              Step 3 of 4
                            </Text>
                            <Heading
                              level={2}
                              className="text-3xl md:text-5xl leading-tight mb-3"
                            >
                              How would you like to connect?
                            </Heading>
                            <Text className="text-text-subtle text-lg">
                              Choose whichever works best for you.
                            </Text>
                          </div>

                          <div className="flex flex-col md:flex-row gap-5 justify-center">
                            <button
                              onClick={() => handleChoice("book")}
                              className="flex-1 group/btn p-8 rounded-[2rem] border border-lime/20 bg-lime/5 hover:bg-lime/10 transition-all text-center flex flex-col items-center gap-4"
                            >
                              <div className="size-16 rounded-2xl bg-lime text-dark-100 flex items-center justify-center shadow-[0_0_30px_rgba(190,255,80,0.2)] group-hover/btn:scale-110 transition-transform">
                                <Calendar size={30} />
                              </div>
                              <div>
                                <div className="font-bold text-xl mb-1 text-text">
                                  Book a Call
                                </div>
                                <div className="text-sm text-text-muted">
                                  Pick a time · 15–30 min chat
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={() => handleChoice("message")}
                              className="flex-1 group/btn p-8 rounded-[2rem] border border-text/10 bg-text/[0.02] hover:bg-text/[0.05] transition-all text-center flex flex-col items-center gap-4"
                            >
                              <div className="size-16 rounded-2xl bg-text/10 text-text flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                <MessageSquare size={30} />
                              </div>
                              <div>
                                <div className="font-bold text-xl mb-1 text-text">
                                  Send a Message
                                </div>
                                <div className="text-sm text-text-muted">
                                  We'll reply to your email
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
                              className="flex items-center gap-2 text-text/40 hover:text-text mb-5 transition-colors group"
                            >
                              <ArrowLeft
                                size={14}
                                className="group-hover:-translate-x-1 transition-transform"
                              />
                              <span className="text-xs uppercase tracking-widest font-bold">
                                Back
                              </span>
                            </button>
                            <Text variant="tiny" className="text-lime mb-3">
                              Step 4 of 4
                            </Text>
                            <Heading
                              level={2}
                              className="text-3xl md:text-5xl leading-tight mb-3"
                            >
                              Tell us a bit more.
                            </Heading>
                            <Text className="text-text-subtle text-lg">
                              What problem are you trying to solve? The more
                              detail, the better we can help.
                            </Text>
                          </div>

                          <div className="flex-1 flex flex-col min-h-0">
                            <textarea
                              data-lenis-prevent
                              placeholder="What's on your mind..."
                              className="w-full flex-1 bg-transparent border-b-2 border-text/10 py-4 text-lg outline-none focus:border-lime transition-colors resize-none placeholder:text-text/10 min-h-[140px]"
                              autoFocus
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                            />
                            {submitError && (
                              <div className="flex items-center gap-2 mt-4 text-red-400 text-sm">
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
                                {isSubmitting ? "Sending..." : "Send Message"}
                              </MagneticButton>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── STEP 4b: Book — Headless Calendar ── */}
                      {step === 4 && choice === "book" && (
                        <div className="flex-1 flex flex-col min-h-0">
                          {/* Toolbar */}
                          <div className="px-6 md:px-10 py-6 border-b border-text/10 flex items-center justify-start gap-8 bg-dark-100/30 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-6">
                              <button
                                onClick={() => {
                                  setStep(3);
                                  setSelectedSlot(null);
                                  setSubmitError(null);
                                }}
                                className="flex items-center gap-2 text-text/40 hover:text-text transition-colors group"
                              >
                                <ArrowLeft
                                  size={14}
                                  className="group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-[10px] uppercase tracking-widest font-bold">
                                  Back
                                </span>
                              </button>
                              <div className="w-px h-3 bg-text/10" />
                              <Text variant="tiny" className="text-lime uppercase tracking-widest">
                                Step 4 of 4
                              </Text>
                            </div>
                          </div>

                          {/* Calendar - No longer scrolls here, scrolling is handled inside the component */}
                          <div className="flex-1 overflow-hidden p-6 md:p-10">
                            <HeadlessCalendar
                              onSelectSlot={handleSlotSelect}
                              isBooking={isBooking}
                            />
                          </div>

                          {/* Confirm bar — pinned to bottom when a slot is selected */}
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
                                    Selected
                                  </Text>
                                  <div className="font-bold text-sm text-text truncate">
                                    {selectedSlot.date.toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "long",
                                      day: "numeric",
                                    })}{" "}
                                    at {selectedSlot.time}
                                  </div>
                                  {submitError && (
                                    <div className="flex items-center gap-1.5 mt-1 text-red-400 text-xs">
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
                                  {isBooking ? "Booking..." : "Confirm Booking"}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
