const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const dbConfig = require('./config/dbConfig');
const mysql = require('mysql2');

const app = express();
const db = mysql.createConnection(dbConfig);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Use routes
app.use('/api', userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Node.js and MySQL app is running!');
});

const PORT = 3383;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
