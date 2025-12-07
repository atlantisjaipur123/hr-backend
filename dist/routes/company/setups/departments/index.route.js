// src/routes/company/setup/departments/index.route.ts
import { Router } from 'express';
import prisma from '../../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
router.get('/', async (req, res) => {
    const depts = await prisma.department.findMany({
        where: { companyId: req.companyId },
        orderBy: { name: 'asc' }
    });
    res.json(depts);
});
router.post('/', async (req, res) => {
    const { name } = req.body;
    const dept = await prisma.department.create({
        data: { name, companyId: req.companyId },
    });
    res.status(201).json(dept);
});
export default router;
//# sourceMappingURL=index.route.js.map