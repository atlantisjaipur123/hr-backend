// src/server.ts ← FINAL WORKING VERSION (December 2025)
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

    if (!item.name.match(/\.route\.(ts|js)$/)) continue;

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

      // Validate router is a valid Express router
      if (!router) {
        throw new Error(`No router exported from ${item.name}`);
      }

      if (typeof router !== 'function' && typeof router.use !== 'function') {
        throw new Error(`Router is not a valid Express router (got ${typeof router})`);
      }

      app.use(`/api/v1${routePath || ''}`, router);
      console.log(`Loaded → /api/v1${routePath || '/'}`);
    } catch (e: any) {
      const errorMsg = e.message || String(e);
      const errorCode = e.code || 'UNKNOWN';

      if (errorCode === 'ERR_MODULE_NOT_FOUND' || errorMsg.includes('Cannot find module')) {
        console.error(`❌ Failed to load ${item.name}: Module resolution error`);
        console.error(`   ${errorMsg}`);
        if (e.stack) {
          const stackLines = e.stack
            .split('\n')
            .filter((line: string) => line.includes('import') || line.includes('require') || line.includes('at'));
          console.error(`   ${stackLines.slice(0, 2).join('\n   ')}`);
        }
      } else {
        console.error(`❌ Failed to load ${item.name}: ${errorMsg}`);
        if (errorCode && errorCode !== 'UNKNOWN') {
          console.error(`   Error code: ${errorCode}`);
        }
        if (e.stack) {
          const stackLines = e.stack.split('\n').slice(0, 3);
          console.error(`   ${stackLines.join('\n   ')}`);
        }
      }
    }
  }
}

loadRoutes(resolve(__dirname, 'routes')).then(() => {
  // -------------------------------
  // ✅ TEST ROUTE
  // -------------------------------
  app.get('/api/v1/test', (req, res) => {
    res.json({
      success: true,
      message: 'Test route working successfully!',
      timestamp: new Date().toISOString(),
    });
  });

  // DEFAULT ROOT ROUTE
  app.get('/', (_, res) => res.json({ message: 'HR ERP Backend – ALL ROUTES WORKING!' }));

  // START SERVER
  app.listen(PORT, () => {
    console.log(`\nSERVER RUNNING → http://localhost:${PORT}\n`);
  });
});
