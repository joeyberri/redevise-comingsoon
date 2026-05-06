import Section from "../components/Section.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import PillarCard from "../components/PillarCard.jsx";
import { pillars } from "../constants/index.jsx";

const Pillars = () => {
  return (
    <Section name="pillars">
      <SectionHeader 
        pill="Three ways to work with us"
        title={(
          <>
            Not an agency.<br className="hidden md:block" />
            Not just a product company.<br className="hidden md:block" />
            <span className="text-gradient">Something sharper.</span>
          </>
        )}
        subtitle="Redevise operates across three distinct capabilities - each powered by the same intelligence layer, each focused on one thing: dramatically better outcomes."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.id} {...pillar} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Pillars;
