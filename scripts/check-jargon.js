/* eslint-env node */
import fs from 'fs';
import path from 'path';

const FORBIDDEN_WORDS = [
  "seamless",
  "seamlessly",
  "empower",
  "empowering",
  "leverage",
  "bespoke",
  "revolutionize",
  "delve",
  "holistic",
  "paradigm",
  "catalyst",
  "compounding engineering expertise",
  "optimization infrastructure",
  "infraestructura de optimización"
];

// Helper to recursively list files in a directory
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      // Only check JavaScript, JSX, TypeScript, and TSX files
      if (/\.(jsx|js|tsx|ts)$/.test(file)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const srcDir = path.resolve('src');
const files = getFiles(srcDir);
let hasErrors = false;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    FORBIDDEN_WORDS.forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      if (regex.test(line)) {
        console.error(`\x1b[31mError:\x1b[0m AI jargon keyword "${word}" found in file:`);
        console.error(`  \x1b[34m${file}:${index + 1}\x1b[0m`);
        console.error(`  > ${line.trim()}`);
        console.error();
        hasErrors = true;
      }
    });
  });
});

if (hasErrors) {
  console.error('\x1b[31mJargon check failed. Please remove the AI-slop copy keywords listed above.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32m✅ AI jargon check passed: No slop copy detected in codebase.\x1b[0m');
  process.exit(0);
}
