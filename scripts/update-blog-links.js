import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      if (file.endsWith('.mdoc')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function linkFirstOccurrence(body, targetRegex, replaceFn, url) {
  if (body.includes(`(${url})`)) {
    return body;
  }
  let matched = false;
  return body.replace(targetRegex, (match, p1) => {
    if (!matched) {
      matched = true;
      return replaceFn(match, p1);
    }
    return match;
  });
}

function updateLinks() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog directory not found at: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = getFiles(BLOG_DIR);
  let updatedCount = 0;

  files.forEach(file => {
    let raw = fs.readFileSync(file, 'utf-8');
    const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
    if (!match) return;

    const frontmatter = match[0];
    let body = raw.slice(frontmatter.length);
    let originalBody = body;

    // 1. Replace legacy service hashes with new custom software landing page
    if (body.includes('/services#software')) {
      body = body.replaceAll('/services#software', '/services/custom-software-development');
    }
    if (body.includes('/services#ecommerce')) {
      body = body.replaceAll('/services#ecommerce', '/services/custom-software-development');
    }

    // 2. Link first occurrence of "project estimator" to /estimate if not already linked
    body = linkFirstOccurrence(
      body,
      /(?<!\[)\b(project estimator)\b(?!\])/i,
      (match, p1) => `[${p1}](/estimate)`,
      '/estimate'
    );

    // 3. Link first occurrence of "workflow automation" to /services/workflow-automation if not already linked
    body = linkFirstOccurrence(
      body,
      /(?<!\[)\b(workflow automation)\b(?!\])/i,
      (match, p1) => `[${p1}](/services/workflow-automation)`,
      '/services/workflow-automation'
    );

    // 4. Link first occurrence of "custom software development" to /services/custom-software-development if not already linked
    body = linkFirstOccurrence(
      body,
      /(?<!\[)\b(custom software development)\b(?!\])/i,
      (match, p1) => `[${p1}](/services/custom-software-development)`,
      '/services/custom-software-development'
    );

    if (body !== originalBody) {
      fs.writeFileSync(file, frontmatter + body, 'utf-8');
      updatedCount++;
    }
  });

  console.log(`✅ Successfully updated internal links in ${updatedCount} blog posts.`);
}

updateLinks();
