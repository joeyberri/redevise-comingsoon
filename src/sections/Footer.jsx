import SocialLinks from "../components/SocialLinks.jsx";

const Footer = () => {
  return (
    <footer className="border-t border-dark-400/30">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="font-sans text-xs text-text-subtle">
            © 2016 Redevise. All rights reserved.
          </p>

          {/* Legal */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-sans text-xs text-text-subtle transition-colors hover:text-text"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-text-subtle transition-colors hover:text-text"
            >
              Terms of Use
            </a>
          </div>

          {/* Socials */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
