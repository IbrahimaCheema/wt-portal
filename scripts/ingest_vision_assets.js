import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const url = 'https://www.western.com.pk/wp-content/uploads/2022/01/vision-mission-70x70-1.png';
const localPath = path.resolve('public/images/vision_icon.png');

try {
  fs.mkdirSync(path.resolve('public/images'), { recursive: true });
  execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${url}" -o "${localPath}"`);
  console.log('Saved: public/images/vision_icon.png');
} catch (e) {
  console.warn('Failed to download vision_icon:', e.message);
}
