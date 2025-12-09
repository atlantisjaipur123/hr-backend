// api/index.js ← Paste this EXACTLY (overwrite everything)
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'HR ERP Backend is LIVE on Vercel!',
    status: 'operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Load routes asynchronously — works 100% on Vercel with ES modules
async function loadRoutes() {
  const routesDir = resolve(__dirname, '../dist/routes');
  
  if (!existsSync(routesDir)) {
    console.log('No compiled routes found at', routesDir);
    return;
  }

  const items = readdirSync(routesDir, { withFileTypes: true, recursive: true });

  for (const item of items) {
    if (item.isDirectory()) continue;
    if (!item.name.endsWith('.route.js')) continue;

    const fullPath = resolve(item.parentPath, item.name);
    let routePath = fullPath
      .replace(routesDir, '')
      .replace(/\.route\.js$/i, '')
      .replace(/\/index$/i, '')
      .replace(/\[([^[\]]+)\]/g, ':$1')  // [id] → :id
      .replace(/\/+/g, '/')
      .replace(/\/$/, '');

    try {
      // Use dynamic import() for ES modules (not require)
      const fileUrl = pathToFileURL(fullPath).href;
      const routeModule = await import(fileUrl);
      const router = routeModule.default || routeModule;

      app.use(`/api/v1${routePath || '/'}`, router);
      console.log(`Loaded → /api/v1${routePath || '/'}`);
    } catch (err) {
      console.error(`Failed to load ${item.name}:`, err.message);
    }
  }
}

// Await route loading before exporting
await loadRoutes();

// 404 & error handlers
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// This is the only export Vercel needs
export default createServer(app);