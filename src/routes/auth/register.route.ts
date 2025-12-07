// src/routes/auth/register.route.ts
import { Router } from 'express';

const router = Router();

// TODO: Implement registration logic
router.post('/', async (req, res) => {
  res.status(501).json({ success: false, error: 'Registration not implemented yet' });
});

export default router;
