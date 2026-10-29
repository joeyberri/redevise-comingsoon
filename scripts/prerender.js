import fs from 'fs';
import path from 'path';
import {
  getHomeSchema,
  getGhanaSchema,
  getServicesSchema,
  getCustomSoftwareSchema,
  getWorkflowAutomationSchema,
  getOctoberGrowthSchema,
  getEstimateSchema,
  getAboutSchema,
  getProcessSchema,
  getBlogListSchema,
  getCareersSchema,
  getBlogPostSchema
} from './schemas.js';

const SITE_URL = 'https://redevise.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

const staticRoutes = [
  {
    path: 'about',
    title: 'About Redevise | Built Around Results',
    description: "Part product company, part engineering studio, part consulting firm. Built around one rule: if the improvement isn't dramatic, we don't build it.",
    schema: getAboutSchema()
  },
  {
    path: 'services',
    title: 'Redevise Services | Build Custom Software & Automate Workflows',
    description: 'We build custom software, automate workflows, and optimize operations. We build what your business actually needs — not what sounds good in a pitch.',
    schema: getServicesSchema()
  },
  {
    path: 'services/custom-software-development',
    title: 'Custom Software Development Studio | Redevise',
    description: 'We build high-performance custom web applications, mobile apps, secure databases, and API integrations that match your workflows exactly. Fixed pricing.',
    schema: getCustomSoftwareSchema()
  },
  {
    path: 'services/workflow-automation',
    title: 'Workflow Automation & System Integration Services | Redevise',
    description: 'Automate manual tasks, connect your CRM, billing, and databases, and deploy WhatsApp bots. We integrate systems to save your team hours of work.',
    schema: getWorkflowAutomationSchema()
  },
  {
    path: 'process',
    title: 'How Redevise Works | Our Process',
    description: 'Fixed pricing, weekly staging updates, no going dark. Here\'s exactly how every Redevise project runs, from discovery to launch.',
    schema: getProcessSchema()
  },
  {
    path: 'estimate',
    title: 'Get a Project Estimate | Ballpark Pricing',
    description: 'Estimate the cost of your custom web app, mobile app, website, e-commerce store, or business software with our interactive project estimator.',
    schema: getEstimateSchema()
  },
  {
    path: 'blog',
    title: 'Redevise Blog | Systems, Software & Operations',
    description: 'Straight talk on automation, custom software, support operations, and the operational decisions that actually move businesses forward.',
    schema: getBlogListSchema()
  },
  {
    path: 'careers',
    title: 'Careers | Work with Redevise',
    description: 'Join our team of high-performance developers, designers, and systems architects building the future of operations.',
    schema: getCareersSchema()
  },
  {
    path: 'gh',
    title: 'Software Development in Ghana & West Africa | Redevise Accra',
    description: 'Custom software development, Mobile Money integrations, Paystack & Flutterwave setup, and workflow automation for businesses in Ghana and West Africa. Based in Accra.',
    schema: getGhanaSchema()
  },
  {
    path: 'promos/october-growth',
    title: 'October Growth Package | Business Website, Google Setup & Email | Redevise',
    description: 'Get found, look credible, and give people a clear way to contact you. Complete business website, Google Search setup, custom domain, and professional email for GH₵ 3,000.',
    schema: getOctoberGrowthSchema()
  },
  {
    path: 'terms',
    title: 'Terms of Service | Redevise',
    description: 'Terms and conditions governing client engagements, custom software contracts, and access to Redevise digital properties.',
    schema: null
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Redevise',
    description: 'How Redevise collects, handles, and protects client and visitor data in accordance with international and Ghanaian data protection laws.',
    schema: null
  }
];

