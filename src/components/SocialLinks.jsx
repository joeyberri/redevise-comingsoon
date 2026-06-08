import { memo } from "react";
import { Mail, Phone } from "lucide-react";
import { cn } from "../utils/cn";

const SocialLinks = memo(({ className, itemClassName }) => {
  const contactLinks = [
    {
      id: "email",
      title: "Email",
      url: "mailto:info@support.redevise.com",
      icon: <Mail className="size-4 text-text transition-opacity opacity-60 group-hover:opacity-100" />,
    },
    {
      id: "call",
      title: "Call",
      url: "tel:+233207932004",
      icon: <Phone className="size-4 text-text transition-opacity opacity-60 group-hover:opacity-100" />,
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      url: "https://wa.me/233207932004",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-text transition-opacity opacity-60 group-hover:opacity-100"
        >
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.457 3.479 1.328 4.988L2 22l5.187-1.362c1.455.795 3.093 1.213 4.813 1.215h.004c5.505 0 9.988-4.482 9.988-9.988 0-2.668-1.039-5.176-2.927-7.064C17.18 3.033 14.676 2 12.012 2zm5.727 13.916c-.244.686-1.42 1.25-1.947 1.332-.476.074-.954.122-3.08-.72-2.723-1.077-4.475-3.845-4.61-4.025-.138-.18-1.1-1.464-1.1-2.793 0-1.33.692-1.986.945-2.235.253-.25.55-.312.735-.312.18 0 .362.003.52.01.168.007.395-.063.618.48.228.555.776 1.895.845 2.03.07.136.115.295.025.474-.09.18-.135.292-.27.45-.135.158-.284.352-.405.47-.136.136-.28.285-.12.563.158.27.7 1.15 1.5 1.862.63.562 1.166.866 1.485 1.002.32.136.505.113.69-.1.187-.215.815-.948 1.03-1.272.215-.323.43-.27.726-.16.297.11 1.884.887 2.21 1.05.326.162.544.244.626.386.082.143.082.825-.162 1.511z" />
        </svg>
      ),
    },
  ];

  return (
    <ul className={cn("flex gap-3", className)}>
      {contactLinks.map(({ id, url, icon, title }) => (
        <li key={id}>
          <a
            href={url}
            target={id === "whatsapp" ? "_blank" : undefined}
            rel={id === "whatsapp" ? "noopener noreferrer" : undefined}
            className={cn(
              "group flex size-9 items-center justify-center rounded-full border border-dark-400/40 bg-dark-50/40 transition-all duration-300 hover:border-lime/30 hover:bg-dark-50",
              itemClassName
            )}
            aria-label={title}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
});

SocialLinks.displayName = "SocialLinks";

export default SocialLinks;
