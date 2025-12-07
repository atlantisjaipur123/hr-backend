// src/routes/company/attendance/index.route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';

const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);

// TODO: Implement attendance routes
router.get('/', async (req: any, res) => {
  res.status(501).json({ success: false, error: 'Attendance routes not implemented yet' });
});

export default router;
