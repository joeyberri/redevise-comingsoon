import FeatureItem from "../components/FeatureItem.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { jarvisCapabilities, jarvisContent } from "../constants/index.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import Grid from "../components/Grid.jsx";
import ScrollParallax from "../components/ScrollParallax.jsx";

const Jarvis = () => {
  return (
    <section className="relative">
      <div className="divider" />

      <div className="container py-24 md:py-32">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-text/[0.08] bg-text/[0.02] backdrop-blur-3xl">
            {/* Subtle grid inside the block */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            
            {/* Inner Glows with parallax */}
            <ScrollParallax speed={0.3}>
              <div className="absolute -left-20 -top-20 size-80 rounded-full bg-lime/10 blur-[100px]" />
            </ScrollParallax>
            <ScrollParallax speed={-0.2}>
              <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-green-500/5 blur-[100px]" />
            </ScrollParallax>

            <Grid cols={2} gap={12} className="relative z-10 p-8 md:gap-16 md:p-16 lg:p-20">
              {/* Left: Copy */}
              <div>
                <Pill className="mb-8 border-text/[0.1] text-text-subtle">
                  {jarvisContent.pill}
                </Pill>
                <Heading level={2} className="mb-6 md:text-5xl lg:text-6xl">
                  {jarvisContent.title}
                </Heading>
                <div className="space-y-6">
                  {jarvisContent.paragraphs.map((para, i) => (
                    <Text key={i} className="text-lg">
                      {para}
                    </Text>
                  ))}
                </div>
              </div>

              {/* Right: Capabilities */}
              <div className="flex items-center">
                <ul className="space-y-6 w-full">
                  {jarvisCapabilities.map((cap, i) => (
                    <FadeIn key={i} delay={0.2 + i * 0.1} direction="left">
                      <FeatureItem className="text-base py-3 border-b border-text/[0.05] last:border-0">
                        {cap}
                      </FeatureItem>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </Grid>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Jarvis;
