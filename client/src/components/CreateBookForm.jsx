import React, { useState } from 'react';

const CreateBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [coverFile, setCoverFile] = useState(null); // Store file

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if cover image is provided
    if (!coverFile) {
      setErrorMessage('Please upload a cover image.');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the form data to send
      const reader = new FileReader();
      reader.onloadend = async () => {
        const coverUrl = reader.result; // Base64 encoded string

        const requestData = {
          title,
          author,
          isbn,
          genre,
          coverUrl, // This will be a base64 string
        };

        try {
          // Sending POST request to the server
          const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // Send as JSON
          });

          const data = await response.json();

          // if (data.success) {
          //   alert('Book created successfully');
          // } else {
          //   alert('Failed to create book');
          // }
        } catch (error) {
          setErrorMessage('Error submitting form: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      };

      // Convert the file to base64
      reader.readAsDataURL(coverFile);
    } catch (error) {
      setErrorMessage('Error processing the file: ' + error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-orange-400 w-1/2 p-2 border"
          required
        />
      </div>

      {/* Author Input */}
      <div>
        <label htmlFor="author" className="block">
          Author:
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="text-orange-400 w-1/2 p-2 border"
          required
        />
      </div>

      {/* ISBN Input */}
      <div>
        <label htmlFor="isbn" className="block">
          ISBN:
        </label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="text-orange-400 w-1/2 p-2 border"
          required
        />
      </div>

      {/* Genre Input */}
      <div>
        <label htmlFor="genre" className="block">
          Genre:
        </label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className=" text-orange-400 w-1/2 p-2 border"
          required
        />
      </div>

      {/* Cover Image File Input */}
      <div>
        <label htmlFor="coverUrl" className="block">
          Cover Image:
        </label>
        <input
          type="file"
          id="coverUrl"
          onChange={(e) => setCoverFile(e.target.files[0])}
          className="text-orange-400 w-full p-2 border"
          accept="image/*"
        />
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-1/2 py-2 bg-cyan-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Book'}
        </button>
      </div>
    </form>
  );
};

export default CreateBookForm;
