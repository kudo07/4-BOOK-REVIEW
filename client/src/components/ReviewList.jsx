import React, { useState } from 'react';

const ReviewList = ({ reviews, onDeleteReview }) => {
  const [loading, setLoading] = useState(null); // To track which review is being deleted

  const handleDelete = async (reviewId) => {
    const confirmDelete = true;
    if (confirmDelete) {
      setLoading(reviewId);
      try {
        await onDeleteReview(reviewId); // Assuming this function handles the API call
      } catch (error) {
        alert('Error deleting review');
      } finally {
        setLoading(null);
      }
    }
  };

  if (!reviews.length) return <p>No reviews to display.</p>;

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border-b">
          <p>
            <strong>Rating:</strong> {review.rating}
          </p>
          <p>{review.text}</p>
          <button
            onClick={() => handleDelete(review.id)}
            className="text-red-500 mt-2"
            disabled={loading === review.id} // Disable the button if deleting
          >
            {loading === review.id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
