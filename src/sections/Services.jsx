import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { labsFeatures, consultingFeatures } from "../constants/index.jsx";
import Grid from "../components/Grid.jsx";

const Services = () => {
  return (
    <Section name="services" showDivider>
      <SectionHeader 
        pill="Services"
        title={(
          <>
            World-class engineering.{" "}
            <span className="text-gradient">Intelligence-augmented</span>{" "}
            delivery.
          </>
        )}
        subtitle="When you work with Redevise Labs or Redevise Consulting, you're not hiring a team of engineers. You're hiring engineers plus Jarvis - which is a fundamentally different thing."
      />

      <Grid cols={2} gap={6}>
        <ServiceCard
          index={0}
          title="Redevise Labs"
          tagline="Custom software built with optimization at its core. From MVP to enterprise-scale - faster and smarter than traditional dev shops."
          features={labsFeatures}
          cta="Start your project →"
        />
        <ServiceCard
          index={1}
          title="Redevise Consulting"
          tagline="Process optimization and advanced analytics for organizations ready to close the gap between how they operate and how they could."
          features={consultingFeatures}
          cta="Get an efficiency audit →"
        />
      </Grid>
    </Section>
  );
};

export default Services;
