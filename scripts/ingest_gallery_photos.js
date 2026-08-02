import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assets = [
  // Heimtextil 2025
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/Heimtextil_2025_01.jpg', dest: 'public/images/gallery/ht2025_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/Heimtextil_2025_02.jpg', dest: 'public/images/gallery/ht2025_2.jpg' },

  // Intercot 2025
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/Intercot_2025_1.jpg', dest: 'public/images/gallery/ic2025_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/Intercot_2025_2.jpg', dest: 'public/images/gallery/ic2025_2.jpg' },

  // Heimtextil 2024
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/01.jpg', dest: 'public/images/gallery/ht2024_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/02-1.jpg', dest: 'public/images/gallery/ht2024_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/03.jpg', dest: 'public/images/gallery/ht2024_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/04.jpg', dest: 'public/images/gallery/ht2024_4.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/05.jpg', dest: 'public/images/gallery/ht2024_5.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/06.jpg', dest: 'public/images/gallery/ht2024_6.jpg' },

  // Fazal Cloth Mills & Artistic Milliners
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0059.jpg', dest: 'public/images/gallery/fazal_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0060.jpg', dest: 'public/images/gallery/fazal_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0061.jpg', dest: 'public/images/gallery/fazal_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0062.jpg', dest: 'public/images/gallery/fazal_4.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0063.jpg', dest: 'public/images/gallery/fazal_5.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/IMG-20230210-WA0064.jpg', dest: 'public/images/gallery/fazal_6.jpg' },

  // Intercot Spain Visit
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot1.jpg', dest: 'public/images/gallery/spain_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot2.jpg', dest: 'public/images/gallery/spain_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot3.jpg', dest: 'public/images/gallery/spain_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot4.jpg', dest: 'public/images/gallery/spain_4.jpg' }
];

async function run() {
  fs.mkdirSync(path.resolve('public/images/gallery'), { recursive: true });

  for (const item of assets) {
    const localPath = path.resolve(item.dest);
    console.log(`📥 Downloading ${item.dest}...`);
    try {
      execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
      console.log(` Saved: ${item.dest}`);
    } catch (e) {
      console.warn(`⚠️ Failed to download ${item.url}: ${e.message}`);
    }
  }
}

run();
