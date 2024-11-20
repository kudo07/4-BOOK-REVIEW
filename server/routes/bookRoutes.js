import { Router } from 'express';
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  recommendBooks,
  searchBooks,
  updateBook,
} from '../controllers/bookController.js';

import { verifyToken } from '../utils/authMiddleware.js';

const router = Router();

// POST route for adding a book
router.post('/', verifyToken, addBook);

router.put('/:id', verifyToken, updateBook);

router.delete('/:id', verifyToken, deleteBook);
router.get('/', getBooks);
router.get('/getbook/:id', getBook);

router.get('/search', searchBooks);

router.get('/recommend/:bookId', recommendBooks);

export default router;
