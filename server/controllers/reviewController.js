import { prisma } from '../config/connection.js';
import { errorHandler } from '../utils/error.js';

export const addReview = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating, text } = req.body;

  try {
    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: 'Rating must be between 1 and 5.' });
    }

    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Create the review
    const newReview = await prisma.review.create({
      data: {
        rating,
        text,
        bookId: Number(bookId),
        userId: req.user.userId, // Assuming req.userId contains the authenticated user ID
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'failed to add the review'));
  }
};

export const editReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, text } = req.body;

  try {
    // Find the review
    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Ensure the user owns the review
    if (review.userId !== req.user.userId) {
      next(errorHandler(403, ' Unauthorized to edit this review.'));
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: Number(reviewId) },
      data: { rating, text },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'failed to add the review'));
  }
};

export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    // Find the review
    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Ensure the user owns the review
    if (review.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this review.' });
    }

    // Delete the review
    await prisma.review.delete({ where: { id: Number(reviewId) } });

    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'failed to add the review'));
  }
};

export const getBookWithReviews = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    // Get the book with reviews and calculate the average rating
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
      include: {
        reviews: true,
      },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const averageRating =
      book.reviews.reduce((sum, review) => sum + review.rating, 0) /
      (book.reviews.length || 1);

    res.status(200).json({ book, averageRating });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, 'failed to add the review'));
  }
};
