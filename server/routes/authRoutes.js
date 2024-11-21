import { Router } from 'express';
import {
  login,
  signout,
  signup,
  getUserBooks,
} from '../controllers/authController.js';
import { verifyToken } from '../utils/authMiddleware.js';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/signout', signout);

//get all the books by passing the user id
router.get('/:userId/books', verifyToken, getUserBooks);
export default router;
