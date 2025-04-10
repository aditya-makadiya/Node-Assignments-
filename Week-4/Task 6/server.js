const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { generateToken, authToken } = require('./jwtutils');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(helmet());

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'role']
}));

// Rate Limiting: Max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later." }
});
app.use(limiter);

// Paths for data storage
const booksFilePath = path.join(__dirname, 'book.json');
const usersFilePath = path.join(__dirname, 'users.js');

const readBooks = () => {
  try {
    const data = fs.readFileSync(booksFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error in reading books:', error);
    throw new Error('Error in reading books.');
  }
};

const readUsers = () => {
  try {
    const users = fs.readFileSync(usersFilePath);
    return JSON.parse(users);
  } catch (error) {
    throw new Error('Error in reading users.');
  }
};

const writeBooksToFile = (books) => {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
  } catch (error) {
    throw new Error('Error in writing books to file.');
  }
};

const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    throw new Error('Error in writing users to file.');
  }
};

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'myFiles');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype === 'image/jpeg' && (ext === '.jpg' || ext === '.jpeg')) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: fileFilter
}).single('file');


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

// File Upload Route
app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size exceeds 5 MB' });
    }
    return res.status(400).json({ message: 'Multer error: ' + err.message });
  } else if (err.message === 'Only JPG files are allowed') {
    return res.status(400).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});