import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import PillarCard from "../components/PillarCard.jsx";
import { pillars } from "../constants/index.jsx";
import Grid from "../components/Grid.jsx";

const Pillars = () => {
  return (
    <Section name="pillars">
      <SectionHeader 
        pill="Three ways to work with us"
        title={(
          <>
            Not an agency.<br />
            Not just a product company.<br />
            <span className="text-gradient">Something sharper.</span>
          </>
        )}
        subtitle="Redevise operates across three distinct capabilities - each powered by the same intelligence layer, each focused on one thing: dramatically better outcomes."
      />

      <Grid cols={3} gap={6}>
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.id} {...pillar} index={i} />
        ))}
      </Grid>
    </Section>
  );
};

export default Pillars;
