import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ url, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const pdfViewerRef = useRef(null);

  // Function to handle loading PDF and setting the number of pages
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
        zIndex: 9999, // ensure it's on top of other content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>X</button>
      <div
        ref={pdfViewerRef}
        style={{ maxWidth: '120%', maxHeight: '90%', overflowY: 'auto' }}
      > {/* Enable scrolling */}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
