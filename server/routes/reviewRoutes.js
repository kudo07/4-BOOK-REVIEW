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
//http://localhost:3000/api/reviews/books/2/reviews
// i pass the book id 2 and take that bookid and store it in the reviewtable and userid take from the req.user.userId and these data store it in the review table along with the text or comment and rating
router.post('/books/:bookId/reviews', verifyToken, addReview);

// Edit a review
router.put('/reviews/:reviewId', verifyToken, editReview);

// Delete a review
// pass the review id
router.delete('/reviews/:reviewId', verifyToken, deleteReview);

// Get a book with its reviews and average rating
// http://localhost:3000/api/reviews/books/2/reviews
// 2 is the bookId and i include the reviews table
router.get('/books/:bookId/reviews', getBookWithReviews);

export default router;
