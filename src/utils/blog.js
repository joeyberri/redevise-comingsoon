/**
 * Blog content loader using Vite's import.meta.glob.
 * Reads all markdown files from src/content/blog/ at build time
 * and exposes helper functions for the blog pages.
 */

// Eagerly import all blog post markdown files as raw strings
const postModules = import.meta.glob('/src/content/blog/*/index.mdoc', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Eagerly import all blog post metadata (YAML frontmatter parsed by Keystatic reader)
// We'll parse the frontmatter ourselves from the raw content
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: raw };

  const frontmatterBlock = match[1];
  const content = raw.slice(match[0].length).trim();

  const data = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of frontmatterBlock.split('\n')) {
    const trimmed = line.trim();

    // Array item
    if (trimmed.startsWith('- ') && currentKey) {
      if (!currentArray) currentArray = [];
      currentArray.push(trimmed.slice(2).replace(/^['"]|['"]$/g, ''));
      data[currentKey] = currentArray;
      continue;
    }

    // Save previous array if we're moving to a new key
    currentArray = null;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    currentKey = key;

    if (value === '') {
      // Could be start of an array or empty value
      continue;
    }

    data[key] = value;
  }

  return { data, content };
}

/**
 * Get all blog posts sorted by date (newest first).
 * Returns an array of { slug, title, date, summary, coverImage, tags, author, content }
 */
export function getAllPosts() {
  const posts = Object.entries(postModules).map(([path, raw]) => {
    // Extract slug from path: /src/content/blog/[slug]/index.mdoc
    const segments = path.split('/');
    const slug = segments[segments.length - 2];

    const { data, content } = parseFrontmatter(raw);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || '',
      summary: data.summary || '',
      coverImage: data.coverImage || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      author: data.author || 'Redevise',
      content,
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

/**
 * Get all unique tags across all posts.
 */
export function getAllTags() {
  const tags = new Set();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

/**
 * Estimate reading time for a post.
 */
export function getReadingTime(content) {
  const words = content.replace(/[#*`>\-[\]()]/g, '').split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
