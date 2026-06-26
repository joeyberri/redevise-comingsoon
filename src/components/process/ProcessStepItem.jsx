import FadeIn from "../FadeIn.jsx";
import { Heading, Text } from "../Typography.jsx";
import Pill from "../Pill.jsx";

const ProcessStepItem = ({ step, index, whatYouGetLabel, innerRef }) => {
  return (
    <div
      ref={innerRef}
      data-step-index={index}
      className="scroll-mt-32 border-t border-text/[0.06] pt-12 lg:pt-0 lg:border-t-0 first:border-t-0 first:pt-0"
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
          <Pill className="text-[10px] bg-lime/10 border-lime/20 text-lime">{step.duration}</Pill>
        </div>

        {/* Step description */}
        <Text className="text-text-muted leading-relaxed text-base md:text-lg">
          {step.desc}
        </Text>

        {/* Outcome Callout */}
        {step.outcome && (
          <div className="border-l-2 border-lime/40 pl-5 py-1 mt-6 bg-lime/[0.01]">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-lime mb-1.5">
              {"// "}{whatYouGetLabel}
            </p>
            <Text variant="small" className="text-text-muted/90">
              {step.outcome}
            </Text>
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default ProcessStepItem;
