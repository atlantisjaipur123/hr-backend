// src/routes/company/setups/short-leave-policies/index.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement short leave policy routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Short leave policy routes not implemented yet' });
});
export default router;
//# sourceMappingURL=index.route.js.map