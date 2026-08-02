import { execSync } from 'child_process';

async function run() {
  console.log('Fetching raw HTML of gallery page...');
  const html = execSync('curl.exe -k -s -L -A "Mozilla/5.0" "https://www.western.com.pk/gallery/"').toString();

  // Find elementor video data attributes, easy video player data attributes, or mp4 sources
  const dataVideoReg = /(data-video-[^=]+=[\"'][^\"']+[\"']|src=[\"'][^\"']+\.(mp4|mov|m4v)[\"']|easy_video_player[^>]+)/gi;
  let match;
  while ((match = dataVideoReg.exec(html)) !== null) {
    console.log('Video Match:', match[0]);
  }

  // Find all mp4 files in wp-content/uploads
  const mp4Reg = /https:\/\/www\.western\.com\.pk\/wp-content\/uploads\/[^\s"'<>\\]+\.(mp4|mov|m4v)/gi;
  const mp4s = html.match(mp4Reg) || [];
  console.log('\nAll MP4 URLs found:');
  Array.from(new Set(mp4s)).forEach(u => console.log(u));

  // Find iframe video embeds (youtube, vimeo, elementor)
  const iframeReg = /<iframe[^>]+src=[\"']([^\"']+)[\"']/gi;
  while ((match = iframeReg.exec(html)) !== null) {
    console.log('Iframe src:', match[1]);
  }
}

run();
