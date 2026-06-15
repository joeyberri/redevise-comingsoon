import Section from "../../components/Section.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import Grid from "../../components/Grid.jsx";
import FeatureCard from "../../components/FeatureCard.jsx";
import CardBadge from "../../components/CardBadge.jsx";
import { useLanguage } from "../../utils/LanguageContext.jsx";

const ChurchServices = () => {
  const { t } = useLanguage();

  return (
    <Section name="services" showDivider>
      <SectionHeader
        pill={t('church.services.pill')}
        title={t('church.services.title')}
        subtitle={t('church.services.subtitle')}
      />

      <Grid cols={3} gap={8}>
        {t('church.services.list').map((service, index) => (
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
