import React, { useEffect, useState } from 'react';
import BookOne from './BookOne';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Prev
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `/api/books?page=${currentPage}&limit=10&sortBy=title&sortOrder=asc`
        );
        const data = await res.json();
        console.log(data);

        if (Array.isArray(data.books)) {
          setBooks(data.books);
          setTotalPages(data.totalPages); // Set total pages from the response
        } else {
          console.error('Invalid data format received from API');
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]); // Re-fetch books when currentPage changes

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-10 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length === 0 ? (
          <div>No books available.</div>
        ) : (
          books.map((book) => <BookOne key={book.id} book={book} />) // Added a key for each book
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AllBooks;
