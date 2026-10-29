/**
 * schemas.js
 * 
 * Centralized Schema.org structured data (JSON-LD) generators.
 * Implements best practices from jsonld.com and Schema.org for
 * Organization, LocalBusiness, ProfessionalService, Service, FAQPage,
 * Product, WebApplication, BreadcrumbList, and BlogPosting.
 */

export function getHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://redevise.com/#website",
        "url": "https://redevise.com/",
        "name": "Redevise",
        "description": "We build custom software and automate workflows. High-performance web applications, mobile apps, and custom system integrations that actually work.",
        "publisher": {
          "@id": "https://redevise.com/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://redevise.com/blog?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://redevise.com/#organization",
        "name": "Redevise",
        "url": "https://redevise.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://redevise.com/#logo",
          "url": "https://redevise.com/redevise.png",
          "caption": "Redevise"
        },
        "image": "https://redevise.com/redevise.png",
        "description": "We build custom software and automate workflows. High-performance web applications, mobile apps, and custom system integrations that actually work.",
        "email": "hello@redevise.com",
        "sameAs": [
          "https://www.linkedin.com/company/redevise",
          "https://x.com/redevise",
          "https://github.com/redevise"
        ],
        "knowsAbout": [
          "Custom Software Development",
          "Workflow Automation",
          "Mobile Money API Integrations",
          "Enterprise System Integrations",
          "AI Chatbot Development",
          "Web Application Architecture"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Redevise Services & Software",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Development",
                "url": "https://redevise.com/services/custom-software-development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Workflow Automation",
                "url": "https://redevise.com/services/workflow-automation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "SoftwareApplication",
                "name": "Conversa",
                "applicationCategory": "BusinessApplication",
                "url": "https://www.askconversa.com"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "SoftwareApplication",
                "name": "SkulSys",
                "applicationCategory": "EducationalApplication",
                "url": "https://www.skulsys.com"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "SoftwareApplication",
                "name": "Ascribe",
                "applicationCategory": "MultimediaApplication",
                "url": "https://church.redevise.com"
              }
            }
          ]
        }
      }
    ]
  };
}

export function getGhanaSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://redevise.com/gh/#localbusiness",
        "name": "Redevise Accra",
        "legalName": "Redevise Technologies Limited",
        "url": "https://redevise.com/gh",
        "parentOrganization": {
          "@id": "https://redevise.com/#organization"
        },
        "logo": "https://redevise.com/redevise.png",
        "image": "https://redevise.com/redevise.png",
        "description": "Custom software development, Mobile Money (MTN MoMo, Telecel Cash) integrations, and workflow automation for businesses in Ghana and West Africa. Based in Accra.",
        "telephone": "+233240000000",
        "email": "ghana@redevise.com",
        "priceRange": "GH₵GH₵",
        "currenciesAccepted": "GHS, USD",
        "paymentAccepted": "Cash, Credit Card, Mobile Money, MTN MoMo, Telecel Cash, Bank Transfer",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "East Legon / Spintex Road",
          "addressLocality": "Accra",
          "addressRegion": "Greater Accra",
          "postalCode": "GA-000-0000",
          "addressCountry": "GH"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 5.6037,
          "longitude": -0.1870
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:30",
            "closes": "17:30"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": "Accra" },
          { "@type": "City", "name": "Kumasi" },
          { "@type": "City", "name": "Takoradi" },
          { "@type": "Country", "name": "Ghana" },
          { "@type": "GeoShape", "name": "West Africa" }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/redevise",
          "https://x.com/redevise"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/gh/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://redevise.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Ghana & West Africa",
            "item": "https://redevise.com/gh"
          }
        ]
      }
    ]
  };
}

