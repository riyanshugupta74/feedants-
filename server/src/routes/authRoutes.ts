import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController';
import { getUserParticipations } from '../controllers/participationController';
import { authenticate } from '../middleware/auth';
import { validateRegister, validateLogin } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.get('/submissions', authenticate, getUserParticipations);

export default router;
