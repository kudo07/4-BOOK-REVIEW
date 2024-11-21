import React, { useState } from 'react';

const DeleteBookButton = ({ bookId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const deleteBook = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Book deleted successfully');
      } else {
        setErrorMessage(data.message || 'Failed to delete the book');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={deleteBook}
        disabled={isLoading}
        className="w-full py-2 bg-red-500 text-white rounded"
      >
        {isLoading ? 'Deleting...' : 'Delete Book'}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default DeleteBookButton;
