import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './UploadPage.css';

const UploadPage = ({ setBooks, setNewFileData }) => {
  const [files, setFiles] = useState([]);
  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    authorName: '',
    description: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: file.size
    }));
    setFiles(selectedFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleUpload = async () => {
    try {
      if (files.length < 2 || !bookInfo.bookName || !bookInfo.authorName || !bookInfo.description) {
        throw new Error('Please provide all required fields and files!');
      }

      const formData = new FormData();
      formData.append('file1', files[0]); // Assuming files[0] is the thumbnail and files[1] is the book
      formData.append('file2', files[1]);
      formData.append('bookName', bookInfo.bookName);
      formData.append('authorName', bookInfo.authorName);
      formData.append('description', bookInfo.description);

      const response = await axios.post('https://elibrary-5l32.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const newBookData = {
        thumbnailUrl: response.data.thumbnailUrl,
        bookUrl: response.data.bookUrl,
        bookName: bookInfo.bookName,
        authorName: bookInfo.authorName,
        description: bookInfo.description
      };

      setBooks(prevBooks => [...prevBooks, newBookData]);

      alert('Files uploaded successfully!');

      setBookInfo({
        bookName: '',
        authorName: '',
        description: ''
      });
      setFiles([]);
      setErrorMessage('');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert(error.message);
    }
  };

  const onDropFirst = (acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    if (filteredFiles.length > 0) {
      setFiles([filteredFiles[0]]);
    } else {
      alert('Please select an image file.');
    }
  };

  const onDropSecond = (acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    if (filteredFiles.length > 0) {
      setFiles([...files, filteredFiles[0]]);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const { getRootProps: getFirstRootProps, getInputProps: getFirstInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: onDropFirst
  });

  const { getRootProps: getSecondRootProps, getInputProps: getSecondInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: onDropSecond
  });

  return (
    <div className='container-upload'>
      <input
        className='size mm'
        type="text"
        placeholder="Enter Book Name"
        name="bookName"
        value={bookInfo.bookName}
        onChange={handleInputChange}
      />
      <br></br>
      <input
        className='size'
        type="text"
        placeholder="Enter Author Name"
        name="authorName"
        value={bookInfo.authorName}
        onChange={handleInputChange}
      />
      <br></br>
      <textarea
        className='size height1'
        placeholder="Enter Description"
        name="description"
        value={bookInfo.description}
        onChange={handleInputChange}
      />
      <div className="file-drop-zone" {...getFirstRootProps()}>
        <input {...getFirstInputProps()} onChange={handleFileChange} multiple={false} />
        {files.length > 0 && <p>{files[0].name}</p>}
        {files.length === 0 && <p>Drag & drop Book Thumbnail here or click to select</p>}
      </div>
      <div className="file-drop-zone" {...getSecondRootProps()}>
        <input {...getSecondInputProps()} onChange={handleFileChange} multiple={false} />
        {files.length > 1 && <p>{files[1].name}</p>}
        {files.length <= 1 && <p>Drag & drop BOOK PDF file here or click to select</p>}
      </div>
      <button onClick={handleUpload} disabled={files.length < 2}>
        Upload
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UploadPage;
