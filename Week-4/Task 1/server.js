const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const booksFilePath = path.join(__dirname, 'book.json');

const readBooks = () => {
  const data = fs.readFileSync(booksFilePath);
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

app.get('/books', (req, res) => {
  const books = readBooks();
  res.status(200);
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const books = readBooks();
  const book = books.filter((item) => {
    return item.id === parseInt(req.params.id);
  })
  if (book.length === 0) {
    return res.status(404).send('Book not found');
  }
  else {
    return res.status(200).json(book);
  }
});

app.post('/books', (req,res) => {
  const books = readBooks();
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  }
  books.push(newBook);
  writeBooksToFile(books);
  res.status(201).json(newBook);
})

app.put('/books/:id', (req, res) => {
  const books = readBooks();
  const book = books.filter((item)=>{
    return item.id === parseInt(req.params.id);
  })
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  writeBooksToFile(books);
  res.status(200).json(book); 
});

// DELETE the book

app.delete('/books/:id', (req, res) => {
  let books = readBooksFromFile();
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');
  const deletedBook = books.splice(bookIndex, 1);
  writeBooksToFile(books);
  res.status(200).json(deletedBook);
});

// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});