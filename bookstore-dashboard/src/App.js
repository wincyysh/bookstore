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
    const query = searchInput.trim();
    // .replace(/[\s\t]+/g, '+');

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
    <div className="container">
      <h1>Bookstore Dashboard</h1>
      <div id="search-bar">
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="search"
            id="searchInput"
            className="form-control"
            placeholder="Search book, author, series, ISBN"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-dark">
            Search
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}

      {books && books.length > 0 && (
        <div id="books" className="container">
          {books.map(book => (
            <div
              id="book"
              key={book.id}
              className="d-flex flex-column flex-md-row"
            >
              <div
                id="book-details"
                className="card-header justify-content-start col-6 p-1"
              >
                <h2>{book.volumeInfo.title}</h2>
                <div id="book-authors">
                  <h5>
                    by{' '}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(', ')
                      : 'Unknown Author'}
                  </h5>
                </div>
                <div id="book-description" className="overflow-auto p-1">
                  {book.volumeInfo.description
                    ? book.volumeInfo.description
                    : 'No description'}
                </div>
              </div>
              <div id="book-img" className="img-container">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail}
                    alt={`Cover of ${book.volumeInfo.title}`}
                    loading="lazy" // This is the key part for lazy loading
                    className="book-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
