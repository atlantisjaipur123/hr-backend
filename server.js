// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./src/routes/employee.routes.js";
import authRoutes from "./src/routes/auth/login.route.js"; // YOUR LOGIN ROUTE PATH

dotenv.config();

const app = express();

// CRITICAL MIDDLEWARES — MUST BE FIRST
app.use(express.json()); // Parse JSON bodies
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js dev server
    credentials: true,
  })
);

// ROUTES
app.use("/api/auth", authRoutes);        // THIS MUST BE EXACTLY THIS PATH
app.use("/api/employees", employeeRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

// 404 → return JSON, not HTML (this was killing your login!)
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// GLOBAL ERROR HANDLER (prevents HTML error pages)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Server error" });
});

const PORT = process.env.PORT || 4000; // You said backend runs on 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});