const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let todos = ['Learn EJS', 'Build TODO app', 'Deploy to Heroku'];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const newTodo = req.body.newTodo;
  if (newTodo) {
    todos.push(newTodo);
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = parseInt(req.body.index);
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
  }
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});