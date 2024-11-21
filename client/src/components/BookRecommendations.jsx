import React, { useState, useEffect } from 'react';

const BookRecommendation = () => {
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch book recommendations from the API
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch(
          'http://localhost:3000/api/books/recommend/2'
        ); // You can update the URL as needed

        if (!response.ok) {
          throw new Error('Failed to fetch book recommendations');
        }

        const data = await response.json();
        setBookRecommendations(data); // Assuming the response is an array of book objects
      } catch (error) {
        setErrorMessage('There was an error fetching the recommendations.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []); // Runs once when the component mounts

  if (isLoading) {
    return <p>Loading recommendations...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!bookRecommendations.length) {
    return <p>No recommendations available.</p>;
  }

  return (
    <div className="recommendation-list space-y-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
      {bookRecommendations.map((book) => (
        <div
          key={book.id}
          className="recommendation-card p-4 border rounded shadow-md"
        >
          <div className="flex items-center space-x-4">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-32 h-48 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">By {book.author}</p>
              <p className="text-gray-700 mt-2">{book.genre}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookRecommendation;
