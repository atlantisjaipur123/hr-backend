export const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
        });
    }
    next();
};
export const requireSuperAdmin = (req, res, next) => {
    if (req.user?.role !== "super_admin") {
        return res.status(403).json({
            success: false,
            error: "Super admin only",
        });
    }
    next();
};
export const requireCompanyContext = (req, res, next) => {
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
//# sourceMappingURL=auth.middleware.js.map