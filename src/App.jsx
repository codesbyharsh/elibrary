import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Body from './Components/Body/Body.jsx';
import Footer from './Components/Footer/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import UploadPage from './pages/UploadPage/UploadPage.jsx';
import axios from 'axios'; 
import './App.css';
import DeletePage from './pages/DeletePage/DeletePage.jsx';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import LoginPage from './pages/LoginPage/LoginPage.jsx';
import {selectUsers} from './pages/LoginPage/store/usersSlice.js'
import { useSelector } from 'react-redux';
import { signOut } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { NavLink } from "react-router-dom";
import {setUser} from './pages/LoginPage/store/usersSlice.js'
import FullPageLoader from './Components/FullPageLoader/FullPageLoader.jsx';
const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const user=useSelector(selectUsers);
const dispatch = useDispatch();

 

function handleSignOut(){
  if(confirm('Are you sure you want to logout?')){

    signOut(auth).then(() => {
      dispatch(setUser(null));
    }).catch((error) => {
      console.log(error)
    });

  }

}

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  // Function to fetch books from the server
  const fetchBooks = async () => {
    try {
      // Make a GET request to fetch books from the server
      const response = await axios.get('https://api-blr2.onrender.com/books');
      
      // If the request is successful, update the state with the fetched books
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = books.filter(book =>
      book.bookName.toLowerCase().includes(query.toLowerCase()) ||
      book.authorName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Function to handle adding a new book to the list
  const handleNewBook = async (newBook) => {
    try {
      // Make a POST request to your backend API to save the new book data
      const response = await axios.post('https://api-blr2.onrender.com/upload', newBook);
      
      // If the request is successful, update the state with the new book
      const savedBook = response.data;
      setBooks(prevBooks => [...prevBooks, savedBook]);
  
      // No need to update local storage anymore
    } catch (error) {
      console.error('Error adding new book:', error);
      // Handle error
    }
  };

  
  // Function to handle deleting a book from the list
  const handleDeleteBook = async (bookId) => {
    try {
      // Make a DELETE request to your backend API to delete the book
      await axios.delete(`hhttps://api-blr2.onrender.com/books/${bookId}`);
      
      // If the request is successful, update the state to remove the deleted book
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      
      // Also update the filtered books if necessary
      setFilteredBooks(prevFilteredBooks => prevFilteredBooks.filter(book => book._id !== bookId));

      alert('Book name:- ',{bookName},' is deleted successfully !');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again.');
    }
  };

  function handleSignOut() {
    if (confirm('Are you sure you want to logout?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);


  
  return (
    <div className={`container ${theme}`}>
     {user.currentUser ?
    <BrowserRouter>
      <Navbar theme={theme} setTheme={setTheme} handleSearch={handleSearch} />
      <Routes>
      
        <Route path='/' element={<Home books={books} _id={books._id} onDelete={handleDeleteBook}  />} /> {/* Pass books as prop to Home component */}
        <Route path='/body' element={<Body books={filteredBooks} handleSearch={handleSearch} onDelete={handleDeleteBook}  />} /> {/* Pass books as prop to Body component */}
        
        <Route path='/UploadPage' element={<UploadPage setBooks={setBooks} setNewFileData={handleNewBook} />} />
        <Route path='/DeletePage' element={<DeletePage handleDeleteBook={handleDeleteBook} onDelete={handleDeleteBook} />} /> {/* Pass handleDeleteBook as prop */}
      
        
                 
      </Routes>
      <Footer theme={theme} setTheme={setTheme} />
      </BrowserRouter>:
      <LoginPage />

    
}  
    </div>
  );
}

export default App;
