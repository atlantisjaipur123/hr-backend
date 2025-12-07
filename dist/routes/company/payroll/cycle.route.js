// src/routes/company/payroll/cycle.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement payroll cycle routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Payroll cycle routes not implemented yet' });
});
export default router;
//# sourceMappingURL=cycle.route.js.map