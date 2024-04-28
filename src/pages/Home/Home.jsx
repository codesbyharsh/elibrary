import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Body from '../../Components/Body/Body';
import Navbar from '../../Components/Navbar/Navbar';
import './Home.css';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    // Fetch books from the server when the component mounts
    axios.get('https://elibrary-5l32.vercel.app/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to delete a book by its ID
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`https://elibrary-5l32.vercel.app/books/${bookId}`);
      // Filter out the deleted book from the state
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
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
    <div className="container">
      {/* Search box */}
      <div className='search-box-container'>
      <div className='search-box'>
        <input
        className='margin-0 m0' style={{marginTop: '0px!important'}}

          type='text'
          placeholder='Search Book'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      </div>
      {/* Pass filtered books and handleDeleteBook function as props to Body component */}
      <Body books={filteredBooks} handleDeleteBook={handleDeleteBook} onDelete={handleDeleteBook}  />
    </div>
  );
};

export default Home;
