// src/routes/company/setup/departments/[id].route.ts
import { Router } from 'express';
import { prisma } from '../../../../lib/prisma';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware';
const router = Router({ mergeParams: true });
router.use(requireAuth);
router.use(requireCompanyContext);
router.get('/', async (req, res) => {
    const dept = await prisma.department.findUnique({
        where: { id: req.params.id, companyId: req.companyId }
    });
    if (!dept)
        return res.status(404).json({ error: 'Not found or access denied' });
    res.json(dept);
});
router.patch('/', async (req, res) => {
    const updated = await prisma.department.update({
        where: { id: req.params.id, companyId: req.companyId },
        data: req.body
    });
    res.json(updated);
});
router.delete('/', async (req, res) => {
    await prisma.department.delete({ where: { id: req.params.id, companyId: req.companyId } });
    res.status(204).send();
});
export default router;
//# sourceMappingURL=%5BId%5D.route.js.map