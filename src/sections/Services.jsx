import Section from "../components/Section.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import Grid from "../components/Grid.jsx";
import FadeIn from "../components/FadeIn.jsx";
import Pill from "../components/Pill.jsx";
import { Heading } from "../components/Typography.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Services = ({ onOpenInquiry = () => {} }) => {
  const { t } = useLanguage();

  return (
    <Section name="services" spacing="generous" className="relative">
      <FadeIn>
        <div className="text-center mb-16">
          <Pill className="mb-4">
            {t('services.pill')}
          </Pill>
          <Heading level={2} variant="section-title" className="mx-auto max-w-3xl mb-4">
            {t('services.title')}
          </Heading>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
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
