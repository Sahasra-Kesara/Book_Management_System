import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' });

  useEffect(() => {
    axios.get('/api/books').then((response) => {
      setBooks(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('/api/books', newBook).then(() => {
      setNewBook({ title: '', author: '', isbn: '' });
      axios.get('/api/books').then((response) => {
        setBooks(response.data);
      });
    });
  };

  const handleDelete = (isbn) => {
    axios.delete(`/api/books/${isbn}`).then(() => {
      axios.get('/api/books').then((response) => {
        setBooks(response.data);
      });
    });
  };

  return (
    <div className="App">
      <h1>Book Management System</h1>
      <div className="book-form">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="ISBN"
          name="isbn"
          value={newBook.isbn}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Add Book</button>
      </div>
      <div className="book-list">
        <h2>Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.isbn}>
              <span>{book.title} by {book.author}</span>
              <button onClick={() => handleDelete(book.isbn)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
