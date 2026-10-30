/**
 * generate-sitemap.js
 * 
 * Scans src/content/blog/ for all blog post directories,
 * and rebuilds public/sitemap.xml with all blog post URLs appended.
 * 
 * Run: node scripts/generate-sitemap.js
 * Automatically runs during `npm run build`.
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml');
const SITE_URL = 'https://redevise.com';

// Static pages that are always in the sitemap
const staticPages = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/custom-software-development', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/workflow-automation', changefreq: 'monthly', priority: '0.9' },
  { loc: '/process', changefreq: 'monthly', priority: '0.8' },
  { loc: '/estimate', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
  { loc: '/careers', changefreq: 'monthly', priority: '0.7' },
  { loc: '/gh', changefreq: 'monthly', priority: '0.9' },
  { loc: '/promos/october-growth', changefreq: 'weekly', priority: '0.9' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.3' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.3' },
];

// Church pages
const churchPages = [
  { loc: '/', changefreq: 'monthly', priority: '0.9', host: 'https://church.redevise.com' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7', host: 'https://church.redevise.com' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.3', host: 'https://church.redevise.com' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.3', host: 'https://church.redevise.com' },
];

function getDateStr() {
  return new Date().toISOString().split('T')[0];
}

function parseFrontmatter(content) {
  const dateMatch = content.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
  const titleMatch = content.match(/^title:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  const coverMatch = content.match(/^coverImage:\s*['"]?([\s\S]*?)['"]?\r?$/m);
  return {
    date: dateMatch ? dateMatch[1] : getDateStr(),
    title: titleMatch ? titleMatch[1].trim() : '',
    coverImage: coverMatch ? coverMatch[1].trim() : ''
  };
}

function getSlugs() {
  try {
    return readdirSync(BLOG_DIR)
      .filter((name) => {
        const fullPath = join(BLOG_DIR, name);
        return statSync(fullPath).isDirectory();
      })
      .map((slug) => {
        // Try to read metadata from the post frontmatter
        const postFile = join(BLOG_DIR, slug, 'index.mdoc');
        let meta = { date: getDateStr(), title: '', coverImage: '' };
        try {
          const content = readFileSync(postFile, 'utf-8');
          meta = parseFrontmatter(content);
        } catch {
          // Use today's date as fallback
        }
        return { slug, ...meta };
      });
  } catch {
    console.log('⚠  No blog directory found. Creating sitemap without blog posts.');
    return [];
  }
}

function buildSitemap() {
  const today = getDateStr();
  const slugs = getSlugs();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Static pages
  xml += `  <!-- Main Site -->\n`;
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Blog posts
  if (slugs.length > 0) {
    xml += `\n  <!-- Blog Posts -->\n`;
    for (const { slug, date, title, coverImage } of slugs) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/${slug}</loc>\n`;
      xml += `    <lastmod>${date}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      if (coverImage) {
        const cleanTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const cleanUrl = coverImage.replace(/&/g, '&amp;');
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${cleanUrl}</image:loc>\n`;
        if (cleanTitle) {
          xml += `      <image:title>${cleanTitle}</image:title>\n`;
        }
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }
  }

  // Church pages
  xml += `\n  <!-- Church Vertical -->\n`;
  for (const page of churchPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${page.host}${page.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  writeFileSync(SITEMAP_PATH, xml, 'utf-8');
  console.log(`✅ Sitemap generated with ${staticPages.length + slugs.length + churchPages.length} URLs (${slugs.length} blog posts)`);
}

buildSitemap();
