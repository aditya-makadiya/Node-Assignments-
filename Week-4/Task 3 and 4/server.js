const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const { generateToken, authToken } = require('./jwtutils');

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(helmet());

// Enable CORS with restricted origin (adjust `origin` as needed)
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'role']
}));

//Rate Limiting: Max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later." }
});
app.use(limiter);

// Paths for data storage
const booksFilePath = path.join(__dirname, 'book.json');
const usersFilePath = path.join(__dirname, 'users.js'); 
//console.log(usersFilePath);
//console.log(booksFilePath);


// Read Books from File
const readBooks = () => {
  try {
    const data =fs.readFileSync(booksFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error in reading books:', error);
    throw new Error('Error in reading books.');
  }
};

// Read Users from File
const readUsers = () => {
  try {
    const users = fs.readFileSync(usersFilePath);
    return JSON.parse(users);
  } catch (error) {
    throw new Error('Error in reading users.');
  }
};

// Write Books to File
const writeBooksToFile = (books) => {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  } catch (error) {
    throw new Error('Error in writing books to file.');
  }
};

// Write Users to File
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    throw new Error('Error in writing users to file.');
  }
};

// Login Route (JWT Token Generation)
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Register User
app.post('/register', (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readUsers();
    const userExists = users.find(u => u.username === username);

    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push({ id: newUserId, username, password });
    writeUsersToFile(users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Middleware to Verify Role (Admin or Librarian)
const verifyRole = (req, res, next) => {
  const userRole = req.headers.role;
  if (userRole !== "admin" && userRole !== "librarian") {
    return res.status(403).json({ message: "Access denied. Admin or Librarian role required." });
  }
  next();
};

// Apply JWT Authentication to Book Routes
app.use('/books', authToken);

// Get All Books
app.get('/books', (req, res) => {
  try {
    const books = readBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Book by ID
app.get('/books/:id', (req, res) => {
  try {
    const books = readBooks();
    const book = books.find(item => item.id === parseInt(req.params.id));

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add New Book (Only Admin/Librarian)
app.post('/books', verifyRole, (req, res) => {
  try {
    const books = readBooks();
    const newBook = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
    };

    books.push(newBook);
    writeBooksToFile(books);
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Book (Only Admin/Librarian)
app.put('/books/:id', verifyRole, (req, res) => {
  try {
    const books = readBooks();
    const book = books.find(item => item.id === parseInt(req.params.id));

    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title;
    book.author = req.body.author;
    writeBooksToFile(books);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Book (Only Admin/Librarian)
app.delete('/books/:id', verifyRole, (req, res) => {
  try {
    let books = readBooks();
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(bookIndex, 1);
    writeBooksToFile(books);

    res.status(200).json(deletedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
