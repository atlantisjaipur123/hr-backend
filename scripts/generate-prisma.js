// scripts/generate-prisma.js
// Generate Prisma Client using Node.js to avoid permission issues
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('Generating Prisma Client...');

// Find Prisma CLI script
const prismaPaths = [
  resolve(rootDir, 'node_modules', 'prisma', 'build', 'index.js'),
  resolve(rootDir, 'node_modules', '@prisma', 'cli', 'build', 'index.js'),
];

let prismaPath = null;
for (const path of prismaPaths) {
  if (existsSync(path)) {
    prismaPath = path;
    break;
  }
}

if (!prismaPath) {
  console.error('✗ Prisma CLI not found. Make sure prisma is installed.');
  process.exit(1);
}

try {
  // Use execSync to execute node with prisma CLI (synchronous, waits for completion)
  execSync(`node "${prismaPath}" generate`, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env },
  });
  console.log('✓ Prisma Client generated successfully');
} catch (error) {
  console.error('✗ Failed to generate Prisma Client:', error.message);
  process.exit(1);
}

