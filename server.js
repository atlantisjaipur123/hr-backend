// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./src/routes/employee.routes.js";
import authRoutes from "./src/routes/auth/login.route.js";

dotenv.config();

const app = express();

// MIDDLEWARES — MUST BE IN THIS ORDER
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",           // ← local dev (keep this!)
      "https://fortune-hrm.vercel.app",  // ← your real live frontend
    ],
    credentials: true,
  })
);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "HR Backend is live on Railway!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: "Server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});