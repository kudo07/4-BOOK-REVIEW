import { Router } from 'express';
import { login, signout, signup } from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/signout', signout);
export default router;
