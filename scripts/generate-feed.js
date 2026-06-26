/**
 * generate-feed.js
 * 
 * Scans src/content/blog/ for all blog post directories,
 * and compiles public/feed.xml as a standard RSS 2.0 feed with full content encoded.
 * 
 * Run: node scripts/generate-feed.js
 * Automatically runs during `npm run build`.
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const FEED_PATH = join(ROOT, 'public', 'feed.xml');
const SITE_URL = 'https://redevise.com';

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function mdToHtml(markdown) {
  if (!markdown) return '';
  // Normalize newlines
  let text = markdown.replace(/\r\n/g, '\n');

  // Convert basic markdown formatting to HTML
  text = text
    // Convert headers
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // Convert links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Convert bold **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Convert italics *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Convert blockquotes
    .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');

  // Wrap paragraphs in <p> tags
  return text
    .split(/\n\n+/)
    .map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

function getPosts() {
  try {
    return readdirSync(BLOG_DIR)
      .filter((name) => {
        const fullPath = join(BLOG_DIR, name);
        return statSync(fullPath).isDirectory();
      })
      .map((slug) => {
        const postFile = join(BLOG_DIR, slug, 'index.mdoc');
        const content = readFileSync(postFile, 'utf-8');
        
        // Parse frontmatter
        const fmMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
        const frontmatterText = fmMatch ? fmMatch[1] : '';
        const body = content.replace(/^---\r?\n[\s\S]+?\r?\n---/, '').trim();
        
        const titleMatch = frontmatterText.match(/^title:\s*"(.*?)"/m) || frontmatterText.match(/^title:\s*(.*?)$/m);
        const dateMatch = frontmatterText.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
        const summaryMatch = frontmatterText.match(/^summary:\s*"(.*?)"/m) || frontmatterText.match(/^summary:\s*(.*?)$/m);
        const authorMatch = frontmatterText.match(/^author:\s*"(.*?)"/m) || frontmatterText.match(/^author:\s*(.*?)$/m);
        const coverImageMatch = frontmatterText.match(/^coverImage:\s*"(.*?)"/m) || frontmatterText.match(/^coverImage:\s*(.*?)$/m);

        return {
          slug,
          title: titleMatch ? titleMatch[1].replace(/\\"/g, '"') : slug,
          date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
          summary: summaryMatch ? summaryMatch[1].replace(/\\"/g, '"') : '',
          author: authorMatch ? authorMatch[1] : 'Redevise',
          coverImage: coverImageMatch ? coverImageMatch[1] : '',
          body
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error('⚠ Error reading blog posts for feed generation:', err.message);
    return [];
  }
}

function buildFeed() {
  const posts = getPosts();
  if (posts.length === 0) {
    console.log('⚠ No blog posts found. Skipping RSS feed generation.');
    return;
  }

  const lastBuildDate = new Date().toUTCString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0"\n`;
  xml += `  xmlns:content="http://purl.org/rss/1.0/modules/content/"\n`;
  xml += `  xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>Redevise Blog</title>\n`;
  xml += `    <link>${SITE_URL}/blog</link>\n`;
  xml += `    <description>Deep dives into optimization infrastructure, intelligent systems, and operations.</description>\n`;
  xml += `    <language>en-us</language>\n`;
  xml += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;
  xml += `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n`;

  for (const post of posts) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    const htmlContent = mdToHtml(post.body);

    xml += `    <item>\n`;
    xml += `      <title>${escapeXml(post.title)}</title>\n`;
    xml += `      <link>${postUrl}</link>\n`;
    xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <author>${escapeXml(post.author)}</author>\n`;
    xml += `      <description>${escapeXml(post.summary)}</description>\n`;
    xml += `      <content:encoded><![CDATA[${htmlContent.replace(/]]>/g, ']]&gt;')}]]></content:encoded>\n`;
    xml += `    </item>\n`;
  }

  xml += `  </channel>\n`;
  xml += `</rss>\n`;

  writeFileSync(FEED_PATH, xml, 'utf-8');
  console.log(`✅ RSS Feed generated at public/feed.xml with ${posts.length} entries`);
}

buildFeed();
