import React, { useState } from 'react';

import read from '../../assets/read.png';
import './Card.css';
import PdfViewer from '../PdfViewer/PdfViewer';
import placeholderImage from '../../assets/placeholder.png';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker';

function Card({ bookName, authorName, profilePic, bookUrl, description, onClick, onDelete, isHome, book }) {
  const [showPdf, setShowPdf] = useState(false); // State to manage PDF display

  // Function to show the PDF viewer
  const showPdfViewer = () => {
    setShowPdf(true);
  };

  // Function to hide the PDF viewer
  const hidePdfViewer = () => {
    setShowPdf(false);
  };

  return (
    <div className="card" onClick={() => onClick(book)}>
      <img className='Book_Thumbnail' src={profilePic} alt="Book Thumbnail"  onError={(e) => e.target.src = placeholderImage} />
      <div>
        <h3 className='book_name'>{bookName}</h3>
        <p className='author_name'>{authorName}</p>
        <div className='card_buttons'>
          <a className='Download_btn btnn' href={bookUrl} download={`${bookName}.pdf`}>Download</a>
          <img src={read} alt='read' className='read-logo' onClick={showPdfViewer} /> {/* To show the PDF viewer */}
          {/* Render either bookmark icon or delete button based on isHome prop */}
          {isHome ? (
            null
          ) : (
            <button className='read_bookmark_container Delete_btn btnn' onClick={() => onDelete(book._id)}>Delete</button>
          )}
        </div>
      </div>
      {showPdf && <PdfViewer url={bookUrl} onClose={hidePdfViewer} />}
    </div>
  );
}

export default Card;
