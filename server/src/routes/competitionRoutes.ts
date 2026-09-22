import { Router } from 'express';
import {
  getCompetitions,
  getCompetitionById,
  createCompetition
} from '../controllers/competitionController';
import {
  registerForCompetition,
  getParticipation,
  cancelRegistration,
} from '../controllers/participationController';
import { submitEntry } from '../controllers/submissionController';
import { authenticate } from '../middleware/auth';
import { validateCompetitionId } from '../middleware/validate';
import { registrationLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public routes
router.get('/', getCompetitions);
router.get('/:id', validateCompetitionId, getCompetitionById);

// Protected routes — require authentication
router.post('/', authenticate, createCompetition);
router.post(
  '/:id/register',
  authenticate,
  validateCompetitionId,
  registrationLimiter,
  registerForCompetition
);
router.get(
  '/:id/participation',
  authenticate,
  validateCompetitionId,
  getParticipation
);
router.delete(
  '/:id/register',
  authenticate,
  validateCompetitionId,
  cancelRegistration
);
router.post(
  '/:id/submission',
  authenticate,
  validateCompetitionId,
  submitEntry
);

export default router;
