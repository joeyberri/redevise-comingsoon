import Section from "../components/Section.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import Grid from "../components/Grid.jsx";
import FadeIn from "../components/FadeIn.jsx";
import { Heading, Text } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Services = ({ onOpenInquiry = () => {} }) => {
  const { t } = useLanguage();

  return (
    <Section name="services" spacing="generous" className="relative">
      {/* Dot-grid background with radial fade */}
      <div className="absolute inset-0 bg-dots pointer-events-none" />

      {/* Centered heading — no pill, no subtitle (contrast with other sections) */}
      <FadeIn>
        <div className="text-center mb-16">
          <Heading level={2} variant="section-title" className="mb-6 mx-auto max-w-3xl">
            {t('services.title')}
          </Heading>
          <Text variant="section-sub" className="mx-auto">
            {t('services.subtitle')}
          </Text>
        </div>
      </FadeIn>

      <Grid cols={2} gap={6}>
        <ServiceCard
          index={0}
          title={t('services.labs.title')}
          tagline={t('services.labs.tagline')}
          features={t('services.labs.features')}
          cta={t('services.labs.cta')}
          onOpenInquiry={onOpenInquiry}
        />
        <ServiceCard
          index={1}
          title={t('services.consulting.title')}
          tagline={t('services.consulting.tagline')}
          features={t('services.consulting.features')}
          cta={t('services.consulting.cta')}
          footerNote={{
            text: t('services.consulting.exploreMinistry'),
            href: "https://church.redevise.com"
          }}
          onOpenInquiry={onOpenInquiry}
        />
      </Grid>
    </Section>
  );
};

export default Services;
