import { execSync } from 'child_process';
import fs from 'fs';

async function run() {
  console.log('Fetching full raw HTML of gallery page...');
  const rawHtml = execSync('curl.exe -k -s -L -A "Mozilla/5.0" "https://www.western.com.pk/gallery/"').toString();
  
  // Extract all img src / hrefs
  const matches = rawHtml.match(/https:\/\/www\.western\.com\.pk\/wp-content\/uploads\/[^\s"'<>\\]+/g) || [];
  const uniqueUrls = Array.from(new Set(matches));

  console.log(`Found ${uniqueUrls.length} total upload URLs:`);
  uniqueUrls.forEach(url => console.log(url));

  // Also check for videos (.mp4, vimeo, youtube, etc)
  const videoMatches = rawHtml.match(/(http[s]?:\/\/[^\s"'<>]+\.(mp4|webm|mov)|vimeo\.com[^\s"'<>]+|youtube\.com[^\s"'<>]+|youtu\.be[^\s"'<>]+)/gi) || [];
  console.log(`\nFound ${videoMatches.length} video URLs:`);
  Array.from(new Set(videoMatches)).forEach(v => console.log(v));
}

run();
