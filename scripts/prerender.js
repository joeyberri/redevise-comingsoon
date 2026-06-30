import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://redevise.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

const staticRoutes = [
  {
    path: 'about',
    title: 'About Redevise | Built Around Results',
    description: "Part product company, part engineering studio, part consulting firm. Built around one rule: if the improvement isn't dramatic, we don't build it."
  },
  {
    path: 'services',
    title: 'Redevise Services | Build Custom Software & Automate Workflows',
    description: 'We build custom software, automate workflows, and optimize operations. We build what your business actually needs — not what sounds good in a pitch.'
  },
  {
    path: 'services/custom-software-development',
    title: 'Custom Software Development Studio | Redevise',
    description: 'We build high-performance custom web applications, mobile apps, secure databases, and API integrations that match your workflows exactly. Fixed pricing.'
  },
  {
    path: 'services/workflow-automation',
    title: 'Workflow Automation & System Integration Services | Redevise',
    description: 'Automate manual tasks, connect your CRM, billing, and databases, and deploy WhatsApp bots. We integrate systems to save your team hours of work.'
  },
  {
    path: 'process',
    title: 'How Redevise Works | Our Process',
    description: 'Fixed pricing, weekly staging updates, no going dark. Here\'s exactly how every Redevise project runs, from discovery to launch.'
  },
  {
    path: 'estimate',
    title: 'Get a Project Estimate | Ballpark Pricing',
    description: 'Estimate the cost of your custom web app, mobile app, website, e-commerce store, or business software with our interactive project estimator.'
  },
  {
    path: 'blog',
    title: 'Redevise Blog | Systems, Software & Operations',
    description: 'Straight talk on automation, custom software, support operations, and the operational decisions that actually move businesses forward.'
  },
  {
    path: 'careers',
    title: 'Careers | Work with Redevise',
    description: 'Join our team of high-performance developers, designers, and systems architects building the future of operations.'
  },
  {
    path: 'gh',
    title: 'Software Development in Ghana & West Africa | Redevise Accra',
    description: 'Custom software development, Mobile Money integrations, Paystack & Flutterwave setup, and workflow automation for businesses in Ghana and West Africa. Based in Accra.'
  }
];

function parseFrontmatter(raw) {
  const titleMatch = raw.match(/^title:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const summaryMatch = raw.match(/^summary:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const dateMatch = raw.match(/^date:\s*['"]?([\s\S]*?)['"]?\r?$/m);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    summary: summaryMatch ? summaryMatch[1].trim() : '',
    date: dateMatch ? dateMatch[1].trim() : ''
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
            description: meta.summary || ''
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

function replaceMetadata(template, title, description, pageUrl) {
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

  // Replace JSON-LD schema description (best effort)
  html = html.replace(/"description":\s*"[\s\S]*?"/, `"description": "${description}"`);

  return html;
}

function runPrerender() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Template index.html not found at: ${TEMPLATE_PATH}. Run vite build first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // 1. Prerender Static Pages
  staticRoutes.forEach(route => {
    const routeDir = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const pageUrl = `${SITE_URL}/${route.path}`;
    const pageHtml = replaceMetadata(template, route.title, route.description, pageUrl);
    fs.writeFileSync(path.join(routeDir, 'index.html'), pageHtml, 'utf-8');
  });

  console.log(`✅ Prerendered ${staticRoutes.length} static page metadata routes.`);

  // 2. Prerender Blog Posts
  const posts = getBlogPosts();
  posts.forEach(post => {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    const pageUrl = `${SITE_URL}/blog/${post.slug}`;
    const postTitle = `${post.title} | Redevise Blog`;
    const pageHtml = replaceMetadata(template, postTitle, post.description, pageUrl);
    fs.writeFileSync(path.join(postDir, 'index.html'), pageHtml, 'utf-8');
  });

  console.log(`✅ Prerendered ${posts.length} blog post metadata routes.`);
}

runPrerender();
