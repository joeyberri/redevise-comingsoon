// ============================================================
// REDEVISE — IMPROVED COPY (en.js)
// Voice: Sharp consultant. Problem-first. No slop.
// Changelog notes are inline as comments marked [CHANGED]
// Lines marked [KEEP] were already strong — left untouched.
// ============================================================

export const en = {
  nav: {
    services: "What We Do",
    products: "Products",
    process: "How We Work",
    about: "About",
    optimize: "Optimize Ministry",
    start: "Start Project",
    startProject: "Start a project",
    careers: "Careers",
    blog: "Blog",
    estimate: "Pricing"
  },

  common: {
    navigation: "Navigation",
    back: "Back",
    continue: "Continue",
    sending: "Sending...",
    sendMessage: "Send Message",
    booking: "Booking...",
    confirmBooking: "Confirm Booking",
    reload: "Reload Page",
    goHome: "Go Home",
    redeviseOps: "Redevise Operations",
    legal: "Legal",
    dataStrategy: "Data Strategy",
    liveAssistant: "Live Assistant",
    readyToHelp: "Ready to help",
    step: "Step {{current}} of {{total}}",
    pressEnter: "Press Enter ↵",
    skipStep: "Skip this step →",
    selected: "Selected",
    availableTimes: "Available times",
    pickDate: "Pick a date",
    noTimes: "No times available for this day."
  },

  theme: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode"
  },

  hero: {
    pill: "Software Studio & Consulting",

    // [CHANGED] "make things work better" said nothing specific.
    // "your business actually runs on" is a confident, implied contrast:
    // the current tools don't actually do that job.
    buildSystems: "We build the systems",
    that: "your business ",
    makeThingsWork: "actually",
    better: "runs on.",

    // [CHANGED] Named the audience (founders, operators) and named the pain
    // (working around tools). "design, build, and optimize" was a job listing.
    sub: "Custom software, automation, and consulting for founders and operators who are tired of working around their own tools.",

    workWithUs: "Work with us",
    exploreProducts: "Explore Products"
  },

  pillars: {
    title: "3 ways to work with us:",
    list: [
      {
        id: "0",
        num: "01 - OUR SOFTWARE",
        title: "We build software",

        // [CHANGED] "pleasant to use" was weak. "simple, powerful" is a cliché.
        // Replaced with specifics on what the tools are for, and a line
        // that says what they avoid (bloat, setup friction) not just what they do.
        text: "Ready-made tools built for specific jobs — support analytics, school administration, habit tracking, and more. No setup hell, no feature bloat.",
        tag: "SupporTribe · Eduplugg · StreakMonkey · CitationPro · Ascribe",
      },
      {
        id: "1",
        num: "02 - CUSTOM DEV",
        title: "We build for you",
        // [KEEP] Direct and specific. No changes.
        text: "Need an app, website, or platform built from scratch? We handle everything from the first wireframe to launch day and beyond.",
        tag: "Web Apps · Mobile Apps · MVPs · Enterprise Software · APIs",
      },
      {
        id: "2",
        num: "03 - CONSULTING",
        title: "We optimize you",
        // [KEEP] Problem-first, specific. No changes.
        text: "Not sure what you need yet? We audit your workflows, find what's costing you time and money, and build a plan to fix it.",
        tag: "Process Audits · Automation · Analytics · Digital Transformation",
      }
    ]
  },

  core: {
    pill: "Behind the Scenes",
    title: (
      <>
        We work faster because of <span className="text-gradient">Core</span>
      </>
    ),
    paragraphs: [
      // [CHANGED] "generate solutions" is AI slop. "move through projects faster
      // than traditional agencies" is a vague comparison. New version names
      // what Core actually does and why it matters to the client.
      "Core is the AI engine we built for ourselves. It handles the groundwork — mapping problems, flagging bottlenecks, automating the repetitive parts — so our team spends time on what actually needs a human.",

      // [CHANGED] "better results, delivered sooner" is vague.
      // "Fewer surprises" is more honest and more specific.
      "You don't need to know how it works. You get faster delivery and fewer surprises."
    ],
    capabilities: [
      // [CHANGED] All 6 rewritten. Original versions were either vague
      // ("generate smart recommendations") or used passive constructions.
      // Each new line names a specific action with a specific payoff.
      "Cuts scoping time by mapping project architecture before the first meeting",
      "Flags the bottlenecks your team is working around without realizing it",
      "Surfaces the right questions at the right point in every project",
      "Handles the repetitive engineering tasks so our team focuses on the hard parts",
      "Carries what we learn on one project into the next build",
      "Lets us ship in half the time without skipping the work that matters"
    ]
  },

  products: {
    pill: "Our Products",
    title: (
      <>
        Software we've{" "}
        <span className="text-gradient">built.</span>
      </>
    ),

    // [CHANGED] "operational bottlenecks" is corporate jargon.
    // New version names the problem (generic software falls short)
    // and the positioning (focused, specific).
    subtitle: "Focused tools built for the specific jobs where generic software always falls short.",

    list: [
      {
        id: "0",
        label: "B2B · Support",
        name: "SupporTribe",
        // [KEEP] Specific and direct. No changes.
        text: "AI-powered customer support analytics. See what's working, coach your agents, and improve every conversation.",
      },
      {
        id: "1",
        label: "B2B · Education",
        name: "Eduplugg",
        // [KEEP] Specific. "built for how schools actually work" is strong. No changes.
        text: "School administration in one place. Attendance, communication, grading, and operations built for how schools actually work.",
      },
      {
        id: "2",
        label: "B2C · Habits",
        name: "StreakMonkey",
        // [KEEP] "actually stick to your routines" is real-voice. No changes.
        text: "Build better habits with streaks, reminders, and progress tracking. Simple tools that help you actually stick to your routines.",
      },
      {
        id: "3",
        label: "B2C · Research",
        name: "CitationPro",
        // [KEEP] Clean value prop. No changes.
        text: "A browser extension that handles citations and formatting so you can focus on the actual research.",
      },
      {
        id: "4",
        label: "Ministry",
        name: "Ascribe",

        // [CHANGED] "Intuitive" is overused. "designed specifically for churches"
        // and "built for worship teams" said the same thing twice.
        // "Not the IT department" adds contrast and specificity.
        text: "Presentation software built specifically for churches. Clean, focused, and made for the people running the service — not the IT department.",

        cta: "Explore Church Ecosystem",
        href: "https://church.redevise.com",
      }
    ]
  },

  services: {
    pill: "Services",
    title: (
      <>
        Quick ways we can{" "}
        <span className="text-gradient">help.</span>
      </>
    ),

    // [CHANGED] "we've got you" is generic. New version signals they start
    // with the problem, not a pre-packaged answer.
    subtitle: "Need something built or something fixed? Either way, we start with your problem — not a package.",

    // [CHANGED] "automated workflows" after "automation engine" was redundant.
    // Tightened to one clear claim.
    coreNote: "Everything we ship runs through Core, our internal automation engine. It's how we deliver clean work in half the time.",

    labs: {
      title: "Redevise Labs",
      // [KEEP] Direct. No changes.
      tagline: "We build apps, websites, and platforms. From first idea to finished product.",
      cta: "Start your project →",
      features: [
        "Full project development from concept to launch",
        // [CHANGED] "validate" is startup jargon. "Test" is cleaner.
        "MVPs that test your idea fast and scale when you're ready",
        // [CHANGED] "technologies that last" → "tech that lasts" (tighter)
        "Clean, maintainable code on tech that lasts",
        // [CHANGED] Named the problem solved (being in the dark) not just the feature.
        "Regular check-ins so you're never in the dark",
        // [KEEP]
        "Weekly staging releases so you see working progress in real-time"
      ]
    },
    consulting: {
      title: "Redevise Consulting",
      // [KEEP] This is one of the best lines on the site. Do not touch.
      tagline: "We help businesses figure out what's slowing them down and fix it.",
      cta: "Get an efficiency audit →",
      exploreMinistry: "Explore Ministry Infrastructure",
      features: [
        // [CHANGED] Added "not just the obvious ones" — signals depth of audit.
        "Workflow audits that find your real bottlenecks — not just the obvious ones",
        // [CHANGED] "setup, not just recommendations" → more direct active phrasing.
        "Automation we actually set up, not just recommend",
        // [CHANGED] "help you make better decisions" is vague.
        // "Give you something to act on" is specific.
        "Data and analytics that give you something to act on",
        "Clear timelines and measurable results",
        "Specialized consulting for churches and ministry teams"
      ]
    }
  },

  aboutSection: {
    values: [
      {
        id: "0",
        // [KEEP] Strong. No changes.
        title: "Keep it Simple",
        text: "If it's not dramatically simpler than the alternative, we haven't done our job.",
      },
      {
        id: "1",
        // [KEEP] Good. No changes.
        title: "Smart by Default",
        text: "Every product and service should help you make better decisions, not just more of them.",
      },
      {
        id: "2",
        title: "Real Results",
        // [CHANGED] "transformative" is on the avoid list.
        // New version is specific: "the kind of change you'd notice on day one."
        text: "Small improvements don't justify the cost of switching. We aim for the kind of change you notice on day one.",
      },
      {
        id: "3",
        title: "Connected",
        // [CHANGED] Tightened. "Everything we learn makes" → "Every project makes" (one fewer clause).
        text: "Nothing we build exists in isolation. Every project makes the next one better.",
      }
    ],
    taglines: [
      "WEB & MOBILE APPS",
      "CUSTOM SOFTWARE",
      "SCHOOL MANAGEMENT",
      "CHURCH TECH",
      "BUSINESS CONSULTING",
      "AI-POWERED TOOLS",
    ]
  },

  ctaFooter: {
    // [KEEP] This is the best line on the site. Do not touch.
    heading: "The world runs on broken processes. Let's fix yours.",

    // [CHANGED] "no jargon" is a cliché. "no pitch deck" is specific to
    // Redevise's positioning (they explicitly avoid this) and more memorable.
    desc: "Tell us what you're working on. We'll figure out the best way to help. No pitch deck, no pressure.",

    requestConsultation: "Request consultation",
    howWeWork: "How we work"
  },

  footer: {
    copyright: "© 2026 Redevise. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    quickLinks: "Quick Links",
    services: "Services",
    solutions: "Custom Solutions",
    home: "Home",
    about: "About",
    process: "How we work",
    blog: "Blog",
    webDevelopment: "Websites & Landing Pages",
    webApps: "Web Applications",
    mobileApps: "Mobile Apps",
    ecommerce: "E-commerce Stores",
    customSoftware: "Custom Business Software",
    automation: "Workflow Automation",
    careers: "Careers",
    estimate: "Pricing"
  },

  errorBoundary: {
    // [KEEP] Friendly, on-brand. No changes.
    title: "Something had a hiccup.",
    desc: "We encountered a minor system error. Let's try reloading the page, or you can go back to the homepage."
  },

  aboutPage: {
    pill: "About",
    title: (
      <>
        The Redevise <span className="text-gradient">Way.</span>
      </>
    ),
    paragraphs: [
      // [KEEP] Strong opener. Problem-first, contrarian, specific. No changes.
      "Redevise started with a simple observation: most software makes things more complicated, not less. Most consultants hand you a slide deck instead of actual results. And most companies accept this as normal because everyone else does too.",

      // [KEEP] The bold rule is the strongest line in the About page. No changes.
      (
        <>
          We didn't. We built Redevise around one rule:{" "}
          <strong className="font-semibold text-text">
            if the improvement isn't dramatic, we don't build it.
          </strong>{" "}
          Not for ourselves. Not for our clients. If switching to our tool doesn't
          make your life significantly easier, we haven't earned the switch.
        </>
      ),

      // [CHANGED] "a shared belief that things should just work better" is the
      // weakest line in this paragraph — vague, and undercuts the boldness of
      // the paragraph above it. Replaced with language that ties back to the rule.
      "We're part product company, part engineering studio, part consulting firm. Tied together by Core, our internal AI engine, and one shared standard: if it doesn't work dramatically better, we don't ship it.",

      // [KEEP] Last two sentences are excellent. "We compete on results." is strong.
      "Every product we build and every project we deliver teaches us something new. That's how we get faster and better over time. We don't compete on features or hourly rates. We compete on results."
    ],
    stats: {
      num: "10x",
      caption: "Simpler than the alternative"
    },
    pillars: [
      {
        title: "Smart Tools",
        desc: "Products that help you make better decisions."
      },
      {
        title: "Fast Delivery",
        desc: "From idea to launched product, quickly."
      },
      {
        title: "Real Impact",
        desc: "If it doesn't make a real difference, we don't build it."
      }
    ]
  },

  church: {
    hero: {
      pill: "Ministry Infrastructure",

      // [CHANGED] "Engineering Excellence for the Modern Church" is corporate
      // and clichéd. New version is direct and specific to the audience.
      title: "Tech built for how ministry actually works.",

      // [CHANGED] "streamlined management" (blacklist word), "serve your community"
      // (generic). New version names the contrast — not adapted from corporate IT.
      subtitle: "Media systems, operations software, and team training designed around the rhythms of ministry — not adapted from corporate IT.",

      ourServices: "Our Services",
      learnMore: "Learn More"
    },
    services: {
      pill: "Church Solutions",
      title: "Ministry Infrastructure.",

      // [CHANGED] Original was passive. New version is an imperative — cleaner.
      subtitle: "Handle the technology. Stay focused on the ministry.",

      list: [
        {
          id: "0",
          title: "Media Infrastructure",
          // [CHANGED] Removed awkward parenthetical. Replaced "make your message clear"
          // with the specific outcome: every screen, clearly.
          description: "From projection setups to multi-platform live streaming — including mobile-first operations — we build the systems that make your message reach every screen clearly.",
          items: ["Projection Setup", "Multi-Platform Streaming", "Mobile Streaming Ops"],
        },
        {
          id: "1",
          title: "Capacity Building",
          // [CHANGED] "end-to-end training" is corporate. New version leads with
          // the real insight (equipment doesn't help if the team can't run it).
          description: "The best equipment doesn't help if the team doesn't know how to use it. We train your media team, sharpen your brand presence, and set up the analytics to show what's actually working.",
          items: ["Team Training", "Strategic Rebranding", "Analytics & Insights"],
        },
        {
          id: "2",
          title: "Church Operations",
          // [CHANGED] "unique rhythms and workflows of ministry life" was grandiose.
          // New version names the contrast: not a corporate tool with workarounds bolted on.
          description: "Software and systems built for how ministry actually runs — not adapted from a corporate tool and duct-taped together with workarounds.",
          items: ["Ascribe Software", "Operations Management", "Digital Workflows"],
        }
      ]
    }
  },

  modal: {
    interests: [
      "Improve my website or digital presence",
      "Build a new product or platform",
      "Automate repetitive workflows",
      "Get better analytics & insights",
      "Set up church or ministry tech",
      "Just exploring my options",
    ],
    errors: {
      network: "We're having trouble connecting. Please check your internet connection and try again.",
      emailKey: "Our message server is undergoing minor maintenance. Try scheduling a call directly, or email us at team@redevise.com.",
      emailFail: "Your message couldn't be sent right now. Try scheduling a call instead, or email us at team@redevise.com.",
      emailGeneral: "Something went wrong while sending your message. Please try again or reach us at team@redevise.com.",
      bookingSlots: "Our scheduling service is temporarily unavailable. Send us a message under 'Send a Message', or contact us at team@redevise.com.",
      bookingConfirm: "We couldn't confirm your appointment. Double-check your booking time or try sending us a message directly.",
      general: "An unexpected error occurred. Please try again, or reach us at team@redevise.com.",
      validateName: "Please enter your name or organization.",
      validateNameLen: "Name must be at least 2 characters.",
      validateEmail: "Please enter your email address.",
      validateEmailInvalid: "Please enter a valid email address.",
      calConfig: "Calendar not configured yet.",
      networkShort: "Network error. Please check your connection.",
      timesFail: "Couldn't load times. Please try again later."
    },
    success: {
      booked: "You're Booked!",
      sent: "Message Sent!",
      // [CHANGED] "Looking forward to speaking with you!" is filler enthusiasm.
      bookedSub: "You'll receive a confirmation email shortly. We'll see you then.",
      // [KEEP]
      sentSub: "We've got your message and will get back to you as soon as possible."
    },
    panels: {
      bookedTitle: <>You're<br />Booked.</>,
      // [CHANGED] Removed filler. Tighter.
      bookedSub: "Check your inbox for the confirmation.",
      sentTitle: <>Message<br />Sent.</>,
      // [KEEP]
      sentSub: "We've received your note and will be in touch soon.",
      pickTitle: <>Pick a<br />Time.</>,
      // [CHANGED] "We'll handle the rest" is a cliché.
      pickSub: "Choose a time that works for you.",
      almostTitle: <>Almost<br />There.</>,
      // [KEEP]
      almostSub: "Share what's on your mind and we'll get back to you.",
      focusTitle: <>Your<br />Focus.</>,
      // [KEEP]
      focusSub: "Select the areas you'd like to improve or explore.",
      nextTitle: <>Next<br />Steps.</>,
      // [KEEP]
      nextSub: "How would you like to proceed with your inquiry?",
      touchTitle: <>Get in<br />Touch.</>,
      // [CHANGED] "We'd love to learn" is salesy. Replaced with direct purpose.
      touchSub: "Tell us about your project and we'll figure out the best way to help."
    },
    steps: {
      step1Title: "Let's start with you.",
      step1Sub: "Who should we be reaching out to?",
      placeholderName: "Your name or organization",
      placeholderEmail: "Your email address",
      step2Title: "What brings you here?",
      step3Title: "How would you like to connect?",
      bookCall: "Book a Call",
      bookCallSub: "Pick a time · 15-30 min",
      sendMessage: "Send a Message",
      // [CHANGED] Removed "Your email" — implied by context.
      sendMessageSub: "We'll reply shortly",
      step4Title: "Tell us a bit more.",
      placeholderMsg: "What's on your mind..."
    }
  },

  calendar: {
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  },

  // [NOTE] Terms of Service — legal language kept as-is.
  // Substance of legal text should not be changed without counsel review.
  terms: {
    pill: "Legal",
    title: "Terms of Service",
    updated: "Last Updated: May 7, 2026",
    sections: [
      {
        id: 1,
        title: "1. The Agreement & Acceptance",
        text: "By accessing or using the Redevise platform, products, web services, or consulting resources, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, church, or other legal entity, you represent that you have the authority to bind such entity to these terms. If you do not agree, you are prohibited from accessing or using our services."
      },
      {
        id: 2,
        title: "2. Service Provision & Warranties",
        text: "Redevise provides software applications, custom engineering consulting, and workflow automation systems (including the Core tools). Our services are provided on an \"as is\" and \"as available\" basis. Except as expressly set forth in a separate written agreement signed by both parties, Redevise makes no warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement."
      },
      {
        id: 3,
        title: "3. Intellectual Property Rights",
        text: "The Redevise name, logos, system architectures, custom algorithms, and the underlying Core intelligence systems are the exclusive property of Redevise and its licensors. You are granted no rights or licenses to our technology except as explicitly agreed. However, any business reports, user interface assets specifically created for you, or data structures containing your proprietary business info generated under paid services remain your property."
      },
      {
        id: 4,
        title: "4. User Obligations & Prohibited Conduct",
        text: "You agree to use our services in compliance with all applicable laws and regulations. You are strictly prohibited from:",
        bullets: [
          "Attempting to reverse engineer, decompile, or extract source code from the Redevise platform or Core systems.",
          "Using automated scripts, bots, or scraping tools to query our scheduling systems, contact forms, or APIs without express authorization.",
          "Interfering with, disrupting, or testing the vulnerability of our servers, networks, or hosting configurations.",
          "Using our systems to transmit malware, perform denial-of-service attacks, or host unauthorized or illegal material."
        ]
      },
      {
        id: 5,
        title: "5. Limitation of Liability",
        text: "To the maximum extent permitted by applicable law, Redevise and its affiliates, directors, officers, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data loss, business interruption, or system downtime, even if advised of the possibility of such damages. Our maximum cumulative liability for any claim arising out of these terms shall not exceed the amount paid by you, if any, to access our services."
      },
      {
        id: 6,
        title: "6. Modification of Terms",
        text: "We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. When modifications occur, we will update the \"Last Updated\" date at the top of this page. Your continued use of our services after such modifications constitute your binding acceptance of the updated terms."
      },
      {
        id: 7,
        title: "7. Governing Law & Dispute Resolution",
        text: "These Terms of Service and any disputes arising out of or related to your use of Redevise services shall be governed by and construed in accordance with the laws of the jurisdiction where Redevise is registered, without giving effect to any principles of conflicts of law. Any legal action or proceeding arising under these terms shall be brought exclusively in the courts located in that jurisdiction."
      },
      {
        id: 8,
        title: "8. Contact Us",
        text: "If you have any questions, concerns, or requests regarding these Terms of Service, please contact our legal operations team directly at "
      }
    ]
  },

  // [NOTE] Privacy Policy — legal language kept as-is.
  privacy: {
    pill: "Data Strategy",
    title: "Privacy Policy",
    updated: "Last Updated: May 7, 2026",
    sections: [
      {
        id: 1,
        title: "1. Data Philosophy & Sovereignty",
        text: "At Redevise, we reject the surveillance economy. We believe that your data belongs to you. We strictly design our systems to collect the absolute minimum amount of information necessary to deliver, secure, and optimize our services. When we deploy custom intelligence systems (such as Core instances), we enforce absolute data isolation. Your institutional knowledge never cross-contaminates another organization's systems or training data."
      },
      {
        id: 2,
        title: "2. Information We Collect",
        text: "We only collect data that you explicitly provide to us, or that is technically required to serve you:",
        bullets: [
          { label: "Inquiry & Consultation Data: ", text: "Name, organization, email address, interests, and freeform messages sent via our consultation flow or scheduling forms." },
          { label: "Core Instance Data: ", text: "Under specific consulting arrangements, the data processed by your dedicated Core instance is stored within secure, isolated environments under your control." },
          { label: "Technical Usage Metadata: ", text: "Basic web client logs (IP address, browser type, device type, referrer) used exclusively for performance tuning, DDoS mitigation, and system health monitoring." }
        ]
      },
      {
        id: 3,
        title: "3. How We Use Data",
        text: "We use the information we collect to:",
        bullets: [
          "Respond to inquiries, coordinate consultations, and execute projects.",
          "Configure, maintain, and optimize your dedicated Core instances and custom integrations.",
          "Develop and refine our product offerings without compromising individual privacy (we do not use client-specific proprietary data to train models for competitors).",
          "Ensure the security, availability, and reliability of our network infrastructure."
        ]
      },
      {
        id: 4,
        title: "4. Cookies & Tracking Technologies",
        text: "We do not use tracking cookies or cross-site advertising scripts. We may use local storage or session-based state purely for system operations (such as maintaining your active state in the consultation booking modal). Any analytics we collect are aggregated, anonymous, and focused strictly on performance optimization."
      },
      {
        id: 5,
        title: "5. Data Retention & Deletion",
        text: "We retain consultation requests and contact information only as long as necessary to manage our relationship with you or execute active agreements. If you request that your data be deleted, we will purge it from our production systems within 30 days, except where retention is required by law."
      },
      {
        id: 6,
        title: "6. Third-Party Service Providers",
        text: "We selectively work with third-party providers who share our commitment to privacy and security. These include:",
        bullets: [
          { label: "Cloudflare: ", text: "For secure, edge-based application hosting and security." },
          { label: "Resend: ", text: "For transactional email delivery." },
          { label: "Cal.com: ", text: "For scheduling and appointment bookings." }
        ],
        extraText: "We do not sell, rent, or lease your personal information to third parties."
      },
      {
        id: 7,
        title: "7. International Transfers & Security",
        text: "Your data may be processed on servers located in the United States or other jurisdictions, depending on where our hosting partners route traffic. We implement industry-standard security measures, including transport encryption (HTTPS) and isolated container architectures, to safeguard your data against unauthorized access, alteration, or loss."
      },
      {
        id: 8,
        title: "8. Your Rights & Contact Information",
        text: "Depending on your location, you may have rights under the GDPR, CCPA, or other regional data protection frameworks (such as rights of access, correction, portability, and erasure). If you wish to exercise any of these rights, or if you have questions regarding this policy, please reach out to us directly at "
      }
    ]
  },

  servicesPage: {
    hero: {
      pill: "Our Services",
      // [KEEP]
      title: "What we can build for you",
      // [CHANGED] "or just browse around" was aimless. Tightened.
      sub: "Everything we offer, in plain English. Pick what matches your needs, or just browse."
    },
    core: {
      pill: "Core Offerings",
      title: "High-Demand Essentials",
      // [CHANGED] "high-performance packages" sounded like a gym membership.
      sub: "The services most growing businesses need first, packaged to move fast.",
      packages: [
        {
          id: "launchpad",
          title: "Digital Launchpad",
          // [CHANGED] "Establish a professional online presence" is corporate-speak.
          // New version is direct and specific about what you get.
          desc: "Get online properly. A site that loads fast, looks right, and shows up when local customers search for you.",
          items: [
            "Custom Website Design",
            "Reliable Hosting Setup",
            "Google Workspace Emails",
            "Google Business Profile Setup",
            "Local SEO Optimization"
          ]
        },
        {
          id: "automation",
          title: "AI & Automation",
          // [CHANGED] "engage customers 24/7" sounds like a pitch.
          // New version names the actual value: stop doing manually what a system handles.
          desc: "Stop doing manually what a system can handle. We build and deploy the automations.",
          items: [
            "WhatsApp Automation",
            "AI Chatbot Development",
            "Business Process Audits",
            "Workflow Automations"
          ]
        },
        {
          id: "growth",
          title: "Growth & Scale",
          // [CHANGED] Tightened. More direct.
          desc: "Turn the traffic you're already getting into revenue. Then track it properly.",
          items: [
            "E-commerce Store Development",
            "CRM Setup & Integration",
            "Analytics & Reporting Dashboards",
            "Conversion Optimization"
          ]
        }
      ]
    },
    directory: {
      pill: "Capabilities Index",
      title: "Explore Full Capabilities",
      sub: "Browse our complete catalog of specialized domains, infrastructure, and custom engineering services."
    },
    cta: {
      // [KEEP]
      title: "Not sure what you need?",
      // [CHANGED] "no pitch deck" is more specific than "no jargon."
      sub: "Tell us what you're trying to do and we'll figure out the right approach together. No pressure, no pitch.",
      estimate: "Get an estimate",
      talk: "Talk to us"
    }
  },

  processPage: {
    hero: {
      pill: "Our Process",
      // [KEEP]
      title: "How we work",
      // [CHANGED] Tightened. Removed "step by step" — implied by the page itself.
      sub: "From first conversation to finished product. Here's exactly what it looks like."
    },
    whatYouGet: "What you get",
    steps: [
      // [KEEP] All steps are already sharp and specific.
      { title: "Discovery Call", duration: "Free, 15-30 minutes", desc: "We hop on a call to understand what you need. No sales pitch, just a conversation about your project, your goals, and whether we're the right fit.", outcome: "A custom Scope of Work document and a ballpark pricing range." },
      { title: "Proposal & Agreement", duration: "2-3 business days", desc: "We put together a detailed proposal with scope, timeline, milestones, and pricing. Everything spelled out so there are no surprises.", outcome: "A detailed project brief, milestone breakdowns, and a binding agreement." },
      { title: "Design & Prototype", duration: "1-2 weeks", desc: "We design how your project will look and feel. You'll see mockups and clickable prototypes before we write a single line of code.", outcome: "A clickable Figma prototype showing key user flows and layouts." },
      { title: "Development", duration: "2-12 weeks", desc: "We build your project in focused sprints, with regular check-ins so you always know what's happening. No going dark for weeks.", outcome: "A private GitHub repository and a live staging link updated weekly." },
      { title: "Testing & QA", duration: "1-2 weeks", desc: "We test everything thoroughly. Cross-browser, cross-device, performance, security. We break it on purpose so your users don't.", outcome: "A comprehensive QA checklist across iOS, Android, and web browsers." },
      { title: "Launch", duration: "1-3 days", desc: "We handle deployment, DNS, hosting, and all the technical details. You just tell us when you're ready to go live.", outcome: "Production deployment on cloud infrastructure (AWS/Cloudflare) and full DNS handoff." },
      { title: "Ongoing Support", duration: "Optional, monthly", desc: "After launch, we're still here. Bug fixes, updates, new features — whatever you need. We offer flexible support plans so you're never stuck.", outcome: "Weekly maintenance logs, security patches, and a dedicated queue for updates." }
    ],
    faq: {
      pill: "Common Questions",
      title: "Frequently asked questions",
      list: [
        {
          q: "How much does a typical project cost?",
          // [CHANGED] "clear estimate" → "clear number" (more direct).
          a: "It depends on scope, but most projects fall between {{priceFloor}} and {{priceCeiling}}. We'll give you a clear number before any work starts. Use the project estimator for a quick ballpark."
        },
        {
          q: "How long does a project take?",
          // [CHANGED] Added "not one we revise later" — addresses a real client fear.
          a: "Simple websites: 2–4 weeks. Web apps and mobile apps: 6–12 weeks. You'll get a realistic timeline upfront — not one we revise later."
        },
        {
          q: "Do you work with small businesses?",
          // [CHANGED] Dropped "Absolutely" (salesy). Added "That's who we built this for."
          a: "Most of our clients are small to mid-sized businesses, schools, churches, and startups. That's who we built this for."
        },
        {
          // [KEEP] This answer is in the right voice.
          q: "What if I don't know exactly what I need?",
          a: "That's totally fine. Most people don't. That's what the discovery call is for. We'll help you figure it out."
        },
        {
          // [KEEP]
          q: "Do you do maintenance after launch?",
          a: "Yes. We offer monthly support plans, or you can reach out for one-off updates whenever you need them."
        },
        {
          q: "What technologies do you use?",
          // [CHANGED] "But we'll explain our choices in plain terms" → added "not acronyms."
          a: "We pick the best tool for the job. That usually means React, Next.js, React Native, Node.js, and cloud platforms like AWS or Cloudflare. We'll explain our choices in plain terms, not acronyms."
        }
      ]
    },
    cta: {
      // [KEEP]
      title: "Ready to start?",
      // [CHANGED] "no obligations" sounds like a legal disclaimer.
      // "no pitch" is more consistent with the brand voice.
      sub: "Let's talk about your project. No pressure, no pitch.",
      call: "Book a free call",
      estimate: "Get an estimate"
    }
  },

  estimatePage: {
    hero: {
      pill: "Project Estimator",
      // [KEEP]
      title: "Get a project estimate",
      sub: "Select your project type, scope, and features. We'll give you a ballpark range so you know what to expect before we talk."
    },
    step1: "What are you building?",
    types: [
      // [KEEP] All type descriptions are specific and clear.
      { id: "website", title: "Website or Landing Page", desc: "Marketing site, portfolio, or single-page site to showcase your brand." },
      { id: "webapp", title: "Web Application", desc: "Interactive app with user accounts, data, and dynamic functionality." },
      { id: "mobile", title: "Mobile App (iOS & Android)", desc: "Native or cross-platform app for phones and tablets." },
      { id: "ecommerce", title: "E-commerce Store", desc: "Online store with products, cart, checkout, and order management." },
      { id: "custom", title: "Custom Business Software", desc: "Internal tools, CRMs, or specialized software built for your workflow." },
      { id: "unsure", title: "Not sure yet", desc: "You have an idea but haven't nailed down the format. That's fine." }
    ],
    step2: "How big is this project?",
    scopes: [
      // [KEEP] These are specific and honest.
      { label: "Simple", desc: "1 to 5 pages, static content, basic contact forms. Ideal for simple portfolios or single product landing pages." },
      { label: "Standard", desc: "5 to 15 pages, CMS integrations, custom APIs, third-party tools. Perfect for marketing sites and standard business software." },
      { label: "Complex", desc: "15+ pages, custom dashboards, user authentication, role-based access control, complex databases." },
      { label: "Enterprise", desc: "Multi-tenant setups, microservices, advanced security compliance, high-availability architecture." }
    ],
    step3: {
      title: "Any extra features?",
      // [KEEP]
      sub: "Toggle on the ones you need. Each one adds a bit to the cost, but we'll show you exactly how much in the summary."
    },
    step4: "How soon do you need it?",
    timelines: [
      // [KEEP] These are honest and specific — good voice.
      { id: "flexible", title: "Flexible", desc: "No rush, get it right", detail: "We take our time to make every detail perfect. Typically adds 2 to 4 extra weeks.", discount: "10% discount" },
      { id: "standard", title: "Standard", desc: "2 to 3 months", detail: "A comfortable pace that balances speed with quality. Our most popular option.", discount: "Standard rate" },
      { id: "urgent", title: "Urgent", desc: "ASAP, we needed this yesterday", detail: "We put more people on it and cut turnaround by about 30%. Premium pricing applies.", discount: "40% premium" }
    ],
    summary: {
      range: "Estimated range",
      to: " to ",
      timeline: "Timeline",
      weeks: " weeks",
      features: "Features",
      selected: " selected",
      cta: "Get your custom quote"
    },
    bottomCta: {
      // [KEEP]
      title: "Ready to talk specifics?",
      // [CHANGED] "we'd love to learn more" is salesy. Tightened.
      sub: "This estimate is a starting point. Every project is different. Jump on a quick call and we'll nail down the specifics.",
      cta: "Get your custom quote"
    },
    features: [
      { id: "auth", label: "User Authentication" },
      { id: "payments", label: "Payment Processing" },
      { id: "admin", label: "Admin Dashboard" },
      { id: "api", label: "API Integrations" },
      { id: "realtime", label: "Real-time Features" },
      { id: "analytics", label: "Analytics & Reporting" },
      { id: "i18n", label: "Multi-language Support" },
      { id: "seo", label: "SEO Optimization" }
    ]
  },

  seo: {
    home: {
      title: "Redevise | Build Custom Software & Automate Workflows",
      // [CHANGED] Named the actual audience and the real pain point.
      desc: "Redevise builds custom software, automation systems, and operations tools for founders and operators who need their tech to actually work."
    },
    about: {
      title: "About Redevise | Built Around Results",
      // [CHANGED] "10x efficiency gains" is an unsupported stretch claim.
      // Replaced with the actual brand rule.
      desc: "Part product company, part engineering studio, part consulting firm. Built around one rule: if the improvement isn't dramatic, we don't build it."
    },
    services: {
      title: "Redevise Services | Build Custom Software & Automate Workflows",
      // [CHANGED] Last sentence now names what Redevise is NOT (pitch-driven).
      desc: "We build custom software, automate workflows, and optimize operations. We build what your business actually needs — not what sounds good in a pitch."
    },
    process: {
      title: "How Redevise Works | Our Process",
      // [CHANGED] Original read like a keyword dump. New version leads with
      // the client-facing differentiators: fixed pricing, visibility, no dark periods.
      desc: "Fixed pricing, weekly staging updates, no going dark. Here's exactly how every Redevise project runs, from discovery to launch."
    },
    estimate: {
      // [KEEP]
      title: "Get a Project Estimate | Ballpark Pricing",
      desc: "Estimate the cost of your custom web app, mobile app, website, e-commerce store, or business software with our interactive project estimator."
    },
    blog: {
      title: "Redevise Blog | Systems, Software & Operations",
      // [CHANGED] "the future of how organizations operate" is AI slop.
      // New version is grounded and specific.
      desc: "Straight talk on automation, custom software, support operations, and the operational decisions that actually move businesses forward."
    },
    terms: {
      title: "Terms of Service | Redevise",
      desc: "Terms of Service and legal agreements for Redevise custom software development and operations consulting services."
    },
    privacy: {
      title: "Privacy Policy | Redevise Data Sovereignty",
      desc: "Read the Redevise Privacy Policy. We enforce absolute data isolation and collect the minimum necessary data to host and secure your services."
    },
    church: {
      title: "Ministry Infrastructure | Redevise Church Tech",
      // [CHANGED] "high-performance" sounds like a spec sheet. "modern worship environments"
      // is generic. New version names the actual outcome.
      desc: "Media systems, projection setups, live streaming, and church management tools built for worship teams who need tech that just works."
    },
    customSoftware: {
      title: "Custom Software Development Studio | Redevise",
      desc: "We build high-performance custom web applications, mobile apps, secure databases, and API integrations that match your workflows exactly. Fixed pricing."
    },
    workflowAutomation: {
      title: "Workflow Automation & System Integration Services | Redevise",
      desc: "Automate manual tasks, connect your CRM, billing, and databases, and deploy WhatsApp bots. We integrate systems to save your team hours of work."
    }
  },

  difference: {
    pill: "The Difference",
    label: "// COMPARISON",

    // [CHANGED] "Why work with Redevise?" is a weak opener — every company asks this.
    // "The honest comparison" is confident without being boastful.
    title: "The honest comparison.",

    // [CHANGED] Tightened. Removed "software development houses" — redundant.
    subtitle: "How we work vs. how most agencies work.",

    themLabel: "Traditional Agencies",
    usLabel: "Redevise Studio",
    items: [
      {
        // [CHANGED] "Core Foundation" → "Foundation" (simpler)
        title: "Foundation",
        // [KEEP] Strong.
        them: "Generic templates, copy-paste builders, or tech stacks from five years ago.",
        // [CHANGED] Original vague: "custom-built software optimization engine" says nothing.
        // New version names what Core does.
        us: "Powered by Core — our internal AI engine built to speed up how we scope, design, and ship."
      },
      {
        title: "Speed & Iteration",
        // [KEEP] Strong.
        them: "Weeks of radio silence, manual handoffs, and feedback that arrives too late.",
        // [CHANGED] "git-backed transparency" is developer jargon. Replaced with
        // what the client actually experiences.
        us: "Weekly staging links, live code access, and check-ins that actually tell you something."
      },
      {
        title: "Process Integration",
        // [KEEP]
        them: "Apps built as isolated tools with no thought given to how your team actually works.",
        // [CHANGED] "Deep business-process analysis" is corporate-speak.
        us: "We map how your business actually runs before writing a line of code. Then we build around that."
      },
      {
        title: "Pricing",
        // [KEEP] Both sides are strong here.
        them: "Opaque hourly billing that rewards slow work and scope creep.",
        us: "Fixed, transparent project ranges. Adapted to your local currency. No surprises."
      },
      {
        title: "After Launch",
        // [KEEP]
        them: "A folder of files and a handshake. No monitoring, no ongoing support.",
        // [CHANGED] Made more specific.
        us: "Weekly maintenance logs, security patches, and a live queue for updates when you need them."
      }
    ]
  },

  statement: {
    // [CHANGED] "reduce overhead" is corporate. "help your team work faster" is generic.
    // New version is more specific: names what gets removed (manual steps, workarounds)
    // and what the team gets back (real work, not the admin around it).
    title: "We engineer custom tools that remove the manual steps, cut the workarounds, and let your team focus on actual work."
  },

  results: {
    // [KEEP] Metric-driven. Specific. No changes needed.
    items: [
      {
        metric: "14 Days",
        label: "Prototype Speed",
        description: "Average time to a fully functional prototype you can test."
      },
      {
        metric: "60%",
        label: "Task Reduction",
        description: "Average reduction in manual steps and repetitive work."
      },
      {
        metric: "2.4s",
        label: "Page Speed",
        description: "Average load time for pages, keeping visitors engaged."
      },
      {
        metric: "2x",
        label: "Output Speed",
        description: "Twice the speed of traditional agency development cycles."
      }
    ]
  },

  testimonial: {
    // [KEEP] Real quote. Never touch a real quote.
    label: "// CLIENT FEEDBACK",
    quote: "Redevise redesigned our entire delivery pipeline. We went from processing orders manually to complete automation in 14 days.",
    author: "K. Boateng",
    role: "Operations Director, Lunaris Coffee Co."
  },

  careers: {
    // [CHANGED] "BUILD THE FUTURE WITH US" — every company says this.
    // New version names what the work actually is.
    heroTitle: "BUILD TOOLS PEOPLE ACTUALLY RELY ON",

    // [CHANGED] "We are a remote-first team" is a bland opener.
    // "make hard tasks simple" is close but vague.
    // New version is specific about the work and what kind of person fits.
    heroSub: "Remote-first. Real problems. We build things that get used every day — and we want people who care about the difference.",

    sectionTitle: "Open Application",
    sectionSub: "Don't see a specific opening? We're always looking for sharp engineers, designers, and operators.",
    fields: {
      name: "Full Name",
      email: "Email Address",
      role: "Role of Interest",
      portfolio: "Portfolio / GitHub / LinkedIn",
      resume: "Resume URL (Drive, Dropbox, Notion, etc.)",
      message: "Tell us about what you've built and why you want to join"
    },
    roles: [
      "Full-Stack Software Engineer",
      "Frontend Developer",
      "Mobile Developer (iOS & Android)",
      "AI & Automation Engineer",
      "UI/UX Product Designer",
      "Product Manager",
      "Business Development & Operations",
      "General / Other Application"
    ],
    placeholders: {
      name: "e.g., Jane Doe",
      email: "e.g., jane@example.com",
      portfolio: "e.g., github.com/janedoe",
      resume: "e.g., drive.google.com/...",
      message: "Highlight a few things you've built that you're proud of..."
    },
    errors: {
      validateName: "Please enter your name",
      validateEmail: "Please enter a valid email address",
      validateRole: "Please select a role of interest",
      validateResume: "Please provide a link to your resume",
      submitFail: "Something went wrong. Please try again.",
      network: "Network error — check your connection."
    },
    success: {
      title: "APPLICATION RECEIVED",
      sub: "We review every application and will reach out if there's a fit."
    },
    common: {
      apply: "Submit Application",
      backHome: "Back to Home"
    }
  },

  blog: {
    pill: "Insights & Engineering",
    title: "The Redevise Blog",
    // [CHANGED] "the future of how organizations operate" is AI slop.
    // "intelligent systems" is jargon. New version is grounded and specific.
    subtitle: "Straight talk on systems, software, and the operational decisions that actually move businesses forward.",
    searchPlaceholder: "Search articles...",
    allTags: "All",
    noArticles: "No articles found",
    noArticlesSub: "Try adjusting your search or filter criteria.",
    featured: "Featured",
    readArticle: "Read article",
    backToBlog: "Back to Blog",
    relatedArticles: "Related Articles",
    read: "Read"
  },

  customSoftwarePage: {
    hero: {
      title: "We build custom software that works the way you do",
      sub: "Stop wrapping your business processes around generic SaaS tools. We design, engineer, and deploy high-performance web applications, mobile apps, and custom APIs tailored exactly to your workflows."
    },
    capabilities: {
      title: "Capabilities & Offerings",
      list: [
        { title: "Full-Stack Web Apps", desc: "Interactive dashboards, client portals, and custom SaaS platforms built with React and modern backend architectures." },
        { title: "Mobile App Development", desc: "Cross-platform iOS and Android applications engineered for performance, native feel, and offline availability." },
        { title: "Custom API Integrations", desc: "Securely connecting your databases, billing tools, CRMs, and third-party services so data flows automatically." },
        { title: "Database Architecture", desc: "Designing secure, high-performance PostgreSQL, MySQL, or Redis databases designed for speed, scaling, and data isolation." }
      ]
    },
    techStack: {
      title: "Our Technology Stack",
      desc: "We build on clean, maintainable, industry-standard technology that scales without vendor lock-in:",
      items: [
        { name: "Frontend", tech: "React / Next.js / Tailwind CSS" },
        { name: "Backend & APIs", tech: "Node.js / Express / Go" },
        { name: "Databases & Cache", tech: "PostgreSQL / Redis / MongoDB" },
        { name: "Infrastructure", tech: "AWS / Cloudflare Edge / Vercel" }
      ]
    },
    faqs: [
      { question: "Do we own the source code?", answer: "Yes. Once the project is fully delivered and paid for, you receive complete ownership of the repository, source code, and all custom assets. There are no ongoing licensing fees." },
      { question: "How long does a custom software build take?", answer: "Typically between 4 to 12 weeks. We build in sprints and provide weekly staging updates, so you see the working software evolve in real-time." },
      { question: "How do you handle hosting and maintenance?", answer: "We set up hosting directly on your own accounts (AWS, Vercel, or Cloudflare) so you maintain custody. We also offer monthly support SLA options to handle updates and optimizations." }
    ]
  },

  workflowAutomationPage: {
    hero: {
      title: "We automate manual tasks and connect your systems",
      sub: "Eliminate repetitive copying, manual data entry, and operational bottlenecks. We map your workflows, connect your tools, and build the custom automations that let your team focus on the actual work."
    },
    capabilities: {
      title: "What We Automate",
      list: [
        { title: "WhatsApp & Chat Automation", desc: "Deploy intelligent notification flows, customer support routing, and automatic booking assistants directly inside WhatsApp." },
        { title: "Cross-System Integrations", desc: "Synchronize data automatically between your CRM, accounting software, email marketing, and payment gateways." },
        { title: "Operational Dashboards", desc: "Surface bottlenecks, monitor systems in real-time, and get automated reports directly in Slack, WhatsApp, or email." },
        { title: "Custom Back-Office Bots", desc: "Automate report generation, PDF invoices creation, email tracking, and file uploads systematically." }
      ]
    },
    faqs: [
      { question: "Can you automate legacy or off-the-shelf software?", answer: "Yes. As long as the software provides an API or webhook interface, we can connect it. If no API exists, we can build custom scraping or import tools to sync the data." },
      { question: "Do we need to pay for automation platforms like Zapier?", answer: "Not necessarily. While we use Zapier or Make for simple triggers, we write custom serverless node scripts for complex integrations to save you monthly platform costs." },
      { question: "How do we measure the success of an automation?", answer: "We track the hours of manual work saved per week and the reduction of data entry errors. Most clients see a complete return on investment within 2 to 3 months of launch." }
    ]
  },

  gh: {
    pillars: {
      list: [
        {
          id: "0",
          num: "01 - OUR SOFTWARE",
          title: "We build software",
          text: "Ready-made tools built for specific jobs — support analytics, school administration, habit tracking, and more. Localized payment support built-in.",
          tag: "SupporTribe · Eduplugg · StreakMonkey · CitationPro · Ascribe"
        },
        {
          id: "1",
          num: "02 - CUSTOM DEV",
          title: "We build for you",
          text: "Need an app, website, or portal built from scratch? We handle everything from discovery to launch, integrated with local payment (MTN MoMo, Telecel, Paystack) and SMS APIs.",
          tag: "Web Apps · Mobile Apps · MVPs · Mobile Money · APIs"
        },
        {
          id: "2",
          num: "03 - CONSULTING",
          title: "We optimize you",
          text: "Not sure what you need? We audit your workflows to find bottlenecks, digitize manual processes, and build a plan to fix them.",
          tag: "Process Audits · Automation · Analytics · Digital Transformation"
        }
      ]
    },
    ctaFooter: {
      desc: "We build custom software, automate collections, and optimize operations for growing teams. Let's discuss your project."
    }
  }
};