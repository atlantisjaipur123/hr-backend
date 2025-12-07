// src/routes/company/shifts/rotation.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement shift rotation routes
router.get('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Shift rotation routes not implemented yet' });
});
export default router;
//# sourceMappingURL=rotation.route.js.map