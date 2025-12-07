// src/routes/company/setups/leave-types/index.route.ts
import { Router } from 'express';
import prisma from '../../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware.js';

const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);

// TODO: Implement leave type routes
router.get('/', async (req: any, res) => {
  res.status(501).json({ success: false, error: 'Leave type routes not implemented yet' });
});

export default router;
