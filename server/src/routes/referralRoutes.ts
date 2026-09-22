import { Router } from 'express';
import { getReferralInfo, getCompetitionReferral } from '../controllers/referralController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getReferralInfo);
router.post('/:competitionId', authenticate, getCompetitionReferral);

export default router;
