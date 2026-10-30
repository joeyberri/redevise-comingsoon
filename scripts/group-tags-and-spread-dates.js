import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

const tagToGroup = {
  // Custom Software
  'Custom Software': 'Custom Software',
  'custom-software': 'Custom Software',
  'Custom Development': 'Custom Software',
  'Web Development': 'Custom Software',
  'Mobile Apps': 'Custom Software',
  'Admin Tools': 'Custom Software',
  'System Architecture': 'Custom Software',
  'Systems Architecture': 'Custom Software',
  'Architecture': 'Custom Software',
  'Engineering': 'Custom Software',
  'Development': 'Custom Software',
  'software-development': 'Custom Software',
  'SaaS': 'Custom Software',
  'API': 'Custom Software',
  'API Integration': 'Custom Software',
  'api-integration': 'Custom Software',
  'Integration': 'Custom Software',
  'Developer Experience': 'Custom Software',
  'DX': 'Custom Software',
  'Legacy Software': 'Custom Software',
  'Build vs Buy': 'Custom Software',
  'No-Code': 'Custom Software',
  'Tech Stack': 'Custom Software',
  'Technical Debt': 'Custom Software',
  'Startup Engineering': 'Custom Software',
  'MVP': 'Custom Software',
  'Product Design': 'Custom Software',
  'UX': 'Custom Software',
  'Design': 'Custom Software',
  'vendor-selection': 'Custom Software',
  'Reliability': 'Custom Software',
  'Cost Estimator': 'Custom Software',

  // Workflow Automation
  'Workflow Automation': 'Workflow Automation',
  'workflow-automation': 'Workflow Automation',
  'Automation': 'Workflow Automation',
  'business-automation': 'Workflow Automation',
  'Workflows': 'Workflow Automation',
  'WhatsApp': 'Workflow Automation',
  'whatsapp-api-ghana': 'Workflow Automation',
  'whatsapp-business-automation': 'Workflow Automation',
  'whatsapp-chatbot-ghana': 'Workflow Automation',
  'CRM': 'Workflow Automation',
  'ERP': 'Workflow Automation',

  // Operations & Strategy
  'Operations': 'Operations & Strategy',
  'Optimization': 'Operations & Strategy',
  'Business Strategy': 'Operations & Strategy',
  'Productivity': 'Operations & Strategy',
  'Behavioral Psychology': 'Operations & Strategy',
  'Habit Systems': 'Operations & Strategy',
  'Habit Formation': 'Operations & Strategy',
  'Professional Services': 'Operations & Strategy',
  'Product Operations': 'Operations & Strategy',
  'Tool Evaluation': 'Operations & Strategy',
  'Retention': 'Operations & Strategy',
  'SME Operations': 'Operations & Strategy',
  'Human Resources': 'Operations & Strategy',
  'HR': 'Operations & Strategy',
  'Onboarding': 'Operations & Strategy',
  'Process': 'Operations & Strategy',
  'Growth': 'Operations & Strategy',
  'Sales': 'Operations & Strategy',
  'Lead Generation': 'Operations & Strategy',
  'Product': 'Operations & Strategy',
  'Brand Management': 'Operations & Strategy',
  'Recruitment': 'Operations & Strategy',

  // AI & Intelligence
  'AI': 'AI & Intelligence',
  'Machine Learning': 'AI & Intelligence',
  'Data Insights': 'AI & Intelligence',
  'Analytics': 'AI & Intelligence',
  'Dashboard Design': 'AI & Intelligence',

  // Customer Support
  'Customer Support': 'Customer Support',
  'Customer Service': 'Customer Support',
  'SupporTribe': 'Customer Support',

  // Fintech & Payments
  'Fintech': 'Fintech & Payments',
  'fintech': 'Fintech & Payments',
  'Payments': 'Fintech & Payments',
  'payments': 'Fintech & Payments',
  'online-payments': 'Fintech & Payments',
  'Mobile Money': 'Fintech & Payments',
  'mobile-money': 'Fintech & Payments',
  'paystack-ghana': 'Fintech & Payments',
  'flutterwave-integration': 'Fintech & Payments',
  'payment-gateway-ghana': 'Fintech & Payments',
  'Accounting': 'Fintech & Payments',
  'Microfinance': 'Fintech & Payments',
  'Susu': 'Fintech & Payments',
  'Forex': 'Fintech & Payments',
  'POS': 'Fintech & Payments',
  'Utility Billing': 'Fintech & Payments',
  'Payroll': 'Fintech & Payments',

  // EdTech & Schools
  'Education': 'EdTech & Schools',
  'EdTech': 'EdTech & Schools',
  'School Systems': 'EdTech & Schools',
  'SkulSys': 'EdTech & Schools',
  'Ghana Education': 'EdTech & Schools',
  'International Schools': 'EdTech & Schools',
  'Academia': 'EdTech & Schools',
  'Research': 'EdTech & Schools',
  'CitationPro': 'EdTech & Schools',
  'Admissions': 'EdTech & Schools',
  'Tutoring': 'EdTech & Schools',
  'Vocational': 'EdTech & Schools',
  'Childcare': 'EdTech & Schools',

  // Church Technology
  'Church Tech': 'Church Technology',
  'Church': 'Church Technology',
  'Faith': 'Church Technology',
  'Ascribe': 'Church Technology',
  'Presentation Software': 'Church Technology',
  'Streaming': 'Church Technology',

  // Ghana Business
  'Ghana Business': 'Ghana Business',
  'Ghana': 'Ghana Business',
  'ghana': 'Ghana Business',
  'Ghana Tech': 'Ghana Business',
  'ghana-tech': 'Ghana Business',
  'West Africa': 'Ghana Business',
  'west-africa': 'Ghana Business',
  'accra': 'Ghana Business',
  'sme': 'Ghana Business',
  'Local SEO': 'Ghana Business',
  'SEO': 'Ghana Business',

  // Industry Solutions
  'Healthcare': 'Industry Solutions',
  'Dermatology': 'Industry Solutions',
  'Aesthetics': 'Industry Solutions',
  'Dental': 'Industry Solutions',
  'Optometry': 'Industry Solutions',
  'Physiotherapy': 'Industry Solutions',
  'Wellness': 'Industry Solutions',
  'Spa': 'Industry Solutions',
  'Pilates': 'Industry Solutions',
  'Fitness': 'Industry Solutions',
  'Hospitality': 'Industry Solutions',
  'Hotels': 'Industry Solutions',
  'Resorts': 'Industry Solutions',
  'Short-Let': 'Industry Solutions',
  'Restaurants': 'Industry Solutions',
  'Catering': 'Industry Solutions',
  'Booking Engine': 'Industry Solutions',
  'Real Estate': 'Industry Solutions',
  'Property Management': 'Industry Solutions',
  'Property Development': 'Industry Solutions',
  'Valuation': 'Industry Solutions',
  'Landscaping': 'Industry Solutions',
  'Virtual Tours': 'Industry Solutions',
  'Logistics': 'Industry Solutions',
  'Freight': 'Industry Solutions',
  'Transportation': 'Industry Solutions',
  'Car Rental': 'Industry Solutions',
  'Moving': 'Industry Solutions',
  'Relocation': 'Industry Solutions',
  'Supply Chain': 'Industry Solutions',
  'Retail': 'Industry Solutions',
  'E-Commerce': 'Industry Solutions',
  'E-commerce': 'Industry Solutions',
  'Wholesale': 'Industry Solutions',
  'B2B': 'Industry Solutions',
  'Luxury Retail': 'Industry Solutions',
  'Supermarkets': 'Industry Solutions',
  'Clienteling': 'Industry Solutions',
  'VIP Experience': 'Industry Solutions',
  'Inventory': 'Industry Solutions',
  'Inventory Sync': 'Industry Solutions',
  'Field Services': 'Industry Solutions',
  'Roofing': 'Industry Solutions',
  'Construction': 'Industry Solutions',
  'Plumbing': 'Industry Solutions',
  'HVAC': 'Industry Solutions',
  'Solar': 'Industry Solutions',
  'Energy': 'Industry Solutions',
  'Cleaning': 'Industry Solutions',
  'Pest Control': 'Industry Solutions',
  'Maintenance': 'Industry Solutions',
  'Security': 'Industry Solutions',
  'Legal': 'Industry Solutions',
  'Conflict Checks': 'Industry Solutions',
  'Compliance': 'Industry Solutions',
  'Consulting': 'Industry Solutions',
  'Advisory': 'Industry Solutions',
  'Insurance': 'Industry Solutions',
  'Events': 'Industry Solutions',
  'Venues': 'Industry Solutions',
  'Media': 'Industry Solutions',
  'Sports': 'Industry Solutions',
  'Football': 'Industry Solutions',
  'Martial Arts': 'Industry Solutions',
  'Academy Management': 'Industry Solutions',
  'Commercial': 'Industry Solutions',
  'Immigration': 'Industry Solutions',
  'Cooperatives': 'Industry Solutions',
  'Printing': 'Industry Solutions',
  'Publishing': 'Industry Solutions',
  'Matchmaking': 'Industry Solutions',
  'Subscriptions': 'Industry Solutions',
  'SMS': 'Industry Solutions',
  'Services': 'Industry Solutions',
  'Automotive': 'Industry Solutions',
  'Travel': 'Industry Solutions',
  'Tours': 'Industry Solutions'
};

