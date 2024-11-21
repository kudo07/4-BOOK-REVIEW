import React, { useState, useEffect } from 'react';

const ReviewEditForm = ({ reviewId, onReviewUpdated }) => {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the current review details when the component mounts
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/reviews/${reviewId}`
        );
        if (!response.ok) throw new Error('Failed to fetch review');

        const reviewData = await response.json();
        setRating(reviewData.rating);
        setText(reviewData.text);
      } catch (error) {
        setErrorMessage('There was an error fetching the review details.');
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !text) {
      setErrorMessage('Both rating and text are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/reviews/reviews/${reviewId}`, {
        method: 'PUT', // Use PUT for updating the review
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: parseInt(rating), text }),
      });

      if (!response.ok) throw new Error('Failed to update review');

      const updatedReview = await response.json();
      onReviewUpdated(updatedReview); // Notify parent component about the updated review
      setRating('');
      setText('');
    } catch (error) {
      setErrorMessage('There was an error updating your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="text">Review Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          required
          className="border p-2 rounded w-full"
        ></textarea>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Review'}
      </button>
    </form>
  );
};

export default ReviewEditForm;
