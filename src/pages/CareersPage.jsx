import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import FadeIn from "../components/FadeIn.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import FormInput from "../components/FormInput.jsx";
import FormTextArea from "../components/FormTextArea.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useSEO } from "../utils/useSEO.js";
import { getCareersSchema } from "../utils/schemas.js";
import { cn } from "../utils/cn.js";

const CareersPage = () => {
  const { t } = useLanguage();
  useSEO({ key: "careers", schema: getCareersSchema() });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    resume: "",
    portfolio: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const roles = t("careers.roles") || [];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = t("careers.errors.name");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = t("careers.errors.email");
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = t("careers.errors.emailInvalid");
    }

    if (!formData.role) errors.role = t("careers.errors.role");
    
    if (!formData.resume.trim()) {
      errors.resume = t("careers.errors.resume");
    } else {
      try {
        new URL(formData.resume.trim());
      } catch {
        errors.resume = t("careers.errors.resumeInvalid");
      }
    }

    if (formData.portfolio.trim()) {
      try {
        new URL(formData.portfolio.trim());
      } catch {
        errors.portfolio = t("careers.errors.portfolioInvalid");
      }
    }

    if (!formData.message.trim()) errors.message = t("careers.errors.message");

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (_err) {
      setSubmitError(t("careers.errors.submitFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Section */}
      <Section name="careers-hero" spacing="tight">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <Pill className="mb-6">{t("careers.pill")}</Pill>
            <Heading level={1} variant="hero-title" className="mb-6">
              {t("careers.title")}
            </Heading>
            <Text variant="hero-sub" className="mx-auto">
              {t("careers.subtitle")}
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
                className="group relative rounded-3xl bg-dark-100/80 p-12 text-center border-0 shadow-2xl shadow-black/40"
              >
                <div className="size-20 rounded-full bg-lime/15 flex items-center justify-center text-lime mx-auto mb-8 border-0">
                  <Check size={40} />
                </div>
                <Heading level={2} className="text-3xl mb-4 text-text">
                  {t("careers.success.title")}
                </Heading>
                <Text className="text-text-muted max-w-md mx-auto mb-10">
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
                className="group relative rounded-3xl bg-dark-100/80 p-8 md:p-12 border-0 shadow-2xl shadow-black/40"
              >
                <div className="mb-10">
                  <Heading level={2} variant="card-title" className="mb-2 text-text">
                    {t("careers.sectionTitle")}
                  </Heading>
                  <Text variant="small" className="text-text-muted">
                    {t("careers.sectionSub")}
                  </Text>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <FormInput
                    label={t("careers.fields.name")}
                    placeholder={t("careers.placeholders.name")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={validationErrors.name}
                    required
                  />

                  <FormInput
                    label={t("careers.fields.email")}
                    type="email"
                    placeholder={t("careers.placeholders.email")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={validationErrors.email}
                    required
                  />

                  {/* Role Selector Grid */}
                  <div className="space-y-3">
                    <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-text-muted">
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
                              "px-5 py-4 text-left rounded-xl transition-colors duration-200 text-xs uppercase tracking-wider font-sans font-semibold flex items-center justify-between cursor-pointer border-0",
                              isSelected
                                ? "bg-dark-200 text-lime"
                                : "bg-dark-50/80 hover:bg-dark-200/50 text-text-muted"
                            )}
                          >
                            <span>{role}</span>
                            {isSelected && <Check size={14} className="text-lime shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    {validationErrors.role && (
                      <p className="text-red-400 text-xs flex items-center gap-1.5 mt-1">
                        <AlertCircle size={12} /> {validationErrors.role}
                      </p>
                    )}
                  </div>

                  <FormInput
                    label={t("careers.fields.resume")}
                    type="url"
                    placeholder={t("careers.placeholders.resume")}
                    value={formData.resume}
                    onChange={(e) => handleInputChange("resume", e.target.value)}
                    error={validationErrors.resume}
                    required
                  />

                  <FormInput
                    label={t("careers.fields.portfolio")}
                    type="url"
                    placeholder={t("careers.placeholders.portfolio")}
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange("portfolio", e.target.value)}
                  />

                  <FormTextArea
                    label={t("careers.fields.message")}
                    placeholder={t("careers.placeholders.message")}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    error={validationErrors.message}
                    required
                  />

                  {submitError && (
                    <div className="flex items-center gap-2 text-red-400 text-sm py-2">
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
