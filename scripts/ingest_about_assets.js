import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const items = [
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/company.png',
    localName: 'company.png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/about_new.jpg',
    localName: 'about_new.jpg'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/ceo.jpg',
    localName: 'ceo.jpg'
  }
];

async function run() {
  const publicImages = path.resolve('public/images');
  if (!fs.existsSync(publicImages)) {
    fs.mkdirSync(publicImages, { recursive: true });
  }

  for (const item of items) {
    const localPath = path.join(publicImages, item.localName);
    console.log(`📥 Downloading ${item.localName}...`);
    try {
      execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
      console.log(` Saved: public/images/${item.localName}`);
    } catch (e) {
      console.warn(`⚠️ Download failed: ${e.message}`);
    }
  }
}

run();
