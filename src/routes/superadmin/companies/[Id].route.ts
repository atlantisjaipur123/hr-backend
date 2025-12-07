// src/routes/superadmin/companies/[id].route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireSuperAdmin } from '../../../middleware/auth.middleware.js';

const router = Router({ mergeParams: true });

router.use(requireAuth);
router.use(requireSuperAdmin);

router.get('/', async (req: any, res) => {
  const company = await prisma.company.findUnique({
    where: { id: req.params.id as string },
    include: { admin: true },
  });
  if (!company) return res.status(404).json({ error: 'Company not found or access denied' });
  res.json(company);
});

router.patch('/', async (req: any, res) => {
  const updated = await prisma.company.update({
    where: { id: req.params.id as string },
    data: req.body,
  });
  res.json(updated);
});

router.delete('/', async (req: any, res) => {
  await prisma.company.update({
    where: { id: req.params.id as string },
    data: { deletedAt: new Date() } // soft delete
  });
  res.status(204).send();
});

export default router;