export function getServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://redevise.com/services#service",
        "name": "Redevise Engineering & Automation Services",
        "serviceType": "Software Engineering and Workflow Automation",
        "provider": {
          "@id": "https://redevise.com/#organization"
        },
        "description": "We build custom software, automate workflows, and optimize operations. High-performance web applications, mobile apps, and systems integrations.",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Core Service Capabilities",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software Development",
                "url": "https://redevise.com/services/custom-software-development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Workflow Automation & Integrations",
                "url": "https://redevise.com/services/workflow-automation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Domains & Cloud Infrastructure",
                "url": "https://redevise.com/services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Technical SEO & Visibility",
                "url": "https://redevise.com/services"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://redevise.com/services#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does workflow automation and custom dev involve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We design and build custom software applications, web tools, and automated workflows that integrate your existing systems, eliminate manual data entry, and help your team scale without adding operational overhead."
            }
          },
          {
            "@type": "Question",
            "name": "How does Redevise decide between building custom software vs subscribing to SaaS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We help clients audit their tool stack. If off-the-shelf SaaS creates integration debt or becomes a process bottleneck, we design custom integration layers or custom web applications that adapt exactly to your workflows."
            }
          },
          {
            "@type": "Question",
            "name": "What payment gateways does Redevise integrate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We integrate payment gateways tailored to local and international markets, including Paystack, Hubtel, Stripe, and M-Pesa, complete with built-in inventory tracking."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a typical system design and automation project take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We operate on sprint-based development cycles, providing weekly staging links. A typical workflow automation or dashboard setup is completed in 3 to 6 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Does Redevise build custom AI chatbots?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We build intelligent, context-aware AI chatbots and knowledge base agents that integrate directly into your WhatsApp channels, CRM, or support desks to automate manual labor safely."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/services#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://redevise.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://redevise.com/services"
          }
        ]
      }
    ]
  };
}

export function getCustomSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://redevise.com/services/custom-software-development#service",
        "name": "Custom Software Development Studio",
        "serviceType": "Custom Web & Mobile Application Engineering",
        "description": "We build high-performance custom web applications, mobile apps, secure databases, and API integrations that match your workflows exactly. Fixed pricing.",
        "provider": {
          "@id": "https://redevise.com/#organization"
        },
        "areaServed": "Global",
        "termsOfService": "https://redevise.com/terms",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Custom Software Capabilities",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Apps" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom API Integrations" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Database Architecture" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://redevise.com/services/custom-software-development#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do we own the source code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Once the project is fully delivered and paid for, you receive complete ownership of the repository, source code, and all custom assets. There are no ongoing licensing fees."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a custom software build take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically between 4 to 12 weeks. We build in sprints and provide weekly staging updates, so you see the working software evolve in real-time."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle hosting and maintenance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We set up hosting directly on your own accounts (AWS, Vercel, or Cloudflare) so you maintain custody. We also offer monthly support SLA options to handle updates and optimizations."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/services/custom-software-development#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://redevise.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Custom Software Development", "item": "https://redevise.com/services/custom-software-development" }
        ]
      }
    ]
  };
}

export function getWorkflowAutomationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://redevise.com/services/workflow-automation#service",
        "name": "Workflow Automation & System Integration Services",
        "serviceType": "Business Process Automation & Systems Integration",
        "description": "Automate manual tasks, connect your CRM, billing, and databases, and deploy WhatsApp bots. We integrate systems to save your team hours of work.",
        "provider": {
          "@id": "https://redevise.com/#organization"
        },
        "areaServed": "Global",
        "termsOfService": "https://redevise.com/terms",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Automation Capabilities",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WhatsApp & Chat Automation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cross-System Integrations" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Operational Dashboards" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Back-Office Bots" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://redevise.com/services/workflow-automation#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can you automate legacy or off-the-shelf software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. As long as the software provides an API or webhook interface, we can connect it. If no API exists, we can build custom scraping or import tools to sync the data."
            }
          },
          {
            "@type": "Question",
            "name": "Do we need to pay for automation platforms like Zapier?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not necessarily. While we use Zapier or Make for simple triggers, we write custom serverless node scripts for complex integrations to save you monthly platform costs."
            }
          },
          {
            "@type": "Question",
            "name": "How do we measure the success of an automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We track the hours of manual work saved per week and the reduction of data entry errors. Most clients see a complete return on investment within 2 to 3 months of launch."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/services/workflow-automation#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://redevise.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Workflow Automation", "item": "https://redevise.com/services/workflow-automation" }
        ]
      }
    ]
  };
}

export function getOctoberGrowthSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://redevise.com/promos/october-growth#product",
        "name": "October Growth Package",
        "description": "Complete business website, Google Search setup, custom domain, and professional email for GH₵ 3,000.",
        "brand": {
          "@id": "https://redevise.com/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "3000",
          "priceCurrency": "GHS",
          "priceValidUntil": "2026-11-30",
          "availability": "https://schema.org/InStock",
          "url": "https://redevise.com/promos/october-growth",
          "seller": {
            "@id": "https://redevise.com/#organization"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/promos/october-growth#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Promotions", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 3, "name": "October Growth Package", "item": "https://redevise.com/promos/october-growth" }
        ]
      }
    ]
  };
}

