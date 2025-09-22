/**
 * @fileoverview Help user find the book they are looking for
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 1.0.0
 * @license MIT
 */

import { useState } from 'react';
import { fetchApi } from './services/bookService';

/**
 * Handle users book search requirement
 * and turn string into machine reable query parameter
 * @name App = () =>
 * @param {Type} searchInput, setSearchInput - book name input from user
 * @param {Type} books, setBooks - get an array of books user request
 * @param {Type} error, setError - error message if fail to find books or fetch api
 * @returns {innerHTML} form ask user book name
 * @returns {HTML} display search result
 */

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    const query = searchInput.trim().replace(/[\s\t]+/g, '+');

    if (!query) {
      setError('Book name cannot be empty!');
      return;
    }

    try {
      const data = await fetchApi(query);
      if (!data || !data.items) {
        setBooks(null);
        setError('No books found or an API error occurred.');
      } else {
        setBooks(data.items);
        setError(null);
      }
    } catch (err) {
      setBooks(null);
      setError('An unexpected error occurred during the search.');
    }
  };

  return (
    <div>
      <h1>Bookstore Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          id="searchInput"
          placeholder="Enter book title"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {books && books.length > 0 && (
        <div id="test">
          {books.map(book => (
            <div key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={`Cover of ${book.volumeInfo.title}`}
                  loading="lazy" // This is the key part for lazy loading
                />
              )}
              <p>
                by{' '}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Unknown Author'}
              </p>
              <p>
                description
                {book.volumeInfo.description
                  ? book.volumeInfo.description
                  : 'No description'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
