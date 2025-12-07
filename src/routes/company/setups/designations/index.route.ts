// src/routes/company/setups/designations/index.route.ts
import { Router } from 'express';
import prisma from '../../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware.js';

const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);

// TODO: Implement designation routes
router.get('/', async (req: any, res) => {
  res.status(501).json({ success: false, error: 'Designation routes not implemented yet' });
});

export default router;
