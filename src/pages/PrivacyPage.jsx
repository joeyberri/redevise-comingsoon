import LegalPageLayout from "../components/LegalPageLayout.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const PrivacyPage = () => {
  const { t } = useLanguage();

  return (
    <LegalPageLayout
      seoKey="privacy"
      title={t('privacy.title')}
      updated={t('privacy.updated')}
      sections={t('privacy.sections')}
    />
  );
};

export default PrivacyPage;
