import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assets = [
  { url: 'https://www.western.com.pk/wp-content/uploads/2025/01/interview.png', dest: 'public/images/news_interview.png' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2024/01/01-11-1024x525.png', dest: 'public/images/news_heimtextil_2024.png' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/07/QST_Lanka1.jpg', dest: 'public/images/news_qst_lanka.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/lunch2.jpg', dest: 'public/images/news_lunch2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/lunch-1.jpg', dest: 'public/images/news_lunch1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/intercot1.jpg', dest: 'public/images/news_intercot1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2022/02/wt-conf-1024x646.jpg', dest: 'public/images/news_wt_conf.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2022/01/IMG-20220221-WA0015-1024x428.jpg', dest: 'public/images/news_forum_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2022/01/IMG-20220221-WA0016-1024x546.jpg', dest: 'public/images/news_forum_1.jpg' }
];

async function run() {
  fs.mkdirSync(path.resolve('public/images'), { recursive: true });

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
