import { Router } from 'express';
import { register, loginWithPassword, loginWithHash, protectedRoute, getUserProfile } from '../controllers/authControllers';
import { isAuthenticated } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login/password', loginWithPassword);
router.post('/login/nfc', loginWithHash);
router.get('/protected', isAuthenticated, protectedRoute);
router.get('/me', isAuthenticated, getUserProfile);

export default router;
