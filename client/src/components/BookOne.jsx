import React from 'react';
import { Link } from 'react-router-dom';

const BookOne = ({ book }) => {
  return (
    <div
      key={book.id}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-full h-48 object-cover "
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-gray-500">{book.author}</p>
        <Link
          to={`/book/${book.id}`}
          className="text-blue-500 hover:underline mt-2 block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookOne;
