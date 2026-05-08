/* ─── Three Pillars ─── */
export const pillars = [
  {
    id: "0",
    num: "01 - PRODUCTS",
    title: "We build software",
    text: "A growing ecosystem of precision-built tools - from customer support intelligence to school operations, habit systems to research workflows. Each one 10x simpler than the alternative.",
    tag: "SupporTribe · Eduplugg · StreakMonkey · CitationPro",
  },
  {
    id: "1",
    num: "02 - LABS",
    title: "We build for you",
    text: "Custom software, MVPs, and enterprise applications - engineered with the same intelligence infrastructure that powers our own products. Faster than a dev shop. Smarter by design.",
    tag: "End-to-end engineering · MVP to scale",
  },
  {
    id: "2",
    num: "03 - CONSULTING",
    title: "We optimize you",
    text: "Workflow audits. Automation strategy. Advanced analytics. We map where your organization leaks time and energy, then eliminate the friction - systematically.",
    tag: "Process audits · Automation · Analytics · Training",
  },
];

/* ─── Jarvis Capabilities ─── */
export const jarvisCapabilities = [
  "Cross-product data understanding that compounds over time",
  "Behavioral pattern recognition across workflows",
  "Context-aware recommendations at every decision point",
  "Workflow automation triggers that remove thinking overhead",
  "Shared intelligence means every product gets smarter as all of them do",
  "When our engineers deploy for clients, Jarvis maps, generates architectures, and optimizes - in parallel",
];

/* ─── Product Ecosystem ─── */
export const products = [
  {
    id: "0",
    label: "B2B · Support Intelligence",
    name: "SupporTribe",
    text: "Your customer support team, finally operating at its ceiling. SupporTribe brings AI-powered intelligence to agent performance, conversation quality, and workflow clarity - so every interaction becomes a data point that makes the next one better",
  },
  {
    id: "1",
    label: "B2B · Education Ops",
    name: "Eduplugg",
    text: "School administration reimagined. Eduplugg is a modular operations system that clears the fog of scattered communication, redundant processes, and fractured workflows - giving educators back the time and clarity they came to teaching for.",
  },
  {
    id: "2",
    label: "B2C · Behavior",
    name: "StreakMonkey",
    text: "Discipline isn't a personality trait - it's a system. StreakMonkey turns your intentions into locked-in routines through behavioral consistency tools that make showing up the path of least resistance.",
  },
  {
    id: "3",
    label: "B2C · Research",
    name: "CitationPro",
    text: "The browser extension that turns research from a time sink into a competitive advantage. CitationPro removes the friction from academic and professional writing - so you spend time thinking, not formatting.",
  },
  {
    id: "4",
    label: "Vertical · Ministry",
    name: "Ascribe",
    text: "Built for the specific rhythms of church life. Ascribe is presentation software designed with deep niche utility - intuitive, focused, and built to serve communities that have been underserved by generic tools.",
    cta: "Explore Church Ecosystem",
    href: "https://church.redevise.com",
  },
];

/* ─── Services ─── */
export const labsFeatures = [
  "End-to-end product development from discovery to launch",
  "MVPs built to validate quickly, then scale without rewrites",
  "Jarvis-augmented architecture: problems mapped and solved at machine speed",
  "Top-tier engineering on technologies that don't become liabilities",
  "Optimization-first thinking baked into every architectural decision",
];

export const consultingFeatures = [
  "Operational efficiency audits that find the real bottlenecks",
  "Workflow automation strategy - not just recommendations, but implementation",
  "Advanced data analytics that turns your numbers into decisions",
  "Digital transformation with measurable, time-bound outcomes",
  "Ministry Infrastructure: specialized consulting for modern worship environments",
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
    title: "Radical Simplicity",
    text: "10x simpler than alternatives, or we haven't done our job.",
  },
  {
    id: "1",
    title: "Intelligence-First",
    text: "Every product and service must actively assist decision-making.",
  },
  {
    id: "2",
    title: "Dramatic Improvement",
    text: "Marginal gains don't justify adoption. We aim for transformative.",
  },
  {
    id: "3",
    title: "Connected",
    text: "Nothing we build exists in isolation. Everything compounds.",
  },
];

/* ─── Tagline Bar Items ─── */
export const taglines = [
  "OPTIMIZATION INFRASTRUCTURE",
  "INTELLIGENCE-FIRST ENGINEERING",
  "POWERED BY JARVIS",
  "PRODUCTS + SERVICES",
  "DRAMATIC IMPROVEMENT OR NOTHING",
];

/* ─── Nav Links ─── */
export const navLinks = [
  { id: "pillars", label: "What We Do" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

/* ─── Socials ─── */
export const socials = [
  {
    id: "0",
    title: "x",
    icon: "/images/socials/x.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Threads",
    icon: "/images/socials/threads.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    icon: "/images/socials/instagram.svg",
    url: "#",
  },
  {
    id: "3",
    title: "Discord",
    icon: "/images/socials/discord.svg",
    url: "#",
  },
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
    "Redevise started with a simple observation: most software makes processes more complicated, not less. Most consultants produce decks instead of outcomes. And most companies accept this as normal - because everyone else does, too.",
    <>
      We didn't. We built Redevise around a single, non-negotiable standard:{" "}
      <strong className="font-semibold text-text">
        if the improvement isn't dramatic, we don't build it.
      </strong>{" "}
      Not for our own products. Not for our clients. Incremental gains don't
      justify the cognitive overhead of adopting something new.
    </>,
    "What emerged is something that doesn't fit a neat category. We're part product company, part engineering firm, part optimization consultancy - all unified by a shared intelligence layer we call Jarvis, and a shared philosophy we simply call: make it work better, or don't make it at all.",
    "The long-term mission is compounding intelligence: every product we ship and every client problem we solve makes Jarvis - and therefore all of Redevise - sharper. This is how we compete. Not on features. Not on hourly rates. On outcomes, intelligence, and execution speed.",
  ],
};

/* ─── Jarvis Content ─── */
export const jarvisContent = {
  pill: "The Intelligence Layer",
  title: (
    <>
      The unfair advantage is called <span className="text-gradient">Jarvis.</span>
    </>
  ),
  paragraphs: [
    "Most companies have a tech stack. We have a context engine. Jarvis is the shared intelligence layer running underneath every Redevise product and every client engagement.",
    "It learns. It connects. It accelerates. And it makes everything we build - and everything we do for you - dramatically more effective than what you'd get anywhere else.",
  ],
};
