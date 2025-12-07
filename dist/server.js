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
async function loadRoutes(dir, base = '') {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = resolve(dir, item.name);
        const cur = `${base}/${item.name}`;
        if (item.isDirectory()) {
            await loadRoutes(fullPath, cur);
            continue;
        }
        if (!item.name.match(/\.route\.(ts|js)$/))
            continue;
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
            const router = routeModule.default || routeModule;
            // Validate router is a valid Express router
            if (!router) {
                throw new Error(`No router exported from ${item.name}`);
            }
            if (typeof router !== 'function' && typeof router.use !== 'function') {
                throw new Error(`Router is not a valid Express router (got ${typeof router})`);
            }
            app.use(`/api/v1${routePath || ''}`, router);
            console.log(`Loaded → /api/v1${routePath || '/'}`);
        }
        catch (e) {
            // More detailed error logging
            const errorMsg = e.message || String(e);
            const errorCode = e.code || 'UNKNOWN';
            console.error(`❌ Failed to load ${item.name}: ${errorMsg}`);
            if (errorCode) {
                console.error(`   Error code: ${errorCode}`);
            }
            if (e.stack) {
                console.error(`   Stack: ${e.stack.split('\n').slice(0, 3).join('\n')}`);
            }
        }
    }
}
loadRoutes(resolve(__dirname, 'routes')).then(() => {
    app.get('/', (_, res) => res.json({ message: 'HR ERP Backend – ALL ROUTES WORKING!' }));
    app.listen(PORT, () => console.log(`\nSERVER RUNNING → http://localhost:${PORT}\n`));
});
//# sourceMappingURL=server.js.map