export function getEstimateSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://redevise.com/estimate#app",
        "name": "Redevise Project Cost Estimator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All modern web browsers",
        "description": "Interactive project estimator for custom web apps, mobile apps, websites, and business software.",
        "url": "https://redevise.com/estimate",
        "creator": {
          "@id": "https://redevise.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/estimate#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Project Estimator", "item": "https://redevise.com/estimate" }
        ]
      }
    ]
  };
}

export function getAboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://redevise.com/about#webpage",
        "url": "https://redevise.com/about",
        "name": "About Redevise",
        "description": "Part product company, part engineering studio, part consulting firm. Built around one rule: if the improvement isn't dramatic, we don't build it.",
        "isPartOf": {
          "@id": "https://redevise.com/#website"
        },
        "about": {
          "@id": "https://redevise.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/about#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://redevise.com/about" }
        ]
      }
    ]
  };
}

export function getProcessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://redevise.com/process#webpage",
        "url": "https://redevise.com/process",
        "name": "How Redevise Works | Our Process",
        "description": "Fixed pricing, weekly staging updates, no going dark. Here's exactly how every Redevise project runs, from discovery to launch.",
        "isPartOf": {
          "@id": "https://redevise.com/#website"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/process#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Our Process", "item": "https://redevise.com/process" }
        ]
      }
    ]
  };
}

export function getBlogListSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://redevise.com/blog#collection",
        "url": "https://redevise.com/blog",
        "name": "Redevise Blog | Systems, Software & Operations",
        "description": "Straight talk on automation, custom software, support operations, and the operational decisions that actually move businesses forward.",
        "isPartOf": {
          "@id": "https://redevise.com/#website"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/blog#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://redevise.com/blog" }
        ]
      }
    ]
  };
}

export function getCareersSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://redevise.com/careers#webpage",
        "url": "https://redevise.com/careers",
        "name": "Careers | Work with Redevise",
        "description": "Join our team of high-performance developers, designers, and systems architects building the future of operations.",
        "isPartOf": {
          "@id": "https://redevise.com/#website"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://redevise.com/careers#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://redevise.com" },
          { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://redevise.com/careers" }
        ]
      }
    ]
  };
}

export function getChurchSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://church.redevise.com/#website",
        "url": "https://church.redevise.com/",
        "name": "Redevise Church Ecosystem",
        "description": "High-performance church presentation software, media systems, and management solutions.",
        "publisher": {
          "@id": "https://redevise.com/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://church.redevise.com/#software",
        "name": "Ascribe",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows, macOS",
        "description": "Presentation software designed specifically for churches. Clean, reliable, and built for worship teams running the service.",
        "url": "https://church.redevise.com",
        "creator": {
          "@id": "https://redevise.com/#organization"
        }
      },
      {
        "@type": "Service",
        "@id": "https://church.redevise.com/#services",
        "name": "Church Media & Systems Engineering",
        "serviceType": "Church Technology Consulting & Media Systems",
        "provider": {
          "@id": "https://redevise.com/#organization"
        },
        "description": "Specialized consulting, media system engineering, and presentation setup for churches and ministry teams."
      }
    ]
  };
}

export function getBlogPostSchema(post, pageUrl) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#blogposting`,
        "mainEntityOfPage": pageUrl,
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date ? `${post.date}T00:00:00+00:00` : "2026-01-01T00:00:00+00:00",
        "dateModified": post.date ? `${post.date}T00:00:00+00:00` : "2026-01-01T00:00:00+00:00",
        "author": {
          "@type": "Organization",
          "name": post.author || "Redevise",
          "url": "https://redevise.com"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://redevise.com/#organization",
          "name": "Redevise",
          "logo": {
            "@type": "ImageObject",
            "url": "https://redevise.com/redevise.png"
          }
        },
        "image": post.coverImage || "https://redevise.com/redevise.png",
        "keywords": post.tags || []
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://redevise.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://redevise.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": pageUrl
          }
        ]
      }
    ]
  };
}
