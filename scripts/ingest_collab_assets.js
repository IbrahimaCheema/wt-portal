import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assets = [
  // Intercot
  { url: 'https://www.western.com.pk/wp-content/uploads/2025/01/Intercot_logo_2025-1024x579.png', dest: 'public/images/intercot_logo.png' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2025/01/INTERCOT-LETTER-OF-AGREEMENT-01-823x1024.jpg', dest: 'public/images/intercot_letter.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2025/01/INTERCOT-LETTER-OF-AGREEMENT-01.pdf', dest: 'public/docs/intercot_letter.pdf' },
  
  // QST
  { url: 'https://www.western.com.pk/wp-content/uploads/2022/01/qst.png', dest: 'public/images/qst_logo.png' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2024/06/QST-LETTER-OF-AGREEMENT-2_page-0001-838x1024.jpg', dest: 'public/images/qst_letter_2.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2024/06/QST-LETTER-OF-AGREEMENT-2.pdf', dest: 'public/docs/qst_letter_2.pdf' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/QST_IMAGE.jpg', dest: 'public/images/qst_letter_1.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/QST-LETTER-OF-AGREEMENT.pdf', dest: 'public/docs/qst_letter_1.pdf' },
  
  // Naveena
  { url: 'https://www.western.com.pk/wp-content/uploads/2022/02/naveena-e1645280525413.jpg', dest: 'public/images/naveena_logo.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/Naveena-1.jpg', dest: 'public/images/naveena_letter.jpg' },
  { url: 'https://www.western.com.pk/wp-content/uploads/2023/01/Naveena.pdf', dest: 'public/docs/naveena_letter.pdf' }
];

async function run() {
  fs.mkdirSync(path.resolve('public/images'), { recursive: true });
  fs.mkdirSync(path.resolve('public/docs'), { recursive: true });

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
