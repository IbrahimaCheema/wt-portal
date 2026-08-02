import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } from '@aws-sdk/client-s3';

// Simple .env parser
function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'wt-uploads';

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error('❌ Missing Cloudflare R2 credentials in .env file!');
  process.exit(1);
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  }
});

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.pdf': return 'application/pdf';
    case '.mp4': return 'video/mp4';
    case '.svg': return 'image/svg+xml';
    case '.json': return 'application/json';
    default: return 'application/octet-stream';
  }
}

async function run() {
  console.log(`🔌 Connecting to Cloudflare R2 (${accountId})...`);

  // Ensure bucket exists
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`✅ Bucket '${bucketName}' exists.`);
  } catch (err) {
    console.log(`ℹ️ Bucket '${bucketName}' not found or unreachable, attempting to create...`);
    try {
      await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
      console.log(`✅ Bucket '${bucketName}' created successfully.`);
    } catch (createErr) {
      console.warn(`⚠️ Warning checking/creating bucket: ${createErr.message}`);
    }
  }

  const publicDir = path.resolve('public');
  const allFiles = getAllFiles(publicDir);
  console.log(`🚀 Found ${allFiles.length} media assets to upload to R2 bucket '${bucketName}'...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const filePath of allFiles) {
    const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');
    const fileStream = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);

    console.log(`📤 Uploading '${relativePath}' (${(fileStream.length / 1024).toFixed(1)} KB) -> R2 '${bucketName}/${relativePath}'...`);

    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: relativePath,
        Body: fileStream,
        ContentType: contentType
      }));
      console.log(`   Saved: https://docs.western.com.pk/${relativePath}`);
      successCount++;
    } catch (e) {
      console.error(`❌ Failed to upload '${relativePath}': ${e.message}`);
      failCount++;
    }
  }

  console.log(`\n🎉 Upload Complete! ${successCount} uploaded successfully, ${failCount} failed.`);
}

run();
