import Section from "../components/Section.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import Pill from "../components/Pill.jsx";
import { aboutContent } from "../constants/index.jsx";
import { motion } from "framer-motion";
import GridSpotlight from "../components/GridSpotlight.jsx";

const AboutPage = () => {
  return (
    <Section name="about-page" className="pt-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Pill className="mb-6">{aboutContent.pill}</Pill>
          <Heading level={1} className="mb-12 text-5xl md:text-7xl">
            {aboutContent.title}
          </Heading>

          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="space-y-8">
              {aboutContent.paragraphs.map((p, i) => (
                <Text key={i} className="text-xl leading-relaxed text-text-muted">
                  {p}
                </Text>
              ))}
            </div>
            
            <div className="relative">
              <GridSpotlight className="rounded-3xl border border-dark-400/30 aspect-square flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-lime mb-4">10x</div>
                  <Text className="uppercase tracking-widest font-semibold text-xs">Simpler than the alternative</Text>
                </div>
              </GridSpotlight>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 py-16 border-t border-dark-400/20">
            <div>
              <Heading level={4} className="mb-2 text-lime">Intelligence</Heading>
              <Text className="text-sm text-text-muted">Every product assisting your decisions.</Text>
            </div>
            <div>
              <Heading level={4} className="mb-2 text-lime">Execution</Heading>
              <Text className="text-sm text-text-muted">MVPs to scale at machine speed.</Text>
            </div>
            <div>
              <Heading level={4} className="mb-2 text-lime">Outcome</Heading>
              <Text className="text-sm text-text-muted">Dramatic improvement or we don't build it.</Text>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutPage;
