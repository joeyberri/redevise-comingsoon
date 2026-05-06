import FeatureItem from "../components/FeatureItem.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { jarvisCapabilities } from "../constants/index.jsx";

const Jarvis = () => {
  return (
    <section className="relative">
      <div className="divider" />

      <div className="container py-24 md:py-32">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-3xl">
            {/* Subtle grid inside the block */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            
            {/* Inner Glows */}
            <div className="absolute -left-20 -top-20 size-80 rounded-full bg-lime/10 blur-[100px]" />
            <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-green-500/5 blur-[100px]" />

            <div className="relative z-10 grid gap-12 p-8 md:grid-cols-2 md:gap-16 md:p-16 lg:p-20">
              {/* Left: Copy */}
              <div>
                <div className="pill mb-8 border-white/[0.1] text-text-subtle">
                  The Intelligence Layer
                </div>
                <h2 className="mb-6 font-serif text-3xl leading-tight text-text md:text-5xl lg:text-6xl">
                  The unfair advantage is called{" "}
                  <span className="text-gradient">Jarvis.</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-text-muted">
                    Most companies have a tech stack. We have a context engine.
                    Jarvis is the shared intelligence layer running underneath every
                    Redevise product and every client engagement.
                  </p>
                  <p className="text-lg leading-relaxed text-text-muted">
                    It learns. It connects. It accelerates. And it makes everything
                    we build - and everything we do for you - dramatically more
                    effective than what you&apos;d get anywhere else.
                  </p>
                </div>
              </div>

              {/* Right: Capabilities */}
              <div className="flex items-center">
                <ul className="space-y-6 w-full">
                  {jarvisCapabilities.map((cap, i) => (
                    <FadeIn key={i} delay={0.2 + i * 0.1} direction="left">
                      <FeatureItem className="text-base py-3 border-b border-white/[0.03] last:border-0">
                        {cap}
                      </FeatureItem>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Jarvis;
