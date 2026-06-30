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

function updateLinks() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog directory not found at: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = getFiles(BLOG_DIR);
  let updatedCount = 0;

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // 1. Replace legacy service hashes with new custom software landing page
    if (content.includes('/services#software')) {
      content = content.replaceAll('/services#software', '/services/custom-software-development');
      modified = true;
    }
    if (content.includes('/services#ecommerce')) {
      content = content.replaceAll('/services#ecommerce', '/services/custom-software-development');
      modified = true;
    }

    // 2. Replace boilerplate automation opening with active internal link
    if (content.includes('Workflow automation should handle')) {
      content = content.replaceAll('Workflow automation should handle', '[Workflow automation](/services/workflow-automation) should handle');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
      updatedCount++;
    }
  });

  console.log(`✅ Successfully updated internal links in ${updatedCount} blog posts.`);
}

updateLinks();
