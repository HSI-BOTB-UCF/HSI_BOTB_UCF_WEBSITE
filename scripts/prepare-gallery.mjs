import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = path.join(root, 'public/gallery_images')
const output = path.join(source, 'web')
const manifest = path.join(root, 'src/gallery.json')
const existing = JSON.parse(await readFile(manifest, 'utf8'))
const descriptions = new Map(existing.map((photo) => [photo.src, photo.alt]))
const isImage = (name) => /\.(jpe?g|png|webp)$/i.test(name)

await mkdir(output, { recursive: true })
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (!entry.isFile() || !isImage(entry.name)) continue
  const name = path.parse(entry.name).name + '.jpg'
  await sharp(path.join(source, entry.name))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#000000' })
    .jpeg({ quality: 85 })
    .toFile(path.join(output, name))
}

const photos = []
const entries = await readdir(output, { withFileTypes: true })
for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
  if (!entry.isFile() || !isImage(entry.name)) continue
  const metadata = await sharp(path.join(output, entry.name)).metadata()
  const swapped = [5, 6, 7, 8].includes(metadata.orientation)
  const width = swapped ? metadata.height : metadata.width
  const height = swapped ? metadata.width : metadata.height
  const src = 'gallery_images/web/' + entry.name
  photos.push({
    src, width, height,
    orientation: width >= height ? 'landscape' : 'portrait',
    alt: descriptions.get(src) || 'UCF HSI Battle of the Brains team gallery photo',
  })
}
await writeFile(manifest, JSON.stringify(photos, null, 2) + '\n')
console.log(`Prepared ${photos.length} gallery images.`)
