import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateBookForm from './CreateBookForm';
import DeleteBookButton from './DeleteBook';

const BooksByUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBooksByUser = async () => {
      try {
        const response = await fetch(`/api/auth/${currentUser.id}/books`);

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        // Access the books array from the response data
        if (data.success && data.books) {
          setBooks(data.books); // Set the books data correctly
        } else {
          setErrorMessage('No books found for this user.');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksByUser();
  }, [currentUser.id]);

  if (isLoading) {
    return <p>Loading books...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <>
      <CreateBookForm />
      <div>
        <h2>Books by User {currentUser.id}</h2>
        {books.length === 0 ? (
          <p>No books found for this user.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border p-4 rounded-lg shadow-md">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-bold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <p className="text-sm text-gray-400">ISBN: {book.isbn}</p>
                <DeleteBookButton bookId={book.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BooksByUser;
