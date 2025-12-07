// src/routes/company/leaves/apply.route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';

const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);

// TODO: Implement leave application logic
router.post('/', async (req: any, res) => {
  res.status(501).json({ success: false, error: 'Leave application not implemented yet' });
});

export default router;
