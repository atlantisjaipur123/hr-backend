// src/routes/company/employees/[Id].route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router({ mergeParams: true });
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement employee detail routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Employee detail routes not implemented yet' });
});
export default router;
//# sourceMappingURL=%5BId%5D.route.js.map