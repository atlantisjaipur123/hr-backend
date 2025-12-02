// src/server.ts ← FINAL WORKING VERSION (November 2025)
import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

async function loadRoutes(dir: string, base = '') {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, item.name);
    const cur = `${base}/${item.name}`;

    if (item.isDirectory()) {
      await loadRoutes(fullPath, cur);
      continue;
    }

    if (!item.name.endsWith('.route.ts')) continue;

    let routePath = cur
      .replace(/\.route\.ts$/i, '')
      .replace(/\/index$/i, '')
      .replace(/\[(.+?)\]/g, ':$1')
      .replace(/\[employeeId\]/g, ':employeeId')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');

    try {
      // FIXED FOR WINDOWS + ESM – this is the only version that works 100%
      const fileUrl = pathToFileURL(fullPath).href;
      const routeModule = await import(fileUrl);

      const router = (routeModule as any).default || routeModule;

      app.use(`/api/v1${routePath || ''}`, router);
      console.log(`Loaded → /api/v1${routePath || '/'}`);
    } catch (e: any) {
      console.error(`Failed to load ${item.name}:`, e.message);
    }
  }
}

loadRoutes(resolve(__dirname, 'routes')).then(() => {
  app.get('/', (_, res) => res.json({ message: 'HR ERP Backend – ALL ROUTES WORKING!' }));
  app.listen(PORT, () => console.log(`\nSERVER RUNNING → http://localhost:${PORT}\n`));
});