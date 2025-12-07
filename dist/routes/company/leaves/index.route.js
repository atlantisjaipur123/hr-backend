// src/routes/company/leaves/index.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement leave routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Leave routes not implemented yet' });
});
export default router;
//# sourceMappingURL=index.route.js.map