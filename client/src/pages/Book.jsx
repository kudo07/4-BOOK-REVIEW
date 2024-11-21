import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import BookRecommendations from '../components/BookRecommendations';
import ReviewEditForm from '../components/ReviewEditForm';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch book details
        const bookResponse = await fetch(`/api/books/getBook/${id}`);
        const bookData = await bookResponse.json();
        setBook(bookData);

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/reviews/books/${id}/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData?.book?.reviews || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Update reviews after a new review is added
  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  // Delete review by ID
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
      } else {
        console.error('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  const handleReviewUpdated = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {book && (
        <>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-1/2">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
              <h2 className="text-xl text-gray-600">{book.author}</h2>
              <p className="text-gray-700">{book.description}</p>
              <p className="text-gray-700">Rating: {book.averageRating}</p>
            </div>
          </div>

          <div className="mt-8">
            <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
          </div>

          <div className="mt-8">
            <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
          </div>

          <div className="mt-8">
            <BookRecommendations bookId={id} />
          </div>
          {/* <ReviewEditForm
            reviewId={reviews.id}
            onReviewUpdated={handleReviewUpdated}
          /> */}
        </>
      )}
    </div>
  );
};

export default Book;
