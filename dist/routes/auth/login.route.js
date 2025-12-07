// src/routes/auth/login.route.ts  ← REPLACE ENTIRE FILE
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
const router = Router();
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password required" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                isActive: true,
            },
        });
        if (!user || !user.isActive) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }
        // DIRECT COMPARISON — no bcrypt
        if (user.password !== password) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }
        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "super_admin",
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
});
export default router;
//# sourceMappingURL=login.route.js.map