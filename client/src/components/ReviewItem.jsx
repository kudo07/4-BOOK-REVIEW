import React, { useState } from 'react';

const ReviewItem = ({ review, updateReview, deleteReview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    rating: review.rating,
    text: review.text,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedReview({ ...editedReview, [name]: value });
  };

  const handleUpdate = () => {
    updateReview(review.id, editedReview);
    setIsEditing(false);
  };

  return (
    <div className="border p-4 mb-4">
      {isEditing ? (
        <div>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={editedReview.rating}
              onChange={handleEditChange}
              min="1"
              max="5"
            />
          </label>
          <label>
            Review:
            <textarea
              name="text"
              value={editedReview.text}
              onChange={handleEditChange}
            ></textarea>
          </label>
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Rating:</strong> {review.rating}/5
          </p>
          <p>{review.text}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteReview(review.id)}
            className="bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
