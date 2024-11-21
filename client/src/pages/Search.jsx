import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError('');
    try {
      // Assuming you're fetching from an API like '/api/books/search?query={query}'
      const response = await fetch(`/api/books/search?query=${query}`);
      const data = await response.json();
      console.log(data);

      if (data && data.length > 0) {
        setBooks(data);
      } else {
        setBooks([]);
        setError('No books found.');
      }
    } catch (err) {
      setError('Error fetching books.');
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="text-orange-400 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {/* {books.length === 0 && !error && <p>No results to display</p>} */}
        {books.map((book) => (
          <div key={book.id} className="p-2 border rounded mb-2">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
