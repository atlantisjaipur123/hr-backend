// api/index.js - Vercel Serverless Function Entry Point
import express from 'express';
import cors from 'cors';
import { readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Auto-load all .route.js files from compiled dist/routes directory
async function loadRoutes(dir, base = '') {
  // Check if directory exists
  if (!existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return;
  }

  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = resolve(dir, item.name);
    const currentPath = `${base}/${item.name}`;

    if (item.isDirectory()) {
      await loadRoutes(fullPath, currentPath);
      continue;
    }

    // Only load .route.js files (compiled from .route.ts)
    if (!item.name.match(/\.route\.js$/i)) continue;

    let routePath = currentPath
      .replace(/\.route\.js$/i, '')
      .replace(/\/index$/i, '')
      .replace(/\[(.+?)\]/g, ':$1')
      .replace(/\/+/g, '/')
      .replace(/\/$/, '')
      .replace(/^\/routes/, ''); // Remove the /routes prefix

    try {
      // Use pathToFileURL for proper ESM module resolution
      const fileUrl = pathToFileURL(fullPath).href;
      const module = await import(fileUrl);
      const router = module.default || module;

      if (!router || typeof router.use !== 'function') {
        throw new Error(`Invalid router exported from ${item.name}`);
      }

      app.use(`/api/v1${routePath || '/'}`, router);
      console.log(`✓ Loaded route → /api/v1${routePath || '/'}`);
    } catch (err) {
      console.error(`✗ Failed to load ${item.name}:`, err.message);
      if (err.stack) {
        console.error(err.stack);
      }
    }
  }
}

// Load routes from dist/routes (compiled TypeScript output)
// Fallback to src/routes for development if dist doesn't exist
const routesPath = existsSync(resolve(__dirname, 'dist', 'routes'))
  ? resolve(__dirname, 'dist', 'routes')
  : resolve(__dirname, 'src', 'routes');

console.log(`Loading routes from: ${routesPath}`);
await loadRoutes(routesPath);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'HR ERP Backend is LIVE on Vercel!',
    status: 'operational',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// 404 handler (must be before error handler)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Error handling middleware (must be last, with 4 parameters)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Export the app for Vercel serverless functions
export default app;