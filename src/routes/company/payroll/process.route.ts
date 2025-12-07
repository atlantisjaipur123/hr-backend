// src/routes/company/payroll/process.route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';

const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);

// TODO: Implement payroll processing routes
router.post('/', async (req: any, res) => {
  res.status(501).json({ success: false, error: 'Payroll processing not implemented yet' });
});

export default router;
