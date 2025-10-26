import fs from 'node:fs';
import path from 'node:path';

function walkDir(dir: string, exts: string[], results: string[], baseForUrl: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, exts, results, baseForUrl);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (exts.includes(ext)) {
        const relFromPublic = full.split(path.sep + 'public' + path.sep)[1];
        results.push('/' + relFromPublic.replace(/\\/g, '/'));
      }
    }
  }
}

export function listPublicImages(relativeDir = 'images', exts = ['.jpg', '.jpeg']) {
  const root = process.cwd();
  const publicDir = path.join(root, 'public');
  const imagesDir = path.join(publicDir, relativeDir);
  const out: string[] = [];
  if (!fs.existsSync(imagesDir)) return out;
  walkDir(imagesDir, exts, out, relativeDir);
  // Stable sort by path so order is predictable
  out.sort((a, b) => a.localeCompare(b));
  return out;
}
