import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../Components/Card/Card'; // Import Card component
import './DeletePage.css';

function DeletePage(book ) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch books from the server when the component mounts
    fetchBooks();
  }, []);

  // Function to fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://elibrary-5l32.vercel.app/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      console.log('Book ID:', book); // Log the book ID to verify its structure
  
      await axios.delete(`https://elibrary-5l32.vercel.app/books/${bookId}`);
      // Filter out the deleted book from the state
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      // Clear the selected book if it's deleted
      if (selectedBook && selectedBook._id === bookId) {
        setSelectedBook(null);
      }
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again.');
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search box */}
      <div className='search-box'>
        <input
          type='text'
          placeholder='Search Book'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container1">
        <div className="main">
          <div className="content">
            {/* Render all cards */}
            {filteredBooks.map((book, index) => (
              <Card
                key={index}
                book={book}
                bookName={book.bookName}
                authorName={book.authorName}
                profilePic={book.thumbnailUrl}
                bookUrl={book.bookUrl}
                onClick={() => handleCardClick(book)}
                onDelete={handleDeleteBook} 
                handleDeleteBook={() => handleDeleteBook(book._id)} // Pass handleDeleteBook function as prop
                isHome={false}
              />
            ))}
          </div>
        </div>
        <div className="description">
          {selectedBook && (
            <div className="book-description content">
              <div className='thumbnail-fit'>
                <img className='Book_Thumbnail' src={selectedBook.thumbnailUrl} alt="Book Thumbnail" />
              </div>
              <div className="text-info">
                <div>
                  <h3>Name: {selectedBook.bookName}</h3>
                  <p>Author: {selectedBook.authorName}</p>
                </div>
                <h3>Description</h3>
                <p>{selectedBook.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeletePage;