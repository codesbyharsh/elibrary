
import React, { useRef, useEffect, useState } from 'react';
import './Body.css';
import Card from '../Card/Card';
import placeholderImage from '../../assets/placeholder.png';

function Body({ books, newBook, form,}) {
    const containerRef = useRef(null);
    const [selectedBook, setSelectedBook] = useState(null);

 // Function to delete a book by its ID
 const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`https://api-blr2.onrender.com/${bookId}`);
      // Filter out the deleted book from the state
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again.');
    }
  };

    useEffect(() => {
        // Check if the content overflows the container
        const container = containerRef.current;
        if (container.scrollHeight > container.clientHeight) {
            container.style.overflowY = 'auto';
        }
    }, []);

    const handleCardClick = (book) => {
        setSelectedBook(book);
    };

    // Combine new book with existing books if newBook is not null
    const allBooks = newBook ? [...books, newBook] : books;

    return (
        <div className="container1" ref={containerRef}>
            <div className="main">
                <div className="content">
                    {/* Render all cards */}
                    {allBooks.map((book, index) => (
                        <Card
                            key={index}
                            book={book} // Pass the book object as a prop
                            bookName={book.bookName}
                            authorName={book.authorName}
                            profilePic={book.thumbnailUrl}
                            bookUrl={book.bookUrl}
                            onClick={() => handleCardClick(book)}
                            
                           onDelete={handleDeleteBook} 

                            isHome={true} // Indicate that it's used in Home.jsx
                            
                        />
                    ))}
                </div>
            </div>
            <div className="description">
                {selectedBook && (
                    <div className="book-description content">
                        <div className='thumbnail-fit'>
                            <img className='Book_Thumbnail' src={selectedBook.thumbnailUrl} alt="Book Thumbnail" onError={(e) => e.target.src = placeholderImage}/>
                        </div>
                        <div className="text-info">
                            <div>
                                <h3>Name:{selectedBook.bookName}</h3>
                                <p>Author:{selectedBook.authorName}</p>
                            </div>
                            <h3>Description</h3>
                            <p>{selectedBook.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Body;

