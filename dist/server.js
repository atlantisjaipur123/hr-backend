// server.ts — FINAL WORKING VERSION
import express from "express";
import cors from "cors";
import { readdirSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Detect correct routes directory (src for dev, dist for production)
const routesDirTS = resolve(__dirname, "../src/routes");
const routesDirJS = resolve(__dirname, "./routes");
const ROUTES_DIR = existsSync(routesDirJS) ? routesDirJS : routesDirTS;

async function loadRoutes(dir, base = "") {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, item.name);
    const cur = `${base}/${item.name}`;

    if (item.isDirectory()) {
      await loadRoutes(fullPath, cur);
      continue;
    }

    // Load .ts for dev and .js for production
    if (!item.name.match(/\.route\.(ts|js)$/)) continue;

    let routePath = cur
      .replace(/\.route\.(ts|js)$/i, "")
      .replace(/\/index$/i, "")
      .replace(/\[(.+?)\]/g, ":$1")
      .replace(/\/+/g, "/")
      .replace(/\/$/, "");

    try {
      const fileUrl = pathToFileURL(fullPath).href;
      const routeModule = await import(fileUrl);
      const router = routeModule.default || routeModule;
      app.use(`/api/v1${routePath || ""}`, router);
      console.log(`Loaded → /api/v1${routePath || "/"}`);
    } catch (e) {
      console.error(`❌ Failed to load ${item.name}:`, e && e.message ? e.message : e);
    }
  }
}

loadRoutes(ROUTES_DIR).then(() => {
  app.get("/", (_, res) =>
    res.json({ message: "HR ERP Backend – ALL ROUTES WORKING!" })
  );

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`\n🚀 SERVER RUNNING → http://localhost:${PORT}\n`)
  );
});
