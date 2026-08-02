import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'YOUR_CLOUDFLARE_ACCOUNT_ID';
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'YOUR_R2_ACCESS_KEY_ID';
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'YOUR_R2_SECRET_ACCESS_KEY';
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'wt-uploads';
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || 'https://docs.wt.org.pk';

const hasR2Credentials = process.env.CLOUDFLARE_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID;

let r2 = null;
if (hasR2Credentials) {
  r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
    forcePathStyle: true
  });
}

const items = [
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/02/cropped-WT-new-final-11112.png',
    localName: 'wt_header_logo.png',
    r2Key: 'images/wt_header_logo.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/02/WT-new-final-11112.png',
    localName: 'wt_entity_logo.png',
    r2Key: 'images/wt_entity_logo.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/02/WPT-new-final-11.png',
    localName: 'wpt_entity_logo.png',
    r2Key: 'images/wpt_entity_logo.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/02/WE-new-final-11.png',
    localName: 'we_entity_logo.png',
    r2Key: 'images/we_entity_logo.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2025/01/Intercot_logo_original-scaled.jpg',
    localName: 'intercot_logo.jpg',
    r2Key: 'images/intercot_logo.jpg',
    mime: 'image/jpeg'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/02/naveena-e1645280525413.jpg',
    localName: 'naveena_logo.jpg',
    r2Key: 'images/naveena_logo.jpg',
    mime: 'image/jpeg'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/qst.png',
    localName: 'qst_logo.png',
    r2Key: 'images/qst_logo.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/cert_1.png',
    localName: 'cert_1.png',
    r2Key: 'images/cert_1.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/cert_2.png',
    localName: 'cert_2.png',
    r2Key: 'images/cert_2.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/cert_3.png',
    localName: 'cert_3.png',
    r2Key: 'images/cert_3.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/cert_4.png',
    localName: 'cert_4.png',
    r2Key: 'images/cert_4.png',
    mime: 'image/png'
  },
  {
    url: 'https://www.western.com.pk/wp-content/uploads/2022/01/cropped-logo-removebg-preview-32x32.png',
    localName: 'favicon-32.png',
    r2Key: 'images/favicon-32.png',
    mime: 'image/png'
  }
];

async function run() {
  console.log('🚀 Starting Western Traders Asset Ingestion Pipeline...');
  const publicImages = path.resolve('public/images');
  if (!fs.existsSync(publicImages)) {
    fs.mkdirSync(publicImages, { recursive: true });
  }

  for (const item of items) {
    const localPath = path.join(publicImages, item.localName);
    console.log(`📥 Downloading ${item.localName}...`);
    try {
      execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
    } catch (e) {
      console.warn(`⚠️ curl failed for ${item.url}, skipping upload.`);
    }

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
      console.log(` Saved locally: public/images/${item.localName} (${fs.statSync(localPath).size} bytes)`);

      if (r2 && hasR2Credentials) {
        try {
          const buffer = fs.readFileSync(localPath);
          await r2.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: item.r2Key,
            Body: buffer,
            ContentType: item.mime
          }));
          console.log(`☁️ Uploaded to R2: ${PUBLIC_DOMAIN}/${item.r2Key}`);
        } catch (err) {
          console.warn(`⚠️ Cloudflare R2 upload skipped/failed: ${err.message}`);
        }
      }
    } else {
      console.warn(`❌ Failed to save: ${item.localName}`);
    }
  }

  console.log('🎉 Asset Ingestion complete!');
}

run();
