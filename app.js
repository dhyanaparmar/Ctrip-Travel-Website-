const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YES',
  database: 'login_db'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).send('Email already exists');
      } else {
        throw err;
      }
    } else {
      res.status(201).send('Signup successful');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
