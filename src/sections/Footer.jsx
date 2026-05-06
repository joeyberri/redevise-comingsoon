import { socials } from "../constants/index.jsx";

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
          <ul className="flex gap-3">
            {socials.map(({ id, url, icon, title }) => (
              <li key={id}>
                <a
                  href={url}
                  className="flex size-9 items-center justify-center rounded-full border border-dark-400/40 bg-dark-50/40 transition-all duration-300 hover:border-lime/30 hover:bg-dark-50"
                  aria-label={title}
                >
                  <img
                    src={icon}
                    alt={title}
                    className="size-4 object-contain opacity-60"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
