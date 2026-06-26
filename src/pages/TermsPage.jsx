import LegalPageLayout from "../components/LegalPageLayout.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <LegalPageLayout
      seoKey="terms"
      title={t('terms.title')}
      updated={t('terms.updated')}
      sections={t('terms.sections')}
    />
  );
};

export default TermsPage;
