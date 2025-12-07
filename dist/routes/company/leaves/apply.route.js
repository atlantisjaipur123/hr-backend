// src/routes/company/leaves/apply.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement leave application logic
router.post('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Leave application not implemented yet' });
});
export default router;
//# sourceMappingURL=apply.route.js.map