import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INPUT = path.resolve('public/hero_section.avif');
const OUT_DIR = path.resolve('public');

// Target widths for responsive delivery (mobile-first).
const widths = [480, 768, 1024, 1440];

if (!fs.existsSync(INPUT)) {
  console.error(`Missing input: ${INPUT}`);
  process.exit(1);
}

await fs.promises.mkdir(OUT_DIR, { recursive: true });

const image = sharp(INPUT, { failOn: 'none' });
const meta = await image.metadata();
if (!meta.width || !meta.height) {
  console.error('Could not read image dimensions.');
  process.exit(1);
}

console.log(`Input: hero_section.avif (${meta.width}x${meta.height})`);

for (const w of widths) {
  const avifOut = path.join(OUT_DIR, `hero_section-${w}.avif`);
  const webpOut = path.join(OUT_DIR, `hero_section-${w}.webp`);

  // AVIF: tuned for LCP (small + decent quality).
  await sharp(INPUT, { failOn: 'none' })
    .resize({ width: w, withoutEnlargement: true })
    .avif({
      quality: 45,
      effort: 6,
      chromaSubsampling: '4:2:0',
    })
    .toFile(avifOut);

  // WebP fallback (older browsers).
  await sharp(INPUT, { failOn: 'none' })
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(webpOut);

  console.log(`Wrote: ${path.basename(avifOut)} + ${path.basename(webpOut)}`);
}

console.log('Done.');


