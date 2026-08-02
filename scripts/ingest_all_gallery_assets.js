import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const videoAssets = [
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/VID1.mp4', dest: 'public/videos/gallery_vid1.mp4' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/VID2.mp4', dest: 'public/videos/gallery_vid2.mp4' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/VID3.mp4', dest: 'public/videos/gallery_vid3.mp4' }
];

const imageAssets = [
  // Intercot Spain complete (11 images)
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot1.jpg', dest: 'public/images/gallery/spain_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot2.jpg', dest: 'public/images/gallery/spain_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot3.jpg', dest: 'public/images/gallery/spain_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot4.jpg', dest: 'public/images/gallery/spain_4.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot5.jpg', dest: 'public/images/gallery/spain_5.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot6.jpg', dest: 'public/images/gallery/spain_6.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot7.jpg', dest: 'public/images/gallery/spain_7.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot8.jpg', dest: 'public/images/gallery/spain_8.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot9.jpg', dest: 'public/images/gallery/spain_9.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot10.jpg', dest: 'public/images/gallery/spain_10.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/imported_from_media_libray/intercot11.jpg', dest: 'public/images/gallery/spain_11.jpg' },

  // QST Lanka Visit
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/QST_Lanka1.jpg', dest: 'public/images/gallery/qst_lanka_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/QST_Lanka2.jpg', dest: 'public/images/gallery/qst_lanka_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/QST_Lanka3.jpg', dest: 'public/images/gallery/qst_lanka_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/QST_Lanka4.jpg', dest: 'public/images/gallery/qst_lanka_4.jpg' },

  // QST Delegation Visit
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/1-pic-1.jpg', dest: 'public/images/gallery/qst_del_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/1-pic-2.jpg', dest: 'public/images/gallery/qst_del_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/3-1.jpg', dest: 'public/images/gallery/qst_del_3.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/3-2.jpg', dest: 'public/images/gallery/qst_del_4.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/photo-gallery/2-pic-2.jpg', dest: 'public/images/gallery/qst_del_5.jpg' }
];

async function run() {
  fs.mkdirSync(path.resolve('public/videos'), { recursive: true });
  fs.mkdirSync(path.resolve('public/images/gallery'), { recursive: true });

  console.log('🎥 Downloading videos...');
  for (const item of videoAssets) {
    const localPath = path.resolve(item.dest);
    console.log(`📥 Downloading video ${item.dest}...`);
    try {
      execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
      console.log(` Saved video: ${item.dest}`);
    } catch (e) {
      console.warn(`Failed video ${item.url}: ${e.message}`);
    }
  }

  console.log('🖼️ Downloading images...');
  for (const item of imageAssets) {
    const localPath = path.resolve(item.dest);
    console.log(`📥 Downloading image ${item.dest}...`);
    try {
      execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
      console.log(` Saved image: ${item.dest}`);
    } catch (e) {
      console.warn(`Failed image ${item.url}: ${e.message}`);
    }
  }
}

run();
