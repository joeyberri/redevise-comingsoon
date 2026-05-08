import Section from "../../components/Section.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import Grid from "../../components/Grid.jsx";
import FeatureCard from "../../components/FeatureCard.jsx";
import CardBadge from "../../components/CardBadge.jsx";
import { churchConstants } from "../../constants/index.jsx";

const ChurchServices = () => {
  return (
    <Section name="services" showDivider>
      <SectionHeader
        pill="Church Solutions"
        title="Ministry Infrastructure."
        subtitle="We build the systems that help you focus on ministry, while we handle the technology."
      />

      <Grid cols={3} gap={8}>
        {churchConstants.services.map((service, index) => (
          <FeatureCard
            key={service.id}
            index={index}
            title={service.title}
            description={service.description}
            badge={<CardBadge label={service.items[0]} />}
          >
            <div className="space-y-3 pt-6 border-t border-text/[0.05]">
              {service.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-text-muted">
                  <div className="size-1 rounded-full bg-lime" />
                  {item}
                </div>
              ))}
            </div>
          </FeatureCard>
        ))}
      </Grid>
    </Section>
  );
};

export default ChurchServices;
