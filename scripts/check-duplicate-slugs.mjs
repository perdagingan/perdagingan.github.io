#!/usr/bin/env node
/**
 * Detect duplicate slugs between markdown / mdx posts.
 * Slug resolution precedence: frontmatter slug field if present else derived from filename (without extension).
 * Exits with code 1 if duplicates found.
 */
import { readFileSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';

const BLOG_DIR = join(process.cwd(), 'src', 'data', 'blog');
const VALID_EXT = new Set(['.md', '.mdx']);

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.isDirectory()) files.push(...walk(join(dir, e.name)));
    else if (VALID_EXT.has(extname(e.name))) files.push(join(dir, e.name));
  }
  return files;
}

const slugMap = new Map();
const duplicates = [];

for (const file of walk(BLOG_DIR)) {
  const raw = readFileSync(file, 'utf8');
  const frontmatterMatch = raw.match(/^---([\s\S]*?)---/);
  let slug;
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const slugLine = fm.split(/\n/).find(l => /^slug:\s*/.test(l));
    if (slugLine) slug = slugLine.replace(/^slug:\s*/, '').trim();
  }
  if (!slug || slug === '""') {
    slug = basename(file, extname(file));
  }
  if (slugMap.has(slug)) {
    duplicates.push({ slug, files: [slugMap.get(slug), file] });
  } else {
    slugMap.set(slug, file);
  }
}

if (duplicates.length) {
  console.error('Duplicate slugs detected:');
  for (const d of duplicates) {
    console.error(`  slug: ${d.slug}`);
    for (const f of d.files) console.error(`    - ${f}`);
  }
  process.exit(1);
}

console.log(`No duplicate slugs among ${slugMap.size} posts.`);
