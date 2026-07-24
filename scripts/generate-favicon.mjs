import sharp from 'sharp';

const meta = await sharp('public/logo_estudio.webp').metadata();
console.log('Source:', meta.width + 'x' + meta.height, meta.format);

await sharp('public/logo_estudio.webp')
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon.png');

const out = await sharp('public/favicon.png').metadata();
console.log('Output: 64x64 favicon.png', out.size.width + 'x' + out.size.height, out.format);
