const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function run() {
  const logoSvg = fs.readFileSync('public/logo.svg', 'utf8');

  // Extract defs and paths from logo.svg
  const defsMatch = logoSvg.match(/<defs>([\s\S]*?)<\/defs>/);
  const defs = defsMatch ? defsMatch[1] : '';

  // Extract paths/groups from logoSvg
  const bodyMatch = logoSvg.match(/<\/defs>([\s\S]*?)<\/svg>/);
  const innerContent = bodyMatch ? bodyMatch[1] : '';

  // Function to create an SVG icon template
  // size: width and height
  // logoScale: percentage scale of the logo inside the icon
  function createIconSvg(size, logoScale = 0.72, rx = 0) {
    const logoW = size * logoScale;
    const logoH = logoW * (936 / 1281);
    const offsetX = (size - logoW) / 2;
    const offsetY = (size - logoH) / 2;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    ${defs}
  </defs>

  <!-- Solid Pure Black Background -->
  <rect width="${size}" height="${size}" rx="${rx}" fill="#000000"/>

  <!-- Centered MS Monogram Logo -->
  <g transform="translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}) scale(${(logoW / 1281).toFixed(4)})">
    ${innerContent}
  </g>
</svg>`;
  }

  // Helper for rectangular cards (e.g. 1200x630 og-image)
  function createRectSvg(width, height, scale = 0.58) {
    const logoW = width * scale;
    const logoH = logoW * (936 / 1281);
    const offsetX = (width - logoW) / 2;
    const offsetY = (height - logoH) / 2;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    ${defs}
  </defs>

  <!-- Solid Pure Black Background -->
  <rect width="${width}" height="${height}" fill="#000000"/>

  <!-- Centered MS Monogram Logo -->
  <g transform="translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}) scale(${(logoW / 1281).toFixed(4)})">
    ${innerContent}
  </g>
</svg>`;
  }

  // 0. og-image.png (1200x630) and og-logo.png (800x584) - logo only on black background
  const og1200Svg = createRectSvg(1200, 630, 0.58);
  await sharp(Buffer.from(og1200Svg))
    .resize(1200, 630)
    .png()
    .toFile('public/og-image.png');
  console.log('✓ Created public/og-image.png (1200x630 logo only on black background)');

  const og800Svg = createRectSvg(800, 584, 0.75);
  await sharp(Buffer.from(og800Svg))
    .resize(800, 584)
    .png()
    .toFile('public/og-logo.png');
  console.log('✓ Created public/og-logo.png (800x584 logo only on black background)');

  // 1. apple-touch-icon.png (180x180) - iOS applies its own rounded corner mask, so square canvas
  const appleSvg = createIconSvg(180, 0.75, 0);
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('✓ Created public/apple-touch-icon.png (180x180)');

  // Also duplicate to apple-touch-icon-precomposed.png
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon-precomposed.png');

  // 1b. logo-preview.png (512x512) - High-res square logo preview with solid dark background for iMessage / SMS / WhatsApp
  const logoPreviewSvg = createIconSvg(512, 0.75, 0);
  await sharp(Buffer.from(logoPreviewSvg))
    .resize(512, 512)
    .png()
    .toFile('public/logo-preview.png');
  console.log('✓ Created public/logo-preview.png (512x512)');

  // 2. icon-192x192.png (standard Android / PWA)
  const icon192Svg = createIconSvg(192, 0.75, 24);
  await sharp(Buffer.from(icon192Svg))
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');
  console.log('✓ Created public/icon-192x192.png (192x192)');

  // 3. icon-512x512.png (high-res Android / PWA splash)
  const icon512Svg = createIconSvg(512, 0.75, 64);
  await sharp(Buffer.from(icon512Svg))
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');
  console.log('✓ Created public/icon-512x512.png (512x512)');

  // 4. Maskable icons (must keep content in central 80% circle, safe zone)
  const maskable192Svg = createIconSvg(192, 0.60, 0); // No border rounding, smaller scale for safe zone
  await sharp(Buffer.from(maskable192Svg))
    .resize(192, 192)
    .png()
    .toFile('public/icon-maskable-192x192.png');
  console.log('✓ Created public/icon-maskable-192x192.png (192x192)');

  const maskable512Svg = createIconSvg(512, 0.60, 0);
  await sharp(Buffer.from(maskable512Svg))
    .resize(512, 512)
    .png()
    .toFile('public/icon-maskable-512x512.png');
  console.log('✓ Created public/icon-maskable-512x512.png (512x512)');

  // 5. Favicon PNGs (32x32 and 16x16)
  const fav32Svg = createIconSvg(64, 0.85, 12);
  await sharp(Buffer.from(fav32Svg))
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');
  console.log('✓ Created public/favicon-32x32.png (32x32)');

  await sharp(Buffer.from(fav32Svg))
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');
  console.log('✓ Created public/favicon-16x16.png (16x16)');

  console.log('All mobile home screen bookmarking icons generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