function parseFrontmatter(raw) {
  const titleMatch = raw.match(/^title:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const summaryMatch = raw.match(/^summary:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const dateMatch = raw.match(/^date:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const coverMatch = raw.match(/^coverImage:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const authorMatch = raw.match(/^author:\s*['"]?([\s\S]*?)['"]?\r?$/m);

  const tags = [];
  const tagsBlockMatch = raw.match(/^tags:\s*\r?\n((?:\s*-\s*['"]?[^\r\n]+['"]?\r?\n?)*)/m);
  if (tagsBlockMatch && tagsBlockMatch[1]) {
    const lines = tagsBlockMatch[1].split(/\r?\n/);
    lines.forEach(line => {
      const tagMatch = line.match(/^\s*-\s*['"]?([^'"]+?)['"]?\s*$/);
      if (tagMatch) {
        tags.push(tagMatch[1].trim());
      }
    });
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    summary: summaryMatch ? summaryMatch[1].trim() : '',
    date: dateMatch ? dateMatch[1].trim() : '',
    coverImage: coverMatch ? coverMatch[1].trim() : '',
    author: authorMatch ? authorMatch[1].trim() : '',
    tags: tags
  };
}

function getBlogPosts() {
  try {
    const list = fs.readdirSync(BLOG_DIR);
    const posts = [];
    list.forEach(name => {
      const fullPath = path.join(BLOG_DIR, name);
      if (fs.statSync(fullPath).isDirectory()) {
        const postFile = path.join(fullPath, 'index.mdoc');
        try {
          const raw = fs.readFileSync(postFile, 'utf-8');
          const meta = parseFrontmatter(raw);
          posts.push({
            slug: name,
            title: meta.title || name.replace(/-/g, ' '),
            description: meta.summary || '',
            date: meta.date || '',
            coverImage: meta.coverImage || '',
            author: meta.author || '',
            tags: meta.tags || []
          });
        } catch {
          // Skip if index.mdoc doesn't exist
        }
      }
    });
    return posts;
  } catch {
    console.log('⚠  No blog directory found. Skipping blog posts prerendering.');
    return [];
  }
}

function replaceMetadata(template, title, description, pageUrl, schemaJson) {
  let html = template;

  // Replace Title Tag
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // Replace Description Tag
  html = html.replace(/<meta name="description"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="description" content="${description}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:url" content="${pageUrl}" />`);

  // Replace Twitter Tags
  html = html.replace(/<meta name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`);

  // Replace Canonical Link
  html = html.replace(/<link rel="canonical"\s+href="[\s\S]*?"\s*\/?>/, `<link rel="canonical" href="${pageUrl}/" />`);

  // Replace JSON-LD schema with route-specific schema graph
  if (schemaJson) {
    const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n  </script>`;
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdString);
  } else {
    html = html.replace(/"description":\s*"[\s\S]*?"/, `"description": "${description}"`);
  }

  return html;
}

function runPrerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Template index.html not found at: ${TEMPLATE_PATH}. Run vite build first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // 1. Ensure Root Homepage in dist has master Home Schema
  const homeSchema = getHomeSchema();
  const rootHtml = replaceMetadata(
    template,
    'Redevise | Build Custom Software & Automate Workflows',
    'We build custom software and automate workflows. High-performance web applications, mobile apps, and custom system integrations that actually work.',
    SITE_URL,
    homeSchema
  );
  fs.writeFileSync(TEMPLATE_PATH, rootHtml, 'utf-8');
  console.log('✅ Injected master Knowledge Graph into dist/index.html');

  // 2. Prerender Static Pages
  staticRoutes.forEach(route => {
    const routeDir = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const pageUrl = `${SITE_URL}/${route.path}`;
    const pageHtml = replaceMetadata(template, route.title, route.description, pageUrl, route.schema);
    fs.writeFileSync(path.join(routeDir, 'index.html'), pageHtml, 'utf-8');
  });

  console.log(`✅ Prerendered ${staticRoutes.length} static page routes with route-specific schemas.`);

  // 3. Prerender Blog Posts
  const posts = getBlogPosts();
  posts.forEach(post => {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    const pageUrl = `${SITE_URL}/blog/${post.slug}`;
    const postTitle = `${post.title} | Redevise Blog`;
    const postSchema = getBlogPostSchema(post, pageUrl);
    const pageHtml = replaceMetadata(template, postTitle, post.description, pageUrl, postSchema);
    fs.writeFileSync(path.join(postDir, 'index.html'), pageHtml, 'utf-8');
  });

  console.log(`✅ Prerendered ${posts.length} blog post routes with BlogPosting & BreadcrumbList schemas.`);
}

runPrerender();
