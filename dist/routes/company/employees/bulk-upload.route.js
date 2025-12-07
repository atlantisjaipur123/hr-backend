// src/routes/company/employees/bulk-upload.route.ts
import { Router } from 'express';
import { requireAuth, requireCompanyContext } from '../../../middleware/auth.middleware.js';
const router = Router();
router.use(requireAuth);
router.use(requireCompanyContext);
// TODO: Implement bulk upload logic
router.post('/', async (req, res) => {
    res.status(501).json({ success: false, error: 'Bulk upload not implemented yet' });
});
export default router;
//# sourceMappingURL=bulk-upload.route.js.map