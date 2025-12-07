// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
  next();
};

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      error: "Super admin only",
    });
  }
  next();
};

export const requireCompanyContext = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.companyId) {
    return res.status(400).json({
      success: false,
      error: "Company context missing",
    });
  }
  next();
};

// 👇 THIS LINE is IMPORTANT
// Prevents TypeScript from removing file during build (tree shaking)
export default {};
