const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
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

const verify = (req, res, next) => {
  console.log("Received Headers:", req.headers);

  const userRole = req.headers.role;
  if (userRole !== "admin" && userRole !== "librarian") {
    console.log("Access Denied: Invalid Role");
    return res.status(403).json({ message: "Access denied. Admin or Librarian role required." });
  }
  console.log(`Access granted to: ${userRole}`);
  next();
};

//See all the Book
app.get('/books', (req, res) => {
  const books = readBooks();
  res.status(200);
  res.json(books);
});

//Find Book by ID
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

//Add New Book
app.post('/books',verify, (req,res) => {
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

//Update Book
app.put('/books/:id',verify, (req, res) => {
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

//Delete Book
app.delete('/books/:id', (req, res) => {
  let books = readBooksFromFile();
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');
  const deletedBook = books.splice(bookIndex, 1);
  writeBooksToFile(books);
  res.status(200).json(deletedBook);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});