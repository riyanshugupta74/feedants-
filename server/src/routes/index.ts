import { Router } from 'express';
import authRoutes from './authRoutes';
import competitionRoutes from './competitionRoutes';
import referralRoutes from './referralRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/competitions', competitionRoutes);
router.use('/referrals', referralRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

export default router;
