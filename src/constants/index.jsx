/* ─── Three Pillars ─── */
export const pillars = [
  {
    id: "0",
    num: "01 - READY SOFTWARE",
    title: "Software we've built",
    text: "Focused, ready-to-use software for customer support, school administration, and daily business tasks. Straightforward setup and no unnecessary features.",
    tag: "SupporTribe · Eduplugg · SkulSys · Conversa · Ascribe",
  },
  {
    id: "1",
    num: "02 - CUSTOM DEVELOPMENT",
    title: "Custom software",
    text: "Need a web app, mobile application, or customer portal built from scratch? We handle everything from discovery and design to launch and ongoing maintenance.",
    tag: "Web Apps · Mobile Apps · Internal Portals · APIs",
  },
  {
    id: "2",
    num: "03 - AUTOMATION & CONSULTING",
    title: "Workflow automation",
    text: "Tired of manual data entry, messy spreadsheets, and disconnected tools? We audit your operations and build automations that save your team hours every week.",
    tag: "Process Audits · System Integrations · WhatsApp Bots · Payment Gateways",
  },
];

/* ─── Core Capabilities ─── */
export const coreCapabilities = [
  "Speeds up project scoping and architecture planning",
  "Spots patterns and bottlenecks in workflows automatically",
  "Generates smart recommendations at each project stage",
  "Automates repetitive engineering tasks so we focus on what matters",
  "Connects insights across projects to deliver better solutions",
  "Helps our engineers build and ship faster without cutting corners",
];

/* ─── Product Ecosystem ─── */
export const products = [
  {
    id: "0",
    label: "B2B · Support",
    name: "SupporTribe",
    text: "AI-powered customer support analytics. See what's working, coach your agents, and improve every conversation.",
  },
  {
    id: "1",
    label: "B2B · Education",
    name: "Eduplugg",
    text: "School administration in one place. Attendance, communication, grading, and operations built for how schools actually work.",
  },
  {
    id: "2",
    label: "B2C · Habits",
    name: "StreakMonkey",
    text: "Build better habits with streaks, reminders, and progress tracking. Simple tools that help you actually stick to your routines.",
  },
  {
    id: "3",
    label: "B2C · Research",
    name: "CitationPro",
    text: "A browser extension that handles citations and formatting so you can focus on the actual research.",
  },
  {
    id: "4",
    label: "Ministry",
    name: "Ascribe",
    text: "Presentation software designed specifically for churches. Intuitive, focused, and built for worship teams.",
    cta: "Explore Church Ecosystem",
    href: "https://church.redevise.com",
  },
  {
    id: "skulsys",
    label: "B2B · Education",
    name: "SkulSys",
    text: "The complete school operating system. Quick morning roll call, tamper-proof terminal reports with QR verification, and automated Mobile Money fee collections.",
    cta: "Visit SkulSys",
    href: "https://www.skulsys.com",
  },
  {
    id: "conversa",
    label: "B2B · AI Sales",
    name: "Conversa",
    text: "Autonomous AI sales agents and customer support chat. Intelligent multi-tier routing that handles customer inquiries, accepts Mobile Money, and closes sales 24/7.",
    cta: "Visit Conversa",
    href: "https://www.askconversa.com",
  },
];

/* ─── Services ─── */
export const labsFeatures = [
  "Full project development from concept to launch",
  "MVPs that validate your idea quickly and scale when you're ready",
  "Clean, maintainable code on technologies that last",
  "Regular check-ins so you always know where things stand",
  "Backed by Core, our internal AI engine, for faster delivery",
];

export const consultingFeatures = [
  "Workflow audits that find your real bottlenecks",
  "Automation setup, not just recommendations",
  "Data and analytics that help you make better decisions",
  "Clear timelines and measurable results",
  "Specialized consulting for churches and ministry teams",
];

/* ─── Church Specific Content ─── */
export const churchConstants = {
  hero: {
    title: "Engineering Excellence for the Modern Church",
    subtitle: "High-performance media systems, streamlined management, and specialized training built to serve your community.",
  },
  services: [
    {
      id: "0",
      title: "Media Infrastructure",
      description: "From projection setups to multi-platform live streaming (including mobile-first setups), we build the hardware and software systems that make your message clear.",
      items: ["Projection Setup", "Multi-Platform Streaming", "Mobile Streaming Ops"],
    },
    {
      id: "1",
      title: "Capacity Building",
      description: "Technology is only as good as the team running it. We provide end-to-end training for media teams, alongside rebranding and analytics strategies.",
      items: ["Team Training", "Strategic Rebranding", "Analytics & Insights"],
    },
    {
      id: "2",
      title: "Church Operations",
      description: "Dedicated software and management systems designed specifically for the unique rhythms and workflows of ministry life.",
      items: ["Ascribe Software", "Operations Management", "Digital Workflows"],
    },
  ],
};

/* ─── Values ─── */
export const values = [
  {
    id: "0",
    title: "Keep it Simple",
    text: "If it's not dramatically simpler than the alternative, we haven't done our job.",
  },
  {
    id: "1",
    title: "Smart by Default",
    text: "Every product and service should help you make better decisions, not just more of them.",
  },
  {
    id: "2",
    title: "Real Results",
    text: "Small improvements don't justify the effort of switching. We aim for transformative.",
  },
  {
    id: "3",
    title: "Connected",
    text: "Nothing we build exists in isolation. Everything we learn makes the next project better.",
  },
];

/* ─── Tagline Bar Items ─── */
export const taglines = [
  "WEB & MOBILE APPS",
  "CUSTOM SOFTWARE",
  "SCHOOL MANAGEMENT",
  "CHURCH TECH",
  "BUSINESS CONSULTING",
  "AI-POWERED TOOLS",
];

/* ─── Nav Links ─── */
export const navLinks = [
  { id: "services", label: "What We Do" },
  { id: "products", label: "Products" },
  { id: "process", label: "How We Work" },
  { id: "estimate", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
];

/* ─── About Content ─── */
export const aboutContent = {
  pill: "About",
  title: (
    <>
      The Redevise <span className="text-gradient">Way.</span>
    </>
  ),
  paragraphs: [
    "Redevise started with a simple observation: most software makes things more complicated, not less. Most consultants hand you a slide deck instead of actual results. And most companies accept this as normal because everyone else does too.",
    <>
      We didn't. We built Redevise around one rule:{" "}
      <strong className="font-semibold text-text">
        if the improvement isn't dramatic, we don't build it.
      </strong>{" "}
      Not for ourselves. Not for our clients. If switching to our tool doesn't
      make your life significantly easier, we haven't earned the switch.
    </>,
    "We're part product company, part engineering studio, part consulting firm. All tied together by an internal AI engine we call Core, and a shared belief that things should just work better.",
    "Every product we build and every project we deliver teaches us something new. That's how we get faster and better over time. We don't compete on features or hourly rates. We compete on results.",
  ],
};

/* ─── Core Content ─── */
export const coreContent = {
  pill: "Behind the Scenes",
  title: (
    <>
      We work faster because of <span className="text-gradient">Core</span>
    </>
  ),
  paragraphs: [
    "Core is our internal AI engine. It helps our team map problems, generate solutions, and move through projects faster than traditional agencies.",
    "You don't need to understand how it works. You just get better results, delivered sooner.",
  ],
};

/* ─── Scroll Configuration ─── */
export const DEFAULT_SCROLL_CONFIG = {
  duration: 400,
  delay: 0,
  smooth: "easeOutCubic",
  offset: -80,
};
