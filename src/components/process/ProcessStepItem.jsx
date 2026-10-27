import FadeIn from "../FadeIn.jsx";
import { Heading, Text } from "../Typography.jsx";
import Pill from "../Pill.jsx";

const ProcessStepItem = ({ step, index, whatYouGetLabel, innerRef }) => {
  return (
    <div
      ref={innerRef}
      data-step-index={index}
      className="scroll-mt-32 rounded-2xl bg-dark-100/75 p-8 transition-colors border-0 mb-6"
    >
      <FadeIn delay={0.05} direction="up" fullWidth>
        {/* Mobile/Tablet Header (hidden on desktop) */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-sans text-3xl font-extrabold text-lime">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Heading level={3} variant="small-title">
              {step.title}
            </Heading>
          </div>
          <Pill className="text-[10px] bg-dark-200 text-lime border-0">{step.duration}</Pill>
        </div>

        {/* Step description */}
        <Text className="text-text-muted leading-relaxed text-base md:text-lg">
          {step.desc}
        </Text>

        {/* Outcome Callout */}
        {step.outcome && (
          <div className="rounded-xl bg-dark-200 p-5 mt-6 border-0">
            <p className="font-sans text-xs font-bold uppercase tracking-wider text-lime mb-1.5">
              {whatYouGetLabel}
            </p>
            <Text variant="small" className="text-text-muted">
              {step.outcome}
            </Text>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default ProcessStepItem;
