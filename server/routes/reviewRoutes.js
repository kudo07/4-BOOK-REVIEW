import { Router } from 'express';
import {
  addReview,
  deleteReview,
  editReview,
  getBookWithReviews,
} from '../controllers/reviewController.js';
import { verifyToken } from '../utils/authMiddleware.js';
// i mentioned here for the id for the specifically for book and reviews
const router = Router();
router.post('/books/:bookId/reviews', verifyToken, addReview);

// Edit a review
router.put('/reviews/:reviewId', verifyToken, editReview);

// Delete a review
router.delete('/reviews/:reviewId', verifyToken, deleteReview);

// Get a book with its reviews and average rating
router.get('/books/:bookId/reviews', getBookWithReviews);

export default router;
