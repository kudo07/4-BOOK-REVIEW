import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../config/connection.js';
import { errorHandler } from '../utils/error.js';
const ITEMS_PER_PAGE = 10;
export const addBook = async (req, res, next) => {
  try {
    console.log(req.user.userId);
    const { title, author, isbn, genre } = req.body;
    let { coverUrl } = req.body; // Using 'file' from multer to handle image upload
    console.log(coverUrl);
    // Validate the required fields
    if (!title || !author || !isbn || !genre) {
      return res
        .status(400)
        .json({ message: 'Title, author, ISBN, and genre are required.' });
    }

    if (coverUrl) {
      const result = await cloudinary.uploader.upload(coverUrl);
      console.log(result.secure_url);

      coverUrl = result.secure_url; // Store the secure URL of the uploaded image
      console.log(typeof coverUrl);
    }

    // Create a new book in the Prisma database
    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        genre,
        coverUrl,
        ownerId: req.user.userId,
      },
    });

    res.status(201).json({ message: 'Boook added', book });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, isbn, genre } = req.body;
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    console.log(book);
    if (!book) {
      return next(errorHandler(404, 'Book not found'));
    }
    if (book.ownerId !== req.user.userId) {
      return next(
        errorHandler(403, 'you are not authorised to update the books')
      );
    }
    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author, isbn, genre },
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, 'failed to update book'));
  }
};

export const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    console.log(book);

    if (!book) {
      return next(errorHandler(404, 'Book not found'));
    }

    if (book.ownerId !== req.user.userId) {
      return next(
        errorHandler(403, 'You are not authorised to delete this book')
      );
    }

    await prisma.book.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(errorHandler(500, 'Failed to delete the book'));
  }
};
export const getBooks = async (req, res, next) => {
  const {
    page = 1,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    genre = '',
  } = req.query;

  const skip = (page - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  try {
    const books = await prisma.book.findMany({
      where: {
        genre: {
          contains: genre, // Filter by genre if provided
        },
      },
      orderBy: {
        [sortBy]: sortOrder, // Sorting by title, author, etc.
      },
      skip,
      take,
    });

    const totalBooks = await prisma.book.count({
      where: { genre: { contains: genre } },
    });
    const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

    res.status(200).json({ books, totalPages });
  } catch (err) {
    next(errorHandler(500, 'failed to fetch books'));
  }
};
export const getBook = async (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid or missing book ID' });
  }

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book) {
      next(errorHandler(404, 'Book not found'));
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, 'failed fetch book'));
  }
};

export const searchBooks = async (req, res, next) => {
  console.log('fwe');
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Perform a search in the database
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { isbn: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    res.status(200).json(books);
  } catch (err) {
    console.log(err.message);

    next(errorHandler(500, 'failed to search books'));
  }
};

export const recommendBooks = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });

    if (!book) {
      next(errorHandler(404, 'Book not found'));
    }

    const recommendedBooks = await prisma.book.findMany({
      where: {
        OR: [{ genre: book.genre }, { author: book.author }],
      },
      take: 5, // Limit to 5 recommendations
    });

    res.status(200).json(recommendedBooks);
  } catch (err) {
    next(500, 'failed to fetch recommend books');
  }
};
