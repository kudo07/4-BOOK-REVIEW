import React, { useState } from 'react';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !text) {
      setErrorMessage('Both rating and text are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/reviews/books/${bookId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: parseInt(rating), text }),
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const newReview = await response.json();
      onReviewAdded(newReview); // Notify parent component
      setRating('');
      setText('');
    } catch (error) {
      setErrorMessage('There was an error submitting your review.');
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
          className="text-orange-400 border p-2 rounded w-full"
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
          className="text-orange-400 border p-2 rounded w-full"
        ></textarea>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
