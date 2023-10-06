const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/book_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Book = mongoose.model('Book', {
  title: String,
  author: String,
  isbn: String,
});

app.use(express.json());

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/api/books', async (req, res) => {
  const { title, author, isbn } = req.body;
  const book = new Book({ title, author, isbn });
  await book.save();
  res.status(201).json(book);
});

app.delete('/api/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  await Book.findOneAndDelete({ isbn });
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
