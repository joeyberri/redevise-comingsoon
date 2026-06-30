import { Link as LinkRouter } from "react-router-dom";
import SocialLinks from "../components/SocialLinks.jsx";
import Logo from "../components/Logo.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const Footer = ({ onOpenInquiry }) => {
  const { t } = useLanguage();

  const handleServiceClick = (serviceType) => {
    if (onOpenInquiry) {
      onOpenInquiry(serviceType);
    }
  };

  return (
    <footer className="border-t border-text/[0.06] bg-dark-100/10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Logo & Brand Info Column */}
          <div className="col-span-12 md:col-span-5 flex flex-col items-start gap-6 md:pr-12">
            <LinkRouter to="/" className="cursor-pointer">
              <Logo showText={true} iconSize="size-8" />
            </LinkRouter>
            <p className="font-sans text-xs text-text-subtle leading-relaxed max-w-sm">
              {t('footer.copyright')}
            </p>
            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-6 sm:col-span-4 md:col-span-2">
            <h4 className="font-space uppercase text-xs font-bold tracking-widest text-text mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <LinkRouter to="/" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.home')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/about" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.about')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/services" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.services')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/process" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.process')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/estimate" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.estimate')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/blog" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.blog')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/careers" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.careers')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/gh" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  Ghana & West Africa
                </LinkRouter>
              </li>
            </ul>
          </div>

          {/* Services / Custom Solutions Column */}
          <div className="col-span-12 sm:col-span-5 md:col-span-3">
            <h4 className="font-space uppercase text-xs font-bold tracking-widest text-text mb-6">
              {t('footer.solutions')}
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[0])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.webDevelopment')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[1])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.webApps')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[1])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.mobileApps')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[1])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.ecommerce')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[1])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.customSoftware')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick(t('modal.interests')[2])}
                  className="text-xs font-sans text-text-subtle transition-colors hover:text-lime text-left bg-transparent border-0 p-0 cursor-pointer outline-none"
                >
                  {t('footer.automation')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-6 sm:col-span-3 md:col-span-2">
            <h4 className="font-space uppercase text-xs font-bold tracking-widest text-text mb-6">
              {t('common.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <LinkRouter to="/privacy" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.privacyPolicy')}
                </LinkRouter>
              </li>
              <li>
                <LinkRouter to="/terms" className="text-xs font-sans text-text-subtle transition-colors hover:text-lime">
                  {t('footer.termsOfUse')}
                </LinkRouter>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
