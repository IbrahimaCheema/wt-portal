# 🏗️ Corporate Website Cloning Architectural Blueprint & Standard Operating Procedures (SOP)

This document defines the exact architecture, technology stack, asset storage strategy, UI design system, and Git workflow guidelines established during the high-performance website cloning process.

---

## 0. 🔐 Security & Secret Management Protocols (MANDATORY)

- **Strict Zero-Hardcoded-Secrets Policy**: NEVER hardcode API keys, secret access keys, account IDs, tokens, database URIs, or passwords in source files, scripts, or markdown documents.
- **Environment Variable Usage**: Always load sensitive credentials via `process.env` (e.g., `process.env.R2_SECRET_ACCESS_KEY`).
- **`.env` File Isolation**: Store all local keys in `.env` or `.env.local` files, ensuring they are ignored in `.gitignore`.
- **Boilerplate Placeholders**: Use only generic tokens (e.g., `YOUR_R2_ACCESS_KEY_ID`, `YOUR_CLOUDFLARE_ACCOUNT_ID`) in any shared examples or documentation.

---

## 1. 🛠️ Core Technology Stack

- **Framework**: **Astro (Static Site Generator)**
  - Pure static HTML compilation for lightning-fast page loads and zero JS overhead.
- **Styling Architecture**: **Vanilla CSS & UI/UX Design System**
  - Modular CSS variables (`--primary-color`, `--font-heading`, `--font-body`).
  - Sleek visual hierarchy, modern typography, glassmorphism, responsive CSS Grid & Flexbox layouts.
- **Iconography**: **Crisp Vector SVGs**
  - 100% inline SVG icons for guaranteed render reliability across all browsers and devices.
- **Media Storage & CDN**: **Cloudflare Object Storage (R1/R2)**
  - S3-compatible storage managed via `@aws-sdk/client-s3` Node.js ingestion scripts.

---

## 2. ☁️ Cloudflare Asset Ingestion Protocol

All target website media assets (images, PDFs, documents) are ingested locally and mirrored to Cloudflare storage for high-speed CDN delivery.

### Automated Node.js Ingestion Pattern:
Temporary scripts in `scripts/` ingest and upload media:

```javascript
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'YOUR_CLOUDFLARE_ACCOUNT_ID';
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'YOUR_R2_ACCESS_KEY_ID';
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'YOUR_R2_SECRET_ACCESS_KEY';
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'wt-uploads';
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || 'https://docs.wt.org.pk';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
  forcePathStyle: true
});

const items = [
  {
    url: 'https://www.target-website.com/wp-content/uploads/image1.jpg',
    localName: 'page_feature_1.jpg',
    r2Key: 'images/page_feature_1.jpg',
    mime: 'image/jpeg'
  }
];

async function run() {
  const publicImages = path.resolve('public/images');
  if (!fs.existsSync(publicImages)) fs.mkdirSync(publicImages, { recursive: true });

  for (const item of items) {
    const localPath = path.join(publicImages, item.localName);
    execSync(`curl.exe -k -s -L -A "Mozilla/5.0" "${item.url}" -o "${localPath}"`);
    if (fs.existsSync(localPath)) {
      const buffer = fs.readFileSync(localPath);
      await r2.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: item.r2Key,
        Body: buffer,
        ContentType: item.mime
      }));
      console.log(`✓ Uploaded: ${PUBLIC_DOMAIN}/${item.r2Key}`);
    }
  }
}
run();
```

---

## 3. 🎨 UI Design System & Component Standardization

> [!IMPORTANT]
> **MANDATORY DESIGN CONTINUITY RULE**: All cloned inner pages MUST automatically inherit the master design system, color palette, typography, button styles, and card aesthetics established on the Homepage.

---

## 4. 🔒 Git Commit & Remote Synchronization Protocol

> [!CAUTION]
> **MANDATORY GIT RULE**: NEVER run `git push` autonomously.

- **Local Development**: Format, test, build (`npm run build`), and commit changes locally:
  ```bash
  git add .
  git commit -m "Description of changes"
  ```
- **Remote Push**: Execute `git push origin main` ONLY when the user explicitly requests it.
