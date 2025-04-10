
const express = require('express');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const { schema } = require('./joi'); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Read users from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

const validateUser = (user) => {
    if (!user.name || typeof user.name !== 'string' || user.name.trim() === '') {
        return 'Name is required and should be a non-empty string';
    }
    if (!user.age || typeof user.age !== 'number' || user.age <= 0) {
        return 'Age is required and should be a positive number';
    }
    return null; 
};


// POST /users - Create a new user
app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  // Validate with Joi
  const { error, value } = schema.validate(newUser);
  if (error) {
    // console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  }

  //Normal Validation

      // const validationError = validateUser(newUser);
      // if (validationError) {
      //     return res.status(400).json({ error: validationError });
      // }

  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// GET /users - List all users
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET /users/:id - Get a single user
app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// PUT /users/:id - Update a user
app.put('/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = req.body;

  // Validate with Joi
  const { error, value } = schema.validate(updatedUser);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  }

  // Normal validation

  //     const validationError = validateUser(updatedUser);
  //     if (validationError) {
  //         return res.status(400).json({ error: validationError });
  //     }

  updatedUser.id = parseInt(req.params.id); 
  users[userIndex] = updatedUser;
  writeUsers(users);
  res.json(updatedUser);
});


app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  writeUsers(users);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});