import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { cn } from "../utils/cn";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import { Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import PlusIcon from "../components/PlusIcon.jsx";

const CareersPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "about" }); // Fallback SEO keys or generic

  const roles = t("careers.roles") || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    portfolio: "",
    resume: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = t("careers.errors.validateName");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = t("careers.errors.validateEmail");
    }

    if (!formData.role) errors.role = t("careers.errors.validateRole");
    
    if (!formData.resume.trim() || !formData.resume.startsWith("http")) {
      errors.resume = t("careers.errors.validateResume");
    }

    if (!formData.message.trim()) {
      errors.message = "Please tell us about what you've built";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/send-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Server error");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Careers submission error:", err);
      setSubmitError(t("careers.errors.submitFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      {/* Hero */}
      <Section name="careers-hero" className="pb-8" spacing="tight">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <Pill animated className="mb-6">
              CAREERS
            </Pill>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Heading level={1} variant="hero-title" className="mb-6">
              {t("careers.heroTitle")}
            </Heading>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Text variant="hero-sub" className="mx-auto max-w-2xl">
              {t("careers.heroSub")}
            </Text>
          </FadeIn>
        </div>
      </Section>

      {/* Form Section */}
      <Section name="careers-form" spacing="tight">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="group relative border border-text/[0.08] bg-dark-100/60 p-12 text-center overflow-visible"
              >
                {/* Plus Corner Markers */}
                <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>

                <div className="size-20 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center text-lime mx-auto mb-8 shadow-[0_0_30px_rgba(190,255,80,0.1)] animate-pulse">
                  <Check size={40} />
                </div>
                <Heading level={2} className="text-3xl mb-4">
                  {t("careers.success.title")}
                </Heading>
                <Text className="text-text-subtle max-w-md mx-auto mb-10">
                  {t("careers.success.sub")}
                </Text>
                <Link to="/">
                  <MagneticButton variant="primary" className="px-10 py-4">
                    {t("careers.common.backHome")}
                  </MagneticButton>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group relative border border-text/[0.08] bg-dark-100/60 p-8 md:p-12 overflow-visible"
              >
                {/* Plus Corner Markers */}
                <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
                <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>

                <div className="mb-10">
                  <Heading level={2} variant="card-title" className="mb-2">
                    {t("careers.sectionTitle")}
                  </Heading>
                  <Text variant="small" className="text-text-muted">
                    {t("careers.sectionSub")}
                  </Text>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.name")} <span className="text-lime">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("careers.placeholders.name")}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={cn(
                        "w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 text-text",
                        validationErrors.name && "border-red-500/50 focus:border-red-500"
                      )}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.email")} <span className="text-lime">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t("careers.placeholders.email")}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={cn(
                        "w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 text-text",
                        validationErrors.email && "border-red-500/50 focus:border-red-500"
                      )}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Role Selector Grid */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.role")} <span className="text-lime">*</span>
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {roles.map((role) => {
                        const isSelected = formData.role === role;
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => handleInputChange("role", role)}
                            className={cn(
                              "px-5 py-4 border text-left rounded-none transition-all duration-200 text-xs uppercase tracking-wider font-mono flex items-center justify-between cursor-pointer",
                              isSelected
                                ? "border-lime/40 bg-lime/[0.04] text-text"
                                : "border-text/10 hover:border-text/20 bg-text/[0.01] text-text-subtle"
                            )}
                          >
                            <span>{role}</span>
                            {isSelected && <Check size={14} className="text-lime shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    {validationErrors.role && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.role}
                      </p>
                    )}
                  </div>

                  {/* Resume Link */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.resume")} <span className="text-lime">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder={t("careers.placeholders.resume")}
                      value={formData.resume}
                      onChange={(e) => handleInputChange("resume", e.target.value)}
                      className={cn(
                        "w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 text-text",
                        validationErrors.resume && "border-red-500/50 focus:border-red-500"
                      )}
                    />
                    {validationErrors.resume && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.resume}
                      </p>
                    )}
                  </div>

                  {/* Portfolio Link */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.portfolio")}
                    </label>
                    <input
                      type="url"
                      placeholder={t("careers.placeholders.portfolio")}
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange("portfolio", e.target.value)}
                      className="w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 text-text"
                    />
                  </div>

                  {/* Cover Letter Message */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
                      {t("careers.fields.message")} <span className="text-lime">*</span>
                    </label>
                    <textarea
                      placeholder={t("careers.placeholders.message")}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={cn(
                        "w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 resize-none text-text",
                        validationErrors.message && "border-red-500/50 focus:border-red-500"
                      )}
                    />
                    {validationErrors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm py-2">
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className={cn(
                        "px-10 py-4",
                        isSubmitting && "opacity-50 pointer-events-none"
                      )}
                      withBeam
                    >
                      {isSubmitting ? t("common.sending") : t("careers.common.apply")}
                    </MagneticButton>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
};

export default CareersPage;
