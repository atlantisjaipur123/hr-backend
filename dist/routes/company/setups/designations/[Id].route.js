// src/routes/company/setups/designations/[Id].route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware.js';
const router = Router({ mergeParams: true });
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement designation detail routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Designation detail routes not implemented yet' });
});
export default router;
//# sourceMappingURL=%5BId%5D.route.js.map