const tagPriority = [
  'Fintech & Payments',
  'EdTech & Schools',
  'Church Technology',
  'Customer Support',
  'AI & Intelligence',
  'Industry Solutions',
  'Custom Software',
  'Workflow Automation',
  'Operations & Strategy',
  'Ghana Business'
];

function getGroupedTags(rawTags) {
  const groups = new Set();
  rawTags.forEach(t => {
    const g = tagToGroup[t];
    if (g) groups.add(g);
  });

  if (groups.size === 0) {
    groups.add('Operations & Strategy');
  }

  // Sort groups according to tagPriority
  const sorted = Array.from(groups).sort((a, b) => {
    return tagPriority.indexOf(a) - tagPriority.indexOf(b);
  });

  return sorted.slice(0, 3);
}

function run() {
  const dirs = fs.readdirSync(BLOG_DIR).filter(f => fs.statSync(path.join(BLOG_DIR, f)).isDirectory());
  console.log(`Found ${dirs.length} blog posts.`);

  const posts = [];
  dirs.forEach(slug => {
    const filePath = path.join(BLOG_DIR, slug, 'index.mdoc');
    if (!fs.existsSync(filePath)) return;
    const raw = fs.readFileSync(filePath, 'utf-8');

    // Extract frontmatter block
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return;
    const frontmatterText = fmMatch[1];
    const body = raw.slice(fmMatch[0].length);

    // Extract current date
    const dateMatch = frontmatterText.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
    const currentDate = dateMatch ? dateMatch[1] : '2026-01-01';

    // Extract raw tags
    const rawTags = [];
    const tagsBlockMatch = frontmatterText.match(/^tags:\s*\r?\n((?:\s*-\s*['"]?[^\r\n]+['"]?\r?\n?)*)/m);
    if (tagsBlockMatch && tagsBlockMatch[1]) {
      tagsBlockMatch[1].split(/\r?\n/).forEach(line => {
        const m = line.match(/^\s*-\s*['"]?([^'"]+?)['"]?\s*$/);
        if (m) rawTags.push(m[1].trim());
      });
    }

    posts.push({
      slug,
      filePath,
      frontmatterText,
      body,
      currentDate,
      rawTags
    });
  });

  // Sort posts by their current date to preserve chronological progression
  posts.sort((a, b) => {
    const cmp = a.currentDate.localeCompare(b.currentDate);
    if (cmp !== 0) return cmp;
    return a.slug.localeCompare(b.slug);
  });

  // Distribute dates from 2022-01-18 to 2026-10-24
  const startDate = new Date('2022-01-18T10:00:00Z');
  const endDate = new Date('2026-10-24T10:00:00Z');
  const totalTime = endDate.getTime() - startDate.getTime();
  const totalPosts = posts.length;

  const yearStats = {};
  const tagStats = {};

  posts.forEach((post, index) => {
    // Generate new date
    const targetTime = startDate.getTime() + (index / (totalPosts - 1)) * totalTime;
    const d = new Date(targetTime);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const newDateStr = `${yyyy}-${mm}-${dd}`;

    yearStats[yyyy] = (yearStats[yyyy] || 0) + 1;

    // Generate grouped tags
    const newTags = getGroupedTags(post.rawTags);
    newTags.forEach(t => {
      tagStats[t] = (tagStats[t] || 0) + 1;
    });

    // Reconstruct frontmatter
    let updatedFm = post.frontmatterText;

    // Replace date:
    if (/^date:\s*.*$/m.test(updatedFm)) {
      updatedFm = updatedFm.replace(/^date:\s*.*$/m, `date: "${newDateStr}"`);
    } else {
      updatedFm += `\ndate: "${newDateStr}"`;
    }

    // Replace tags: block
    const formattedTags = 'tags:\n' + newTags.map(t => `  - "${t}"`).join('\n');
    if (/^tags:\s*\r?\n((?:\s*-\s*['"]?[^\r\n]+['"]?\r?\n?)*)/m.test(updatedFm)) {
      updatedFm = updatedFm.replace(/^tags:\s*\r?\n((?:\s*-\s*['"]?[^\r\n]+['"]?\r?\n?)*)/m, formattedTags + '\n');
    } else {
      updatedFm += `\n${formattedTags}`;
    }

    // Combine and write back
    const newFullContent = `---\n${updatedFm.trim()}\n---${post.body}`;
    fs.writeFileSync(post.filePath, newFullContent, 'utf-8');
  });

  console.log(`✅ Successfully updated ${posts.length} posts with grouped tags and 2022-2026 dates.`);
  console.log('\nYear distribution:');
  console.table(yearStats);
  console.log('\nGrouped Tag distribution:');
  console.table(tagStats);
}

run();
