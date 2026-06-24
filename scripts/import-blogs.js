/* eslint-env node */
/**
 * import-blogs.js
 * 
 * Reads a JSON file containing an array of blog post objects and creates
 * individual .mdoc files in src/content/blog/ for each entry.
 * 
 * Usage:
 *   node scripts/import-blogs.js <path-to-json-file>
 * 
 * JSON format:
 * [
 *   {
 *     "title": "My Article Title",
 *     "slug": "my-article-title",           (optional — auto-generated from title)
 *     "date": "2026-06-22",                 (optional — defaults to today)
 *     "summary": "A short description...",
 *     "tags": ["Tag1", "Tag2"],             (optional)
 *     "author": "Author Name",             (optional — defaults to "Redevise")
 *     "coverImage": "",                     (optional)
 *     "content": "# Markdown Content\n\nBody of the article..."
 *   }
 * ]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function createPost(post) {
  const slug = post.slug || slugify(post.title);
  const postDir = join(BLOG_DIR, slug);

  if (existsSync(postDir)) {
    console.log(`⚠  Skipping "${post.title}" — slug "${slug}" already exists.`);
    return false;
  }

  mkdirSync(postDir, { recursive: true });

  const tags = Array.isArray(post.tags) && post.tags.length > 0
    ? '\ntags:\n' + post.tags.map((t) => `  - "${t}"`).join('\n')
    : '\ntags: []';

  const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date || getToday()}"
summary: "${(post.summary || '').replace(/"/g, '\\"')}"
coverImage: "${post.coverImage || ''}"${tags}
author: "${post.author || 'Redevise'}"
---`;

  const content = `${frontmatter}\n\n${post.content || ''}`;
  const filePath = join(postDir, 'index.mdoc');

  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created: ${slug}`);
  return true;
}

// Main
const jsonPath = process.argv[2];

if (!jsonPath) {
  console.error('❌ Usage: node scripts/import-blogs.js <path-to-json-file>');
  console.error('');
  console.error('Example JSON format:');
  console.error('[');
  console.error('  {');
  console.error('    "title": "My Article",');
  console.error('    "summary": "A description...",');
  console.error('    "tags": ["Tag1"],');
  console.error('    "content": "# Heading\\n\\nBody text..."');
  console.error('  }');
  console.error(']');
  process.exit(1);
}

try {
  const raw = readFileSync(resolve(jsonPath), 'utf-8');
  const posts = JSON.parse(raw);

  if (!Array.isArray(posts)) {
    console.error('❌ JSON file must contain an array of post objects.');
    process.exit(1);
  }

  console.log(`📥 Importing ${posts.length} blog post(s)...\n`);

  let created = 0;
  for (const post of posts) {
    if (!post.title) {
      console.log('⚠  Skipping entry with missing title.');
      continue;
    }
    if (createPost(post)) created++;
  }

  console.log(`\n🎉 Done! ${created}/${posts.length} posts imported.`);
  console.log('💡 Run "npm run build" to regenerate the sitemap and deploy.');
} catch (err) {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
}
