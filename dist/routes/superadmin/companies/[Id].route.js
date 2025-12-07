// src/routes/superadmin/companies/[id].route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireSuperAdmin } from '../../../middleware/auth.middleware.js';
const router = Router({ mergeParams: true });
router.use(requireAuth);
router.use(requireSuperAdmin);
router.get('/', async (req, res) => {
    const company = await prisma.company.findUnique({
        where: { id: req.params.id },
        include: { admin: true },
    });
    if (!company)
        return res.status(404).json({ error: 'Company not found or access denied' });
    res.json(company);
});
router.patch('/', async (req, res) => {
    const updated = await prisma.company.update({
        where: { id: req.params.id },
        data: req.body,
    });
    res.json(updated);
});
router.delete('/', async (req, res) => {
    await prisma.company.update({
        where: { id: req.params.id },
        data: { deletedAt: new Date() } // soft delete
    });
    res.status(204).send();
});
export default router;
//# sourceMappingURL=%5BId%5D.route.js.map