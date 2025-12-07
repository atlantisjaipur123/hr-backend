// src/routes/company/employees/index.route.ts
import { Router } from 'express';
import prisma from '../../../lib/prisma.js';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth, requireCompanyContext);
router.get('/', async (req, res) => {
    const { page = 1, limit = 50, search, department, designation, branch, status, shiftId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {
        companyId: req.companyId,
        deletedAt: null,
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
            ]
        }),
        ...(department && { department }),
        ...(designation && { designation }),
        ...(branch && { branch }),
        ...(status && { employmentStatus: status }),
        ...(shiftId && { shiftId })
    };
    const [employees, total] = await Promise.all([
        prisma.employee.findMany({
            where,
            include: { shift: true },
            skip,
            take: Number(limit),
            orderBy: { name: 'asc' }
        }),
        prisma.employee.count({ where })
    ]);
    res.json({
        data: employees,
        pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) }
    });
});
router.post('/', async (req, res) => {
    const emp = await prisma.employee.create({
        data: { ...req.body, companyId: req.companyId }
    });
    res.status(201).json(emp);
});
export default router;
//# sourceMappingURL=index.route.js.map