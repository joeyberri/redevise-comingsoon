import { Link as LinkRouter } from "react-router-dom";
import SocialLinks from "../components/SocialLinks.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-dark-400/30">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="font-sans text-xs text-text-subtle">
            {t('footer.copyright')}
          </p>

          {/* Legal */}
          <div className="flex items-center gap-6">
            <LinkRouter
              to="/privacy"
              className="font-sans text-xs text-text-subtle transition-colors hover:text-text"
            >
              {t('footer.privacyPolicy')}
            </LinkRouter>
            <LinkRouter
              to="/terms"
              className="font-sans text-xs text-text-subtle transition-colors hover:text-text"
            >
              {t('footer.termsOfUse')}
            </LinkRouter>
          </div>

          {/* Socials */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
