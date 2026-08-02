import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const url = 'https://www.western.com.pk/wp-content/uploads/2025/01/An-Interview-with-Hasan-Shahid-by-Alex-Diaz.mp4';
const localDir = path.resolve('public/videos');
const localPath = path.resolve('public/videos/ceo_interview.mp4');

try {
  fs.mkdirSync(localDir, { recursive: true });
  console.log('📥 Downloading CEO interview video...');
  execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${url}" -o "${localPath}"`);
  console.log(' Saved: public/videos/ceo_interview.mp4');
} catch (e) {
  console.warn('Failed to download CEO interview video:', e.message);
}
